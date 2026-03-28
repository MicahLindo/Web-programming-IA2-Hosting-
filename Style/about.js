
//Name:Micah Lindo
//ID#:2505275
//Course:Web Programming
//Course Code:CIT2011
//Tutor's name:Sirisha Badhika
//Date:27/03/26
//Assignment:Individual Assignment 2

document.addEventListener("DOMContentLoaded", () => {
  // ================= Contact Button Logic =================
  const contactBtn = document.getElementById("contactBtn");
  const messageBox = document.getElementById("messageBox");

  if (contactBtn && messageBox) {
    // Event Listener #1 → Contact button click
    contactBtn.addEventListener("click", () => {
      messageBox.textContent = "Opening your email client...";
      messageBox.style.color = "var(--success-green)";
      // Basic Interactivity → open default email client
      window.location.href = "mailto:MICAHALINDO@students.utech.edu.jm";
    });
  }

  // ================= Feedback Form Validation =================
  const feedbackForm = document.getElementById("feedbackForm");
  if (feedbackForm && messageBox) {
    // Event Listener #2 → Feedback form submission
    feedbackForm.addEventListener("submit", (e) => {
      e.preventDefault(); // prevent page reload
      const email = document.getElementById("email").value.trim();
      const feedback = document.getElementById("feedback").value.trim();

      // Validation: check required fields
      if (!email || !feedback) {
        messageBox.textContent = "All fields are required.";
        messageBox.style.color = "var(--error-red)";
        return;
      }

      // Validation: check email format
      if (!/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
        messageBox.textContent = "Invalid email format.";
        messageBox.style.color = "var(--error-red)";
        return;
      }

      // Success message
      messageBox.textContent = "Feedback submitted successfully!";
      messageBox.style.color = "var(--success-green)";
    });
  }

  // ================= Navbar Login/Logout Toggle =================
  const signoutBtn = document.getElementById("signoutBtn");
  const loginLink = document.getElementById("loginLink");
  const registerLink = document.getElementById("registerLink");
  const user = localStorage.getItem("currentUser");

  if (user) {
    // Logged in → show Sign Out, hide Login/Register
    if (signoutBtn) signoutBtn.style.display = "inline-block";
    if (loginLink) loginLink.style.display = "none";
    if (registerLink) registerLink.style.display = "none";
  } else {
    // Not logged in → show Login/Register, hide Sign Out
    if (signoutBtn) signoutBtn.style.display = "none";
    if (loginLink) loginLink.style.display = "inline-block";
    if (registerLink) registerLink.style.display = "inline-block";
  }

  // Attach sign out event safely (only once)
  if (signoutBtn) {
    signoutBtn.onclick = signOut;
  }
});

// ================= Sign Out Function =================
function signOut() {
  // Clear user session data
  localStorage.removeItem("cart");
  localStorage.removeItem("currentUser");

  // Redirect to login page
  window.location.href = "login.html";
}
