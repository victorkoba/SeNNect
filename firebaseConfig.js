// Miguel Francisco da Silva Sales e Victor Luiz Koba Batista
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCs4vqJ_LnaS7Wzcsl4wiYQD9SvVx2OWRE",
  authDomain: "sennect-f6466.firebaseapp.com",
  projectId: "sennect-f6466",
  storageBucket: "sennect-f6466.firebasestorage.app",
  messagingSenderId: "590976351392",
  appId: "1:590976351392:web:83082017c03201d031ddc5",
  measurementId: "G-R0PF7F946J"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);


export { auth, db };