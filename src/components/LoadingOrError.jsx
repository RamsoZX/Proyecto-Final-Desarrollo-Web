import React from 'react';
import { Alert, Spinner } from 'react-bootstrap';

const LoadingOrError = ({ isLoading, error }) => {
    if (isLoading) {
        return (
            <div className="d-flex justify-content-center mt-5">
                <Spinner animation="border" variant="primary" />
                <span className="ms-3">Cargando datos...</span>
            </div>
        );
    }
    if (error) {
        return <Alert variant="danger" className="mt-4">Error: {error}</Alert>;
    }
    return null;
};

export default LoadingOrError;