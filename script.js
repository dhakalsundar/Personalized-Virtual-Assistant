// Select the form and message elements
const form = document.getElementById("signup-form");
const message = document.getElementById("message");

// Add submit event listener to the form
form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from submitting

    // Get form input values
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    // Basic validation
    if (username === "" || email === "" || password === "") {
        message.textContent = "All fields are required!";
        message.style.color = "red";
        return;
    }

    // Email validation (basic regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        message.textContent = "Please enter a valid email!";
        message.style.color = "red";
        return;
    }

    // If validation passes
    message.textContent = "Sign-up successful!";
    message.style.color = "green";

    // Clear the form (optional)
    form.reset();
});


// firebase
const firebaseConfig = {
    apiKey: "AIzaSyAXVKmrDlxn8Bd8mkRYxokLyoRoyT85eaM",
    authDomain: "personal-virtual-assistan.firebaseapp.com",
    databaseURL: "https://personal-virtual-assistan-default-rtdb.firebaseio.com",
    projectId: "personal-virtual-assistan",
    storageBucket: "personal-virtual-assistan.firebasestorage.app",
    messagingSenderId: "705250734620",
    appId: "1:705250734620:web:3bad0a330ae0430b50e5d9"
  };


  // initialize firebase
firebase.initializeApp(firebaseConfig);

// refrence your database
var signup = firebase.database().ref('Signup')

document.getElementById('signup-form').addEventListener('submit',submitForm);

function submitForm(e){
    e.preventDefault();
    var username = getInputVal('username');
    var email = getInputVal('email');
    var password = getInputVal('password');

    saveMessage(username,email,password);
}
const savedeatils=(name,email,password)=>{
    var newSignup = signup.push();
    newSignup.set({
        username: name,
        email: email,
        password: password
    });
}
