// Array contendo mais de 50 modelos de sandálias para a vitrine
const produtos = [
    { id: 1, nome: "Sandália Rasteira Minimalista Chic", preco: 89.90, imagem: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80" },
    { id: 2, nome: "Sandália Salto Bloco Elegance", preco: 149.90, imagem: "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=600&q=80" },
    { id: 3, nome: "Sandália Anabela Tressê", preco: 179.90, imagem: "https://images.unsplash.com/photo-1562273138-f46be4ebdf33?auto=format&fit=crop&w=600&q=80" },
    { id: 4, nome: "Sandália de Salto Fino Glamour", preco: 199.90, imagem: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80" },
    { id: 5, nome: "Sandália Rasteira com Pedrarias", preco: 119.90, imagem: "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=600&q=80" },
    { id: 6, nome: "Sandália Plataforma Summer", preco: 159.90, imagem: "https://images.unsplash.com/photo-1562273138-f46be4ebdf33?auto=format&fit=crop&w=600&q=80" },
    { id: 7, nome: "Sandália Papete Confort Casual", preco: 129.90, imagem: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80" },
    { id: 8, nome: "Sandália Slide Moderna Nude", preco: 99.90, imagem: "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=600&q=80" },
    { id: 9, nome: "Sandália Salto Geométrico Verniz", preco: 189.90, imagem: "https://images.unsplash.com/photo-1562273138-f46be4ebdf33?auto=format&fit=crop&w=600&q=80" },
    { id: 10, nome: "Sandália Rasteira de Amarrar", preco: 89.90, imagem: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80" },
    { id: 11, nome: "Sandália Salto Médio Conforto", preco: 139.90, imagem: "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=600&q=80" },
    { id: 12, nome: "Sandália Rasteira Couro Legítimo", preco: 115.00, imagem: "https://images.unsplash.com/photo-1562273138-f46be4ebdf33?auto=format&fit=crop&w=600&q=80" },
    { id: 13, nome: "Sandália Festa Tiras Strass", preco: 219.90, imagem: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80" },
    { id: 14, nome: "Sandália Rasteira Metalizada Ouro", preco: 94.90, imagem: "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=600&q=80" },
    { id: 15, nome: "Sandália Plataforma Corda", preco: 169.90, imagem: "https://images.unsplash.com/photo-1562273138-f46be4ebdf33?auto=format&fit=crop&w=600&q=80" },
    { id: 16, nome: "Sandália Salto Bloco Baixo", preco: 129.90, imagem: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80" },
    { id: 17, nome: "Sandália Rasteira Anatômica", preco: 79.90, imagem: "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=600&q=80" },
    { id: 18, nome: "Sandália Mule Salto Fino", preco: 189.90, imagem: "https://images.unsplash.com/photo-1562273138-f46be4ebdf33?auto=format&fit=crop&w=600&q=80" },
    { id: 19, nome: "Sandália Rasteira de Dedo Chic", preco: 85.00, imagem: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80" },
    { id: 20, nome: "Sandália Meia Pata Festa", preco: 239.90, imagem: "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=600&q=80" },
    { id: 21, nome: "Sandália Papete com Brilho", preco: 149.90, imagem: "https://images.unsplash.com/photo-1562273138-f46be4ebdf33?auto=format&fit=crop&w=600&q=80" },
    { id: 22, nome: "Sandália Salto Acrílico Transparente", preco: 199.90, imagem: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80" },
    { id: 23, nome: "Sandália Rasteira Cruzada", preco: 89.90, imagem: "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=600&q=80" },
    { id: 24, nome: "Sandália Salto Fino Verniz Preto", preco: 179.90, imagem: "https://images.unsplash.com/photo-1562273138-f46be4ebdf33?auto=format&fit=crop&w=600&q=80" },
    { id: 25, nome: "Sandália Rasteira Esferas", preco: 109.90, imagem: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80" },
    { id: 26, nome: "Sandália Flatform Esportiva Chic", preco: 159.90, imagem: "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=600&q=80" },
    { id: 27, nome: "Sandália Salto Bloco Médio Off-White", preco: 139.90, imagem: "https://images.unsplash.com/photo-1562273138-f46be4ebdf33?auto=format&fit=crop&w=600&q=80" },
    { id: 28, nome: "Sandália Rasteira Tiras Duplas", preco: 89.90, imagem: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80" },
    { id: 29, nome: "Sandália Salto Taça Metalizada", preco: 209.90, imagem: "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=600&q=80" },
    { id: 30, nome: "Sandália Rasteira Bico Fino", preco: 99.90, imagem: "https://images.unsplash.com/photo-1562273138-f46be4ebdf33?auto=format&fit=crop&w=600&q=80" },
    { id: 31, nome: "Sandália Anabela Cortiça", preco: 169.90, imagem: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80" },
    { id: 32, nome: "Sandália Rasteira com Fivelas", preco: 119.90, imagem: "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=600&q=80" },
    { id: 33, nome: "Sandália Salto Fino Amarração Tornozelo", preco: 189.90, imagem: "https://images.unsplash.com/photo-1562273138-f46be4ebdf33?auto=format&fit=crop&w=600&q=80" },
    { id: 34, nome: "Sandália Mule Salto Bloco", preco: 149.90, imagem: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80" },
    { id: 35, nome: "Sandália Rasteira Conforto Plus", preco: 85.00, imagem: "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=600&q=80" },
    { id: 36, nome: "Sandália Salto Baixo Tiras Delicadas", preco: 129.90, imagem: "https://images.unsplash.com/photo-1562273138-f46be4ebdf33?auto=format&fit=crop&w=600&q=80" },
    { id: 37, nome: "Sandália Rasteira Pedraria Luxo", preco: 139.90, imagem: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80" },
    { id: 38, nome: "Sandália Plataforma Tratorada", preco: 179.90, imagem: "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=600&q=80" },
    { id: 39, nome: "Sandália Salto Grosso Comfy", preco: 139.90, imagem: "https://images.unsplash.com/photo-1562273138-f46be4ebdf33?auto=format&fit=crop&w=600&q=80" },
    { id: 40, nome: "Sandália Rasteira Metalizada Prata", preco: 94.90, imagem: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80" },
    { id: 41, nome: "Sandália Salto Alto Meia Pata Verniz", preco: 229.90, imagem: "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=600&q=80" },
    { id: 42, nome: "Sandália Rasteira de Couro Pelica", preco: 125.00, imagem: "https://images.unsplash.com/photo-1562273138-f46be4ebdf33?auto=format&fit=crop&w=600&q=80" },
    { id: 43, nome: "Sandália Papete Acolchoada", preco: 159.90, imagem: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80" },
    { id: 44, nome: "Sandália Salto Geométrico Festa", preco: 199.90, imagem: "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=600&q=80" },
    { id: 45, nome: "Sandália Rasteira Estilo Boho", preco: 99.90, imagem: "https://images.unsplash.com/photo-1562273138-f46be4ebdf33?auto=format&fit=crop&w=600&q=80" },
    { id: 46, nome: "Sandália Salto Bloco com Tachas", preco: 169.90, imagem: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80" },
    { id: 47, nome: "Sandália Rasteira Tressê Bege", preco: 109.90, imagem: "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=600&q=80" },
    { id: 48, nome: "Sandália Salto Fino Elegance Rosê", preco: 179.90, imagem: "https://images.unsplash.com/photo-1562273138-f46be4ebdf33?auto=format&fit=crop&w=600&q=80" },
    { id: 49, nome: "Sandália Rasteira Amarração PomPom", preco: 89.90, imagem: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80" },
    { id: 50, nome: "Sandália Coleção Especial Espaço Cris", preco: 249.90, imagem: "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=600&q=80" }
];

let carrinho = [];

// Renderizar Produtos na Tela
function renderizarProdutos() {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    produtos.forEach(prod => {
        const parcelamento = (prod.preco / 6).toFixed(2).replace('.', ',');
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${prod.imagem}" alt="${prod.nome}" class="product-image">
            <div class="product-info">
                <h4 class="product-title">${prod.nome}</h4>
                <div class="product-price">R$ ${prod.preco.toFixed(2).replace('.', ',')}</div>
                <div class="product-installment">Em até 6x R$ ${parcelamento} sem juros</div>
                <div class="quantity-control">
                    <button onclick="mudarQtd(${prod.id}, -1)">-</button>
                    <span id="qtd-${prod.id}">1</span>
                    <button onclick="mudarQtd(${prod.id}, 1)">+</button>
                </div>
                <button class="add-to-cart-btn" onclick="adicionarAoCarrinho(${prod.id})">ADICIONAR À SACOLA</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

function mudarQtd(id, delta) {
    const span = document.getElementById(`qtd-${id}`);
    let val = parseInt(span.innerText) + delta;
    if (val < 1) val = 1;
    span.innerText = val;
}

function adicionarAoCarrinho(id) {
    const prod = produtos.find(p => p.id === id);
    const qtd = parseInt(document.getElementById(`qtd-${id}`).innerText);
    
    const itemExistente = carrinho.find(item => item.id === id);
    if (itemExistente) {
        itemExistente.qtd += qtd;
    } else {
        carrinho.push({ ...prod, qtd });
    }
    
    atualizarCarrinho();
    toggleCart();
}

function atualizarCarrinho() {
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');
    
    cartCount.innerText = carrinho.reduce((acc, item) => acc + item.qtd, 0);
    
    if (carrinho.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Seu carrinho está vazio.</p>';
        cartTotal.innerText = 'R$ 0,00';
        return;
    }
    
    cartItems.innerHTML = '';
    let total = 0;
    
    carrinho.forEach((item, index) => {
        let subtotal = item.preco * item.qtd;
        total += subtotal;
        
        cartItems.innerHTML += `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; border-bottom: 1px solid #eee; padding-bottom: 10px;">
                <img src="${item.imagem}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;">
                <div style="flex: 1; margin-left: 10px; font-size: 12px;">
                    <strong>${item.nome}</strong>
                    <div>${item.qtd}x R$ ${item.preco.toFixed(2).replace('.', ',')}</div>
                </div>
                <button onclick="removerItem(${index})" style="background:none; border:none; color:red; cursor:pointer;"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;
    });
    
    cartTotal.innerText = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

function removerItem(index) {
    carrinho.splice(index, 1);
    atualizarCarrinho();
}

function toggleCart() {
    const modal = document.getElementById('cartModal');
    modal.classList.toggle('open');
}

function closePopup() {
    const popup = document.getElementById('popupOverlay');
    if (popup) popup.style.display = 'none';
}

function checkoutWhatsApp() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }
    
    let mensagem = "Olá! Gostaria de finalizar o pedido:\n\n";
    let total = 0;
    
    carrinho.forEach(item => {
        let sub = item.preco * item.qtd;
        total += sub;
        mensagem += `• ${item.qtd}x ${item.nome} - R$ ${sub.toFixed(2).replace('.', ',')}\n`;
    });
    
    mensagem += `\n*Total: R$ ${total.toFixed(2).replace('.', ',')}*`;
    
    const url = `https://wa.me/5527997787772?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
}

function rolarGrid(direcao) {
    const grid = document.getElementById('productsGrid');
    grid.scrollBy({ left: direcao * 300, behavior: 'smooth' });
}

// Inicializar carregamento ao abrir a página
window.onload = function() {
    renderizarProdutos();
};
