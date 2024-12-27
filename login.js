document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    if (email === "test@example.com" && password === "password123") {
        document.getElementById('login-message').textContent = "Login successful!";
        document.getElementById('login-message').style.color = "green";
    } else {
        document.getElementById('login-message').textContent = "Invalid email or password.";
    }
});
