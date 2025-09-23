import React from 'react';
import Header from '../components/common/Header';  
 
const AuthLayout = ({ children }) => {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />
            <main className="flex-grow-1 d-flex justify-content-center align-items-center p-4">
                <div className="position-relative w-100" style={{ maxWidth: '500px' }}>
                    <div className="position-absolute top-0 start-0 w-100 h-100" style={{ zIndex: -1 }}>
                        <div className="position-absolute top-0 start-0 w-100 h-100 bg-primary opacity-10 rounded-4"></div>
                        <div className="position-absolute top-50 start-50 translate-middle">
                            <i className="fas fa-heartbeat fa-10x text-primary opacity-5"></i>
                        </div>
                    </div>
                    
                    <div className="card shadow-lg rounded-lg border-0 fade-in">
                        <div className="card-header text-center border-0 pb-0">
                            <div className="mb-3">
                                <div className="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center" 
                                     style={{ width: '80px', height: '80px' }}>
                                    <i className="fas fa-hospital fa-2x text-white"></i>
                                </div>
                            </div>
                        </div>
                        <div className="card-body p-5">
                            {children}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AuthLayout;
