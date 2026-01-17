// ============================================================================
// CART LOGIC
// ============================================================================

const cart = {
    items: [],

    load() {
        const storedCart = localStorage.getItem("shopnow_cart");
        if (storedCart) {
            this.items = JSON.parse(storedCart);
        }
        this.render();
    },

    save() {
        localStorage.setItem("shopnow_cart", JSON.stringify(this.items));
    },

    add(product, quantity) {
        const existing = this.items.find((i) => i.id === product.id);
        if (existing) {
            existing.quantity += quantity;
        } else {
            // Only store essential info in the cart
            const { id, name, price } = product;
            this.items.push({ id, name, price, quantity });
        }
        this.save();
        this.render();
    },

    remove(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.save();
        this.render();
    },

    getTotalCount() {
        return this.items.reduce((sum, item) => sum + item.quantity, 0);
    },

    getTotalPrice() {
        return this.items
            .reduce((sum, item) => sum + item.quantity * item.price, 0)
            .toFixed(2);
    },

    render() {
        const cartCountEl = document.getElementById("cart-count");
        const cartItemsEl = document.getElementById("cart-items");
        const cartTotalEl = document.getElementById("cart-total");

        if (cartCountEl) {
            cartCountEl.textContent = this.getTotalCount();
        }

        if (cartItemsEl) {
            cartItemsEl.innerHTML = "";
            if (this.items.length === 0) {
                cartItemsEl.innerHTML = "<li>Your cart is empty.</li>";
            } else {
                this.items.forEach((item) => {
                    const li = document.createElement("li");
                    li.innerHTML = `
                        <span class="cart-item-name">${item.name} (x${item.quantity})</span>
                        <span class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
                        <button class="cart-item-remove" data-id="${item.id}" aria-label="Remove item">&times;</button>
                    `;
                    cartItemsEl.appendChild(li);
                });
            }
        }

        if (cartTotalEl) {
            cartTotalEl.textContent = `$${this.getTotalPrice()}`;
        }
    }
};

// ============================================================================
// CART PANEL UI & EVENT LISTENERS
// ============================================================================

document.addEventListener("DOMContentLoaded", () => {
    const cartToggle = document.getElementById("cart-toggle");
    const cartPanel = document.getElementById("cart-panel");
    const cartClose = document.getElementById("cart-close");
    const overlay = document.getElementById("overlay");
    const cartItemsEl = document.getElementById("cart-items");

    function openCart() {
        if (cartPanel) cartPanel.classList.add("open");
        if (overlay) overlay.classList.add("visible");
    }

    function closeCart() {
        if (cartPanel) cartPanel.classList.remove("open");
        if (overlay) overlay.classList.remove("visible");
    }

    if (cartToggle) {
        cartToggle.addEventListener("click", (e) => {
            e.preventDefault();
            openCart();
        });
    }
    
    // Listener for remove buttons
    if (cartItemsEl) {
        cartItemsEl.addEventListener('click', (e) => {
            if (e.target.classList.contains('cart-item-remove')) {
                const productId = e.target.dataset.id;
                cart.remove(productId);
            }
        });
    }

    if (cartClose) cartClose.addEventListener("click", closeCart);
    if (overlay) overlay.addEventListener("click", closeCart);

    // Initial load of cart data from localStorage
    cart.load();
});
