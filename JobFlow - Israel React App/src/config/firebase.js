import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// import { getFirestore, collection, getDocs } from  "firebase/firestore"; 
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR CONFIG HERE",
  authDomain: "YOUR CONFIG HERE",
  projectId: "YOUR CONFIG HERE",
  storageBucket: "YOUR CONFIG HERE",
  messagingSenderId: "YOUR CONFIG HERE",
  appId: "YOUR CONFIG HERE",
  measurementId: "YOUR CONFIG HERE"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);