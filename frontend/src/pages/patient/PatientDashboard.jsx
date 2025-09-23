
import React, { useState, useEffect } from 'react';
import MainLayout from '../../layout/MainLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { useAuth } from '../../hooks/useAuth';
import { getPatientUpcomingAppointments, deleteAppointment } from '../../api/commonApi';
import { useNavigate } from 'react-router-dom';

const PatientDashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [upcomingAppointments, setUpcomingAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [deleteSuccess, setDeleteSuccess] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [appointmentToDelete, setAppointmentToDelete] = useState(null);

    const fetchUpcomingAppointments = async () => {
        setLoading(true);
        setError('');
        try {
            const res = await getPatientUpcomingAppointments(user.token);
            setUpcomingAppointments(res.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch upcoming appointments.');
            setUpcomingAppointments([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user && user.role === 'patient') {
            fetchUpcomingAppointments();
        }
    }, [user]);

    const handleDeleteClick = (appointment) => {
        setAppointmentToDelete(appointment);
        setShowModal(true);
    };

    const confirmDelete = async () => {
        if (appointmentToDelete) {
            setLoading(true);
            setError('');
            setDeleteSuccess('');
            try {
                await deleteAppointment(appointmentToDelete._id, user.token);
                setDeleteSuccess('Appointment deleted successfully!');
                setAppointmentToDelete(null);
                setShowModal(false);
                fetchUpcomingAppointments(); 
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to delete appointment.');
            } finally {
                setLoading(false);
            }
        }
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <MainLayout>
            <div className="fade-in">
                {/* Header Section */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h1 className="h2 fw-bold text-primary mb-2">
                            <i className="fas fa-hospital-user me-3"></i>
                            Patient Dashboard
                        </h1>
                        <p className="text-muted mb-0">Welcome back, {user?.name || user?.email}</p>
                    </div>
                    <Button 
                        variant="primary" 
                        onClick={() => navigate('/patient/book-appointment')}
                        className="fw-bold"
                    >
                        <i className="fas fa-calendar-plus me-2"></i> Book New Appointment
                    </Button>
                </div>

                {/* Stats Cards */}
                <div className="row mb-4">
                    <div className="col-md-4 mb-3">
                        <div className="dashboard-card success text-center">
                            <div className="stats-number">{upcomingAppointments.length}</div>
                            <div className="stats-label">Upcoming Appointments</div>
                        </div>
                    </div> 
                </div>

                {/* Alerts */}
                {error && (
                    <div className="alert alert-danger rounded-md mb-4 fade-in">
                        <i className="fas fa-exclamation-triangle me-2"></i>
                        {error}
                    </div>
                )}
                {deleteSuccess && (
                    <div className="alert alert-success rounded-md mb-4 fade-in">
                        <i className="fas fa-check-circle me-2"></i>
                        {deleteSuccess}
                    </div>
                )}

                {/* Appointments Card */}
                <Card title={
                    <div className="d-flex align-items-center">
                        <i className="fas fa-calendar-check me-2 text-primary"></i>
                        My Upcoming Appointments
                    </div>
                }>
                    {upcomingAppointments.length === 0 ? (
                        <div className="text-center py-5">
                            <i className="fas fa-calendar-times fa-3x text-muted mb-3"></i>
                            <p className="text-muted h5">No upcoming appointments found</p>
                            <Button 
                                variant="outline-primary" 
                                onClick={() => navigate('/patient/book-appointment')}
                                className="mt-2"
                            >
                                <i className="fas fa-plus me-2"></i>Book Your First Appointment
                            </Button>
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-hover rounded-md overflow-hidden">
                                <thead>
                                    <tr>
                                        <th scope="col">
                                            <i className="fas fa-calendar me-2"></i>Date
                                        </th>
                                        <th scope="col">
                                            <i className="fas fa-clock me-2"></i>Time
                                        </th>
                                        <th scope="col">
                                            <i className="fas fa-user-md me-2"></i>Doctor
                                        </th>
                                        <th scope="col">
                                            <i className="fas fa-stethoscope me-2"></i>Specialization
                                        </th>
                                        <th scope="col">
                                            <i className="fas fa-notes-medical me-2"></i>Disease
                                        </th>
                                        <th scope="col">
                                            <i className="fas fa-cogs me-2"></i>Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {upcomingAppointments.map((appointment) => (
                                        <tr key={appointment._id} className="fade-in">
                                            <td>
                                                <span className="badge bg-primary rounded-pill">
                                                    {new Date(appointment.date).toLocaleDateString()}
                                                </span>
                                            </td>
                                            <td>
                                                <span className="badge bg-info rounded-pill">
                                                    {appointment.time}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <i className="fas fa-user-md me-2 text-primary"></i>
                                                    {appointment.doctor?.name || 'N/A'}
                                                </div>
                                            </td>
                                            <td>
                                                <span className="text-muted">
                                                    {appointment.doctor?.specialization || 'N/A'}
                                                </span>
                                            </td>
                                            <td>
                                                <span className="text-muted">
                                                    {appointment.disease}
                                                </span>
                                            </td>
                                            <td>
                                                <Button
                                                    variant="danger"
                                                    size="sm"
                                                    onClick={() => handleDeleteClick(appointment)}
                                                    className="rounded-pill"
                                                >
                                                    <i className="fas fa-trash-alt me-1"></i> Delete
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </Card>
            </div>

            {/* Delete Confirmation Modal */}
            {showModal && (
                <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content rounded-lg">
                            <div className="modal-header bg-warning text-white rounded-t-lg">
                                <h5 className="modal-title">
                                    <i className="fas fa-exclamation-triangle me-2"></i>
                                    Confirm Deletion
                                </h5>
                                <button type="button" className="btn-close text-white" onClick={() => setShowModal(false)} aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <p className="mb-0">
                                    Are you sure you want to delete your appointment with 
                                    <strong> Dr. {appointmentToDelete?.doctor?.name || 'N/A'}</strong> on 
                                    <strong> {new Date(appointmentToDelete?.date).toLocaleDateString()}</strong> at 
                                    <strong> {appointmentToDelete?.time}</strong>?
                                </p>
                                <div className="alert alert-warning mt-3 mb-0">
                                    <i className="fas fa-info-circle me-2"></i>
                                    This action cannot be undone.
                                </div>
                            </div>
                            <div className="modal-footer">
                                <Button variant="secondary" onClick={() => setShowModal(false)}>
                                    <i className="fas fa-times me-2"></i>Cancel
                                </Button>
                                <Button variant="danger" onClick={confirmDelete} disabled={loading}>
                                    {loading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                            Deleting...
                                        </>
                                    ) : (
                                        <>
                                            <i className="fas fa-trash-alt me-2"></i>Delete Appointment
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </MainLayout>
    );
};

export default PatientDashboard;
