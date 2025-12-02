// api.js - Mock API dengan struktur fetch yang siap diintegrasikan

const API_BASE_URL = '/api'; // Ganti dengan URL backend real
const MOCK_MODE = true; // Set false untuk menggunakan API real

// ============================================
// MOCK DATA (Sample dari Lazada Dataset)
// ============================================

const MOCK_PRODUCTS = [
    {
        productId: 1,
        itemId: 'ITEM001',
        name: 'Samsung Galaxy S21 Ultra 5G',
        category: 'Electronics',
        averageRating: 4.8,
        reviewCount: 1245,
        description: 'Smartphone flagship dengan kamera 108MP dan layar AMOLED 120Hz',
        likeCount: 890
    },
    {
        productId: 2,
        itemId: 'ITEM002',
        name: 'Sony WH-1000XM4 Wireless Headphones',
        category: 'Electronics',
        averageRating: 4.9,
        reviewCount: 867,
        description: 'Headphone noise cancelling terbaik dengan kualitas audio premium',
        likeCount: 654
    },
    {
        productId: 3,
        itemId: 'ITEM003',
        name: 'Nike Air Zoom Pegasus Running Shoes',
        category: 'Fashion',
        averageRating: 4.6,
        reviewCount: 432,
        description: 'Sepatu lari dengan teknologi Zoom Air untuk kenyamanan maksimal',
        likeCount: 321
    },
    {
        productId: 4,
        itemId: 'ITEM004',
        name: 'Maybelline Superstay Matte Ink Lipstick',
        category: 'Beauty',
        averageRating: 4.7,
        reviewCount: 2341,
        description: 'Lipstik matte long-lasting hingga 16 jam',
        likeCount: 1876
    },
    {
        productId: 5,
        itemId: 'ITEM005',
        name: 'Philips Air Fryer XXL',
        category: 'Home & Living',
        averageRating: 4.8,
        reviewCount: 1567,
        description: 'Air fryer berkapasitas besar untuk memasak sehat tanpa minyak',
        likeCount: 1234
    },
    {
        productId: 6,
        itemId: 'ITEM006',
        name: 'LEGO Star Wars Millennium Falcon',
        category: 'Toys',
        averageRating: 4.9,
        reviewCount: 789,
        description: 'Set LEGO koleksi dengan 7500+ pieces',
        likeCount: 567
    },
    {
        productId: 7,
        itemId: 'ITEM007',
        name: 'Apple iPad Pro 12.9 inch M1',
        category: 'Electronics',
        averageRating: 4.9,
        reviewCount: 934,
        description: 'Tablet profesional dengan chip M1 dan layar Liquid Retina XDR',
        likeCount: 789
    },
    {
        productId: 8,
        itemId: 'ITEM008',
        name: 'Adidas Ultraboost 21 Sneakers',
        category: 'Fashion',
        averageRating: 4.7,
        reviewCount: 612,
        description: 'Sneakers dengan teknologi Boost untuk energi return maksimal',
        likeCount: 445
    },
    {
        productId: 9,
        itemId: 'ITEM009',
        name: 'Loreal Paris Revitalift Serum',
        category: 'Beauty',
        averageRating: 4.6,
        reviewCount: 1823,
        description: 'Serum anti-aging dengan Hyaluronic Acid dan Vitamin C',
        likeCount: 1456
    },
    {
        productId: 10,
        itemId: 'ITEM010',
        name: 'IKEA KALLAX Storage Unit',
        category: 'Home & Living',
        averageRating: 4.5,
        reviewCount: 2134,
        description: 'Unit penyimpanan serbaguna dengan desain minimalis',
        likeCount: 1678
    },
    {
        productId: 11,
        itemId: 'ITEM011',
        name: 'Hot Wheels Track Builder Mega Set',
        category: 'Toys',
        averageRating: 4.8,
        reviewCount: 456,
        description: 'Set lintasan Hot Wheels dengan 50+ konfigurasi',
        likeCount: 345
    },
    {
        productId: 12,
        itemId: 'ITEM012',
        name: 'Canon EOS R5 Mirrorless Camera',
        category: 'Electronics',
        averageRating: 4.9,
        reviewCount: 312,
        description: 'Kamera mirrorless full-frame dengan video 8K',
        likeCount: 267
    },
    {
        productId: 13,
        itemId: 'ITEM013',
        name: 'Zara Slim Fit Blazer',
        category: 'Fashion',
        averageRating: 4.4,
        reviewCount: 876,
        description: 'Blazer formal dengan potongan slim fit modern',
        likeCount: 654
    },
    {
        productId: 14,
        itemId: 'ITEM014',
        name: 'The Ordinary Niacinamide Serum',
        category: 'Beauty',
        averageRating: 4.7,
        reviewCount: 3456,
        description: 'Serum untuk mengurangi pori-pori dan mencerahkan kulit',
        likeCount: 2890
    },
    {
        productId: 15,
        itemId: 'ITEM015',
        name: 'Dyson V11 Cordless Vacuum',
        category: 'Home & Living',
        averageRating: 4.8,
        reviewCount: 1123,
        description: 'Vacuum cleaner cordless dengan teknologi intelligent sensor',
        likeCount: 987
    }
];

const MOCK_REVIEWS = [
    {
        userId: 'user_789',
        rating: 5,
        reviewContent: 'Produk sangat bagus! Kualitas premium dan pengiriman cepat.',
        likeCount: 45,
        date: '2025-11-15'
    },
    {
        userId: 'user_456',
        rating: 4,
        reviewContent: 'Sesuai deskripsi, packing rapih. Recommended!',
        likeCount: 32,
        date: '2025-11-10'
    },
    {
        userId: 'user_123',
        rating: 5,
        reviewContent: 'Worth it banget! Bakal order lagi.',
        likeCount: 67,
        date: '2025-11-05'
    },
    {
        userId: 'user_234',
        rating: 3,
        reviewContent: 'Produk oke, tapi pengiriman agak lama.',
        likeCount: 12,
        date: '2025-10-28'
    },
    {
        userId: 'user_567',
        rating: 5,
        reviewContent: 'Excellent! Exactly what I needed.',
        likeCount: 89,
        date: '2025-10-20'
    }
];

const MOCK_USER_HISTORY = {
    'user_001': [
        { ...MOCK_PRODUCTS[0], purchaseDate: '2025-10-15', userRating: 5 },
        { ...MOCK_PRODUCTS[3], purchaseDate: '2025-09-20', userRating: 4 },
        { ...MOCK_PRODUCTS[6], purchaseDate: '2025-08-10', userRating: 5 }
    ],
    'user_002': [
        { ...MOCK_PRODUCTS[2], purchaseDate: '2025-11-01', userRating: 4 },
        { ...MOCK_PRODUCTS[7], purchaseDate: '2025-10-05', userRating: 5 },
        { ...MOCK_PRODUCTS[12], purchaseDate: '2025-09-15', userRating: 4 }
    ],
    'user_003': [
        { ...MOCK_PRODUCTS[4], purchaseDate: '2025-10-20', userRating: 5 },
        { ...MOCK_PRODUCTS[9], purchaseDate: '2025-09-30', userRating: 4 },
        { ...MOCK_PRODUCTS[14], purchaseDate: '2025-08-25', userRating: 5 }
    ]
};

const MOCK_RECOMMENDATIONS = [
    { ...MOCK_PRODUCTS[1], predictedRating: 4.7, confidence: 0.89 },
    { ...MOCK_PRODUCTS[4], predictedRating: 4.8, confidence: 0.92 },
    { ...MOCK_PRODUCTS[8], predictedRating: 4.6, confidence: 0.85 },
    { ...MOCK_PRODUCTS[11], predictedRating: 4.9, confidence: 0.94 },
    { ...MOCK_PRODUCTS[13], predictedRating: 4.5, confidence: 0.81 },
    { ...MOCK_PRODUCTS[14], predictedRating: 4.7, confidence: 0.88 }
];

// ============================================
// API FUNCTIONS
// ============================================

// Helper function untuk simulasi network delay
const simulateNetworkDelay = (ms = 800) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

// 1. GET /api/users/:userId/history - Riwayat produk user
async function getUserHistory(userId) {
    if (MOCK_MODE) {
        await simulateNetworkDelay();
        return {
            success: true,
            data: {
                userId: userId,
                history: MOCK_USER_HISTORY[userId] || []
            }
        };
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/users/${userId}/history`);
        if (!response.ok) throw new Error('Failed to fetch user history');
        return await response.json();
    } catch (error) {
        console.error('Error fetching user history:', error);
        throw error;
    }
}

// 2. GET /api/users/:userId/recommendations - Rekomendasi untuk user lama
async function getUserRecommendations(userId) {
    if (MOCK_MODE) {
        await simulateNetworkDelay(1200);
        return {
            success: true,
            data: {
                userId: userId,
                recommendations: MOCK_RECOMMENDATIONS
            }
        };
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/users/${userId}/recommendations`);
        if (!response.ok) throw new Error('Failed to fetch recommendations');
        return await response.json();
    } catch (error) {
        console.error('Error fetching recommendations:', error);
        throw error;
    }
}

// 3. POST /api/users/new-recommendations - Rekomendasi untuk user baru
async function getNewUserRecommendations(userName, selectedProducts) {
    if (MOCK_MODE) {
        await simulateNetworkDelay(1500);
        return {
            success: true,
            data: {
                userName: userName,
                recommendations: MOCK_RECOMMENDATIONS.filter((_, index) => index < 6)
            }
        };
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/users/new-recommendations`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userName: userName,
                selectedProducts: selectedProducts
            })
        });
        if (!response.ok) throw new Error('Failed to generate recommendations');
        return await response.json();
    } catch (error) {
        console.error('Error generating recommendations:', error);
        throw error;
    }
}

// 4. GET /api/products - List semua produk
async function getAllProducts() {
    if (MOCK_MODE) {
        await simulateNetworkDelay();
        return {
            success: true,
            data: {
                products: MOCK_PRODUCTS,
                total: MOCK_PRODUCTS.length
            }
        };
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/products`);
        if (!response.ok) throw new Error('Failed to fetch products');
        return await response.json();
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
}

// 5. GET /api/products/:productId - Detail produk
async function getProductDetail(productId) {
    if (MOCK_MODE) {
        await simulateNetworkDelay();
        const product = MOCK_PRODUCTS.find(p => p.productId === parseInt(productId));
        return {
            success: true,
            data: {
                product: product || null,
                reviews: MOCK_REVIEWS
            }
        };
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/products/${productId}`);
        if (!response.ok) throw new Error('Failed to fetch product detail');
        return await response.json();
    } catch (error) {
        console.error('Error fetching product detail:', error);
        throw error;
    }
}

// 6. GET /api/products/:productId/sentiment - Analisis sentimen
async function getProductSentiment(productId) {
    if (MOCK_MODE) {
        await simulateNetworkDelay(500);
        // Mock sentiment data
        return {
            success: true,
            data: {
                productId: productId,
                sentiment: {
                    positive: 0.75,
                    neutral: 0.15,
                    negative: 0.10
                },
                totalReviews: MOCK_REVIEWS.length
            }
        };
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/products/${productId}/sentiment`);
        if (!response.ok) throw new Error('Failed to fetch sentiment');
        return await response.json();
    } catch (error) {
        console.error('Error fetching sentiment:', error);
        throw error;
    }
}

// Export untuk digunakan di file lain
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        getUserHistory,
        getUserRecommendations,
        getNewUserRecommendations,
        getAllProducts,
        getProductDetail,
        getProductSentiment
    };
}
