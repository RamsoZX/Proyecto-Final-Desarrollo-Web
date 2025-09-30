import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importaciones de Estilos y Firebase/Bootstrap (se gestionan en el componente principal)
import './App.css'; // Importación de estilos globales (que crearemos en el siguiente paso)

// Importar los componentes principales (de la carpeta components)
import AppNavbar from './components/Navbar';
import AppFooter from './components/Footer';

// Importar las páginas (vistas) (de la carpeta pages)
import HomePage from './pages/HomePage';
import TaskFormPage from './pages/TaskFormPage';
import TaskDetailPage from './pages/TaskDetailPage';

// Importar el hook de lógica de datos (de la carpeta hooks)
import useTasks from './hooks/useTasks'; 

function App() {
  // Llama al hook personalizado para manejar el estado y el CRUD con Firestore
  const { tasks, isLoading, error, createTask, updateTask, deleteTask } = useTasks();

  return (
    <Router>
      <AppNavbar />
      <main style={{ minHeight: 'calc(100vh - 120px)' }}>
        <Routes>
          {/* Ruta: Listado Principal (READ) */}
          <Route 
            path="/" 
            element={
              <HomePage 
                tasks={tasks} 
                isLoading={isLoading} 
                error={error} 
                deleteTask={deleteTask} 
                updateTask={updateTask} 
              />
            } 
          />

          {/* Ruta: Creación (CREATE) */}
          <Route 
            path="/create" 
            element={<TaskFormPage tasks={tasks} createTask={createTask} />} 
          />

          {/* Ruta: Edición (UPDATE) - Notar el parámetro :id */}
          <Route 
            path="/edit/:id" 
            element={<TaskFormPage tasks={tasks} updateTask={updateTask} />} 
          />

          {/* Ruta: Detalle de Tarea (READ by ID) - Notar el parámetro :id */}
          <Route 
            path="/detail/:id" 
            element={
              <TaskDetailPage 
                tasks={tasks} 
                deleteTask={deleteTask} 
                updateTask={updateTask} 
              />
            } 
          />
        </Routes>
      </main>
      <AppFooter />
    </Router>
  );
}

export default App;
