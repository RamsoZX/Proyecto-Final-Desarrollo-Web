import React from 'react';
import { Container, Alert, Spinner, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const HomePage = ({ tasks, isLoading, error, deleteTask, updateTask }) => {

    const getCardVariant = (task) => {
        if (task.completed) return 'success';
        switch (task.priority) {
            case 'Alta': return 'danger';
            case 'Media': return 'warning';
            case 'Baja': return 'info';
            default: return 'secondary';
        }
    };

    const toggleCompleted = async (taskId, currentStatus) => {
        try {
            await updateTask(taskId, { completed: !currentStatus });
        } catch (err) {
            console.error("Error al cambiar estado:", err);
        }
    };

    const handleDelete = async (taskId, title) => {
        if (window.confirm(`¿Seguro que quieres eliminar la tarea: "${title}"?`)) {
            try {
                await deleteTask(taskId);
            } catch (err) {
                console.error("Error al eliminar:", err);
            }
        }
    };
    
    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        try {
            const datePart = dateString.substring(0, 10);
            return new Date(datePart).toLocaleDateString('es-ES');
        } catch (e) {
            return "N/A";
        }
    };

    if (isLoading) {
        return (
            <div className="d-flex justify-content-center mt-5">
                <Spinner animation="border" variant="primary" />
                <span className="ms-3">Cargando datos...</span>
            </div>
        );
    }
    
    if (error) {
        return <Alert variant="danger" className="mt-4">{error}</Alert>;
    }

    return (
        <Container className="my-5">
            <h1 className="text-center list-title">
                📋 Listado de Tareas ({tasks.filter(t => !t.completed).length} Pendientes)
            </h1>
            
            {!tasks || tasks.length === 0 ? (
                <Alert variant="info" className="text-center p-4 shadow-sm">
                    ¡No tienes tareas aún! Haz clic en <Link to="/create" className="fw-bold">Crear Nueva Tarea</Link> para empezar a organizarte.
                </Alert>
            ) : (
                <div className="d-flex justify-content-center">
                    <div className="row g-4 justify-content-center w-100">
                        {tasks.map((task) => (
                            <div key={task.id} className="col-12 col-sm-6 col-lg-4 col-xl-3 d-flex">
                                <Card 
                                    className={`shadow-sm w-100 task-card ${task.completed ? 'task-completed' : ''} border-${getCardVariant(task)}`}
                                    style={{ minHeight: '250px' }}
                                >
                                    <Card.Header className={`bg-${getCardVariant(task)} text-white d-flex justify-content-between align-items-center p-2`}>
                                        <h5 className="mb-0 text-truncate fs-6">{task.title}</h5>
                                    </Card.Header>
                                    <Card.Body className="d-flex flex-column">
                                        <p className="card-text flex-grow-1 text-truncate-3" style={{ maxHeight: '60px', overflow: 'hidden' }}>
                                            {task.description}
                                        </p>
                                        <small className="text-muted border-top pt-2 mt-auto">Límite: <span className='fw-bold'>{formatDate(task.dueDate)}</span></small>
                                    </Card.Body>
                                    <Card.Footer className="d-flex justify-content-between p-2">
                                        <Button 
                                            variant={task.completed ? 'success' : 'outline-secondary'} 
                                            size="sm"
                                            onClick={() => toggleCompleted(task.id, task.completed)}
                                            className="btn-action"
                                        >
                                            {task.completed ? 'Hecho ✅' : 'Pendiente ⏳'}
                                        </Button>
                                        <div className='d-flex'>
                                            <Button 
                                                variant="outline-primary" 
                                                size="sm" 
                                                className="me-2 btn-action"
                                                as={Link}
                                                to={`/detail/${task.id}`}
                                            >
                                                Detalle
                                            </Button>
                                            <Button 
                                                variant="outline-danger" 
                                                size="sm"
                                                onClick={() => handleDelete(task.id, task.title)}
                                                className="btn-action"
                                            >
                                                🗑️
                                            </Button>
                                        </div>
                                    </Card.Footer>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </Container>
    );
};

export default HomePage;