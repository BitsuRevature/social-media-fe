import { initializeApp, getApp } from 'firebase/app'
import { getStorage } from 'firebase/storage';
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from './firebaseConfig';


const app = initializeApp(firebaseConfig);
const storage = getStorage();
const firestore = getFirestore();

export {storage}