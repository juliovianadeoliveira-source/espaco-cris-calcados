#!/usr/bin/env python3
"""Sincroniza o catálogo público da Kela Calçados para data/catalog.json.

Não coleta nem publica informações de fornecedor. Produtos ausentes na origem
são mantidos no JSON com active=false para evitar apagar histórico do catálogo.
"""
import json, re, time
from html import unescape
from pathlib import Path
from urllib.parse import urljoin, urlparse
from urllib.request import Request, urlopen

BASE = "https://kelacalcados.com.br/"
CATALOG = BASE + "produtos/"
OUT = Path(__file__).resolve().parents[1] / "data" / "catalog.json"
HEADERS = {"User-Agent": "Mozilla/5.0 (compatible; EspacoCrisCatalogSync/1.0)"}


def get(url):
    req = Request(url, headers=HEADERS)
    with urlopen(req, timeout=30) as r:
        return r.read().decode("utf-8", "replace")


def clean(s):
    return re.sub(r"\s+", " ", unescape(re.sub(r"<[^>]+>", " ", s or ""))).strip()


def jsonld(html):
    out=[]
    for raw in re.findall(r'<script[^>]+type=["\']application/ld\+json["\'][^>]*>(.*?)</script>', html, re.I|re.S):
        try:
            obj=json.loads(unescape(raw.strip()))
            out.extend(obj if isinstance(obj,list) else [obj])
        except Exception: pass
    return out


def product_links(html):
    links=[]
    for href in re.findall(r'<a[^>]+href=["\']([^"\']+)["\']', html, re.I):
        u=urljoin(BASE, href).split('#')[0]
        if urlparse(u).netloc.endswith('kelacalcados.com.br') and '/produto/' in u:
            links.append(u)
    return list(dict.fromkeys(links))


def discover():
    links=[]
    for page in range(1,31):
        url = CATALOG if page==1 else urljoin(BASE, f"produtos/page/{page}/")
        try: html=get(url)
        except Exception: break
        found=product_links(html)
        if not found: break
        before=len(links); links += [x for x in found if x not in links]
        if len(links)==before: break
    return links


def parse_product(url):
    html=get(url)
    data={}
    for o in jsonld(html):
        if isinstance(o,dict) and (o.get('@type')=='Product' or 'Product' in (o.get('@type') if isinstance(o.get('@type'),list) else [])):
            data=o; break
    name=clean(data.get('name',''))
    if not name:
        m=re.search(r'<h1[^>]*class=["\'][^"\']*product_title[^"\']*["\'][^>]*>(.*?)</h1>',html,re.I|re.S)
        name=clean(m.group(1)) if m else ''
    offers=data.get('offers',{}) if isinstance(data.get('offers',{}),dict) else {}
    price=offers.get('price')
    if price is None:
        m=re.search(r'(?:price|preco)["\']?\s*[:=]\s*["\']?([0-9]+(?:[.,][0-9]{1,2})?)',html,re.I)
        price=m.group(1).replace(',','.') if m else 0
    imgs=[]
    image=data.get('image',[])
    if isinstance(image,str): imgs=[image]
    elif isinstance(image,list): imgs=[x for x in image if isinstance(x,str)]
    for x in re.findall(r'<img[^>]+(?:data-src|data-lazy-src|src)=["\']([^"\']+)',html,re.I):
        u=urljoin(BASE,x)
        if u not in imgs: imgs.append(u)
    imgs=[x for x in imgs if x.startswith('http')][:30]
    stock=offers.get('availability','')
    active='OutOfStock' not in str(stock)
    slug=urlparse(url).path.strip('/').split('/')[-1]
    return {'source_id':slug,'source_url':url,'name':name or slug.replace('-',' ').title(),'price':float(str(price).replace(',','.')),'promotional_price':None,'active':active,'images':imgs}


def main():
    OUT.parent.mkdir(parents=True,exist_ok=True)
    old={}
    if OUT.exists():
        try:
            old={str(x.get('source_id')):x for x in json.loads(OUT.read_text()).get('products',[])}
        except Exception: old={}
    links=discover(); products=[]
    for i,url in enumerate(links,1):
        try:
            p=parse_product(url)
            # Preserve a previously detected promotional price when the source page
            # exposes only the regular JSON-LD offer temporarily.
            prev=old.get(p['source_id'],{})
            if prev.get('promotional_price') is not None: p['promotional_price']=prev['promotional_price']
            products.append(p)
            print(f"[{i}/{len(links)}] {p['name']}")
        except Exception as e: print('skip',url,e)
        time.sleep(0.15)
    seen={p['source_id'] for p in products}
    for sid,p in old.items():
        if sid not in seen:
            p=dict(p); p['active']=False; products.append(p)
    payload={'updated_at':time.strftime('%Y-%m-%dT%H:%M:%SZ',time.gmtime()),'source':BASE,'products':products}
    OUT.write_text(json.dumps(payload,ensure_ascii=False,indent=2),encoding='utf-8')
    print(f'Catalogo atualizado: {len(products)} produtos ({len(seen)} ativos na origem).')

if __name__=='__main__': main()
