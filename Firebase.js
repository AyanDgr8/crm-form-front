// src/Firebase.js

// import firebase from "./Firebase";
import "firebase/firestore";

import { initializeApp } from "firebase/app";
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
} from "firebase/auth";
import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc,
} from "firebase/firestore";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCpzaMC4YbNNq5VhNXTkE3ECckpPm6HXxI",
    authDomain: "multycomm-ed67c.firebaseapp.com",
    projectId: "multycomm-ed67c",
    storageBucket: "multycomm-ed67c.appspot.com",
    messagingSenderId: "800719331466",
    appId: "1:800719331466:web:a49e6950a3a6e8c0ac8d73",
    measurementId: "G-83VY7RRSVR"
  };

  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)
  const db = getFirestore(app)
  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = async () =>{
    try{
        const response = await signInWithPopup(auth, googleProvider)
        const user = response.user 
        const q = query(collection(db, "users"), where ("uid", "==", user.uid))
        const docs = await getDocs(q)
        if(docs.docs.length === 0){
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email,
                })
        }

    } catch(error){
        console.log(error.message);
        alert(error.message);

    }
  };

const logInWithEmailAndPassword = async (email,password) =>{
    try {
        await signInWithEmailAndPassword(auth,email,password)
    } catch(error){
        console.log(error.message);
    }
}

const registerWithEmailAndPassword = async(name,email, password) => {
    try{
        const response = await createUserWithEmailAndPassword(auth, email, password)
        const user = response.user
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        })
    } catch(error){
        console.log(error.message);
    }
};

const sendPasswordReset = async(email) => {
    try {
        await sendPasswordResetEmail(auth,email)
        alert("Password reset link sent!");
    } catch(error){
        console.log(error.message);
    }
}

const logOut = () =>{
    signOut(auth);
}


export {
    auth, db, 
    signInWithGoogle, 
    logInWithEmailAndPassword, 
    registerWithEmailAndPassword,
    sendPasswordReset,
    logOut,
}  