import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  HiHome,
  HiUsers,
  HiUserAdd,
  HiClipboardList,
  HiUserGroup,
  HiLogout,
} from "react-icons/hi";

export default function Layout() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const linkBase =
    "flex items-center gap-3 px-4 py-2 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition";
  const activeClass =
    "flex items-center gap-3 px-4 py-2 rounded-lg bg-gray-800 text-white shadow";

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col py-6 shadow-xl">
        <h2 className="text-2xl font-extrabold px-6 mb-8 tracking-wide">
          {user?.role === "admin" ? "Admin Panel" : "Teacher Panel"}
        </h2>

        <nav className="flex flex-col gap-2 px-3">

          <NavLink
            to={user?.role === "admin" ? "/" : "/dashboard"}
            className={({ isActive }) => (isActive ? activeClass : linkBase)}
          >
            <HiHome size={20} /> Dashboard
          </NavLink>

          <NavLink
            to="/students-list"
            className={({ isActive }) => (isActive ? activeClass : linkBase)}
          >
            <HiUsers size={20} /> Students
          </NavLink>

          {user?.role === "admin" && (
            <NavLink
              to="/students/add"
              className={({ isActive }) => (isActive ? activeClass : linkBase)}
            >
              <HiUserAdd size={20} /> Add Student
            </NavLink>
          )}

          <NavLink
            to="/attendance"
            className={({ isActive }) => (isActive ? activeClass : linkBase)}
          >
            <HiClipboardList size={20} /> Attendance
          </NavLink>

          {user?.role === "admin" && (
            <NavLink
              to="/teacher/add"
              className={({ isActive }) => (isActive ? activeClass : linkBase)}
            >
              <HiUserGroup size={20} /> Add Teachers
            </NavLink>
          )}
        </nav>
      </aside>

      {/* Main Panel */}
      <div className="flex-1 flex flex-col">

        {/* ⭐ Gorgeous Glass Topbar ⭐ */}
        <header className="backdrop-blur-xl bg-white/70 shadow-md border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 z-20">

          {/* Left Section */}
          <div>
            <h1 className="text-2xl font-bold text-gray-800 tracking-wide relative">
              Student Attendance System
              <span className="absolute -bottom-1 left-0 w-16 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></span>
            </h1>

            <p className="text-sm text-gray-600 mt-1">
              Welcome, <span className="font-semibold text-gray-800">{user?.name}</span>{" "}
              <span className="text-blue-500">({user?.role})</span>
            </p>
          </div>

          {/* Right Section: Avatar + Logout */}
          <div className="flex items-center gap-4">
            
            {/* Simple Avatar Circle */}
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white font-bold shadow">
              {user?.name?.charAt(0)?.toUpperCase()}
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded-lg text-sm shadow transition"
            >
              <HiLogout size={18} /> Logout
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
