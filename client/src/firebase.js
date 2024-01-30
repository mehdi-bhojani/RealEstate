// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-bhojani.firebaseapp.com",
  projectId: "mern-estate-bhojani",
  storageBucket: "mern-estate-bhojani.appspot.com",
  messagingSenderId: "901206691705",
  appId: "1:901206691705:web:a98bdd00ccdc0c394b29a8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);