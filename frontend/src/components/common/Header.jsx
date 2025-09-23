import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Header = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');  
    };

    return (
        <header className="bg-primary text-white p-3 shadow-lg">
            <div className="container d-flex justify-content-between align-items-center">
                <Link to="/" className="text-decoration-none">
                    <div className="d-flex align-items-center">
                        <i className="fas fa-hospital fa-2x text-white me-3"></i>
                        <span className="h3 fw-bold text-white mb-0">HMS</span>
                    </div>
                </Link>
                
                <nav>
                    <ul className="navbar-nav flex-row list-unstyled mb-0">
                        {user ? (
                            <>
                                <li className="nav-item me-3">
                                    <span className="text-white d-flex align-items-center">
                                        <i className="fas fa-user-circle me-2"></i>
                                        Welcome, {user.name || user.email} 
                                        <span className="badge bg-light text-primary ms-2 text-uppercase">
                                            {user.role}
                                        </span>
                                    </span>
                                </li>
                                <li className="nav-item">
                                    <button
                                        onClick={handleLogout}
                                        className="btn btn-outline-light btn-sm rounded-md"
                                    >
                                        <i className="fas fa-sign-out-alt me-1"></i> Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item me-2">
                                    <Link to="/login" className="btn btn-outline-light btn-sm rounded-md">
                                        <i className="fas fa-sign-in-alt me-1"></i> Login
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/signup" className="btn btn-outline-light btn-sm rounded-md">
                                        <i className="fas fa-user-plus me-1"></i> Signup
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
