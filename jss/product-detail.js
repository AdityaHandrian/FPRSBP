// product-detail.js - Logic untuk halaman Detail Produk

document.addEventListener('DOMContentLoaded', function() {
    initProductDetailPage();
});

async function initProductDetailPage() {
    const productId = getUrlParameter('id');

    if (!productId) {
        showErrorState();
        return;
    }

    await loadProductDetail(productId);
}

// Load product detail
async function loadProductDetail(productId) {
    showLoading('loadingState');
    hideSection('productDetailSection');
    hideSection('errorState');

    try {
        // Load product detail and sentiment in parallel
        const [detailResponse, sentimentResponse] = await Promise.all([
            getProductDetail(productId),
            getProductSentiment(productId)
        ]);

        if (detailResponse.success && detailResponse.data.product) {
            displayProductDetail(
                detailResponse.data.product,
                detailResponse.data.reviews,
                sentimentResponse.success ? sentimentResponse.data.sentiment : null
            );
        } else {
            showErrorState();
        }
    } catch (error) {
        handleApiError(error, 'Gagal memuat detail produk');
        showErrorState();
    } finally {
        hideLoading('loadingState');
    }
}

// Display product detail
function displayProductDetail(product, reviews, sentiment) {
    // Product image
    const categoryEmojis = {
        'Electronics': '📱',
        'Fashion': '👕',
        'Beauty': '💄',
        'Home & Living': '🏠',
        'Toys': '🧸'
    };

    document.getElementById('productImage').innerHTML = 
        `<span class="product-emoji-large">${categoryEmojis[product.category] || '📦'}</span>`;

    // Category
    document.getElementById('productCategory').textContent = product.category;

    // Name
    document.getElementById('productName').textContent = product.name;

    // Rating
    document.getElementById('productRating').innerHTML = `
        <span class="stars">${generateStars(product.averageRating)}</span>
        <span class="rating-value">${product.averageRating.toFixed(1)}</span>
        <span class="review-count">(${product.reviewCount} ulasan)</span>
    `;

    // Description
    document.getElementById('productDescription').textContent = product.description;

    // Sentiment badges
    if (sentiment) {
        const sentimentContainer = document.getElementById('sentimentBadges');
        sentimentContainer.innerHTML = '';
        sentimentContainer.appendChild(createSentimentBadges(sentiment));
    }

    // Reviews
    displayReviews(reviews);

    // Show section
    showSection('productDetailSection');
    scrollToTop();
}

// Display reviews
function displayReviews(reviews) {
    const reviewsContainer = document.getElementById('reviewsContainer');
    reviewsContainer.innerHTML = '';

    if (reviews && reviews.length > 0) {
        reviews.forEach(review => {
            const reviewCard = createReviewCard(review);
            reviewsContainer.appendChild(reviewCard);
        });
    } else {
        reviewsContainer.innerHTML = '<p class="no-reviews">Belum ada ulasan untuk produk ini</p>';
    }
}

// Show error state
function showErrorState() {
    hideLoading('loadingState');
    hideSection('productDetailSection');
    showSection('errorState');
}
