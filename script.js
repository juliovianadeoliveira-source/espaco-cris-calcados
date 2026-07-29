// Lista de produtos com as marcas para o filtro superior
let produtos = [
    { id: 1, marca: 'Kolosh', nome: 'Sandália Kolosh Salto Bloco Conforto', preco: 159.90, imagem: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=500&q=80' },
    { id: 2, marca: 'Mississipi', nome: 'Sandália Mississipi Tiras Brilho', preco: 139.90, imagem: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=500&q=80' },
    { id: 3, marca: 'Tanara', nome: 'Sandália Tanara Salto Alto Fino', preco: 189.90, imagem: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=500&q=80' },
    { id: 4, marca: 'Campesí', nome: 'Sandália Anatômica Campesí Dia a Dia', preco: 129.90, imagem: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=500&q=80' },
    { id: 5, marca: 'Pink Cats', nome: 'Sandália Pink Cats Infantil / Juvenil', preco: 109.90, imagem: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=500&q=80' }
];

let carrinho = [];

function renderizarProdutos(lista) {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    lista.forEach(prod => {
        grid.innerHTML += `
            <div class="product-card">
                <img src="${prod.imagem}" alt="${prod.nome}" class="product-image">
                <div class="product-info">
                    <span style="font-size:10px; color:#a21c64; font-weight:700; text-transform:uppercase;">${prod.marca}</span>
                    <h4 class="product-title">${prod.nome}</h4>
                    <div class="product-price">R$ ${prod.preco.toFixed(2).replace('.', ',')}</div>
                    <div class="product-installment">Em até 6x R$ ${(prod.preco / 6).toFixed(2).replace('.', ',')} sem juros</div>
                    <div class="quantity-control">
                        <button onclick="mudarQtd(${prod.id}, -1)">-</button>
                        <span id="qtd-${prod.id}">1</span>
                        <button onclick="mudarQtd(${prod.id}, 1)">+</button>
                    </div>
                    <button class="add-to-cart-btn" onclick="adicionarAoCarrinho(${prod.id})">ADICIONAR À SACOLA</button>
                </div>
            </div>
        `;
    });
}

function filtrarMarca(marcaNome) {
    const filtrados = produtos.filter(p => p.marca.toLowerCase() === marcaNome.toLowerCase());
    renderizarProdutos(filtrados);
}

function mudarQtd(id, delta) {
    const span = document.getElementById(`qtd-${id}`);
    let atual = parseInt(span.innerText) + delta;
    if (atual < 1) atual = 1;
    span.innerText = atual;
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
    const container = document.getElementById('cartItems');
    const count = document.getElementById('cartCount');
    const totalEl = document.getElementById('cartTotal');
    
    container.innerHTML = '';
    let total = 0;
    let totalQtd = 0;
    
    if (carrinho.length === 0) {
        container.innerHTML = '<p class="empty-cart">Seu carrinho está vazio.</p>';
    } else {
        carrinho.forEach((item, index) => {
            total += item.preco * item.qtd;
            totalQtd += item.qtd;
            container.innerHTML += `
                <div class="cart-item-row">
                    <div class="cart-item-info">
                        <h4>${item.nome}</h4>
                        <p>R$ ${item.preco.toFixed(2).replace('.', ',')} (x${item.qtd})</p>
                    </div>
                    <button onclick="removerItem(${index})" style="background:none; border:none; color:red; cursor:pointer;"><i class="fa-solid fa-trash"></i></button>
                </div>
            `;
        });
    }
    
    count.innerText = totalQtd;
    totalEl.innerText = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

function removerItem(index) {
    carrinho.splice(index, 1);
    atualizarCarrinho();
}

function toggleCart() {
    document.getElementById('cartModal').classList.toggle('open');
}

function closePopup() {
    document.getElementById('popupOverlay').style.display = 'none';
}

function rolarGrid(direcao) {
    const grid = document.getElementById('productsGrid');
    grid.scrollBy({ left: direcao * 300, behavior: 'smooth' });
}

function checkoutWhatsApp() {
    if (carrinho.length === 0) return alert('Seu carrinho está vazio!');
    let texto = "Olá, gostaria de finalizar o pedido:%0A";
    let total = 0;
    carrinho.forEach(item => {
        texto += `- ${item.qtd}x ${item.nome} (R$ ${(item.preco * item.qtd).toFixed(2)})%0A`;
        total += item.preco * item.qtd;
    });
    texto += `%0A*Total: R$ ${total.toFixed(2)}*`;
    window.open(`https://wa.me/5527997787772?text=${texto}`, '_blank');
}

// Inicializar página
window.onload = () => {
    renderizarProdutos(produtos);
};
