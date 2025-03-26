let cart = [];

// Load cart from localStorage when the page loads
function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
    }
}

// Save cart to localStorage
function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Add item to cart (increase quantity if it already exists)
function addToCart(item, price) {
    let existingItem = cart.find(product => product.item === item);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ item, price, quantity: 1 });
    }
    saveCartToLocalStorage();
    updateCart();
}

// Update cart display
function updateCart() {
    // Compute total items (sum of all quantities)
    let totalItems = cart.reduce((sum, product) => sum + product.quantity, 0);

    // Update all cart count elements (cart icon & cart section button)
    document.querySelectorAll('.cart-count').forEach(el => el.textContent = totalItems);

    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = ""; // Clear previous items

    let totalPrice = 0;

    cart.forEach((product, index) => {
        totalPrice += product.price * product.quantity;

        let li = document.createElement('li');
        li.textContent = `${product.item} (x${product.quantity}) - $${(product.price * product.quantity).toFixed(2)}`;

        // Increase quantity button
        let increaseBtn = document.createElement('button');
        increaseBtn.textContent = "+";
        increaseBtn.style.marginLeft = "10px";
        increaseBtn.onclick = () => increaseQuantity(index);

        // Decrease quantity button
        let decreaseBtn = document.createElement('button');
        decreaseBtn.textContent = "-";
        decreaseBtn.style.marginLeft = "5px";
        decreaseBtn.onclick = () => decreaseQuantity(index);

        // Remove button
        let removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.style.marginLeft = "10px";
        removeBtn.onclick = () => removeFromCart(index);

        li.appendChild(increaseBtn);
        li.appendChild(decreaseBtn);
        li.appendChild(removeBtn);
        cartItems.appendChild(li);
    });

    // Update the total price display
    document.getElementById('cart-total').textContent = totalPrice.toFixed(2);

    // Disable checkout button if cart is empty
    document.querySelector('button[onclick="checkout()"]').disabled = cart.length === 0;
}

// Increase quantity of an item
function increaseQuantity(index) {
    cart[index].quantity += 1;
    saveCartToLocalStorage();
    updateCart();
}

// Decrease quantity or remove item if quantity is 1
function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    } else {
        cart.splice(index, 1);
    }
    saveCartToLocalStorage();
    updateCart();
}

// Remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    saveCartToLocalStorage();
    updateCart();
}

// Toggle cart visibility
function toggleCart() {
    const cartSection = document.getElementById('cart');
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    cartSection.style.display = (cartSection.style.display === 'none' || cartSection.style.display === '') ? 'block' : 'none';
}

// Checkout function
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    alert('Order placed successfully!');
    cart = [];
    saveCartToLocalStorage();
    updateCart();
}

// Load cart when the page loads
window.onload = loadCartFromLocalStorage;
