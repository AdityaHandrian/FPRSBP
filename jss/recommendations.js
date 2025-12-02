// recommendations.js - Logic untuk halaman Rekomendasi

document.addEventListener('DOMContentLoaded', function() {
    initRecommendationsPage();
});

async function initRecommendationsPage() {
    const userId = getUrlParameter('userId');
    const userName = getUrlParameter('userName');
    const userType = getFromStorage(StorageKeys.USER_TYPE);

    // Display user info
    displayUserInfo(userId, userName, userType);

    // Load recommendations based on user type
    if (userType === 'existing' && userId) {
        await loadExistingUserRecommendations(userId);
    } else if (userType === 'new' && userName) {
        await loadNewUserRecommendations(userName);
    } else {
        showEmptyState();
    }
}

// Display user information
function displayUserInfo(userId, userName, userType) {
    const userInfoEl = document.getElementById('userInfo');
    
    if (userType === 'existing') {
        userInfoEl.innerHTML = `👤 User ID: <strong>${userId}</strong>`;
    } else {
        userInfoEl.innerHTML = `✨ Halo, <strong>${userName}</strong>!`;
    }
}

// Load recommendations for existing user
async function loadExistingUserRecommendations(userId) {
    showLoading('loadingState');
    hideSection('recommendationsSection');
    hideSection('emptyState');

    try {
        const response = await getUserRecommendations(userId);
        
        if (response.success && response.data.recommendations.length > 0) {
            displayRecommendations(response.data.recommendations);
            saveToStorage(StorageKeys.RECOMMENDATIONS, response.data.recommendations);
        } else {
            showEmptyState();
        }
    } catch (error) {
        handleApiError(error, 'Gagal memuat rekomendasi');
        showEmptyState();
    } finally {
        hideLoading('loadingState');
    }
}

// Load recommendations for new user
async function loadNewUserRecommendations(userName) {
    const selectedProducts = getFromStorage(StorageKeys.SELECTED_PRODUCTS);
    
    if (!selectedProducts || selectedProducts.length === 0) {
        showAlert('Data produk tidak ditemukan', 'error');
        showEmptyState();
        return;
    }

    showLoading('loadingState');
    hideSection('recommendationsSection');
    hideSection('emptyState');

    try {
        const response = await getNewUserRecommendations(userName, selectedProducts);
        
        if (response.success && response.data.recommendations.length > 0) {
            displayRecommendations(response.data.recommendations);
            saveToStorage(StorageKeys.RECOMMENDATIONS, response.data.recommendations);
        } else {
            showEmptyState();
        }
    } catch (error) {
        handleApiError(error, 'Gagal menghasilkan rekomendasi');
        showEmptyState();
    } finally {
        hideLoading('loadingState');
    }
}

// Display recommendations grid
function displayRecommendations(recommendations) {
    const recommendationsGrid = document.getElementById('recommendationsGrid');
    recommendationsGrid.innerHTML = '';

    recommendations.forEach(product => {
        const card = createProductCard(product, { showPredictedRating: true });
        recommendationsGrid.appendChild(card);
    });

    showSection('recommendationsSection');
    scrollToTop();
}

// Show empty state
function showEmptyState() {
    hideLoading('loadingState');
    hideSection('recommendationsSection');
    showSection('emptyState');
}
