import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-auth.js";
import { getDatabase, ref, set,get } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-database.js";
import { firebaseConfig } from './firebaseConfig.js';  // Import the Firebase config from the separate config file

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

class FirebaseService {
  // Sign up a new user
  static async signUp(name, email, password) {
    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update the user profile with the username
      // await updateProfile(user, { displayName: username });

      // Store user details in Realtime Database
      await set(ref(db, `users/${user.uid}`), {
        uid: user.uid,
        name: name,
        email: email
      });

      return user;  // Return the signed-up user
    } catch (error) {
      console.error("Error signing up:", error.message);
      throw new Error(error.message);
    }
  }

  // Sign in an existing user
  static async signIn(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential;  // Return the signed-in user
    } catch (error) {
      console.error('Error signing in:', error.message);
      throw new Error(error.message);
    }
  }

  // Sign out the current user
  static async signOut() {
    try {
      await signOut(auth);
      console.log('User signed out');
    } catch (error) {
      console.error('Error signing out:', error.message);
      throw new Error(error.message);
    }
  }

  // Save user details to Firebase Realtime Database
  static async saveUserDetails(userId, username, email, password, profilePicURL) {
    const userRef = ref(db, 'users/' + userId);
    try {
      // Create the userDetails object
      const userDetails = {
        username: username,
        email: email,
        password: password,
        userId: userId,
      };
  
      // If profilePicURL is provided, add it to userDetails
      if (profilePicURL) {
        userDetails.profilePicURL = profilePicURL;
        await set(userRef, userDetails);

      }
  
      // Save the userDetails to Firebase
  
      console.log("User details saved successfully!");
    } catch (error) {
      console.error('Error saving user details:', error.message);
      throw new Error(error.message);
    }
  }
  

static async fetchUserDetails(uid) {
    const userRef = ref(db, 'users/' + uid);  // Reference to the user's data in the 'users' node by their uid
    try {
      const snapshot = await get(userRef);  // Fetch the data once from the database
      if (snapshot.exists()) {
        const userData = snapshot.val();  // User data for the given uid
        console.log("User Data fetched successfully:", userData);
        return userData;  // Return the user data
      } else {
        console.log("No data available for this user.");
        return null;  // No user data available for this uid
      }
    } catch (error) {
      console.error('Error fetching user details:', error.message);
      throw new Error(error.message);  // Handle any errors
    }
  }


}
// Export FirebaseService for use in other parts of the app
export { FirebaseService };
