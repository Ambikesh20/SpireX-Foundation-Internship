// Product Catalog Data (6 products)
const products = [
  {
    id: 1,
    name: "Neon Pulse Headphones",
    price: 89.99,
    category: "Audio",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    name: "AeroRun Smart Watch",
    price: 149.50,
    category: "Wearables",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    name: "Prism Runner Sneakers",
    price: 115.00,
    category: "Footwear",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    name: "RetroSnap Instant Camera",
    price: 74.99,
    category: "Photography",
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 5,
    name: "Chroma Mechanical Keyboard",
    price: 129.00,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 6,
    name: "Solaris Polarized Sunglasses",
    price: 54.00,
    category: "Lifestyle",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=600&q=80"
  }
];

let cart = [];

// DOM Elements
const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const resultCount = document.getElementById("resultCount");
const cartCount = document.getElementById("cartCount");
const cartItemsContainer = document.getElementById("cartItems");
const totalPriceEl = document.getElementById("totalPrice");
const cartDrawer = document.getElementById("cartDrawer");
const cartOverlay = document.getElementById("cartOverlay");
const openCartBtn = document.getElementById("openCartBtn");
const closeCartBtn = document.getElementById("closeCartBtn");
const checkoutBtn = document.getElementById("checkoutBtn");
const toast = document.getElementById("toast");

// Render Product Cards
function renderProducts(items) {
  productGrid.innerHTML = "";
  resultCount.textContent = `Showing ${items.length} product${items.length !== 1 ? "s" : ""}`;

  if (items.length === 0) {
    productGrid.innerHTML = `<p style="grid-column: 1/-1; text-align:center; color:#636e72; padding:2rem;">No products matched your search.</p>`;
    return;
  }

  items.forEach((product, index) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.style.animationDelay = `${index * 0.08}s`;

    card.innerHTML = `
      <div class="product-img-wrap">
        <span class="category-pill">${product.category}</span>
        <img src="${product.image}" alt="${product.name}" loading="lazy" />
      </div>
      <div class="product-info">
        <div>
          <h4>${product.name}</h4>
          <div class="product-price">$${product.price.toFixed(2)}</div>
        </div>
        <button class="add-btn" onclick="addToCart(${product.id})">+ Add to Cart</button>
      </div>
    `;
    productGrid.appendChild(card);
  });
}

// Add Item to Cart
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCartUI();
  animateBadge();
  showToast(`Added "${product.name}" to cart!`);
}

// Remove Item from Cart
function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  updateCartUI();
}

// Update Cart UI & Calculate Total Price
function updateCartUI() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  cartCount.textContent = totalItems;
  totalPriceEl.textContent = `$${totalPrice.toFixed(2)}`;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `<p class="empty-msg">Your cart is currently empty. Start adding some awesome gear!</p>`;
    return;
  }

  cartItemsContainer.innerHTML = cart
    .map(
      (item) => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" />
        <div class="cart-item-details">
          <h5>${item.name}</h5>
          <p>$${item.price.toFixed(2)} × ${item.quantity}</p>
        </div>
        <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
      </div>
    `
    )
    .join("");
}

// Search Filter
searchInput.addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase().trim();
  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query)
  );
  renderProducts(filtered);
});

// Cart Drawer Controls
function toggleCart(isOpen) {
  cartDrawer.classList.toggle("active", isOpen);
  cartOverlay.classList.toggle("active", isOpen);
}

openCartBtn.addEventListener("click", () => toggleCart(true));
closeCartBtn.addEventListener("click", () => toggleCart(false));
cartOverlay.addEventListener("click", () => toggleCart(false));

// Checkout Action
checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    showToast("Your cart is empty!");
    return;
  }
  alert(`Thank you for shopping with NovaCart! Total paid: ${totalPriceEl.textContent}`);
  cart = [];
  updateCartUI();
  toggleCart(false);
});

// Helper Animations
function animateBadge() {
  cartCount.classList.remove("bump");
  void cartCount.offsetWidth; // trigger reflow
  cartCount.classList.add("bump");
  setTimeout(() => cartCount.classList.remove("bump"), 300);
}

let toastTimeout;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove("show"), 2200);
}

// Initial Render
renderProducts(products);