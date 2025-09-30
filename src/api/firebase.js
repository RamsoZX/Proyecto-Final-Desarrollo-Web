import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Credenciales de tu proyecto 'mi-app-de-tareas-b51c0'
const firebaseConfig = {
  apiKey: "AIzaSyCkpV7WNbt0SGZyJKJBCIVwaiSSudgKnYs",
  authDomain: "mi-app-de-tareas-b51c0.firebaseapp.com",
  projectId: "mi-app-de-tareas-b51c0",
  storageBucket: "mi-app-de-tareas-b51c0.firebasestorage.app",
  messagingSenderId: "441650271595",
  appId: "1:441650271595:web:4e5d01e0ca410b55d1282e"
};

// Inicializa la aplicación de Firebase
const app = initializeApp(firebaseConfig);

// Inicializa y exporta la instancia de Firestore para usarla en los componentes
const db = getFirestore(app);

export { db };
