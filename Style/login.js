//Name:Micah Lindo
//ID#:2505275
//Course:Web Programming
//Course Code:CIT2011
//Tutor's name:Sirisha Badhika
//Date:27/03/26
//Assignment:Individual Assignment 2
document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const message = document.getElementById("message");

  let users = JSON.parse(localStorage.getItem("users")) || [];

  if (!username || !password) {
    message.style.color = "#DC2626";
    message.textContent = "All fields are required.";
    return;
  }

  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    message.style.color = "#16A34A";
    message.textContent = "Login successful!";
    // Store just the username for simplicity
    localStorage.setItem("currentUser", username);

    // Check if a product was pending
    const pending = JSON.parse(localStorage.getItem("pendingProduct"));
    if (pending) {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      const existing = cart.find(item => item.name === pending.name);

      if (existing) {
        existing.quantity++;
      } else {
        cart.push({ ...pending, quantity: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      localStorage.removeItem("pendingProduct"); // clear after use
      alert(`${pending.name} has been added to your cart.`);

      // Redirect back to products page
      window.location.href = "products.html";
    } else {
      // Normal redirect after login
      window.location.href = "products.html";
    }
  } else {
    message.style.color = "#DC2626";
    message.textContent = "Invalid username or password.";
  }
});
