// user-baru.js - Logic untuk halaman User Baru

let selectedProducts = new Map(); // Map<productId, {product, rating}>

document.addEventListener('DOMContentLoaded', function() {
    initUserBaruPage();
});

function initUserBaruPage() {
    const startSelectionBtn = document.getElementById('startSelectionBtn');
    const generateRecommendationsBtn = document.getElementById('generateRecommendationsBtn');
    const newUserNameInput = document.getElementById('newUserName');

    startSelectionBtn.addEventListener('click', handleStartSelection);
    generateRecommendationsBtn.addEventListener('click', handleGenerateRecommendations);

    // Enter key support
    newUserNameInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleStartSelection();
        }
    });
}

// Handle start product selection
async function handleStartSelection() {
    const nameInput = document.getElementById('newUserName');
    const userName = nameInput.value.trim();

    if (!validateUserName(userName)) return;

    // Save user name
    saveToStorage(StorageKeys.CURRENT_USER, userName);
    saveToStorage(StorageKeys.USER_TYPE, 'new');

    // Show product selection section
    showSection('productSelectionSection');
    scrollToElement('productSelectionSection', 100);

    // Load products
    await loadProductsForSelection();
}

// Load products for selection
async function loadProductsForSelection() {
    const productsGrid = document.getElementById('productsGrid');
    
    showLoading('productsLoadingState');
    productsGrid.innerHTML = '';

    try {
        const response = await getAllProducts();
        
        if (response.success) {
            displayProductsForSelection(response.data.products);
        }
    } catch (error) {
        handleApiError(error, 'Gagal memuat produk');
    } finally {
        hideLoading('productsLoadingState');
    }
}

// Display products with selection checkboxes
function displayProductsForSelection(products) {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';

    products.forEach(product => {
        const card = createProductCard(product, { showCheckbox: true });
        
        // Add checkbox event listener
        const checkbox = card.querySelector('.product-checkbox');
        const ratingSlider = card.querySelector('.rating-slider');
        const ratingInput = card.querySelector('.rating-input');
        const ratingDisplay = card.querySelector('.rating-value-display');

        checkbox.addEventListener('change', function() {
            handleProductSelection(product, this.checked, ratingSlider);
        });

        // Rating slider event
        if (ratingInput) {
            ratingInput.addEventListener('input', function() {
                ratingDisplay.textContent = parseFloat(this.value).toFixed(1);
                updateProductRating(product.productId, parseFloat(this.value));
            });
        }

        productsGrid.appendChild(card);
    });
}

// Handle product selection
function handleProductSelection(product, isChecked, ratingSlider) {
    if (isChecked) {
        selectedProducts.set(product.productId, {
            product: product,
            rating: 3.0 // Default rating
        });
        ratingSlider.classList.remove('hidden');
    } else {
        selectedProducts.delete(product.productId);
        ratingSlider.classList.add('hidden');
    }

    updateSelectionStats();
}

// Update product rating
function updateProductRating(productId, rating) {
    if (selectedProducts.has(productId)) {
        const item = selectedProducts.get(productId);
        item.rating = rating;
        selectedProducts.set(productId, item);
    }
}

// Update selection statistics
function updateSelectionStats() {
    const count = selectedProducts.size;
    const selectedCountEl = document.getElementById('selectedCount');
    const generateBtn = document.getElementById('generateRecommendationsBtn');

    selectedCountEl.textContent = count;

    // Enable/disable button based on selection
    if (count >= 5) {
        enableButton('generateRecommendationsBtn');
        generateBtn.classList.add('pulse');
    } else {
        disableButton('generateRecommendationsBtn');
        generateBtn.classList.remove('pulse');
    }
}

// Handle generate recommendations
async function handleGenerateRecommendations() {
    const userName = getFromStorage(StorageKeys.CURRENT_USER);
    
    if (!validateProductSelection(Array.from(selectedProducts.values()), 5)) {
        return;
    }

    // Prepare selected products data
    const selectedProductsData = Array.from(selectedProducts.values()).map(item => ({
        productId: item.product.productId,
        itemId: item.product.itemId,
        rating: item.rating
    }));

    // Save to storage
    saveToStorage(StorageKeys.SELECTED_PRODUCTS, selectedProductsData);

    // Redirect to recommendations page
    window.location.href = `recommendations.html?userName=${encodeURIComponent(userName)}`;
}
