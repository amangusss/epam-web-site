const products = [
    {
        id: 1,
        name: "iPhone 15 Pro",
        category: "smartphones",
        price: 99990,
        image: "📱"
    },
    {
        id: 2,
        name: "Samsung Galaxy S24",
        category: "smartphones", 
        price: 79990,
        image: "📱"
    },
    {
        id: 3,
        name: "MacBook Pro 16\"",
        category: "laptops",
        price: 249990,
        image: "💻"
    },
    {
        id: 4,
        name: "Dell XPS 13",
        category: "laptops",
        price: 129990,
        image: "💻"
    },
    {
        id: 5,
        name: "AirPods Pro 2",
        category: "headphones",
        price: 24990,
        image: "🎧"
    },
    {
        id: 6,
        name: "Sony WH-1000XM5",
        category: "headphones",
        price: 32990,
        image: "🎧"
    },
    {
        id: 7,
        name: "Google Pixel 8",
        category: "smartphones",
        price: 69990,
        image: "📱"
    },
    {
        id: 8,
        name: "ASUS ROG Zephyrus",
        category: "laptops",
        price: 189990,
        image: "💻"
    }
];

let currentProducts = [...products];

const productGrid = document.getElementById('productGrid');
const searchInput = document.getElementById('searchInput');
const categorySelect = document.getElementById('categorySelect');
const sortSelect = document.getElementById('sortSelect');

function renderProducts(productsToRender) {
    productGrid.innerHTML = '';
    
    if (productsToRender.length === 0) {
        productGrid.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; font-size: 1.2rem; color: #666;">Товары не найдены</p>';
        return;
    }
    
    productsToRender.forEach(product => {
        const productCard = document.createElement('article');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-card__image">${product.image}</div>
            <div class="product-card__content">
                <div class="product-card__category">${getCategoryName(product.category)}</div>
                <h3 class="product-card__title">${product.name}</h3>
                <div class="product-card__price">${product.price.toLocaleString('ru-RU')} ₽</div>
            </div>
        `;
        productGrid.appendChild(productCard);
    });
}

function getCategoryName(category) {
    const categoryNames = {
        'smartphones': 'Смартфоны',
        'laptops': 'Ноутбуки', 
        'headphones': 'Наушники'
    };
    return categoryNames[category] || category;
}

function filterAndSortProducts() {
    let filtered = [...products];
    
    const searchTerm = searchInput.value.toLowerCase().trim();
    if (searchTerm) {
        filtered = filtered.filter(product => 
            product.name.toLowerCase().includes(searchTerm)
        );
    }
    
    const selectedCategory = categorySelect.value;
    if (selectedCategory !== 'all') {
        filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    const sortBy = sortSelect.value;
    switch (sortBy) {
        case 'price-asc':
            filtered.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            filtered.sort((a, b) => b.price - a.price);
            break;
        default:
            break;
    }
    
    currentProducts = filtered;
    renderProducts(currentProducts);
}

searchInput.addEventListener('input', filterAndSortProducts);
categorySelect.addEventListener('change', filterAndSortProducts);
sortSelect.addEventListener('change', filterAndSortProducts);

document.addEventListener('DOMContentLoaded', () => {
    renderProducts(products);
});