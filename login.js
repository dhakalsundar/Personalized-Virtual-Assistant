// Import FirebaseService to handle authentication
import { FirebaseService } from './FirebaseService.js';

document.getElementById('login-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    // Get the email and password entered by the user
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    // Reference to the message element for showing login result
    const message = document.getElementById('login-message');
    
    try {
        // Attempt to sign in using FirebaseService
        const user = await FirebaseService.signIn(email, password);
        
        const uid = user.user.uid
        // Store UID after login
        localStorage.setItem('uid', uid);

        console.log(user.user.uid)
        // Display success message if login is successful
        message.textContent = `Login successful! Welcome, ${user.user.email}`;  // Display user email
        message.style.color = "green";
        window.location.href = "dashboard.html";

        try{
        const userDetails = await FirebaseService.fetchUserDetails(uid);
    
        if (userDetails) {
          console.log("User Details:", userDetails);
          // You can use this data in your app (e.g., display it to the user)
        }

    }catch(error){
        console.error("Error fetching user details:", error);
    }

        // Optionally, redirect to another page after successful login
        // window.location.href = "dashboard.html";  // Redirect to dashboard or another page

    } catch (error) {
        // Display error message if login fails
        message.textContent = "Invalid email or password.";  // Show invalid credentials message
        message.style.color = "red";
    }
});
