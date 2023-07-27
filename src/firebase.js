// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB0KyZwOxK1Lf4Whb3Y0_1vcnf87YSlDHI",
  authDomain: "creative-tech-index.firebaseapp.com",
  projectId: "creative-tech-index",
  storageBucket: "creative-tech-index.appspot.com",
  messagingSenderId: "863858848955",
  appId: "1:863858848955:web:77046b6cce20583ffc259e",
  measurementId: "G-PKVNFKYRXG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.setPersistence(browserLocalPersistence)
  .then(() => {
    console.log('Persistence is set to "LOCAL".');
  })
  .catch((error) => {
    console.error('Error setting persistence', error);
  });

const provider = new GoogleAuthProvider();
const db = getFirestore(app);


export { auth, provider, db };