if (!localStorage.getItem('selectedProducts')) {
    localStorage.setItem('selectedProducts', JSON.stringify([]));
}

document.addEventListener('DOMContentLoaded', () => {
    loadProducts(products);
    updateCart();
});

function loadProducts(productsList) {
    const productsContainer = document.getElementById('product-list');

    productsList.forEach(product => {
        const productElem = createProduct(product);
        productsContainer.append(productElem);
    });
}

function createProduct(product) {
    const productArticle = document.createElement('article');
    productArticle.className = 'product-card';

    const productImage = document.createElement('img');
    productImage.src = product.image;
    productImage.alt = product.title;

    const productTitle = document.createElement('h3');
    productTitle.textContent = product.title;

    const productDescription = document.createElement('p');
    productDescription.textContent = product.description;

    const productPrice = document.createElement('h4');
    productPrice.textContent = `€ ${product.price}`;

    const addToCart = document.createElement('button');
    addToCart.textContent = '+ Add to cart';

    addToCart.addEventListener('click', () => {
        const cartList = JSON.parse(localStorage.getItem('selectedProducts'));
        cartList.push(product);
        localStorage.setItem('selectedProducts', JSON.stringify(cartList));
        updateCart();
    });

    productArticle.append(productImage, productTitle, productDescription, productPrice, addToCart);
    return productArticle;
}

function updateCart() {
    const selectedProducts = JSON.parse(localStorage.getItem('selectedProducts'));
    const cartContainer = document.getElementById('cart-items');

    cartContainer.innerHTML = '';

    selectedProducts.forEach((product, index) => {
        const cartItemElem = createCartItem(product, index);
        cartContainer.append(cartItemElem);
    });

    updateCartTotal(selectedProducts);
}

function createCartItem(product, index) {
    const article = document.createElement('article');
    article.className = 'product-card cart-item'; 

    const productImage = document.createElement('img');
    productImage.src = product.image;
    productImage.alt = product.title;

    const productTitle = document.createElement('h3');
    productTitle.textContent = product.title;

    const productPrice = document.createElement('p');
    productPrice.textContent = `€ ${product.price}`;

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.className = 'remove-btn';

    removeButton.addEventListener('click', () => {
        removeFromCart(index);
    });
    
    article.append(productImage, productTitle, productPrice, removeButton);
    return article;
}

function removeFromCart(productIndex) {
    const selectedProducts = JSON.parse(localStorage.getItem('selectedProducts'));
    selectedProducts.splice(productIndex, 1);
    localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));
    updateCart();
}

function updateCartTotal(selectedProducts) {
    let totalContainer = document.getElementById('cart-total');
    if (!totalContainer) {
        totalContainer = document.createElement('section');
        totalContainer.id = 'cart-total';
        document.getElementById('cart').append(totalContainer);
    }
    
    const totalPrice = selectedProducts.reduce((sum, product) => sum + product.price, 0);
    totalContainer.innerHTML = `<h3>Total: € ${totalPrice.toFixed(2)}</h3>`;
}