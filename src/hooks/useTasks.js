/* global __app_id, __firebase_config */
import { useState, useEffect, useCallback } from 'react';
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getFirestore, collection, doc, addDoc, updateDoc, deleteDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// --- CONFIGURACIÓN E INICIALIZACIÓN DE FIREBASE ---
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';

// 1. Cargamos la configuración global y 2. SOBREESCRIBIMOS el projectId
const firebaseConfig = {
  ...JSON.parse(typeof __firebase_config !== 'undefined' ? __firebase_config : '{}'),
  // ID de Proyecto insertado: mi-app-de-tareas-b51c0
  projectId: "mi-app-de-tareas-b51c0" 
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Ruta de colección: /artifacts/{appId}/public/data/tasks
const TASKS_COLLECTION = `artifacts/${appId}/public/data/tasks`;

const useTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // READ (Real-time con onSnapshot)
    useEffect(() => {
        if (!db) {
            setError("Error: La conexión a Firebase no está definida.");
            setIsLoading(false);
            return;
        }

        const tasksRef = collection(db, TASKS_COLLECTION);
        
        const unsubscribe = onSnapshot(tasksRef, (snapshot) => {
            const tasksList = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            
            // Ordenamiento local: Pendientes primero, luego por prioridad (Alta, Media, Baja)
            const priorityOrder = { 'Alta': 1, 'Media': 2, 'Baja': 3 };
            tasksList.sort((a, b) => {
                if (a.completed !== b.completed) { return a.completed ? 1 : -1; }
                return priorityOrder[a.priority] - priorityOrder[b.priority];
            });

            setTasks(tasksList);
            setIsLoading(false);
            setError(null);
        }, (err) => {
            console.error("Error al escuchar cambios en Firestore:", err);
            setError(`No se pudieron cargar las tareas. (ID de App: ${appId})`);
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, []); 

    // CREATE
    const createTask = useCallback(async (data) => {
        try {
            const newTask = { ...data, completed: false, createdAt: new Date().toISOString() };
            await addDoc(collection(db, TASKS_COLLECTION), newTask);
            return true;
        } catch (e) {
            console.error("Error adding document: ", e);
            throw new Error("Error al crear la tarea. Revisa permisos.");
        }
    }, []);

    // UPDATE
    const updateTask = useCallback(async (id, data) => {
        try {
            const taskRef = doc(db, TASKS_COLLECTION, id);
            await updateDoc(taskRef, data);
            return true;
        } catch (e) {
            console.error("Error updating document: ", e);
            throw new Error("Error al actualizar la tarea. Revisa permisos.");
        }
    }, []);

    // DELETE
    const deleteTask = useCallback(async (id) => {
        try {
            await deleteDoc(doc(db, TASKS_COLLECTION, id));
            return true;
        } catch (e) {
            console.error("Error deleting document: ", e);
            throw new Error("Error al eliminar la tarea. Revisa permisos.");
        }
    }, []);
    
    return { tasks, isLoading, error, createTask, updateTask, deleteTask };
};

export default useTasks;
