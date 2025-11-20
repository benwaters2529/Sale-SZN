<!-- Storing elements into variables -->

<!-- Local Storage -->

const cartModel = document.getElementById('cartModel');
const cartItemsDiv = document.getElementById('cartItems');
const cartTotalDiv = document.getElementById('cartTotal');
const cartBadge = document.getElementById('cartBadge');

const storedCart = localStorage.getItem('cart');
const cart = storedCart ? JSON.parse(storedCart) : [];

<!-- Updates cart display -->
function updateCartDisplay() {
	cartItemsDiv.innerHTML = ''; <!-- Clears previous list -->
	let total = 0;
	
	if (cart.length === 0) {
		cartItemsDiv.innerHTML = '<p>Your cart is empty</p>';
	}
	else {
		cart.forEach((item, i) => {
			total += item.price; <!-- Adds up total -->
			const div = document.createElement('div');
			div.innerHTML = `${item.name} - $${item.price.toFixed(2)}
			<button onclick="removeFromCart(${i})">Remove</button>`;
			cartItemsDiv.appendChild(div);
		});
	}
	cartTotalDiv.textContent = `Total: $${total.toFixed(2)}`; <!-- Shows total -->


}

<!-- Update Cart Badge Number -->
function updateBadge() {
	const count = cart.length;
	if (count > 0) {
		cartBadge.style.display = 'inline';
		cartBadge.textContent = count;
	}
	else {
		cartBadge.style.display = 'none';

	}

}

updateBadge();
updateCartDisplay();

<!-- Saving Cart to Local Storage -->
function saveCart() {
	localStorage.setItem('cart', JSON.stringify(cart));
}


<!-- Adds items to cart -->
function addToCart(name, price) {
	cart.push({name, price});
	saveCart();
	updateBadge();
	updateCartDisplay();
}

<!-- Removes items from cart -->
function removeFromCart(index) {
	cart.splice(index, 1); <!-- Removes item from the array -->
	saveCart();
	updateBadge();
	updateCartDisplay();
}

<!-- Hide/Show Cart Popup -->
function toggleCart() {
	cartModel.style.display =
	cartModel.style.display === 'block' ? 'none' : 'block';
}
