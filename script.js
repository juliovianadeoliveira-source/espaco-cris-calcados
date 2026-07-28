// Lista de produtos de exemplo (você pode alterar com as fotos e nomes reais depois)
const products = [
    {
        id: 1,
        name: "Sandália Dakota Atlantis Salto Bloco",
        price: 179.90,
        installment: "Em até 6x R$ 29,98 sem juros",
        image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500"
    },
    {
        id: 2,
        name: "Sandália Dakota Flatform Feminina Preta",
        price: 189.90,
        installment: "Em até 6x R$ 31,65 sem juros",
        image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=500"
    },
    {
        id: 3,
        name: "Sandália Dakota Salto Bloco Metalizada",
        price: 169.90,
        installment: "Em até 5x R$ 33,98 sem juros",
        image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500"
    },
    {
        id: 4,
        name: "Tamanco Dakota Salto Alto Amarelo",
        price: 159.90,
        installment: "Em até 5x R$ 31,98 sem juros",
        image: "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?w=500"
    }
];

// Carrinho de compras na memória
let cart = [];
// Controle temporário de quantidade selecionada nos cards
let productQuantities = {};

// Inicializa a vitrine de produtos na tela
function renderProducts(itemsToRender) {
    const grid = document.getElementById("productsGrid");
    grid.innerHTML = "";

    itemsToRender.forEach(product => {
        // Quantidade atual selecionada no contador do card (padrão é 1 par)
        const qty = productQuantities[product.id] || 1;

        const card = document.createElement("div");
        card.classList.add("product-card");

        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h4 class="product-title">${product.name}</h4>
                <div class="product-price">R$ ${product.price.toFixed(2).replace('.', ',')}</div>
                <div class="product-installment">${product.installment}</div>
                
                <!-- Botões de + e - estilo Shopee -->
                <div class="quantity-control">
                    <button onclick="changeCardQty(${product.id}, -1)">-</button>
                    <span>${qty} par(es)</span>
                    <button onclick="changeCardQty(${product.id}, 1)">+</button>
                </div>

                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                    Adicionar ao Carrinho
                </button>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Altera a quantidade no card antes de adicionar
function changeCardQty(productId, change) {
    if (!productQuantities[productId]) {
        productQuantities[productId] = 1;
    }
    productQuantities[productId] += change;
    if (productQuantities[productId] < 1) {
        productQuantities[productId] = 1;
    }
    renderProducts(products);
}

// Adiciona o produto ao carrinho com a quantidade escolhida
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const quantity = productQuantities[productId] || 1;

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ ...product, quantity: quantity });
    }

    // Reseta o contador do card para 1
    productQuantities[productId] = 1;

    updateCartUI();
    toggleCart(); // Abre o carrinho automaticamente para mostrar o produto
}

// Atualiza a visualização do carrinho (contador e itens)
function updateCartUI() {
    const cartCount = document.getElementById("cartCount");
    const cartItemsContainer = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");

    let totalCount = 0;
    let totalPrice = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `<p class="empty-cart">Seu carrinho está vazio.</p>`;
    } else {
        cartItemsContainer.innerHTML = "";
        cart.forEach((item, index) => {
            totalCount += item.quantity;
            totalPrice += item.price * item.quantity;

            const itemRow = document.createElement("div");
            itemRow.classList.add("cart-item-row");
            itemRow.innerHTML = `
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>${item.quantity}x R$ ${item.price.toFixed(2).replace('.', ',')}</p>
                </div>
                <div class="cart-item-actions">
                    <button onclick="updateCartItemQty(${index}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateCartItemQty(${index}, 1)">+</button>
                </div>
            `;
            cartItemsContainer.appendChild(itemRow);
        });
    }

    cartCount.innerText = totalCount;
    cartTotal.innerText = `R$ ${totalPrice.toFixed(2).replace('.', ',')}`;
}

// Altera quantidade diretamente no carrinho
function updateCartItemQty(index, change) {
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    updateCartUI();
}

// Abre/Fecha o menu lateral do carrinho
function toggleCart() {
    const cartModal = document.getElementById("cartModal");
    cartModal.classList.toggle("open");
}

// Finalizar pedido enviando os dados direto para o WhatsApp
function checkoutWhatsApp() {
    if (cart.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    let message = "Olá! Gostaria de fazer o pedido dos seguintes calçados:%0A%0A";
    let total = 0;

    cart.forEach(item => {
        let subtotal = item.price * item.quantity;
        total += subtotal;
        message += `• ${item.quantity}x ${item.name} - R$ ${subtotal.toFixed(2).replace('.', ',')}%0A`;
    });

    message += `%0A*Total do Pedido: R$ ${total.toFixed(2).replace('.', ',')}*%0A`;
    message += "Aguardando confirmação e instruções de entrega!";

    // Substitua o número abaixo pelo seu WhatsApp com DDD (ex: 5511999999999)
    const phoneNumber = "5500000000000"; 
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
}

// Barra de pesquisa dinâmica
document.getElementById("searchInput").addEventListener("input", (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = products.filter(p => p.name.toLowerCase().includes(term));
    renderProducts(filtered);
});

// Executa na carga inicial
renderProducts(products);
