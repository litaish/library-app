import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBp5uN28g0f8GEm0OZzIlTlbOIirXaySE",
  authDomain: "library-app-6f152.firebaseapp.com",
  projectId: "library-app-6f152",
  storageBucket: "library-app-6f152.appspot.com",
  messagingSenderId: "875559363482",
  appId: "1:875559363482:web:8130d5df21e852c9a31023"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);