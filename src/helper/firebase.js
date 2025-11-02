// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAqmQV206ZKuapNZMO277Mk_LlAhzVFS1k",
  authDomain: "mernblogauth-b0771.firebaseapp.com",
  projectId: "mernblogauth-b0771",
  storageBucket: "mernblogauth-b0771.firebasestorage.app",
  messagingSenderId: "554969628745",
  appId: "1:554969628745:web:e670caec78fff6f1c87f98",
  measurementId: "G-J292GTZKD3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();


// console.log(auth, provider);

