import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { loginUser } from "../services/authService.js";
import Swal from "sweetalert2";
import { Button, Label, TextInput, Card } from "flowbite-react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(form);
      if (res.data.status === 1) {
        login(res.data);
        Swal.fire("Success", "Login Successful", "success");

        if (res.data.data.role === "admin") navigate("/");
        else navigate("/dashboard");
      } else {
        Swal.fire("Error", res.data.message, "error");
      }
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4">
      <Card className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl rounded-2xl p-6">
        
        {/* Logo */}
        <div className="text-center mb-4">
          <h1 className="text-3xl font-extrabold text-white tracking-wide">
            Welcome Back 👋
          </h1>
          <p className="text-gray-300 text-sm mt-1">
            Student Attendance System
          </p>
        </div>

        {/* Form */}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          
          <div>
            <Label htmlFor="email" value="Email" className="text-gray-200" />
            <TextInput
              id="email"
              name="email"
              placeholder="Enter email"
              type="email"
              required
              onChange={handleChange}
              className="mt-1 bg-gray-700/50 text-white border-gray-500 focus:ring-blue-400"
            />
          </div>

          <div>
            <Label htmlFor="password" value="Password" className="text-gray-200" />
            <TextInput
              id="password"
              name="password"
              placeholder="Enter password"
              type="password"
              required
              onChange={handleChange}
              className="mt-1 bg-gray-700/50 text-white border-gray-500 focus:ring-blue-400"
            />
          </div>

          <Button
            type="submit"
            className="mt-3 bg-blue-600 hover:bg-blue-500 transition-all duration-300 text-white font-semibold py-2 rounded-lg"
          >
            Login
          </Button>
        </form>

        {/* Footer Text */}
        <p className="text-gray-300 text-xs text-center mt-4">
          © {new Date().getFullYear()} Attendance Management System
        </p>
      </Card>
    </div>
  );
}
