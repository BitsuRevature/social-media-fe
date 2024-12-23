import { initializeApp, getApp } from 'firebase/app'
import { getStorage } from 'firebase/storage';
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {

    apiKey: import.meta.env.VITE_FIREBASE_apiKey,
  
    authDomain: import.meta.env.VITE_FIREBASE_authDomain,
  
    projectId: import.meta.env.VITE_FIREBASE_projectId,
  
    storageBucket: import.meta.env.VITE_FIREBASE_storageBucket,
  
    messagingSenderId: import.meta.env.VITE_FIREBASE_messagingSenderId,
  
    appId: import.meta.env.VITE_FIREBASE_appId
  
  };
  
  


const app = initializeApp(firebaseConfig);
const storage = getStorage();
const firestore = getFirestore();

export {storage}