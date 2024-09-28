// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAvQpfdrAPQuDy4TcMm6hN7dKQYyJ4OdfM",
  authDomain: "crm-api-19c66.firebaseapp.com",
  projectId: "crm-api-19c66",
  storageBucket: "crm-api-19c66.appspot.com",
  messagingSenderId: "332755026794",
  appId: "1:332755026794:web:bcd6382d1ad2f031d41b13",
  measurementId: "G-3M81G07XXZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = getFirestore(app)
