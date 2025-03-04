// Import FirebaseService to handle authentication
import { FirebaseService } from './FirebaseService.js';

document.getElementById('signup-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    // Get the username, email, and password entered by the user
    const name = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    // Reference to the message element for showing signup result
    const message = document.getElementById('message');
    const submitButton = document.querySelector("button[type='submit']");

    // Input validation
    if (username.length < 3) {
        message.textContent = "Username must be at least 3 characters.";
        message.style.color = "red";
        return;
    }
    if (password.length < 6) {
        message.textContent = "Password must be at least 6 characters.";
        message.style.color = "red";
        return;
    }

    // Disable the submit button to prevent multiple clicks
    submitButton.disabled = true;
    submitButton.textContent = "Signing Up...";

    try {
        // Attempt to sign up using FirebaseService
        const user = await FirebaseService.signUp(name, email, password);
        const uid = user.uid;
        message.textContent = `Signup successful! Welcome, ${user.email}`;
        
        // Store UID after signup
        localStorage.setItem('uid', uid);

        console.log("User UID:", uid);

        // Display success message
        // message.textContent = `Signup successful! Welcome, ${user.user.email}`;
        message.style.color = "green";

        // Redirect to login page after successful signup
        setTimeout(() => {
            window.location.href = "login.html";
        }, 2000); // Delay to show message before redirect

    } catch (error) {
        console.error("Signup error:", error);

        // Display error message if signup fails
        message.textContent = error.message || "Signup failed. Please try again.";
        message.style.color = "red";

        // Re-enable the submit button
        submitButton.disabled = false;
        submitButton.textContent = "Sign Up";
    }
});
