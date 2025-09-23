
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthLayout from '../../layout/AuthLayout';
import Button from '../../components/ui/Button';
import { useAuth } from '../../hooks/useAuth';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('patient'); 
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { user, login } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            if (user.role === 'patient') {
                navigate('/patient/dashboard');
            } else if (user.role === 'doctor') {
                navigate('/doctor/dashboard');
            }
        }
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const loggedInUser = await login(email, password, role);
            if (loggedInUser.role === 'patient') {
                navigate('/patient/dashboard');
            } else if (loggedInUser.role === 'doctor') {
                navigate('/doctor/dashboard');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout>
            <div className="text-center mb-4">
                <div className="mb-3">
                    <i className="fas fa-hospital fa-3x text-primary"></i>
                </div>
                <h2 className="text-primary fw-bold">Welcome Back</h2>
                <p className="text-muted">Sign in to your HMS account</p>
            </div>
            
            {error && (
                <div className="alert alert-danger rounded-md fade-in">
                    <i className="fas fa-exclamation-triangle me-2"></i>
                    {error}
                </div>
            )}
            
            <form onSubmit={handleSubmit} className="fade-in">
                <div className="mb-4">
                    <label htmlFor="emailInput" className="form-label">
                        <i className="fas fa-envelope me-2 text-primary"></i>
                        Email Address
                    </label>
                    <input
                        type="email"
                        className="form-control rounded-md"
                        id="emailInput"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                
                <div className="mb-4">
                    <label htmlFor="passwordInput" className="form-label">
                        <i className="fas fa-lock me-2 text-primary"></i>
                        Password
                    </label>
                    <input
                        type="password"
                        className="form-control rounded-md"
                        id="passwordInput"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                
                <div className="mb-4">
                    <label htmlFor="roleSelect" className="form-label">
                        <i className="fas fa-user-tag me-2 text-primary"></i>
                        Login As
                    </label>
                    <select
                        id="roleSelect"
                        className="form-select rounded-md"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value="patient">
                            <i className="fas fa-user-injured me-2"></i>
                            Patient
                        </option>
                        <option value="doctor">
                            <i className="fas fa-user-md me-2"></i>
                            Doctor
                        </option>
                    </select>
                </div>
                
                <Button 
                    type="submit" 
                    variant="primary" 
                    className="w-100 rounded-md fw-bold py-3" 
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Signing In...
                        </>
                    ) : (
                        <>
                            <i className="fas fa-sign-in-alt me-2"></i>
                            Sign In
                        </>
                    )}
                </Button>
            </form>
            
            <div className="text-center mt-4 fade-in">
                <p className="text-muted mb-0">
                    Don't have an account? 
                    <Link to="/signup" className="text-primary no-underline fw-bold ms-1">
                        Create Account
                    </Link>
                </p>
            </div>
        </AuthLayout>
    );
};

export default LoginPage;
