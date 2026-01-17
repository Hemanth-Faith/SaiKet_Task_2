document.addEventListener("DOMContentLoaded", () => {
    const productGrid = document.querySelector(".product-grid");

    if (productGrid) {
        // The PRODUCTS array is loaded from data.js
        PRODUCTS.forEach(product => {
            const card = document.createElement("a");
            card.href = `${product.page}?id=${product.id}`; // Link to the product's detail page with ID
            card.className = "product-card";

            card.innerHTML = `
                <img src="${product.images.main}" alt="${product.name}" class="product-card-image">
                <div class="product-card-info">
                    <h3 class="product-card-name">${product.name}</h3>
                    <p class="product-card-brand">${product.brand}</p>
                    <p class="product-card-price">$${product.price}</p>
                </div>
            `;

            productGrid.appendChild(card);
        });
    }
});
