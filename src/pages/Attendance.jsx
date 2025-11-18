import { useEffect, useState, useContext } from "react";
import {
  getStudents,
  getStudentsForTeacher,
} from "../services/studentService.js";
import {
  markAttendance,
  getTodayAttendance,
  getTodayAttendanceForAdmin,
} from "../services/attendanceService.js";
import { toast } from "react-toastify";
import {
  Label,
  Select,
  Button,
  Table,
  TableHeadCell,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  Card,
} from "flowbite-react";
import { AuthContext } from "../context/AuthContext.jsx";
import { HiCheckCircle, HiXCircle } from "react-icons/hi";

export default function Attendance() {
  const [students, setStudents] = useState([]);
  const [todayData, setTodayData] = useState([]);
  const { user } = useContext(AuthContext);

  const [form, setForm] = useState({
    studentId: "",
    status: "Present",
  });

  // --------------------------------
  // Load Students
  // --------------------------------
  const fetchStudents = async () => {
    try {
      let res =
        user?.role === "teacher"
          ? await getStudentsForTeacher()
          : await getStudents();

      if (res?.data.status === 1) setStudents(res.data.data);
    } catch (err) {
      toast.error("Failed to load students");
    }
  };

  // --------------------------------
  // Load Today Attendance
  // --------------------------------
  const fetchTodayAttendance = async () => {
    try {
      let res;

      if (user?.role === "teacher") {
        res = await getTodayAttendance();
        if (res.data.status === 1) {
          const filtered = res.data.data.filter((a) => a.studentId !== null);
          setTodayData(filtered);
        }
      }

      if (user?.role === "admin") {
        res = await getTodayAttendanceForAdmin();
        if (res.data.status === 1) setTodayData(res.data.data);
      }
    } catch (error) {
      toast.error("Failed to load today's attendance");
    }
  };

  useEffect(() => {
    fetchStudents();
    fetchTodayAttendance();
  }, []);

  // --------------------------------
  // Handle Form Change
  // --------------------------------
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // --------------------------------
  // Handle Submit
  // --------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.studentId) {
      toast.error("Select a student");
      return;
    }

    try {
      const res = await markAttendance(form);
      if (res.data.status === 1) {
        toast.success("Attendance marked");
        fetchTodayAttendance();
      } else {
        toast.error(res.data.message || "Failed to mark");
      }
    } catch (err) {
      toast.error("Error marking attendance");
    }
  };

  // --------------------------------
  // Get Student Name
  // --------------------------------
  const getStudentName = (student) => {
    if (!student) return "Unknown";
    if (typeof student === "object") return student.name;

    const found = students.find((s) => s._id === student);
    return found ? found.name : "Unknown";
  };

  return (
    <div className="space-y-10">

      {/* -------------------------------- */}
      {/* MARK ATTENDANCE CARD */}
      {/* -------------------------------- */}
      <Card className="max-w-xl bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-3 text-white">
          Mark Attendance
        </h2>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {/* STUDENT DROPDOWN */}
          <div>
            <Label htmlFor="studentId" value="Student" />
            <Select
              id="studentId"
              name="studentId"
              value={form.studentId}
              onChange={handleChange}
            >
              <option value="">Select student</option>
              {students.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.name} ({s.rollNumber})
                </option>
              ))}
            </Select>
          </div>

          {/* STATUS DROPDOWN */}
          <div>
            <Label htmlFor="status" value="Status" />
            <Select
              id="status"
              name="status"
              value={form.status}
              onChange={handleChange}
            >
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
            </Select>
          </div>

          <Button type="submit" className="bg-blue-600 hover:bg-blue-500">
            Mark
          </Button>
        </form>
      </Card>

      {/* -------------------------------- */}
      {/* TODAY'S ATTENDANCE TABLE */}
      {/* -------------------------------- */}
      <div>
        <h2 className="text-xl font-semibold mb-3 text-gray-800">
          Today's Attendance
        </h2>

        <div className="bg-white rounded-xl shadow-lg overflow-x-auto">
          <Table>
            <TableHead className="bg-gray-800 text-white">
              <TableHeadCell className="text-[15px]">Student</TableHeadCell>
              <TableHeadCell className="text-[15px]">Status</TableHeadCell>
              <TableHeadCell className="text-[15px]">Date</TableHeadCell>
            </TableHead>

            <TableBody className="divide-y">
              {todayData.length ? (
                todayData.map((att) => (
                  <TableRow key={att._id}>
                    <TableCell className="text-[15px]">
                      {getStudentName(att.studentId)}
                    </TableCell>

                    <TableCell className="text-[15px]">
                      {att.status === "Present" ? (
                        <span className="flex items-center gap-1 text-green-600 font-medium">
                          <HiCheckCircle size={18} /> Present
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-red-500 font-medium">
                          <HiXCircle size={18} /> Absent
                        </span>
                      )}
                    </TableCell>

                    <TableCell className="text-[15px]">
                      {new Date(att.date).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-4">
                    No attendance marked yet today.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
