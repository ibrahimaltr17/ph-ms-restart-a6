
let allProducts = [];

// Load Products
const loadProducts = () => {
    fetch("https://fakestoreapi.com/products")
        .then(res => res.json())
        .then(data => {
            allProducts = data; // store for optional manual filtering
            displayProducts(data);
            displayTopRatedProducts(data);
        });
}

// Load category products
const loadProductsByCategory = (category) => {
    fetch(`https://fakestoreapi.com/products/category/${category}`)
        .then(res => res.json())
        .then(data => displayProducts(data));
}

// Display Products
const displayProducts = (products) => {
    const productContainer = document.getElementById("productCard");
    productContainer.innerHTML = "";

    for (let product of products) {
        const productCard = document.createElement("div");
        productCard.innerHTML = `
            <div class="border border-gray-200 rounded-lg w-fit"> 
                <div class="h-72 w-full flex items-center justify-center p-4 rounded-t-lg bg-gray-200">
                    <img class="max-h-full max-w-full object-contain" src="${product.image}" alt="${product.title}">
                </div>
                <div class="p-3 space-y-4">
                    <div class="flex justify-between">
                        <div class="badge badge-soft badge-primary">${product.category}</div>
                        <div class="flex gap-2 items-center">
                            <i class="fa-solid fa-star text-yellow-300"></i>
                            <p class="text-gray-400">${product.rating.rate} (${product.rating.count})</p>
                        </div>
                    </div>
                    <div>
                        <h4 class="font-semibold text-lg line-clamp-1">${product.title}</h4>
                        <h3 class="text-2xl font-bold">$${product.price}</h3>
                    </div>
                    <div class="grid grid-cols-2 gap-2">
                        <button class="py-2 px-6 shadow-sm rounded-md btn text-gray-500 border border-gray-200">
                            <i class="fa-regular fa-eye"></i>
                            Details
                        </button>
                        <button class="py-2 px-6 btn bg-purple-600 rounded-lg text-white">
                            <i class="fa-solid fa-cart-shopping"></i>
                            Add
                        </button>
                    </div>
                </div>
            </div>
        `;
        productContainer.append(productCard);

        const detailsBtn = productCard.querySelector("button:first-child");
        detailsBtn.addEventListener("click", () => showProductModal(product));
    }
}


// Trending Products
const displayTopRatedProducts = (products) => {
    const container = document.getElementById("topRatedProducts");
    container.innerHTML = "";

    const topProducts = products
        .sort((a, b) => b.rating.rate - a.rating.rate)
        .slice(0, 3);

    for (let product of topProducts) {
        const productCard = document.createElement("div");
        productCard.innerHTML = `
            <div class="border border-gray-200 rounded-lg w-fit"> 
                <div class="h-72 w-full flex items-center justify-center p-4 rounded-t-lg bg-gray-200">
                    <img class="max-h-full max-w-full object-contain" src="${product.image}" alt="${product.title}">
                </div>
                <div class="p-3 space-y-4">
                    <div class="flex justify-between">
                        <div class="badge badge-soft badge-primary">${product.category}</div>
                        <div class="flex gap-2 items-center">
                            <i class="fa-solid fa-star text-yellow-300"></i>
                            <p class="text-gray-400">${product.rating.rate} (${product.rating.count})</p>
                        </div>
                    </div>
                    <div>
                        <h4 class="font-semibold text-lg line-clamp-1">${product.title}</h4>
                        <h3 class="text-2xl font-bold">$${product.price}</h3>
                    </div>
                    <div class="grid grid-cols-2 gap-2">
                        <button class="py-2 px-6 shadow-sm rounded-md btn text-gray-500 border border-gray-200">
                            <i class="fa-regular fa-eye"></i>
                            Details
                        </button>
                        <button class="py-2 px-6 btn bg-purple-600 rounded-lg text-white">
                            <i class="fa-solid fa-cart-shopping"></i>
                            Add
                        </button>
                    </div>
                </div>
            </div>
        `;
        container.append(productCard);

        const detailsBtn = productCard.querySelector("button:first-child");
        detailsBtn.addEventListener("click", () => showProductModal(product));
    }
}

// Load Category
const loadCategories = () => {
    fetch("https://fakestoreapi.com/products/categories")
        .then(res => res.json())
        .then(categories => displayCategories(categories));
}


// Display Categories
const displayCategories = (categories) => {
    const categoriesContainer = document.getElementById("categoriesContainer");
    categoriesContainer.innerHTML = "";

    const allBtn = document.createElement("button");
    allBtn.innerText = "All";
    allBtn.className = "border border-gray-300 rounded-3xl py-2 px-4 text-sm font-bold text-gray-600 hover:text-white hover:bg-purple-600 cursor-pointer";
    categoriesContainer.append(allBtn);

    categories.forEach(category => {
        const btn = document.createElement("button");
        btn.innerText = category;
        btn.className = "border border-gray-300 rounded-3xl py-2 px-4 text-sm font-bold text-gray-600 hover:text-white hover:bg-purple-600 cursor-pointer";
        categoriesContainer.append(btn);
    });

    attachCategoryEvents();
}

const attachCategoryEvents = () => {
    const categoryButtons = document.querySelectorAll("#categoriesContainer button");

    categoryButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const category = btn.innerText.trim();

            categoryButtons.forEach(b => b.classList.remove("bg-purple-600", "text-white"));

            btn.classList.add("bg-purple-600", "text-white");

            if (category.toLowerCase() === "all") {
                loadProducts();
            } else {
                loadProductsByCategory(category);
            }
        });
    });
}


loadProducts();      
loadCategories();     


// Hide and Shows elements
const bannerSection = document.getElementById("bannerSection");
const benefitsSection = document.getElementById("benefitsSection");
const trendingSection = document.getElementById("trendingSection");
const productSection = document.getElementById("productSection");

const homeMenu = document.getElementById("homeMenu");
const homeMenuMobile = document.getElementById("homeMenuMobile");
const productsMenu = document.getElementById("productsMenu");
const productsMenuMobile = document.getElementById("productsMenuMobile");

let productsLoaded = false;

homeMenu.addEventListener("click", () => {
    bannerSection.classList.remove("hidden");
    benefitsSection.classList.remove("hidden");
    trendingSection.classList.remove("hidden");
    productSection.classList.add("hidden");
});

homeMenuMobile.addEventListener("click", () => {
    bannerSection.classList.remove("hidden");
    benefitsSection.classList.remove("hidden");
    trendingSection.classList.remove("hidden");
    productSection.classList.add("hidden");
});

productsMenu.addEventListener("click", () => {
    bannerSection.classList.add("hidden");
    benefitsSection.classList.add("hidden");
    trendingSection.classList.add("hidden");
    productSection.classList.remove("hidden");

    if (!productsLoaded) {
        loadProducts();
        productsLoaded = true;
    }
});

productsMenuMobile.addEventListener("click", () => {
    bannerSection.classList.add("hidden");
    benefitsSection.classList.add("hidden");
    trendingSection.classList.add("hidden");
    productSection.classList.remove("hidden");

    if (!productsLoaded) {
        loadProducts();
        productsLoaded = true;
    }
});

const showProductModal = (product) => {
    const modal = document.getElementById("productModal");
    modal.classList.add("modal-open"); // DaisyUI class to show modal

    document.getElementById("modalTitle").innerText = product.title;
    document.getElementById("modalDescription").innerText = product.description;
    document.getElementById("modalPrice").innerText = `$${product.price}`;
    document.getElementById("modalRating").innerText = `${product.rating.rate} (${product.rating.count})`;
    document.getElementById("modalImage").src = product.image;
}

document.getElementById("closeModal").addEventListener("click", () => {
    const modal = document.getElementById("productModal");
    modal.classList.remove("modal-open");
});


