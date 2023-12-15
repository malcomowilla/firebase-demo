





import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'



const firebaseConfig = {
  apiKey: "AIzaSyDsE6gvOfoNcsszPU6O5yG4S8_xUDJFth8",
  authDomain: "fir-demo-71b10.firebaseapp.com",
  projectId: "fir-demo-71b10",
  storageBucket: "fir-demo-71b10.appspot.com",
  messagingSenderId: "30543118361",
  appId: "1:30543118361:web:52e2a11afb1ee5dc00aa88",
  measurementId: "G-9P3PLLK3Y7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleAuth = new GoogleAuthProvider() 
export const db = getFirestore(app)
export const storage = getStorage(app)
































