if (!localStorage.getItem('selectedProducts')) {
    localStorage.setItem('selectedProducts', JSON.stringify([]));
}

document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
    fetchCategories();
    updateCart();

    const categorySelect = document.getElementById('category-filter');
    const sortSelect = document.getElementById('sort-filter');
    const searchInput = document.getElementById('search-input');
    const buyButton = document.getElementById('buy-button');

    function applyFiltersAndSorting() {
        const categoryId = categorySelect.value;
        const sortBy = sortSelect.value;
        const searchTerm = searchInput.value;
        fetchProducts(categoryId, sortBy, searchTerm);
    }

    categorySelect.addEventListener('change', applyFiltersAndSorting);
    sortSelect.addEventListener('change', applyFiltersAndSorting);
    searchInput.addEventListener('input', applyFiltersAndSorting);
    buyButton.addEventListener('click', handleBuy);
});

async function fetchProducts(categoryId = 'all', sortBy = 'default', searchTerm = '') {
    let apiUrl = 'https://deisishop.pythonanywhere.com/products/';

    const response = await fetch(apiUrl);
    const allProducts = await response.json();

    let productsToDisplay;

    // category
    if (categoryId === 'all') {
        productsToDisplay = allProducts;
    } else {
        productsToDisplay = allProducts.filter(product => product.category === categoryId);
    }

    // search
    const normalizedSearchTerm = searchTerm.toLowerCase().trim();
    if (normalizedSearchTerm !== '') {
        productsToDisplay = productsToDisplay.filter(product =>
            product.title.toLowerCase().includes(normalizedSearchTerm)
        );
    }

    // sort
    if (sortBy === 'asc') {
        productsToDisplay.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'desc') {
        productsToDisplay.sort((a, b) => b.price - a.price);
    }

    loadProducts(productsToDisplay);
}

async function fetchCategories() {
    const apiUrl = 'https://deisishop.pythonanywhere.com/categories/';
    const filterSelect = document.getElementById('category-filter');

    const response = await fetch(apiUrl);
    const categories = await response.json();
    categories.forEach(category => {
        const option = document.createElement('option');
        option.textContent = category;
        option.value = category;
        filterSelect.append(option);
    });
}

function loadProducts(productsList) {
    const productsContainer = document.getElementById('product-list');
    productsContainer.innerHTML = '';

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
    const totalContainer = document.getElementById('cart-total');
    const totalPrice = selectedProducts.reduce((sum, product) => sum + product.price, 0);
    totalContainer.innerHTML = `<h3>Total: € ${totalPrice}</h3>`;
}

async function handleBuy() {
    const selectedProducts = JSON.parse(localStorage.getItem('selectedProducts'));
    const messageContainer = document.getElementById('checkout-message');

    const productIds = selectedProducts.map(product => product.id);
    const isStudent = document.getElementById('student-checkbox').checked;
    const couponCode = document.getElementById('coupon-input').value;
    const customerName = document.getElementById('name-input').value;

    const apiUrl = 'https://deisishop.pythonanywhere.com/buy/';

    const requestBody = {
        products: productIds,
        student: isStudent,
        coupon: couponCode,
        name: customerName
    };

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
    });

    const data = await response.json();

    messageContainer.innerHTML = `
            <p>${data.message}</p>
            <p><strong>Your Total: € ${data.totalCost}</strong></p>
            <p><strong>Payment Reference: ${data.reference}</strong></p>
        `;
}