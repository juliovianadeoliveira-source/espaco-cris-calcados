/* Espaço Cris Calçados — vitrine + carrinho
 * Produtos e imagens carregados do Supabase.
 */
const SUPABASE_URL = "https://nnhljxmmrqekoxcapdkm.supabase.co";
const SUPABASE_KEY = "sb_publishable_mPNEE_t2HTfU5f2rUDwrig_u9ls7HrE";

let products = [];
let cart = [];
let productQuantities = {};
let selectedSizes = {};

const money = value =>
    Number(value || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

function saveCart() {
    sessionStorage.setItem("espaco_cris_cart", JSON.stringify(cart));
}

function loadCart() {
    try {
        const saved = JSON.parse(sessionStorage.getItem("espaco_cris_cart") || "[]");
        cart = Array.isArray(saved) ? saved : [];
    } catch {
        cart = [];
    }
}

async function carregarProdutos() {
    const url =
        `${SUPABASE_URL}/rest/v1/produtos` +
        `?select=id,nome,preco,preco_promocional,destaque,produto_imagens(url,ordem)` +
        `&ativo=eq.true&order=destaque.desc,created_at.desc`;

    try {
        const response = await fetch(url, {
            headers: {
                apikey: SUPABASE_KEY,
                Authorization: `Bearer ${SUPABASE_KEY}`
            }
        });

        if (!response.ok) throw new Error(`Supabase HTTP ${response.status}`);

        const data = await response.json();

        products = data.map(p => {
            const imagens = Array.isArray(p.produto_imagens)
                ? [...p.produto_imagens].sort((a, b) => (a.ordem || 0) - (b.ordem || 0))
                : [];
            const regular = Number(p.preco || 0);
            const promo = Number(p.preco_promocional || 0);
            const price = promo > 0 && promo < regular ? promo : regular;
            return {
                id: p.id,
                name: p.nome,
                price,
                image: imagens[0]?.url || "https://via.placeholder.com/600x600?text=Espa%C3%A7o+Cris",
                installment: "Consulte as condições de pagamento"
            };
        });

        renderProducts(products);
    } catch (error) {
        console.error("Erro ao carregar produtos:", error);
        const grid = document.getElementById("productsGrid");
        if (grid) {
            grid.innerHTML = `
                <div style="grid-column:1/-1;padding:30px;text-align:center">
                    <h3>Não foi possível carregar a vitrine</h3>
                    <p>Atualize a página para tentar novamente.</p>
                </div>`;
        }
    }
}

function renderProducts(itemsToRender) {
    const grid = document.getElementById("productsGrid");
    if (!grid) return;
    grid.innerHTML = "";

    itemsToRender.forEach(product => {
        const qty = productQuantities[product.id] || 1;
        const size = selectedSizes[product.id] || "";
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy"
                 onerror="this.src='https://via.placeholder.com/600x600?text=Imagem'">
            <div class="product-info">
                <h4 class="product-title">${product.name}</h4>
                <div class="product-price">${money(product.price)}</div>
                <div class="product-installment">${product.installment}</div>
                <label style="display:block;margin:10px 0 6px;font-size:13px">Numeração</label>
                <select id="size-${product.id}" onchange="selecionarTamanho('${product.id}', this.value)" style="width:100%;padding:8px;border-radius:6px">
                    <option value="">Escolha o tamanho</option>
                    ${[34,35,36,37,38,39,40].map(n => `<option value="${n}" ${String(size) === String(n) ? "selected" : ""}>${n}</option>`).join("")}
                </select>
                <div class="quantity-control">
                    <button onclick="changeCardQty('${product.id}', -1)">-</button>
                    <span>${qty} par(es)</span>
                    <button onclick="changeCardQty('${product.id}', 1)">+</button>
                </div>
                <button class="add-to-cart-btn" onclick="addToCart('${product.id}')">Adicionar ao Carrinho</button>
            </div>`;
        grid.appendChild(card);
    });
}

function selecionarTamanho(productId, size) { selectedSizes[productId] = size; }

function changeCardQty(productId, change) {
    productQuantities[productId] = Math.max(1, (productQuantities[productId] || 1) + change);
    renderProducts(products);
}

function addToCart(productId) {
    const product = products.find(p => String(p.id) === String(productId));
    if (!product) return;
    const size = selectedSizes[productId];
    if (!size) return alert("Escolha a numeração antes de adicionar o produto.");
    const quantity = productQuantities[productId] || 1;
    const existingItem = cart.find(item => String(item.id) === String(productId) && String(item.size) === String(size));
    if (existingItem) existingItem.quantity = Math.min(20, existingItem.quantity + quantity);
    else cart.push({ ...product, size, quantity });
    productQuantities[productId] = 1;
    selectedSizes[productId] = "";
    saveCart();
    updateCartUI();
    toggleCart();
}

function updateCartUI() {
    const cartCount = document.getElementById("cartCount");
    const cartItemsContainer = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");
    if (!cartItemsContainer || !cartTotal) return;
    let totalCount = 0, totalPrice = 0;
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `<p class="empty-cart">Seu carrinho está vazio.</p>`;
    } else {
        cartItemsContainer.innerHTML = "";
        cart.forEach((item, index) => {
            totalCount += item.quantity;
            totalPrice += item.price * item.quantity;
            const itemRow = document.createElement("div");
            itemRow.className = "cart-item-row";
            itemRow.innerHTML = `
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>${item.quantity}x ${money(item.price)} — Tam. ${item.size}</p>
                </div>
                <div class="cart-item-actions">
                    <button aria-label="Diminuir quantidade" onclick="updateCartItemQty(${index}, -1)">−</button>
                    <span>${item.quantity}</span>
                    <button aria-label="Aumentar quantidade" onclick="updateCartItemQty(${index}, 1)">+</button>
                    <button aria-label="Remover produto" class="cart-remove" onclick="removeCartItem(${index})">×</button>
                </div>`;
            cartItemsContainer.appendChild(itemRow);
        });
    }
    if (cartCount) cartCount.innerText = totalCount;
    cartTotal.innerText = money(totalPrice);
}

function updateCartItemQty(index, change) {
    if (!cart[index]) return;
    cart[index].quantity = Math.min(20, cart[index].quantity + change);
    if (cart[index].quantity <= 0) cart.splice(index, 1);
    saveCart();
    updateCartUI();
}

function removeCartItem(index) {
    if (!cart[index]) return;
    cart.splice(index, 1);
    saveCart();
    updateCartUI();
}

function toggleCart() {
    const cartModal = document.getElementById("cartModal");
    if (cartModal) cartModal.classList.toggle("open");
}

function checkoutWhatsApp() {
    if (cart.length === 0) return alert("Seu carrinho está vazio!");
    saveCart();
    window.location.href = "checkout.html?carrinho=1";
}

function closePopup() {
    const cartModal = document.getElementById("cartModal");
    if (cartModal) cartModal.classList.remove("open");
}

function rolarGrid(direcao) {
    const grid = document.getElementById("productsGrid");
    if (!grid) return;
    grid.scrollBy({ left: direcao * 320, behavior: "smooth" });
}

document.addEventListener("DOMContentLoaded", () => {
    loadCart();
    const searchInput = document.getElementById("searchInput");
    if (searchInput) searchInput.addEventListener("input", event => {
        const term = event.target.value.toLowerCase().trim();
        renderProducts(products.filter(product => product.name.toLowerCase().includes(term)));
    });
    carregarProdutos();
    updateCartUI();
});
