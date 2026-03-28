//Name:Micah Lindo
//ID#:2505275
//Course:Web Programming
//Course Code:CIT2011
//Tutor's name:Sirisha Badhika
//Date:27/03/26
//Assignment:Individual Assignment 2
// ================= DOMContentLoaded =================
document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const productCards = document.querySelectorAll(".product-grid .card");
  const signoutBtn = document.getElementById("signoutBtn");
  const loginLink = document.getElementById("loginLink");
  const registerLink = document.getElementById("registerLink");
  const user = localStorage.getItem("currentUser");

  // ================= Navbar State =================
  toggleNavbar(user);

  // ================= Attach Add to Cart Events =================
  document.querySelectorAll(".cart-btn").forEach(button => {
    button.addEventListener("click", () => {
      const card = button.closest(".card");
      const name = card.querySelector("h3").textContent;
      const priceText = card.querySelector(".price").textContent;
      const price = parseFloat(priceText.replace(/[^\d.]/g, ""));
      const image = card.querySelector("img").getAttribute("src");

      addToCart(name, price, image);
    });
  });

  // ================= Filter Buttons =================
  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      // Filter product cards by category
      const category = button.textContent.toLowerCase();
      productCards.forEach(card => {
        const cardCategory = card.getAttribute("data-category");
        card.style.display = (category === "all" || cardCategory === category) ? "block" : "none";
      });
    });
  });

  // ================= Sign Out (ensure only one handler) =================
  if (signoutBtn) {
    signoutBtn.onclick = signOut;
  }
});

// ================= Navbar Toggle =================
function toggleNavbar(user) {
  const signoutBtn = document.getElementById("signoutBtn");
  const loginLink = document.getElementById("loginLink");
  const registerLink = document.getElementById("registerLink");

  if (user) {
    // Logged in → show Sign Out, hide Login/Register
    signoutBtn.style.display = "inline-block";
    loginLink.style.display = "none";
    registerLink.style.display = "none";
  } else {
    // Not logged in → show Login/Register, hide Sign Out
    signoutBtn.style.display = "none";
    loginLink.style.display = "inline-block";
    registerLink.style.display = "inline-block";
  }
}

// ================= Sign Out Function =================
function signOut() {
  localStorage.removeItem("cart");
  localStorage.removeItem("currentUser");
  showMessage("Signed out successfully.", "success");
  setTimeout(() => window.location.href = "login.html", 800);
}

// ================= Add to Cart Function =================
function addToCart(name, price, image) {
  const user = localStorage.getItem("currentUser");

  // If not logged in → redirect to login
  if (!user) {
    localStorage.setItem("pendingProduct", JSON.stringify({ name, price, image }));
    showMessage("Please log in before adding items to your cart.", "error");
    setTimeout(() => window.location.href = "login.html", 800);
    return;
  }

  // If logged in → proceed
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existing = cart.find(item => item.name === name);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ name, price, image, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  showMessage(`${name} has been added to your cart.`, "success");
}

// ================= Message Box Function =================
function showMessage(text, type) {
  const msgBox = document.getElementById("messageBox");
  if (!msgBox) return alert(text); // fallback if no messageBox exists

  msgBox.textContent = text;
  msgBox.className = type === "success" ? "msg success" : "msg error";
  msgBox.style.display = "block";
}
