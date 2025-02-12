// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyAXVKmrDlxn8Bd8mkRYxokLyoRoyT85eaM",
    authDomain: "personal-virtual-assistan.firebaseapp.com",
    databaseURL: "https://personal-virtual-assistan-default-rtdb.firebaseio.com",
    projectId: "personal-virtual-assistan",
    storageBucket: "personal-virtual-assistan.firebasestorage.app",
    messagingSenderId: "705250734620",
    appId: "1:705250734620:web:3bad0a330ae0430b50e5d9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Reference to the Signup node in Firebase Database
const signupRef = ref(db, "Signup");

// Form submission
document.getElementById("signup-form").addEventListener("submit", submitForm);

function submitForm(e) {
    e.preventDefault();

    // Get input values
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    // Basic validation
    if (username === "" || email === "" || password === "") {
        showMessage("All fields are required!", "red");
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showMessage("Please enter a valid email!", "red");
        return;
    }

    // Save details to Firebase
    saveDetails(username, email, password);
    showMessage("Sign-up successful!", "green");

    // Clear the form
    document.getElementById("signup-form").reset();
}

// Function to save user details to Firebase
function saveDetails(username, email, password) {
    const newSignupRef = push(signupRef);
    set(newSignupRef, {
        username: username,
        email: email,
        password: password
    }).catch((error) => {
        showMessage(`Error: ${error.message}`, "red");
    });
}

// Function to display a message
function showMessage(text, color) {
    const message = document.getElementById("message");
    message.textContent = text;
    message.style.color = color;
}
