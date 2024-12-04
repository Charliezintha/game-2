import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getFirestore, collection, query, orderBy, getDocs, addDoc, doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBeyprwZfZY-oc0XmppajhsgvNbNAYjWsA",
  authDomain: "game-515dd.firebaseapp.com",
  projectId: "game-515dd",
  storageBucket: "game-515dd.firebasestorage.app",
  messagingSenderId: "214886753027",
  appId: "1:214886753027:web:5026c11421a381f5c47f36"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app);

export {auth ,db ,collection, query, orderBy, getDocs, addDoc, doc, getDoc, updateDoc, setDoc};

