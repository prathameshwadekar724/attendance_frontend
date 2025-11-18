import { useState, useEffect } from "react";
import {
  Label,
  TextInput,
  Button,
  Table,
  TableHead,
  TableHeadCell,
  TableBody,
  TableRow,
  TableCell,
  Select,
  Card,
} from "flowbite-react";
import { toast } from "react-toastify";
import api from "../services/api";
import { HiUserAdd, HiMail, HiKey } from "react-icons/hi";

export default function AddTeacher() {
  const [teachers, setTeachers] = useState([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "teacher",
    classAssigned: "",
    division: "",
  });

  // Auto-generate password
  const generatePassword = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$!";
    let pass = "";
    for (let i = 0; i < 8; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setForm({ ...form, password: pass });
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password || !form.classAssigned || !form.division) {
      toast.error("All fields are required");
      return;
    }

    try {
      const res = await api.post("/teachers/add", form);

      if (res.data.status === 1) {
        toast.success("Teacher added successfully!");

        setForm({
          name: "",
          email: "",
          password: "",
          role: "teacher",
          classAssigned: "",
          division: "",
        });

        fetchTeachers();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const fetchTeachers = async () => {
    try {
      const res = await api.get("/teachers");
      if (res.data.status === 1) setTeachers(res.data.data);
    } catch {
      toast.error("Failed to load teachers");
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  return (
    <div className="space-y-10">

      {/* ⭐ Add Teacher Card */}
      <Card className="max-w-xl bg-white shadow-lg p-6 rounded-xl">
        <div className="flex items-center gap-2 mb-3">
          <HiUserAdd size={26} className="text-blue-500" />
          <h2 className="text-xl font-semibold text-white">Add Teacher</h2>
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>

          {/* Name */}
          <div>
            <Label value="Name" className="text-gray-700" />
            <TextInput
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter teacher name"
              icon={HiUserAdd}
            />
          </div>

          {/* Email */}
          <div>
            <Label value="Email" className="text-gray-700" />
            <TextInput
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter email"
              icon={HiMail}
              type="email"
            />
          </div>

          {/* Class + Division */}
          <div className="grid grid-cols-2 gap-4">

            {/* Class Assigned */}
            <div>
              <Label value="Class Assigned" className="text-gray-700" />
              <Select
                name="classAssigned"
                value={form.classAssigned}
                onChange={handleChange}
                required
              >
                <option value="">Select Class</option>
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={`${i + 1}th`}>
                    {i + 1}th
                  </option>
                ))}
              </Select>
            </div>

            {/* Division */}
            <div>
              <Label value="Division" className="text-gray-700" />
              <Select
                name="division"
                value={form.division}
                onChange={handleChange}
                required
              >
                <option value="">Select Division</option>
                {["A", "B", "C", "D", "E", "F"].map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          {/* Password */}
          <div>
            <Label value="Password" className="text-gray-700" />
            <div className="flex gap-2">
              <TextInput
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Auto-generate or type manually"
                icon={HiKey}
              />

              <Button type="button" onClick={generatePassword} className="bg-red-500 hover:bg-red-400">
                Generate
              </Button>
            </div>
          </div>

          <Button type="submit" className="bg-blue-600 hover:bg-blue-500">
            Add Teacher
          </Button>
        </form>
      </Card>

      {/* ⭐ Teachers List */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-3">Teachers</h2>

        <div className="bg-white rounded-xl shadow-lg overflow-x-auto">
          <Table>
            <TableHead className="bg-gray-800 text-white">
              <TableHeadCell>Name</TableHeadCell>
              <TableHeadCell>Email</TableHeadCell>
              <TableHeadCell>Class Assigned</TableHeadCell>
              <TableHeadCell>Division</TableHeadCell>
            </TableHead>

            <TableBody className="divide-y">
              {teachers.length ? (
                teachers.map((t) => (
                  <TableRow key={t._id} className="hover:bg-gray-50 transition">
                    <TableCell>{t.name}</TableCell>
                    <TableCell>{t.email}</TableCell>
                    <TableCell>{t.classAssigned}</TableCell>
                    <TableCell>{t.division}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-4">
                    No teachers found.
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
