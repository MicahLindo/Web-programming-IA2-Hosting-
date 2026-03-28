//Name:Micah Lindo
//ID#:2505275
//Course:Web Programming
//Course Code:CIT2011
//Tutor's name:Sirisha Badhika
//Date:27/03/26
//Assignment:Individual Assignment 2
// ================= Initialize Cart =================
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ================= Render Checkout Summary =================
function renderCheckoutSummary() {
  const summaryDiv = document.getElementById("cartSummary");

  // Calculate subtotal
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Discount: 10% off if subtotal > J$100,000
  const discount = subtotal > 100000 ? subtotal * 0.1 : 0;

  // Apply tax (15% GCT)
  const taxedAmount = subtotal - discount;
  const tax = taxedAmount * 0.15;
  const total = taxedAmount + tax;

  // Display summary
  summaryDiv.innerHTML = `
    <h2>Order Summary</h2>
    <p>Subtotal: J$${subtotal.toLocaleString("en-JM", { minimumFractionDigits: 2 })}</p>
    <p>Discount: J$${discount.toLocaleString("en-JM", { minimumFractionDigits: 2 })}</p>
    <p>Tax (15% GCT): J$${tax.toLocaleString("en-JM", { minimumFractionDigits: 2 })}</p>
    <p><strong>Total: J$${total.toLocaleString("en-JM", { minimumFractionDigits: 2 })}</strong></p>
  `;
}

// ================= Confirm Order =================
document.getElementById("shippingForm").addEventListener("submit", function(e) {
  e.preventDefault();

  // Collect form values
  const name = document.getElementById("name").value.trim();
  const address = document.getElementById("address").value.trim();
  const amount = document.getElementById("amount").value.trim();
  const paymentMethod = document.getElementById("paymentMethod").value;

  // Validation: ensure all fields are filled
  if (!name || !address || !amount || !paymentMethod) {
    alert("Please fill in all shipping and payment details.");
    return;
  }

  // Confirmation message
  alert(`Order confirmed!
Name: ${name}
Address: ${address}
Amount Paid: J$${parseFloat(amount).toLocaleString("en-JM", { minimumFractionDigits: 2 })}
Payment Method: ${paymentMethod}`);

  // Clear cart and redirect
  clearCart();
  window.location.href = "products.html";
});

// ================= Cancel Checkout =================
function cancelCheckout() {
  alert("Checkout cancelled.");
  window.location.href = "cart.html";
}

// ================= Clear Cart =================
function clearCart() {
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
  document.getElementById("cartSummary").innerHTML = "<p>Your cart is empty.</p>";
}

// ================= Check Out Button =================
function checkout() {
  alert("Proceeding to payment gateway...");
}

// ================= Close Checkout =================
function closeCheckout() {
  window.location.href = "products.html";
}

// ================= Initial Render =================
renderCheckoutSummary();

