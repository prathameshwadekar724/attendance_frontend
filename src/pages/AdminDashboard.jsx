import { useContext, useEffect, useState } from "react";
import { Card } from "flowbite-react";
import { AuthContext } from "../context/AuthContext";
import { getAllStudents, getAllTeachers } from "../services/fetchList";
import { getTodayAttendance } from "../services/attendanceService";
import { HiUsers, HiUserGroup, HiClipboardCheck } from "react-icons/hi";

export default function AdminDashboard() {
  const { user } = useContext(AuthContext);

  const [studentCount, setStudentCount] = useState(0);
  const [teacherCount, setTeacherCount] = useState(0);
  const [presentCount, setPresentCount] = useState(0);

  useEffect(() => {
    loadCounts();
  }, []);

  async function loadCounts() {
    const teachers = await getAllTeachers();
    const students = await getAllStudents();

    setTeacherCount(teachers.length);
    setStudentCount(students.length);

    const attendance = await getTodayAttendance();

    if (attendance.data.status === 1) {
      const present = attendance.data.data.filter((a) => a.status === "Present");
      setPresentCount(present.length);
    }
  }

  const percentage =
    studentCount === 0 ? 0 : Math.round((presentCount / studentCount) * 100);

  return (
    <div className="space-y-10">

      {/* Header */}
      <Card className="shadow-xl bg-gradient-to-r from-blue-800 to-blue-600 text-white rounded-xl">
        <h1 className="text-4xl font-extrabold tracking-wide">
          Admin Dashboard
        </h1>
        <p className="text-gray-200 mt-1">Logged in as {user?.name}</p>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Total Students */}
        <Card className="p-6 shadow-xl rounded-xl bg-white hover:shadow-2xl transition duration-300">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold text-white">
                Total Students
              </h2>
              <p className="text-5xl font-bold text-blue-600 mt-2">
                {studentCount}
              </p>
            </div>
            <HiUsers className="text-blue-600" size={55} />
          </div>
        </Card>

        {/* Total Teachers */}
        <Card className="p-6 shadow-xl rounded-xl bg-white hover:shadow-2xl transition duration-300">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold text-white">
                Total Teachers
              </h2>
              <p className="text-5xl font-bold text-green-600 mt-2">
                {teacherCount}
              </p>
            </div>
            <HiUserGroup className="text-green-600" size={55} />
          </div>
        </Card>

        {/* Attendance Today */}
        <Card className="p-6 shadow-xl rounded-xl bg-white hover:shadow-2xl transition duration-300">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold text-white">
                Attendance Today
              </h2>
              <p className="text-5xl font-bold text-purple-600 mt-2">
                {percentage}%
              </p>
            </div>
            <HiClipboardCheck className="text-purple-600" size={55} />
          </div>
        </Card>

      </div>

      {/* Quick Actions */}
      <Card className="shadow-xl p-6 bg-gray-900 text-white rounded-xl hover:shadow-2xl transition">
        <h3 className="text-2xl font-bold mb-4">Quick Actions</h3>

        <ul className="space-y-3 text-gray-300 text-lg">
          <li>• Add a new student</li>
          <li>• Manage teachers</li>
          <li>• View today's attendance</li>
          <li>• Manage class attendance</li>
        </ul>
      </Card>
    </div>
  );
}
