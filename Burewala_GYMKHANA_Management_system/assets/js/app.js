document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("loginForm");
  const errorBox = document.getElementById("loginError");
  const loginBtn = document.getElementById("loginBtn");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();

    if (username === "" || password === "") {
      showError("Please enter username and password.");
      return;
    }

    loginBtn.disabled = true;
    loginBtn.textContent = "Logging in...";

    // Simulated backend request
    setTimeout(() => {
      if (username === "admin" && password === "123") {
        window.location.href = "superadmin.html";  // goes to dashboard
      } else {
        showError("Incorrect username or password.");
        loginBtn.disabled = false;
        loginBtn.textContent = "Login";
      }
    }, 1200);
  });

  function showError(msg){
    errorBox.textContent = msg;
    errorBox.classList.remove("d-none");
  }

});
