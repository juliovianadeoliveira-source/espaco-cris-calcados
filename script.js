/* Espaço Cris Calçados — vitrine
 * O produto só entra no carrinho dentro da página de detalhes,
 * depois que o cliente escolhe a numeração e clica em Adicionar ao carrinho.
 */
const SUPABASE_URL = "https://nnhljxmmrqekoxcapdkm.supabase.co";
const SUPABASE_KEY = "sb_publishable_mPNEE_t2HTfU5f2rUDwrig_u9ls7HrE";
let products = [];
const money = value => Number(value || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

function carregarCarrinho(){
    if (document.querySelector('script[data-espaco-cart]')) return;
    const s=document.createElement('script');
    s.src='cart.js';
    s.dataset.espacoCart='1';
    document.head.appendChild(s);
}

async function carregarProdutos() {
    const url = `${SUPABASE_URL}/rest/v1/produtos?select=id,nome,preco,preco_promocional,destaque,produto_imagens(url,ordem)&ativo=eq.true&order=destaque.desc,created_at.desc`;
    try {
        const response = await fetch(url, { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } });
        if (!response.ok) throw new Error(`Supabase HTTP ${response.status}`);
        const data = await response.json();
        products = data.map(p => {
            const imagens = Array.isArray(p.produto_imagens) ? [...p.produto_imagens].sort((a,b)=>(a.ordem||0)-(b.ordem||0)) : [];
            const regular = Number(p.preco || 0), promo = Number(p.preco_promocional || 0);
            return { id:p.id, name:p.nome, price:promo>0&&promo<regular?promo:regular, image:imagens[0]?.url||'https://via.placeholder.com/600x600?text=Espa%C3%A7o+Cris' };
        });
        renderProducts(products);
    } catch (error) {
        console.error('Erro ao carregar produtos:', error);
        const grid=document.getElementById('productsGrid')||document.getElementById('grid');
        if(grid) grid.innerHTML='<div style="grid-column:1/-1;padding:30px;text-align:center"><h3>Não foi possível carregar a vitrine</h3><p>Atualize a página para tentar novamente.</p></div>';
    }
}

function renderProducts(items) {
    const grid=document.getElementById('productsGrid')||document.getElementById('grid');
    if(!grid)return;
    grid.innerHTML='';
    items.forEach(product=>{
        const card=document.createElement('article');
        card.className='card product-card';
        card.innerHTML=`<a href="produto.html?id=${encodeURIComponent(product.id)}" class="product-link" aria-label="Ver ${String(product.name).replace(/"/g,'&quot;')}">
            <div class="pic"><img src="${product.image}" alt="${String(product.name).replace(/"/g,'&quot;')}" loading="lazy" onerror="this.src='https://via.placeholder.com/600x600?text=Imagem'"></div>
            <div class="card-info product-info"><div class="card-cat">Espaço Cris</div><div class="card-name product-title">${product.name}</div><div class="price product-price">${money(product.price)}</div><div class="details">Ver detalhes</div></div>
        </a>`;
        grid.appendChild(card);
    });
}

function rolarGrid(direcao){
    const grid=document.getElementById('productsGrid')||document.getElementById('grid');
    if(!grid)return;
    grid.scrollBy({left:direcao*320,behavior:'smooth'});
}

function initBusca(){
    const input=document.getElementById('searchInput');
    if(input) input.addEventListener('input',e=>{
        const term=e.target.value.toLowerCase().trim();
        renderProducts(products.filter(p=>p.name.toLowerCase().includes(term)));
    });
}

document.addEventListener('DOMContentLoaded',()=>{
    carregarCarrinho();
    initBusca();
    carregarProdutos();
});
