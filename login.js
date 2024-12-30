document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    const message = document.getElementById('login-message');
    if (email === "test@example.com" && password === "password123") {
        message.textContent = "Login successful!";
        message.style.color = "green";
    } else {
        message.textContent = "Invalid email or password.";
        message.style.color = "red";
    }
});
