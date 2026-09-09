/* Espaço Cris — carrinho inspirado em marketplaces, sem copiar identidade visual */
(function(){
  const KEY='espaco_cris_cart', MAX=200;
  let cart=[];
  const money=v=>Number(v||0).toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function read(){try{const x=JSON.parse(localStorage.getItem(KEY)||'[]');cart=Array.isArray(x)?x:[]}catch{cart=[]}}
  function write(){localStorage.setItem(KEY,JSON.stringify(cart));try{sessionStorage.setItem(KEY,JSON.stringify(cart))}catch{};render()}
  function units(){return cart.reduce((s,i)=>s+Math.max(1,Number(i.quantity)||1),0)}
  function total(){return cart.reduce((s,i)=>s+Number(i.price||0)*Math.max(1,Number(i.quantity)||1),0)}
  function render(){
    const n=units(), count=document.getElementById('cartCount'), body=document.getElementById('cartItems'), totalEl=document.getElementById('cartTotal'), unitsEl=document.getElementById('cartUnits');
    if(count)count.textContent=n>99?'99+':n;
    if(unitsEl)unitsEl.textContent=`${n} ${n===1?'item':'itens'}`;
    if(!body)return;
    body.innerHTML=cart.length?cart.map((i,k)=>`<div class="sc-item"><img src="${esc(i.image)}" alt="${esc(i.name)}" onerror="this.style.opacity=.15"><div class="sc-main"><b>${esc(i.name)}</b><small>Tam. ${esc(i.size)} · ${money(i.price)}</small><div class="sc-bottom"><div class="sc-qty"><button data-act="minus" data-i="${k}">−</button><span>${i.quantity}</span><button data-act="plus" data-i="${k}">+</button></div><strong>${money(Number(i.price)*Number(i.quantity))}</strong><button class="sc-remove" data-act="remove" data-i="${k}">Remover</button></div></div></div>`).join(''):`<div class="sc-empty"><div>🛍️</div><b>Seu carrinho está vazio</b><span>Adicione suas sandálias favoritas.</span></div>`;
    if(totalEl)totalEl.textContent=money(total());
  }
  function open(){document.getElementById('scBackdrop')?.classList.add('open');document.getElementById('scDrawer')?.classList.add('open');document.body.style.overflow='hidden';render()}
  function close(){document.getElementById('scBackdrop')?.classList.remove('open');document.getElementById('scDrawer')?.classList.remove('open');document.body.style.overflow=''}
  function add(item){
    const q=Math.max(1,Number(item.quantity)||1), same=cart.find(x=>String(x.id)===String(item.id)&&String(x.size)===String(item.size));
    if(units()+q>MAX && !same)return false;
    if(same){if(same.quantity+q>20)return false;if(units()+q>MAX)return false;same.quantity+=q}
    else cart.push({...item,quantity:q});
    write();open();return true;
  }
  window.EspacoCrisCart={add,open,close,refresh:()=>{read();render()}};
  function inject(){
    const style=document.createElement('style');
    style.textContent=`.bag{position:relative}.bag-count{position:absolute;right:-4px;top:-5px;min-width:20px;height:20px;padding:0 5px;border-radius:99px;background:var(--pink);color:#fff;display:grid;place-items:center;font-size:10px;font-weight:950;border:2px solid #fff}.sc-backdrop{position:fixed;inset:0;background:#0008;z-index:80;opacity:0;visibility:hidden;transition:.25s}.sc-backdrop.open{opacity:1;visibility:visible}.sc-drawer{position:fixed;top:0;right:0;width:min(470px,100vw);height:100dvh;background:#fff;z-index:90;transform:translateX(100%);transition:transform .28s ease;display:flex;flex-direction:column;box-shadow:-15px 0 45px #0003}.sc-drawer.open{transform:translateX(0)}.sc-head{display:flex;align-items:center;justify-content:space-between;padding:19px 20px;border-bottom:1px solid var(--line)}.sc-head h2{margin:0;color:var(--wine);font:900 24px Georgia,serif}.sc-head small{display:block;color:var(--muted);font:11px Arial;margin-top:4px}.sc-close{width:38px;height:38px;border:0;border-radius:50%;background:#f7eef2;color:var(--wine);font-size:23px}.sc-body{flex:1;overflow:auto;padding:12px 16px;background:#faf7f8}.sc-item{display:grid;grid-template-columns:72px 1fr;gap:11px;background:#fff;border:1px solid var(--line);border-radius:12px;padding:10px;margin-bottom:10px}.sc-item img{width:72px;height:72px;object-fit:cover;border-radius:9px;background:#f3ecef}.sc-main>b{display:block;font-size:13px;line-height:1.35;color:#2b2025}.sc-main>small{display:block;color:var(--muted);font-size:11px;margin:4px 0 8px}.sc-bottom{display:flex;align-items:center;gap:8px;flex-wrap:wrap}.sc-qty{display:flex;border:1px solid var(--line);border-radius:8px;overflow:hidden}.sc-qty button{width:29px;height:29px;border:0;background:#fff;color:var(--wine);font-size:18px}.sc-qty span{min-width:27px;display:grid;place-items:center;font-size:12px;font-weight:900}.sc-bottom strong{margin-left:auto;color:var(--pink);font-size:13px}.sc-remove{border:0;background:none;color:#9b7f8a;font-size:11px}.sc-empty{text-align:center;padding:70px 20px;color:var(--muted)}.sc-empty div{font-size:42px;margin-bottom:8px}.sc-empty b{display:block;color:var(--wine);font:900 23px Georgia,serif;margin-bottom:6px}.sc-foot{border-top:1px solid var(--line);padding:16px 19px 20px;background:#fff}.sc-row{display:flex;justify-content:space-between;font-size:13px;margin-bottom:9px}.sc-total{border-top:1px solid var(--line);padding-top:10px;font-size:20px;font-weight:950;color:var(--wine)}.sc-check{width:100%;margin-top:8px;padding:15px;border:0;border-radius:9px;background:var(--pink);color:#fff;font-size:12px;font-weight:950}.sc-buy{display:none!important}@media(max-width:700px){.sc-drawer{width:100vw}}`;
    document.head.appendChild(style);
    document.body.insertAdjacentHTML('beforeend',`<div class="sc-backdrop" id="scBackdrop"></div><aside class="sc-drawer" id="scDrawer" aria-label="Carrinho de compras"><div class="sc-head"><div><h2>Seu carrinho</h2><small id="cartUnits">0 itens</small></div><button class="sc-close" id="scClose" aria-label="Fechar">×</button></div><div class="sc-body" id="cartItems"></div><div class="sc-foot"><div class="sc-row"><span>Total</span><strong class="sc-total" id="cartTotal">R$ 0,00</strong></div><button class="sc-check" id="scCheckout">IR PARA O CHECKOUT</button></div></aside>`);
    const bag=document.querySelector('.bag');
    if(bag){bag.id='cartButton';bag.type='button';bag.innerHTML='<i>🛒</i><span>Sacola</span><b class="bag-count" id="cartCount">0</b>';bag.onclick=open}
    document.getElementById('scClose').onclick=close;document.getElementById('scBackdrop').onclick=close;
    document.getElementById('scCheckout').onclick=()=>{if(!cart.length)return alert('Seu carrinho está vazio.');localStorage.setItem(KEY,JSON.stringify(cart));try{sessionStorage.setItem(KEY,JSON.stringify(cart))}catch{};location.href='checkout.html?carrinho=1'};
    document.getElementById('cartItems').onclick=e=>{const b=e.target.closest('button[data-act]');if(!b)return;const i=Number(b.dataset.i),act=b.dataset.act;if(!cart[i])return;if(act==='remove')cart.splice(i,1);if(act==='minus'){cart[i].quantity--;if(cart[i].quantity<=0)cart.splice(i,1)}if(act==='plus'){if(cart[i].quantity>=20)return alert('Limite de 20 unidades deste produto.');if(units()>=MAX)return alert('O carrinho pode ter no máximo 200 itens.');cart[i].quantity++}write()};
  }
  document.addEventListener('DOMContentLoaded',()=>{read();inject();render()});
})();
