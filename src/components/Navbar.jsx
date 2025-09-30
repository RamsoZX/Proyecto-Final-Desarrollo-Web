import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AppNavbar = () => {
    return (
        // Usamos la clase 'navbar-dark' definida en App.css para el color de fondo Azul Marino
        <Navbar expand="lg" className="navbar-dark shadow-lg mb-4">
            <Container>
                <Navbar.Brand as={Link} to="/" className="fw-bold fs-4">
                    📝 Focus List
                </Navbar.Brand>
                {/* El toggle y collapse necesitan 'data-bs-theme' para ser visibles sobre fondo oscuro */}
                <Navbar.Toggle aria-controls="basic-navbar-nav" data-bs-theme="dark" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/" className="fw-bold">
                            Listado
                        </Nav.Link>
                        {/* Estilo inline para el botón 'Nueva Tarea' usando el rojo brillante para que destaque */}
                        <Nav.Link 
                            as={Link} 
                            to="/create" 
                            style={{ color: '#C1121F' }} 
                            className="fw-bold"
                        >
                            + Nueva Tarea
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default AppNavbar;
