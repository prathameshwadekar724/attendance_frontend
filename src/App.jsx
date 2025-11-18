import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Students from "./pages/Student.jsx";
import AddStudent from "./pages/AddStudent.jsx";
import Attendance from "./pages/Attendance.jsx";
import PrivateRoute from "./utils/PrivateRoute.jsx";
import Layout from "./components/Layout.jsx";
import AddTeacher from "./pages/AddTeacher.jsx";
import TeacherDashboard from "./pages/TeacherDashboard.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      {/* Protected layout (navbar + sidebar) */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="students-list" element={<Students />} />
        <Route path="students/add" element={<AddStudent />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="teacher/add" element={<AddTeacher/>} />
        <Route path="dashboard" element={<TeacherDashboard/>}/>
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
