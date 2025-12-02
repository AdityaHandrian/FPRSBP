// user-lama.js - Logic untuk halaman User Lama

document.addEventListener('DOMContentLoaded', function() {
    initUserLamaPage();
});

function initUserLamaPage() {
    // Populate user suggestions
    populateUserSuggestions();

    // Event listeners
    const loadHistoryBtn = document.getElementById('loadHistoryBtn');
    const getRecommendationsBtn = document.getElementById('getRecommendationsBtn');
    const userIdInput = document.getElementById('userIdInput');

    loadHistoryBtn.addEventListener('click', handleLoadHistory);
    
    if (getRecommendationsBtn) {
        getRecommendationsBtn.addEventListener('click', handleGetRecommendations);
    }

    // Enter key support
    userIdInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleLoadHistory();
        }
    });
}

// Populate datalist dengan user ID suggestions
function populateUserSuggestions() {
    const datalist = document.getElementById('userSuggestions');
    const suggestions = ['user_001', 'user_002', 'user_003'];
    
    suggestions.forEach(userId => {
        const option = document.createElement('option');
        option.value = userId;
        datalist.appendChild(option);
    });
}

// Handle load user history
async function handleLoadHistory() {
    const userIdInput = document.getElementById('userIdInput');
    const userId = userIdInput.value.trim();

    if (!validateUserId(userId)) return;

    // Show loading
    showLoading('loadingState');
    hideSection('historySection');
    hideSection('emptyState');

    try {
        const response = await getUserHistory(userId);
        
        if (response.success && response.data.history.length > 0) {
            displayUserHistory(response.data.history);
            saveToStorage(StorageKeys.CURRENT_USER, userId);
            saveToStorage(StorageKeys.USER_TYPE, 'existing');
        } else {
            showEmptyState();
        }
    } catch (error) {
        handleApiError(error, 'Gagal memuat riwayat pembelian');
        showEmptyState();
    } finally {
        hideLoading('loadingState');
    }
}

// Display user purchase history
function displayUserHistory(history) {
    const historyGrid = document.getElementById('historyGrid');
    historyGrid.innerHTML = '';

    history.forEach(product => {
        const card = createProductCard(product, { showUserRating: true });
        historyGrid.appendChild(card);
    });

    showSection('historySection');
    scrollToElement('historySection', 100);
}

// Show empty state
function showEmptyState() {
    showSection('emptyState');
    hideSection('historySection');
}

// Handle get recommendations
async function handleGetRecommendations() {
    const userId = getFromStorage(StorageKeys.CURRENT_USER);
    
    if (!userId) {
        showAlert('User ID tidak ditemukan', 'error');
        return;
    }

    // Save to storage and redirect
    saveToStorage(StorageKeys.USER_TYPE, 'existing');
    window.location.href = `recommendations.html?userId=${userId}`;
}
