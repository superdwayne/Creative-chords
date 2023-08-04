// Import and configure the Firebase SDK
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyB0KyZwOxK1Lf4Whb3Y0_1vcnf87YSlDHI",
  authDomain: "creative-tech-index.firebaseapp.com",
  projectId: "creative-tech-index",
  storageBucket: "creative-tech-index.appspot.com",
  messagingSenderId: "863858848955",
  appId: "1:863858848955:web:77046b6cce20583ffc259e",
  measurementId: "G-PKVNFKYRXG"
});

const messaging = firebase.messaging();
