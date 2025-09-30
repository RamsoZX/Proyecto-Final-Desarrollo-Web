import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCkpV7WNbt0SGZyJKJBCIVwaiSSudgKnYs",
  authDomain: "mi-app-de-tareas-b51c0.firebaseapp.com",
  projectId: "mi-app-de-tareas-b51c0",
  storageBucket: "mi-app-de-tareas-b51c0.firebasestorage.app",
  messagingSenderId: "441650271595",
  appId: "1:441650271595:web:4e5d01e0ca410b55d1282e"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
