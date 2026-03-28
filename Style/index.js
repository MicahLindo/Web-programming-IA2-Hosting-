//Name:Micah Lindo
//ID#:2505275
//Course:Web Programming
//Course Code:CIT2011
//Tutor's name:Sirisha Badhika
//Date:27/03/26
//Assignment:Individual Assignment 2
document.addEventListener("DOMContentLoaded", () => {
  const navRight = document.querySelector(".nav-right");
  const user = localStorage.getItem("currentUser");

  // ================= Reset Navbar =================
  // Clear existing nav-right content before rebuilding
  navRight.innerHTML = "";

  // ================= Always Visible Links =================
  const productsLink = document.createElement("a");
  productsLink.href = "Code/products.html"; // Corrected path
  productsLink.textContent = "Products";

  const aboutLink = document.createElement("a");
  aboutLink.href = "Code/about.html"; // Corrected path
  aboutLink.textContent = "About Us";

  navRight.appendChild(productsLink);
  navRight.appendChild(aboutLink);

  // ================= Conditional Links =================
  if (user && user.trim() !== "") {
    // Logged in → show Sign Out
    const signoutLink = document.createElement("a");
    signoutLink.href = "#";
    signoutLink.textContent = "Sign Out";
    signoutLink.onclick = signOut; // attach sign out handler

    navRight.appendChild(signoutLink);
  } else {
    // Not logged in → show Login/Register
    const loginLink = document.createElement("a");
    loginLink.href = "Code/login.html"; // Corrected path
    loginLink.textContent = "Login";

    const registerLink = document.createElement("a");
    registerLink.href = "Code/register.html"; // Corrected path
    registerLink.textContent = "Register";
    registerLink.classList.add("register-btn");

    navRight.appendChild(loginLink);
    navRight.appendChild(registerLink);
  }
});

// ================= Sign Out Function =================
function signOut() {
  // Clear user session data
  localStorage.removeItem("cart");
  localStorage.removeItem("currentUser");

  // Show confirmation (currently using alert, could be replaced with styled message box)
  alert("Signed out successfully.");

  // Redirect to login page after short delay
  setTimeout(() => {
    window.location.href = "Code/login.html"; // Corrected path
  }, 1000);
}
