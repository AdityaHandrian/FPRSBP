// utils.js - Utility Helper Functions

// ============================================
// LOCAL STORAGE HELPERS
// ============================================

const StorageKeys = {
    CURRENT_USER: 'current_user',
    USER_TYPE: 'user_type',
    SELECTED_PRODUCTS: 'selected_products',
    RECOMMENDATIONS: 'recommendations'
};

function saveToStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (error) {
        console.error('Error saving to localStorage:', error);
        return false;
    }
}

function getFromStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Error reading from localStorage:', error);
        return null;
    }
}

function removeFromStorage(key) {
    try {
        localStorage.removeItem(key);
        return true;
    } catch (error) {
        console.error('Error removing from localStorage:', error);
        return false;
    }
}

function clearAllStorage() {
    try {
        localStorage.clear();
        return true;
    } catch (error) {
        console.error('Error clearing localStorage:', error);
        return false;
    }
}

// ============================================
// URL PARAMETER HELPERS
// ============================================

function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

function setUrlParameter(name, value) {
    const url = new URL(window.location.href);
    url.searchParams.set(name, value);
    window.history.pushState({}, '', url);
}

// ============================================
// VALIDATION HELPERS
// ============================================

function validateUserId(userId) {
    if (!userId || userId.trim() === '') {
        showAlert('User ID tidak boleh kosong', 'error');
        return false;
    }
    return true;
}

function validateUserName(userName) {
    if (!userName || userName.trim() === '') {
        showAlert('Nama tidak boleh kosong', 'error');
        return false;
    }
    if (userName.trim().length < 3) {
        showAlert('Nama harus minimal 3 karakter', 'error');
        return false;
    }
    return true;
}

function validateProductSelection(selectedProducts, minCount = 5) {
    if (selectedProducts.length < minCount) {
        showAlert(`Pilih minimal ${minCount} produk untuk melanjutkan`, 'warning');
        return false;
    }
    return true;
}

// ============================================
// DEBOUNCE FUNCTION
// ============================================

function debounce(func, wait = 300) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ============================================
// SCROLL HELPERS
// ============================================

function scrollToTop(smooth = true) {
    window.scrollTo({
        top: 0,
        behavior: smooth ? 'smooth' : 'auto'
    });
}

function scrollToElement(elementId, offset = 0) {
    const element = document.getElementById(elementId);
    if (element) {
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
            top: elementPosition - offset,
            behavior: 'smooth'
        });
    }
}

// ============================================
// ARRAY HELPERS
// ============================================

function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function getRandomItems(array, count) {
    const shuffled = shuffleArray(array);
    return shuffled.slice(0, count);
}

// ============================================
// NUMBER FORMATTING
// ============================================

function formatNumber(num) {
    return new Intl.NumberFormat('id-ID').format(num);
}

function formatPrice(price) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(price);
}

// ============================================
// ERROR HANDLING
// ============================================

function handleApiError(error, defaultMessage = 'Terjadi kesalahan') {
    console.error('API Error:', error);
    showAlert(error.message || defaultMessage, 'error');
}

// ============================================
// FORM HELPERS
// ============================================

function disableButton(buttonId) {
    const button = document.getElementById(buttonId);
    if (button) {
        button.disabled = true;
        button.classList.add('disabled');
    }
}

function enableButton(buttonId) {
    const button = document.getElementById(buttonId);
    if (button) {
        button.disabled = false;
        button.classList.remove('disabled');
    }
}

function toggleButton(buttonId, enable) {
    if (enable) {
        enableButton(buttonId);
    } else {
        disableButton(buttonId);
    }
}
