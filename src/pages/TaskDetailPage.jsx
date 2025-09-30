import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Container, Card, Button, ListGroup, Alert, Modal, Row, Col } from 'react-bootstrap';
import { FaCalendarAlt, FaTag, FaCheckCircle, FaClock } from 'react-icons/fa'; // Iconos para detalle

const TaskDetailPage = ({ tasks, deleteTask, updateTask }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const task = tasks.find(t => t.id === id);

    if (!task) {
        return <Alert variant="warning" className="m-4">Tarea con ID: **{id}** no encontrada.</Alert>;
    }

    const handleDelete = async () => {
        try {
            await deleteTask(id);
            navigate('/');
        } catch (error) {
            console.error("Error al eliminar:", error);
        }
    };
    
    const toggleCompleted = async () => {
        try {
            await updateTask(id, { completed: !task.completed });
        } catch (error) {
            console.error("Error al cambiar estado:", error);
        }
    };
    
    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        try {
            const datePart = dateString.substring(0, 10);
            return new Date(datePart).toLocaleDateString('es-ES', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });
        } catch (e) {
            return "Fecha inválida";
        }
    };

    // Función para asignar color HEX y etiqueta según prioridad/estado
    const getPriorityStyle = (priority) => {
        switch (priority) {
            case 'Alta': return { color: 'white', backgroundColor: '#dc3545' }; // Rojo Brillante
            case 'Media': return { color: 'white', backgroundColor: '#ffc107' }; // Azul Acero
            case 'Baja': return { color: 'white', backgroundColor: '#0dcaf0' }; // Vino Tinto
            default: return { color: 'white', backgroundColor: '#003049' };
        }
    };
    
    const priorityStyle = getPriorityStyle(task.priority);
    const statusStyle = task.completed 
        ? { color: 'white', backgroundColor: '#198754' } // Éxito de Bootstrap (Verde)
        : { color: 'white', backgroundColor: '#6c757d' }; // Secundario de Bootstrap (Gris)


    return (
        <Container className="my-5" style={{ maxWidth: '800px' }}>
            <Card className="shadow-lg task-card">
                <Card.Header 
                    style={{ backgroundColor: priorityStyle.backgroundColor }} 
                    className="text-white p-4 rounded-top"
                >
                    <h1 className="mb-0 fs-2">{task.title}</h1>
                    <p className="mb-0 mt-2 fs-6 opacity-75">Detalle completo de la tarea</p>
                </Card.Header>
                <Card.Body>
                    <p className="lead border-bottom pb-3 mb-4 fs-5" style={{ color: '#003049' }}>
                        {task.description}
                    </p>
                    
                    <Row className="g-3">
                        {/* Estado */}
                        <Col md={6}>
                            <ListGroup.Item className="d-flex align-items-center rounded shadow-sm" style={{ borderLeft: `5px solid ${statusStyle.backgroundColor}` }}>
                                <FaCheckCircle className="me-3 fs-4" style={{ color: statusStyle.backgroundColor }} />
                                <div>
                                    <small className="text-muted">Estado</small>
                                    <h5 className="mb-0">
                                        {task.completed ? 'Completada ✅' : 'Pendiente ⏳'}
                                    </h5>
                                </div>
                            </ListGroup.Item>
                        </Col>
                        
                        {/* Prioridad */}
                        <Col md={6}>
                            <ListGroup.Item className="d-flex align-items-center rounded shadow-sm" style={{ borderLeft: `5px solid ${priorityStyle.backgroundColor}` }}>
                                <FaTag className="me-3 fs-4" style={{ color: priorityStyle.backgroundColor }} />
                                <div>
                                    <small className="text-muted">Prioridad</small>
                                    <h5 className="mb-0">{task.priority}</h5>
                                </div>
                            </ListGroup.Item>
                        </Col>
                        
                        {/* Fecha Límite */}
                        <Col md={12}>
                             <ListGroup.Item className="d-flex align-items-center rounded shadow-sm" style={{ borderLeft: '5px solid #669BBC' }}>
                                <FaCalendarAlt className="me-3 fs-4" style={{ color: '#669BBC' }} />
                                <div>
                                    <small className="text-muted">Fecha Límite</small>
                                    <h5 className="mb-0">{formatDate(task.dueDate)}</h5>
                                </div>
                            </ListGroup.Item>
                        </Col>
                    </Row>
                    
                </Card.Body>
                <Card.Footer className="d-flex justify-content-between p-3">
                    <Button 
                        variant="outline-primary" 
                        onClick={toggleCompleted}
                        className="btn-action btn-detail" // Reusa el estilo de 'detalle' para darle color
                    >
                        <FaClock className="me-2" />
                        {task.completed ? 'Marcar como Pendiente' : 'Marcar como Completada'}
                    </Button>
                    <div>
                        <Button 
                            className="me-2 btn-action btn-edit" 
                            as={Link} 
                            to={`/edit/${task.id}`}
                        >
                            Editar
                        </Button>
                        <Button 
                            onClick={() => setShowDeleteModal(true)}
                            className="btn-action btn-delete"
                        >
                            Eliminar
                        </Button>
                    </div>
                </Card.Footer>
            </Card>
            
            <Button variant="secondary" className="mt-4 btn-action btn-cancel" onClick={() => navigate('/')}>
                ← Volver al Listado
            </Button>

            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Eliminación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Estás seguro que deseas eliminar la tarea "<strong>{task.title}</strong>"?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancelar</Button>
                    <Button variant="danger" onClick={handleDelete}>Eliminar Tarea</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default TaskDetailPage;
