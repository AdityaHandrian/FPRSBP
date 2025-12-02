// components.js - Reusable UI Components

// ============================================
// PRODUCT CARD COMPONENT
// ============================================

function createProductCard(product, options = {}) {
    const {
        showPredictedRating = false,
        showCheckbox = false,
        showUserRating = false
    } = options;

    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.productId = product.productId;

    // Product Image (placeholder dengan emoji berdasarkan kategori)
    const categoryEmojis = {
        'Electronics': '📱',
        'Fashion': '👕',
        'Beauty': '💄',
        'Home & Living': '🏠',
        'Toys': '🧸'
    };

    const imageDiv = document.createElement('div');
    imageDiv.className = 'product-image';
    imageDiv.innerHTML = `<span class="product-emoji">${categoryEmojis[product.category] || '📦'}</span>`;
    
    // Checkbox untuk selection (user baru)
    if (showCheckbox) {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'product-checkbox';
        checkbox.dataset.productId = product.productId;
        imageDiv.appendChild(checkbox);
    }

    // Product Info
    const infoDiv = document.createElement('div');
    infoDiv.className = 'product-info';

    // Category Badge
    const categoryBadge = document.createElement('span');
    categoryBadge.className = 'category-badge';
    categoryBadge.textContent = product.category;

    // Product Name
    const name = document.createElement('h3');
    name.className = 'product-name';
    name.textContent = product.name;

    // Rating Display
    const ratingDiv = document.createElement('div');
    ratingDiv.className = 'rating-display';
    
    if (showPredictedRating && product.predictedRating) {
        ratingDiv.innerHTML = `
            <span class="stars">${generateStars(product.predictedRating)}</span>
            <span class="rating-value predicted">${product.predictedRating.toFixed(1)} (Prediksi)</span>
        `;
    } else if (showUserRating && product.userRating) {
        ratingDiv.innerHTML = `
            <span class="stars">${generateStars(product.userRating)}</span>
            <span class="rating-value">${product.userRating.toFixed(1)}</span>
        `;
    } else {
        ratingDiv.innerHTML = `
            <span class="stars">${generateStars(product.averageRating)}</span>
            <span class="rating-value">${product.averageRating.toFixed(1)}</span>
            <span class="review-count">(${product.reviewCount} ulasan)</span>
        `;
    }

    // Action Button
    const button = document.createElement('button');
    button.className = 'btn btn-detail';
    button.textContent = 'Lihat Detail';
    button.onclick = () => viewProductDetail(product.productId);

    // Rating Slider untuk user baru
    let ratingSlider = null;
    if (showCheckbox) {
        ratingSlider = document.createElement('div');
        ratingSlider.className = 'rating-slider hidden';
        ratingSlider.innerHTML = `
            <label>Rating Anda:</label>
            <div class="slider-container">
                <input type="range" min="1" max="5" value="3" step="0.5" class="rating-input" data-product-id="${product.productId}">
                <span class="rating-value-display">3.0</span> ⭐
            </div>
        `;
    }

    // Assemble card
    infoDiv.appendChild(categoryBadge);
    infoDiv.appendChild(name);
    infoDiv.appendChild(ratingDiv);
    if (ratingSlider) infoDiv.appendChild(ratingSlider);
    infoDiv.appendChild(button);

    card.appendChild(imageDiv);
    card.appendChild(infoDiv);

    return card;
}

// ============================================
// STAR RATING GENERATOR
// ============================================

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    let stars = '';
    stars += '⭐'.repeat(fullStars);
    if (hasHalfStar) stars += '✨';
    stars += '☆'.repeat(emptyStars);

    return stars;
}

// ============================================
// REVIEW CARD COMPONENT
// ============================================

function createReviewCard(review) {
    const card = document.createElement('div');
    card.className = 'review-card';

    card.innerHTML = `
        <div class="review-header">
            <div class="reviewer-info">
                <span class="reviewer-name">${maskUserId(review.userId)}</span>
                <span class="review-date">${formatDate(review.date)}</span>
            </div>
            <div class="review-rating">
                ${generateStars(review.rating)} <span class="rating-value">${review.rating}</span>
            </div>
        </div>
        <div class="review-content">
            <p>${review.reviewContent}</p>
        </div>
        <div class="review-footer">
            <span class="like-count">👍 ${review.likeCount} Helpful</span>
        </div>
    `;

    return card;
}

// ============================================
// SENTIMENT BADGE COMPONENT
// ============================================

function createSentimentBadges(sentimentData) {
    const container = document.createElement('div');
    container.className = 'sentiment-badges';

    const sentiments = [
        { label: 'Positive', value: sentimentData.positive, color: 'success', emoji: '😊' },
        { label: 'Neutral', value: sentimentData.neutral, color: 'warning', emoji: '😐' },
        { label: 'Negative', value: sentimentData.negative, color: 'danger', emoji: '😞' }
    ];

    sentiments.forEach(sentiment => {
        const badge = document.createElement('div');
        badge.className = `sentiment-badge sentiment-${sentiment.color}`;
        badge.innerHTML = `
            <span class="sentiment-emoji">${sentiment.emoji}</span>
            <span class="sentiment-label">${sentiment.label}</span>
            <span class="sentiment-value">${(sentiment.value * 100).toFixed(0)}%</span>
        `;
        container.appendChild(badge);
    });

    return container;
}

// ============================================
// LOADING SKELETON
// ============================================

function createSkeletonCard() {
    const card = document.createElement('div');
    card.className = 'product-card skeleton-card';
    card.innerHTML = `
        <div class="skeleton-image"></div>
        <div class="skeleton-info">
            <div class="skeleton-text skeleton-category"></div>
            <div class="skeleton-text skeleton-title"></div>
            <div class="skeleton-text skeleton-rating"></div>
            <div class="skeleton-button"></div>
        </div>
    `;
    return card;
}

function showLoadingSkeletons(container, count = 6) {
    container.innerHTML = '';
    for (let i = 0; i < count; i++) {
        container.appendChild(createSkeletonCard());
    }
}

// ============================================
// ALERT/TOAST COMPONENT
// ============================================

function showAlert(message, type = 'info') {
    // Remove existing alerts
    const existingAlerts = document.querySelectorAll('.alert-toast');
    existingAlerts.forEach(alert => alert.remove());

    const alert = document.createElement('div');
    alert.className = `alert-toast alert-${type}`;
    
    const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };

    alert.innerHTML = `
        <span class="alert-icon">${icons[type]}</span>
        <span class="alert-message">${message}</span>
        <button class="alert-close" onclick="this.parentElement.remove()">×</button>
    `;

    document.body.appendChild(alert);

    // Auto remove after 5 seconds
    setTimeout(() => {
        alert.classList.add('fade-out');
        setTimeout(() => alert.remove(), 300);
    }, 5000);
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function viewProductDetail(productId) {
    window.location.href = `product-detail.html?id=${productId}`;
}

function maskUserId(userId) {
    // Mask user ID for privacy (e.g., user_123 -> u***_123)
    if (userId.includes('_')) {
        const parts = userId.split('_');
        return parts[0].charAt(0) + '***_' + parts[1];
    }
    return userId.substring(0, 1) + '***' + userId.substring(userId.length - 2);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('id-ID', options);
}

// ============================================
// LOADING STATE HELPERS
// ============================================

function showLoading(elementId) {
    const element = document.getElementById(elementId);
    if (element) element.classList.remove('hidden');
}

function hideLoading(elementId) {
    const element = document.getElementById(elementId);
    if (element) element.classList.add('hidden');
}

function showSection(elementId) {
    const element = document.getElementById(elementId);
    if (element) element.classList.remove('hidden');
}

function hideSection(elementId) {
    const element = document.getElementById(elementId);
    if (element) element.classList.add('hidden');
}
