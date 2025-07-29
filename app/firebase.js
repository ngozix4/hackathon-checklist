// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBOkX8-mNS9YjeHZAziIRPb26aOJXgDgzU",
  authDomain: "checklist-859b4.firebaseapp.com",
  projectId: "checklist-859b4",
  storageBucket: "checklist-859b4.firebasestorage.app",
  messagingSenderId: "939429794024",
  appId: "1:939429794024:web:a68bb2e27e39b7d747795d",
  measurementId: "G-WRP1VS9RKB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);