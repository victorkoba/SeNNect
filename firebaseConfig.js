// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCs4vqJ_LnaS7Wzcsl4wiYQD9SvVx2OWRE",
  authDomain: "sennect-f6466.firebaseapp.com",
  projectId: "sennect-f6466",
  storageBucket: "sennect-f6466.firebasestorage.app",
  messagingSenderId: "590976351392",
  appId: "1:590976351392:web:83082017c03201d031ddc5",
  measurementId: "G-R0PF7F946J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);