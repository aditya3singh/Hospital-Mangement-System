import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Navbar = () => {
    const { user, logout } = useAuth();
 
    const renderNavLinks = () => {
        if (!user) {
            return null;  
        }

        if (user.role === 'patient') {
            return (
                <>
                    <li className="nav-item">
                        <Link to="/patient/dashboard" className="nav-link text-white no-underline">
                            <i className="fas fa-hospital-user me-2"></i> My Dashboard
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/patient/book-appointment" className="nav-link text-white no-underline">
                            <i className="fas fa-calendar-plus me-2"></i> Book Appointment
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/patient/records" className="nav-link text-white no-underline">
                            <i className="fas fa-history me-2"></i> My Previous Records
                        </Link>
                    </li>
                </>
            );
        } else if (user.role === 'doctor') {
            return (
                <>
                    <li className="nav-item">
                        <Link to="/doctor/dashboard" className="nav-link text-white no-underline">
                            <i className="fas fa-user-md me-2"></i> My Dashboard
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/doctor/records" className="nav-link text-white no-underline">
                            <i className="fas fa-file-medical me-2"></i> My Patient Records
                        </Link>
                    </li>
                </>
            );
        }
        return null;
    };

    const handleLogout = () => {
        logout();
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <i className="fas fa-hospital me-2"></i>
                    HMS - Hospital Management System
                </Link>
                
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        {renderNavLinks()}
                    </ul>
                    
                    {user && (
                        <div className="navbar-nav ms-auto">
                            <div className="nav-item dropdown">
                                <a 
                                    className="nav-link dropdown-toggle text-white" 
                                    href="#" 
                                    role="button" 
                                    data-bs-toggle="dropdown" 
                                    aria-expanded="false"
                                >
                                    <i className="fas fa-user-circle me-2"></i>
                                    {user.name || user.email}
                                </a>
                                <ul className="dropdown-menu dropdown-menu-end">
                                    <li>
                                        <button 
                                            className="dropdown-item" 
                                            onClick={handleLogout}
                                        >
                                            <i className="fas fa-sign-out-alt me-2"></i>
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
