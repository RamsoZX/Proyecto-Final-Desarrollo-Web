import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

// Definición de campos fuera del componente
const TASK_FIELDS = {
    title: { label: "Título de la Tarea", required: "El título es obligatorio.", maxLength: 50 },
    description: { label: "Descripción", required: "La descripción es obligatoria.", maxLength: 200 },
    priority: { label: "Prioridad", required: "La prioridad es obligatoria.", options: ['Baja', 'Media', 'Alta'] },
    dueDate: { label: "Fecha Límite", required: "La fecha límite es obligatoria.", type: "date" }
};

const TaskFormPage = ({ tasks, updateTask, createTask }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const isEditing = !!id;
    
    const taskToEdit = isEditing ? tasks.find(t => t.id === id) : null;

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: taskToEdit || {
            title: '',
            description: '',
            priority: TASK_FIELDS.priority.options[0],
            dueDate: new Date().toISOString().substring(0, 10),
        }
    });

    // Carga los datos de la tarea a editar al cambiar el ID
    useEffect(() => {
        if (isEditing && taskToEdit) {
            // Formatea la fecha para el input type="date"
            const dateOnly = taskToEdit.dueDate ? new Date(taskToEdit.dueDate).toISOString().substring(0, 10) : new Date().toISOString().substring(0, 10);
            reset({ ...taskToEdit, dueDate: dateOnly });
        } else if (!isEditing) {
             // Reinicia el formulario si estamos en modo creación
             const defaultDate = new Date().toISOString().substring(0, 10);
             reset({
                title: '',
                description: '',
                priority: TASK_FIELDS.priority.options[0],
                dueDate: defaultDate,
            });
        }
    }, [taskToEdit, isEditing, reset]);


    const onSubmit = async (data) => {
        setIsSubmitting(true);
        setSubmitError(null);
        try {
            // Convertimos la fecha a formato ISO string antes de guardar
            const submissionData = { ...data, dueDate: new Date(data.dueDate).toISOString() };
            
            if (isEditing) {
                await updateTask(id, submissionData);
            } else {
                await createTask(submissionData);
            }
            navigate('/'); // Redirige al listado después del éxito
        } catch (error) {
            setSubmitError(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isEditing && !taskToEdit) {
         // Maneja el estado de carga o tarea no encontrada durante la edición
        return (
            <div className="d-flex justify-content-center mt-5">
                <Spinner animation="border" variant="primary" />
                <span className="ms-3">Cargando tarea para editar...</span>
            </div>
        );
    }
    
    // Función de utilidad para determinar el color de la cabecera
    const getCardHeaderColor = () => {
        if (isEditing) {
            // Para edición, usa un color que combine con tu paleta (ej. Steel Blue)
            return '#669BBC';
        } else {
            // Para creación, usa el color principal de la paleta (ej. Navy)
            return '#003049';
        }
    };


    return (
        <Container className="my-5" style={{ maxWidth: '600px' }}>
            <Card className="shadow-lg task-card">
                <Card.Header style={{ backgroundColor: getCardHeaderColor() }} className="text-white text-center p-3">
                    <h2 className="mb-0">{isEditing ? '🖊️ Editar Tarea Existente' : '✨ Crear Nueva Tarea'}</h2>
                </Card.Header>
                <Card.Body>
                    {submitError && <Alert variant="danger">{submitError}</Alert>}
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-bold">{TASK_FIELDS.title.label}</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ej: Pagar el recibo de luz"
                                {...register("title", {
                                    required: TASK_FIELDS.title.required,
                                    maxLength: { value: TASK_FIELDS.maxLength, message: `Máximo ${TASK_FIELDS.maxLength} caracteres.` }
                                })}
                                isInvalid={!!errors.title}
                            />
                            <Form.Control.Feedback type="invalid">{errors.title?.message}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className="fw-bold">{TASK_FIELDS.description.label}</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Detalles de la tarea..."
                                {...register("description", {
                                    required: TASK_FIELDS.description.required,
                                    maxLength: { value: TASK_FIELDS.description.maxLength, message: `Máximo ${TASK_FIELDS.description.maxLength} caracteres.` }
                                })}
                                isInvalid={!!errors.description}
                            />
                            <Form.Control.Feedback type="invalid">{errors.description?.message}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className="fw-bold">{TASK_FIELDS.priority.label}</Form.Label>
                            <Form.Select
                                {...register("priority", { required: TASK_FIELDS.priority.required })}
                                isInvalid={!!errors.priority}
                            >
                                {TASK_FIELDS.priority.options.map(option => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">{errors.priority?.message}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className="fw-bold">{TASK_FIELDS.dueDate.label}</Form.Label>
                            <Form.Control
                                type="date"
                                {...register("dueDate", { required: TASK_FIELDS.dueDate.required })}
                                isInvalid={!!errors.dueDate}
                            />
                            <Form.Control.Feedback type="invalid">{errors.dueDate?.message}</Form.Control.Feedback>
                        </Form.Group>

                        <div className="d-grid gap-2 mt-4">
                            <Button 
                                className={`btn-action ${isEditing ? 'btn-edit' : 'btn-detail'}`} 
                                type="submit" 
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? <Spinner animation="border" size="sm" /> : (isEditing ? 'Guardar Cambios' : 'Crear Tarea')}
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default TaskFormPage;