import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';

const AppFooter = () => {
    const currentYear = new Date().getFullYear();
    
    const footerStyle = {
        backgroundColor: '#003049',
        color: '#FDF0D5',
        padding: '1.5rem 0',
        fontSize: '0.9rem',
    };

    const iconStyle = {
        color: '#FDF0D5',
        fontSize: '1.5rem',
        margin: '0 10px',
        transition: 'transform 0.3s ease, color 0.3s ease',
    };
    
    return (
        <footer style={footerStyle} className="mt-5 shadow-lg">
            <Container>
                <Row className="text-center align-items-center">
                    <Col md={4} className="mb-2 mb-md-0">
                        <Link to="/" style={{ color: '#C1121F', textDecoration: 'none', fontWeight: 'bold' }}>
                            Gestor de Tareas v1.0
                        </Link>
                    </Col>
                    <Col md={4} className="mb-2 mb-md-0">
                        &copy; {currentYear} Desarrollado por Osmar Villagran con React & Firebase
                    </Col>
                    <Col md={4} className="d-flex justify-content-center">
                        <a href="https://www.linkedin.com/in/tu-perfil/" target="_blank" rel="noopener noreferrer">
                            <FaLinkedin style={iconStyle} />
                        </a>
                        <a href="https://github.com/RamsoZX" target="_blank" rel="noopener noreferrer">
                            <FaGithub style={iconStyle} />
                        </a>
                        <a href="https://www.instagram.com/omarxero/" target="_blank" rel="noopener noreferrer">
                            <FaInstagram style={iconStyle} />
                        </a>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default AppFooter;