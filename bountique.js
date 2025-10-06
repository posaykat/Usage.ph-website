let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price) {
    cart.push({ name, price });
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
}

function updateCart() {
    let container = document.getElementById("cart-items");
    if (!container) return;

    container.innerHTML = "";
    cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        container.innerHTML = "<p>Your cart is empty.</p>";
        return;
    }

    let total = 0;
    cart.forEach(item => {
        let div = document.createElement("div");
        div.textContent = item.name + " - ₱" + item.price;
        container.appendChild(div);
        total += item.price;
    });

    let totalDiv = document.createElement("div");
    totalDiv.innerHTML = "<strong>Total: ₱" + total + "</strong>";
    container.appendChild(totalDiv);
}

function clearCart() {
    localStorage.removeItem("cart");
    cart = [];
    updateCart();
}

window.onload = updateCart;t;