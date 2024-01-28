// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore'
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmtPw8eXCRNHmLcqqVr9sHULJZnj6OhE4",
  authDomain: "wingmates-91e5d.firebaseapp.com",
  projectId: "wingmates-91e5d",
  storageBucket: "wingmates-91e5d.appspot.com",
  messagingSenderId: "754168433915",
  appId: "1:754168433915:web:30c373c924874efc3b745e",
  measurementId: "G-WKH4NSHD1Z"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export {firebase}
//const analytics = getAnalytics(app);