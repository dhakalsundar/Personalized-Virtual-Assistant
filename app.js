// Using require() instead of import
const { initializeApp } = require('firebase/app');
const { getAuth, createUserWithEmailAndPassword, updateProfile } = require('firebase/auth');
const { getDatabase, ref, set } = require('firebase/database');

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgBlFqlNonMb59cgIxftOlw2qZfhwIO5M",
  authDomain: "signupbackend-80c14.firebaseapp.com",
  databaseURL: "https://signupbackend-80c14-default-rtdb.firebaseio.com",
  projectId: "signupbackend-80c14",
  storageBucket: "signupbackend-80c14.firebasestorage.app",
  messagingSenderId: "197491647421",
  appId: "1:197491647421:web:6d04ddef31eddf43f328d4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// Handle Form Submission
document.getElementById('signupForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;
  const errorElement = document.getElementById('error');

  // Reset error message
  errorElement.textContent = '';

  if (password !== confirmPassword) {
    errorElement.textContent = "Passwords do not match.";
    return;
  }

  try {
    // Sign up user with Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    // Update user profile with username
    await updateProfile(userCredential.user, {
      displayName: username
    });

    // Save user data to Realtime Database
    const userId = userCredential.user.uid;
    await set(ref(database, 'users/' + userId), {
      username: username,
      email: email
    });

    alert("Sign-up successful! User data saved to database.");
    // Redirect or clear form
    e.target.reset();
  } catch (error) {
    errorElement.textContent = error.message;
  }
});
