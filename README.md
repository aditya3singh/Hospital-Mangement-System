# Hospital Management System

A full-stack web application for managing hospital operations, including patient registration, doctor profiles, appointment scheduling, and medical records.

## 📋 Overview

The Hospital Management System is a comprehensive solution designed to streamline hospital operations by providing an easy-to-use platform for:
- **Patient Management**: Register and manage patient profiles
- **Doctor Management**: Maintain doctor profiles and specializations
- **Appointment Scheduling**: Book and manage appointments between patients and doctors
- **Medical Records**: Store and retrieve patient medical records and treatment history

## 🏗️ Architecture

### Tech Stack

**Backend:**
- Node.js with Express.js
- MongoDB (via Mongoose)
- JWT for authentication
- bcryptjs for password hashing
- CORS for cross-origin requests

**Frontend:**
- React 19
- Vite (build tool)
- React Router DOM for navigation
- Axios for API requests
- Bootstrap 5 for UI styling
- React DatePicker for appointment scheduling

## 📁 Project Structure

```
hospital_sys/
├── backend/
│   ├── config/              # Configuration files
│   │   ├── db.js           # MongoDB connection
│   │   └── jwt.js          # JWT setup
│   ├── controllers/         # Route handlers
│   │   ├── authController.js
│   │   ├── appointmentController.js
│   │   ├── doctorController.js
│   │   └── patientController.js
│   ├── middlewares/         # Custom middlewares
│   │   ├── authMiddleware.js
│   │   └── errorHandler.js
│   ├── models/              # Database schemas
│   │   ├── User.js
│   │   ├── PatientProfile.js
│   │   ├── DoctorProfile.js
│   │   ├── Appointment.js
│   │   └── Record.js
│   ├── routes/              # API endpoints
│   │   ├── authRoutes.js
│   │   ├── patientRoutes.js
│   │   ├── doctorRoutes.js
│   │   └── appointmentRoutes.js
│   ├── server.js            # Express server entry point
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── api/             # API integration
    │   │   ├── authApi.jsx
    │   │   ├── commonApi.jsx
    │   │   ├── doctorApi.jsx
    │   │   └── patientApi.jsx
    │   ├── assets/          # Static assets
    │   │   └── styles/
    │   ├── components/      # React components
    │   │   ├── common/      # Shared components
    │   │   │   ├── Header.jsx
    │   │   │   ├── Navbar.jsx
    │   │   │   ├── LoadingSpinner.jsx
    │   │   │   └── PrivateRoute.jsx
    │   │   └── ui/          # UI components
    │   │       ├── Button.jsx
    │   │       └── Card.jsx
    │   ├── hooks/           # Custom React hooks
    │   │   └── useAuth.jsx
    │   ├── layout/          # Layout components
    │   │   ├── AuthLayout.jsx
    │   │   └── MainLayout.jsx
    │   ├── pages/           # Page components
    │   │   ├── NotFoundPage.jsx
    │   │   ├── auth/
    │   │   │   ├── LoginPage.jsx
    │   │   │   └── SignupPage.jsx
    │   │   ├── doctor/
    │   │   │   ├── DoctorDashboard.jsx
    │   │   │   ├── DoctorPreviousRecords.jsx
    │   │   │   └── DoctorTreatPatient.jsx
    │   │   └── patient/
    │   │       ├── PatientDashboard.jsx
    │   │       ├── PatientBookAppointment.jsx
    │   │       └── PatientPreviousRecords.jsx
    │   ├── App.jsx          # Main App component
    │   ├── main.jsx         # React entry point
    │   └── index.css        # Global styles
    ├── vite.config.js       # Vite configuration
    ├── eslint.config.js     # ESLint configuration
    └── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or Atlas)

### Installation

#### 1. Clone the Repository
```bash
git clone <repository-url>
cd hospital_sys
```

#### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
PORT=5000
MONGODB_URI=mongodb://localhost:27017/hospital_db
JWT_SECRET=your_jwt_secret_key
EOF

# Start the server
npm start
# or for development with auto-reload
npm run dev
```

The backend will run on `http://localhost:5000`

#### 3. Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install

# Create .env file (if needed)
cat > .env << EOF
VITE_API_BASE_URL=http://localhost:5000/api
EOF

# Start the development server
npm run dev

# or build for production
npm run build
```

The frontend will run on `http://localhost:5173` (or another available port)

## 🔑 Key Features

### Authentication
- User registration and login with JWT tokens
- Secure password hashing with bcryptjs
- Protected routes with authentication middleware

### Patient Features
- View and edit patient profile
- Book appointments with doctors
- View medical records and previous appointments
- Check appointment status

### Doctor Features
- Manage doctor profile and specialization
- View scheduled appointments
- Treat/update patient records
- Access patient medical history

### Admin/System Features
- Manage appointments (create, update, cancel)
- Store and retrieve medical records
- Track doctor and patient information

## 🔗 API Endpoints

### Authentication Routes
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Patient Routes
- `GET /api/patients/:id` - Get patient profile
- `PUT /api/patients/:id` - Update patient profile
- `GET /api/patients/:id/records` - Get patient records

### Doctor Routes
- `GET /api/doctors/:id` - Get doctor profile
- `PUT /api/doctors/:id` - Update doctor profile
- `GET /api/doctors` - Get all doctors

### Appointment Routes
- `GET /api/appointments` - Get all appointments
- `POST /api/appointments` - Book new appointment
- `PUT /api/appointments/:id` - Update appointment
- `DELETE /api/appointments/:id` - Cancel appointment

## 📝 Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/hospital_db
JWT_SECRET=your_secret_key
NODE_ENV=development
```

### Frontend (.env)
```
VITE_API_BASE_URL=http://localhost:5000/api
```

## 🛠️ Available Scripts

### Backend
```bash
npm start          # Start server
npm run dev        # Start with nodemon (if configured)
```

### Frontend
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run lint       # Run ESLint
npm run preview    # Preview production build
```

## 🔐 Security Features

- JWT-based authentication for secure API access
- Password hashing with bcryptjs
- CORS configuration for cross-origin requests
- Protected routes with authentication middleware
- Error handling middleware for secure error responses

## 📦 Dependencies

### Backend
- **express** - Web framework
- **mongoose** - MongoDB ODM
- **jsonwebtoken** - JWT authentication
- **bcryptjs** - Password hashing
- **cors** - Cross-Origin Resource Sharing
- **dotenv** - Environment variables
- **express-async-handler** - Async error handling

### Frontend
- **react** - UI library
- **react-router-dom** - Client-side routing
- **axios** - HTTP client
- **bootstrap** - CSS framework
- **react-datepicker** - Date selection component

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running locally or update `MONGODB_URI` for Atlas
- Check MongoDB connection string in `.env`

### CORS Errors
- Verify backend CORS configuration in `server.js`
- Ensure frontend and backend URLs are correctly configured

### Port Already in Use
- Change `PORT` in backend `.env`
- Vite will automatically use the next available port for frontend

## 🤝 Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 📞 Support

For issues and questions, please create an issue in the repository.

---

**Last Updated:** January 2026
