// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBOkX8-mNS9YjeHZAziIRPb26aOJXgDgzU",
  authDomain: "checklist-859b4.firebaseapp.com",
  projectId: "checklist-859b4",
  storageBucket: "checklist-859b4.appspot.com",
  messagingSenderId: "939429794024",
  appId: "1:939429794024:web:a68bb2e27e39b7d747795d",
  measurementId: "G-WRP1VS9RKB",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
