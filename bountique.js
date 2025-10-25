let cart = JSON.parse(localStorage.getItem("cart")) || [];


function addToCart(name, ...rest) {
    let priceStr = rest.join('');
    let price = Number(String(priceStr).replace(/[^0-9]/g, '')) || 0;

    try {
        const active = document.activeElement;
        if (active && active.closest) {
            const card = active.closest('.card');
            if (card) {
                const sizeEl = card.querySelector('.size-select');
                if (sizeEl && sizeEl.value) {
                    name = name + ' (' + sizeEl.value + ')';
                }
            }
        }
    } catch (err) {
    }

    cart.push({ name, price });
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
    updateCartCount();
    openCart();
}


function injectShoeSizes() {
    const shoesSection = document.querySelector('section#shoes');
    const sandalsSection = document.querySelector('section#sandals');
    if (!shoesSection && !sandalsSection) return;


    const shoeSizes = ['Size', '35', '36', '37', '38', '39', '40', '41'];
    const sandalSizes = ['Size', '36', '37', '38', '39', '40', '41', '42'];


    function addSizeSelect(cards, sizes) {
        cards.forEach(card => {
            const pad = card.querySelector('.pad');
            if (!pad) return;

            if (pad.querySelector('.size-select')) return;

            const select = document.createElement('select');
            select.className = 'size-select';

            sizes.forEach(size => {
                const opt = document.createElement('option');
                opt.value = size === 'Size' ? '' : size;
                opt.textContent = size;
                select.appendChild(opt);
            });

            pad.appendChild(select);
        });
    }

    if (shoesSection) {
        const shoeCards = shoesSection.querySelectorAll('.card');
        addSizeSelect(shoeCards, shoeSizes);
    }

    if (sandalsSection) {
        const sandalCards = sandalsSection.querySelectorAll('.card');
        addSizeSelect(sandalCards, sandalSizes);
    }
}


function updateCart() {
    let container = document.getElementById("cart-items");
    if (!container) return;

    container.innerHTML = "";
    cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {

        container.innerHTML = "";
        return;
    }

    let total = 0;
    cart.forEach((item, idx) => {
        let div = document.createElement("div");
        div.className = 'cart-item';
        div.innerHTML = `
            <span class="ci-name">${item.name}</span>
            <span class="ci-price">₱${item.price}</span>
            <button class="ci-remove" onclick="removeItem(${idx})">X</button>
        `;
        container.appendChild(div);
        total += item.price;
    });

    let totalDiv = document.createElement("div");
    totalDiv.className = 'cart-total';
    totalDiv.innerHTML = "<strong>Total: ₱" + total + "</strong>";
    container.appendChild(totalDiv);
}

function removeItem(index) {
    cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (index < 0 || index >= cart.length) return;
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
    updateCartCount();
    if (typeof renderCheckout === 'function') renderCheckout();
}

function clearCart() {
    localStorage.removeItem("cart");
    cart = [];
    updateCart();
    updateCartCount();
    if (typeof renderCheckout === 'function') renderCheckout();
}

function openCart() {
    const el = document.querySelector('.cart-sidebar');
    if (el) el.classList.add('active');
}

function closeCart() {
    const el = document.querySelector('.cart-sidebar');
    if (el) el.classList.remove('active');
}

function updateCartCount() {
    const count = (JSON.parse(localStorage.getItem('cart')) || []).length;
    const el = document.getElementById('cart-count');
    if (el) el.textContent = count;
}

function renderCheckout() {
    const container = document.getElementById('checkout-items');
    if (!container) return;
    const c = JSON.parse(localStorage.getItem('cart')) || [];
    container.innerHTML = '';
    if (c.length === 0) {
        container.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }
    let total = 0;
    c.forEach((item, idx) => {
        const row = document.createElement('div');
        row.className = 'checkout-row';
        row.innerHTML = `<div class="co-name">${item.name}</div><div class="co-price">₱${item.price}</div><div class="co-actions"><button onclick="removeItem(${idx})">Delete</button></div>`;
        container.appendChild(row);
        total += item.price;
    });
    const t = document.createElement('div');
    t.className = 'checkout-total';
    t.innerHTML = `<strong>Total: ₱${total}</strong>`;
    container.appendChild(t);
}

window.addEventListener('load', () => {

    updateCart();
    updateCartCount();

    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        cartIcon.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector('.cart-sidebar').classList.toggle('active');
        });
    }

    const categoryToggle = document.querySelector('.category-toggle');
    if (categoryToggle) {
        categoryToggle.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector('.nav-sidebar').classList.toggle('active');
        });
    }

    const categoryLinks = document.querySelectorAll('.category-nav a');
    categoryLinks.forEach(link => {
        link.addEventListener('click', function() {
            document.querySelector('.nav-sidebar').classList.remove('active');
        });
    });


    if (document.getElementById('checkout-items')) {
        renderCheckout();
    }

    injectShoeSizes();
});