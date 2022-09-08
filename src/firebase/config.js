// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBYGVu8VAEB5NMIHWZWlcPnXWdxy2oPy6k",
  authDomain: "react-cursos-cefd7.firebaseapp.com",
  projectId: "react-cursos-cefd7",
  storageBucket: "react-cursos-cefd7.appspot.com",
  messagingSenderId: "791578767999",
  appId: "1:791578767999:web:1e278f34d48c135f4b454a"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth( FirebaseApp );

export const FirebaseDB = getFirestore ( FirebaseApp);