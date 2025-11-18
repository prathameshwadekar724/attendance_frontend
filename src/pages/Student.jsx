import { useEffect, useState, useContext } from "react";
import { getStudents, deleteStudent, getStudentsForTeacher } from "../services/studentService.js";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import {
  Table,
  Button,
  TableHeadCell,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "flowbite-react";
import { AuthContext } from "../context/AuthContext.jsx";
import { HiCheckCircle, HiXCircle, HiTrash } from "react-icons/hi";

export default function Students() {
  const [students, setStudents] = useState([]);
  const { user } = useContext(AuthContext);

  const fetchStudents = async () => {
    try {
      let res;

      if (user?.role === "teacher") {
        res = await getStudentsForTeacher();
      } else if (user?.role === "admin") {
        res = await getStudents();
      }

      if (res?.data.status === 1) {
        setStudents(res.data.data);
      }
    } catch (err) {
      toast.error("Failed to load students");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Delete Student?",
      text: "This student will be removed permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor: "#e11d48",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await deleteStudent(id);
          if (res.data.status === 1) {
            toast.success("Student deleted");
            fetchStudents();
          } else {
            toast.error(res.data.message || "Deletion failed");
          }
        } catch (err) {
          toast.error("Error deleting student");
        }
      }
    });
  };

  return (
    <div className="space-y-6">

      {/* Title Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Students</h2>
        <p className="text-sm text-gray-500">
          Manage all {user?.role === "teacher" ? "your" : "registered"} students here
        </p>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-xl shadow-lg p-4">
        <Table hoverable={true}>
          <TableHead className="bg-gray-800 text-white rounded-t-xl">
            <TableHeadCell className="text-[15px]">Name</TableHeadCell>
            <TableHeadCell className="text-[15px]">Roll No</TableHeadCell>
            <TableHeadCell className="text-[15px]">Class</TableHeadCell>
            <TableHeadCell className="text-[15px]">Division</TableHeadCell>
            <TableHeadCell className="text-[15px]">Status</TableHeadCell>
            {user?.role === "admin" && (
              <TableHeadCell className="text-[15px]">Action</TableHeadCell>
            )}
          </TableHead>

          <TableBody className="divide-y">
            {students.map((s) => (
              <TableRow key={s._id} className="hover:bg-gray-100 transition">
                <TableCell className="text-[15px] font-medium text-gray-800">
                  {s.name}
                </TableCell>
                <TableCell className="text-[15px] text-gray-800">
                  {s.rollNumber}
                </TableCell>
                <TableCell className="text-[15px] text-gray-800">
                  {s.class}
                </TableCell>
                <TableCell className="text-[15px] text-gray-800">
                  {s.division}
                </TableCell>

                <TableCell>
                  {s.isActive ? (
                    <span className="flex items-center gap-1 text-green-600 font-semibold text-[15px]">
                      <HiCheckCircle size={18} /> Active
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-red-600 font-semibold text-[15px]">
                      <HiXCircle size={18} /> Inactive
                    </span>
                  )}
                </TableCell>

                {user?.role === "admin" && (
                  <TableCell>
                    <Button
                      color="failure"
                      size="xs"
                      onClick={() => handleDelete(s._id)}
                      className="flex items-center gap-1 hover:bg-red-600"
                    >
                      <HiTrash size={15} />
                      Delete
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            ))}

            {!students.length && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4 text-gray-600">
                  No students found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
