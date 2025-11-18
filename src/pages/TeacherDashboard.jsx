import { useContext, useEffect, useState } from "react";
import { Card, Badge } from "flowbite-react";
import { AuthContext } from "../context/AuthContext";
import { getAllStudents, getAllStudentsForTeacher } from "../services/fetchList";
import { getTodayAttendance } from "../services/attendanceService";

export default function TeacherDashboard() {
  const { user } = useContext(AuthContext);
  const [studentCount, setStudentCount] = useState(0);
  const [presentCount, setPresentCount] = useState(0);
  useEffect(() => {
    loadCounts();
  }, []);
  async function loadCounts() {
    // 1. Get students of this teacher
    const students = await getAllStudentsForTeacher();
    setStudentCount(students.length);

    // 2. Fetch all today's attendance
    const attRes = await getTodayAttendance();

    if (attRes.data.status === 1) {
      // 🔥 Filter only teacher's class & division
      const filtered = attRes.data.data.filter(
        (a) =>
          a.studentId?.class === user.classAssigned &&
          a.studentId?.division === user.division
      );

      // 🔥 Count present only for that class
      const present = filtered.filter((a) => a.status === "Present");

      setPresentCount(present.length);
    }
  }

  const percentage = studentCount === 0 ? 0 : Math.round((presentCount / studentCount)*100);
  return (
    <div className="space-y-8">

      {/* Header Card */}
      <Card className="shadow-md">
        <h1 className="text-3xl font-bold text-blue-400">Teacher Dashboard</h1>
        <p className="text-white">
          Welcome, {user?.name}👋
        </p>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <Card className="bg-yellow-500 text-white shadow-md">
          <h2 className="text-lg font-semibold">Your Students</h2>
          <p className="text-4xl font-bold mt-2">{studentCount}</p>
        </Card>

        <Card className="bg-indigo-500 text-white shadow-md">
          <h2 className="text-lg font-semibold">Today's Attendance</h2>
          <p className="text-4xl font-bold mt-2">{percentage}%</p>
        </Card>

      </div>

      {/* Tips */}
      <Card className="shadow-sm">
        <h3 className="text-xl font-semibold mb-3 text-white">Quick Links</h3>

        <ul className="text-gray-700 space-y-2 text-white">
          <li>• Mark student attendance</li>
          <li>• View your daily attendance</li>
          <li>• Check student performance</li>
        </ul>
      </Card>

    </div>
  );
}
