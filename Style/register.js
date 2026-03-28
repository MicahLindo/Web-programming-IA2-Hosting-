//Name:Micah Lindo
//ID#:2505275
//Course:Web Programming
//Course Code:CIT2011
//Tutor's name:Sirisha Badhika
//Date:27/03/26
//Assignment:Individual Assignment 2
// ================= Registration Form Submit =================
document.getElementById("registerForm").addEventListener("submit", function(e) {
  e.preventDefault(); // Prevent page reload

  // ================= DOM Manipulation: Collect Form Values =================
  const fullname = document.getElementById("fullname").value.trim();
  const dob = document.getElementById("dob").value;
  const email = document.getElementById("email").value.trim();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const message = document.getElementById("message");

  // Retrieve existing users from localStorage
  let users = JSON.parse(localStorage.getItem("users")) || [];

  // ================= Form Validation =================
  // Check required fields
  if (!fullname || !dob || !email || !username || !password) {
    message.style.color = "#DC2626"; // Error Red
    message.textContent = "All fields are required.";
    return;
  }

  // Validate email format
  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!email.match(emailPattern)) {
    message.style.color = "#DC2626";
    message.textContent = "Invalid email format.";
    return;
  }

  // Check if username already exists
  if (users.some(u => u.username === username)) {
    message.style.color = "#DC2626";
    message.textContent = "Username already exists.";
    return;
  }

  // ================= Save New User =================
  const newUser = { fullname, dob, email, username, password };
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  // Auto-login after registration
  localStorage.setItem("currentUser", JSON.stringify(newUser));

  // ================= Success Feedback =================
  message.style.color = "#16A34A"; // Success Green
  message.textContent = "Registration successful! Redirecting...";

  // Redirect to products page after short delay
  setTimeout(() => {
    window.location.href = "products.html";
  }, 1500);
});

// ================= Extra Event Listener Example =================
// Adds a hover effect to the first button (opacity change)
document.querySelector("button").addEventListener("mouseover", () => {
  document.querySelector("button").style.opacity = "0.9";
});
