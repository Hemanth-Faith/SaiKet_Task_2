// This script is specific to the product detail page (index.html)

document.addEventListener("DOMContentLoaded", () => {
    // The PRODUCTS array is loaded from data.js
    // The cart object is loaded from cart.js

    // --- DYNAMIC PRODUCT LOADING ---
    // Get product ID from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    // Find the product to display
    let currentProduct;
    if (productId) {
        currentProduct = PRODUCTS.find(p => p.id === productId);
    }
    
    // If no ID in URL or product not found, default to the first product
    if (!currentProduct) {
        currentProduct = PRODUCTS[0];
    }

    // --- Selectors for this page ---
    const qtyInput = document.getElementById("quantity");
    const btnMinus = document.getElementById("qty-minus");
    const btnPlus = document.getElementById("qty-plus");
    const addToCartBtn = document.getElementById("add-to-cart");
    const feedbackEl = document.getElementById("cart-feedback");
    const mainImage = document.getElementById("main-image");
    const thumbnailRow = document.querySelector(".thumbnail-row");

    // --- RENDER PRODUCT ---
    function renderProduct(product) {
        if (!product) {
            console.error("Product not found.");
            document.querySelector('.product-page').innerHTML = '<h1>Product not found</h1><p>Please return to the <a href="home.html">home page</a>.</p>';
            return;
        }

        document.title = `${product.name} | ShopNow`;
        document.querySelector(".product-title").textContent = product.name;
        document.querySelector(".product-brand").textContent = `Brand: ${product.brand}`;
        document.querySelector(".product-price").textContent = `$${product.price}`;
        document.querySelector(".product-old-price").textContent = `$${product.oldPrice}`;
        document.querySelector(".product-discount").textContent = product.discount;
        document.querySelector(".product-description").textContent = product.description;
        
        const featuresEl = document.querySelector(".product-features");
        featuresEl.innerHTML = "";
        product.features.forEach(feature => {
            const li = document.createElement("li");
            li.textContent = feature;
            featuresEl.appendChild(li);
        });

        mainImage.src = product.images.main;
        
        thumbnailRow.innerHTML = "";
        // Use the main image as the first thumbnail if thumbnails array is empty
        const thumbnails = product.images.thumbnails.length > 0 ? product.images.thumbnails : [product.images.main];
        thumbnails.forEach((thumbSrc, index) => {
            const thumb = document.createElement("img");
            thumb.classList.add("thumb");
            if (index === 0) thumb.classList.add("active");
            thumb.src = thumbSrc;
            thumb.alt = `thumbnail ${index + 1}`;
            thumb.dataset.large = thumbSrc;
            thumbnailRow.appendChild(thumb);
        });
    }

    // --- EVENT LISTENERS ---

    // Quantity controls
    btnMinus.addEventListener("click", () => {
        const current = parseInt(qtyInput.value, 10) || 1;
        qtyInput.value = Math.max(1, current - 1);
    });

    btnPlus.addEventListener("click", () => {
        const current = parseInt(qtyInput.value, 10) || 1;
        qtyInput.value = current + 1;
    });

    qtyInput.addEventListener("input", () => {
        let value = parseInt(qtyInput.value, 10);
        if (isNaN(value) || value < 1) value = 1;
        qtyInput.value = value;
    });

    // Add to cart
    addToCartBtn.addEventListener("click", () => {
        const quantity = parseInt(qtyInput.value, 10) || 1;
        cart.add(currentProduct, quantity); // cart object is global from cart.js

        feedbackEl.textContent = `${quantity} item${quantity > 1 ? "s" : ""} added to cart.`;
        addToCartBtn.disabled = true;
        addToCartBtn.textContent = "Added!";

        setTimeout(() => {
            addToCartBtn.disabled = false;
            addToCartBtn.textContent = "Add to Cart";
            feedbackEl.textContent = "";
        }, 1500);
    });

    // Gallery thumbnails (using event delegation)
    thumbnailRow.addEventListener("click", (e) => {
        if (e.target.classList.contains("thumb")) {
            const thumb = e.target;
            mainImage.src = thumb.dataset.large;

            // Update active state
            const currentActive = thumbnailRow.querySelector(".thumb.active");
            if (currentActive) currentActive.classList.remove("active");
            thumb.classList.add("active");
        }
    });

    // --- INITIALIZATION ---
    renderProduct(currentProduct);
});