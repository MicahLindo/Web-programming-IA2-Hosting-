//Name:Micah Lindo
//ID#:2505275
//Course:Web Programming
//Course Code:CIT2011
//Tutor's name:Sirisha Badhika
//Date:27/03/26
//Assignment:Individual Assignment 2
// ================= Initialize Cart =================
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ================= Render Cart Table =================
function renderCart() {
  const tbody = document.querySelector("#cartTable tbody");
  tbody.innerHTML = "";

  // Show empty message if no items
  if (cart.length === 0) {
    tbody.innerHTML = "<tr><td colspan='6'>Your cart is empty.</td></tr>";
    updateSummary();
    return;
  }

  // Loop through cart items and build table rows
  cart.forEach((item, index) => {
    const subtotal = item.price * item.quantity;
    const row = `
      <tr>
        <td><img src="${item.image}" alt="${item.name}" style="width:60px; height:auto; border-radius:6px;"></td>
        <td>${item.name}</td>
        <td>J$${item.price.toLocaleString("en-JM", { minimumFractionDigits: 2 })}</td>
        <td>
          ${item.quantity}
          <button onclick="increaseQuantity(${index})">+</button>
          <button onclick="decreaseQuantity(${index})">-</button>
        </td>
        <td>J$${subtotal.toLocaleString("en-JM", { minimumFractionDigits: 2 })}</td>
        <td><button onclick="removeItem(${index})">Remove</button></td>
      </tr>`;
    tbody.innerHTML += row;
  });

  updateSummary();
}

// ================= Update Summary (Subtotal, Discount, Tax, Total) =================
function updateSummary() {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const DISCOUNT_THRESHOLD = 100000; // Apply discount if subtotal exceeds this
  const DISCOUNT_RATE = 0.1;         // 10% discount
  const TAX_RATE = 0.15;             // 15% GCT

  const discount = subtotal > DISCOUNT_THRESHOLD ? subtotal * DISCOUNT_RATE : 0;
  const taxedAmount = subtotal - discount;
  const tax = taxedAmount * TAX_RATE;
  const total = taxedAmount + tax;

  document.getElementById("summary").innerHTML = `
    Subtotal: J$${subtotal.toLocaleString("en-JM", { minimumFractionDigits: 2 })}<br>
    Discount: J$${discount.toLocaleString("en-JM", { minimumFractionDigits: 2 })}<br>
    Tax (15% GCT): J$${tax.toLocaleString("en-JM", { minimumFractionDigits: 2 })}<br>
    Total: J$${total.toLocaleString("en-JM", { minimumFractionDigits: 2 })}
  `;
}

// ================= Cart Actions =================
function clearCart() {
  cart = [];
  saveCart();
}

function checkout() {
  window.location.href = "checkout.html";
}

function increaseQuantity(index) {
  cart[index].quantity++;
  saveCart();
}

function decreaseQuantity(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity--;
  } else {
    cart.splice(index, 1);
  }
  saveCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// ================= Sign Out Logic =================
function signOut() {
  // Clear user session data
  localStorage.removeItem("cart");
  localStorage.removeItem("currentUser");

  // Show confirmation message
  showMessage("Signed out successfully.", "success");

  // Delay redirect so user sees the message
  setTimeout(() => {
    window.location.href = "login.html";
  }, 1500); // 1.5 seconds
}

// ================= Message Box =================
function showMessage(text, type) {
  const msgBox = document.getElementById("messageBox");
  if (!msgBox) return alert(text); // fallback if no messageBox exists

  msgBox.textContent = text;
  msgBox.className = type === "success" ? "msg success" : "msg error";
  msgBox.style.display = "block";
}

// ================= Navbar Login/Logout Toggle =================
document.addEventListener("DOMContentLoaded", () => {
  const signoutBtn = document.getElementById("signoutBtn");
  const loginLink = document.getElementById("loginLink");
  const registerLink = document.getElementById("registerLink");
  const user = localStorage.getItem("currentUser");

  if (user && user.trim() !== "") {
    // Logged in → show Sign Out, hide Login/Register
    signoutBtn.style.display = "inline-block";
    loginLink.style.display = "none";
    registerLink.style.display = "none";

    // Attach sign out event (ensure only one handler)
    signoutBtn.onclick = signOut;
  } else {
    // Not logged in → show Login/Register, hide Sign Out
    signoutBtn.style.display = "none";
    loginLink.style.display = "inline-block";
    registerLink.style.display = "inline-block";
  }

  // Render cart items on page load
  renderCart();
});
