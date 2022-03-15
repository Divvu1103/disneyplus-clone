// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJ-pegDoBTsloeHuyZMrocpV0QZ4xiNY8",
  authDomain: "disneyplusclone-47841.firebaseapp.com",
  projectId: "disneyplusclone-47841",
  storageBucket: "disneyplusclone-47841.appspot.com",
  messagingSenderId: "136080916275",
  appId: "1:136080916275:web:316331a36281145feb8846"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase
// const firebaseApp = firebase.initializeApp(firebaseConfig);
// const db = firebaseApp.firestore()
const db = getFirestore();
 const auth = getAuth();
 const provider = new GoogleAuthProvider();
 const storage = getStorage(firebaseApp);



export { auth, provider,storage};
export default db;
