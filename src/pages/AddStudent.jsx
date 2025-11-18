import { useState } from "react";
import { addStudent } from "../services/studentService.js";
import { toast } from "react-toastify";
import { Label, TextInput, Button, Card, Select } from "flowbite-react";
import { HiUserAdd } from "react-icons/hi";

export default function AddStudent() {
  const [form, setForm] = useState({
    name: "",
    rollNumber: "",
    class: "",
    division: "",
    parentContact: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await addStudent(form);
      if (res.data.status === 1) {
        toast.success("Student added successfully");

        setForm({
          name: "",
          rollNumber: "",
          class: "",
          division: "",
          parentContact: "",
        });
      } else {
        toast.error(res.data.message || "Failed to add student");
      }
    } catch (err) {
      toast.error("Error while adding student");
    }
  };

  return (
    <div className="flex justify-center mt-6">
      <Card className="w-full max-w-xl bg-white/10 backdrop-blur-xl shadow-xl border border-white/20 rounded-2xl p-6">

        {/* Title */}
        <div className="flex items-center gap-2 mb-4">
          <HiUserAdd size={28} className="text-blue-400" />
          <h2 className="text-2xl font-semibold text-white tracking-wide">
            Add Student
          </h2>
        </div>

        {/* Form */}
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          
          {/* Name */}
          <div>
            <Label htmlFor="name" value="Name" className="text-gray-200" />
            <TextInput
              id="name"
              type="text"
              name="name"
              placeholder="Enter student name"
              value={form.name}
              onChange={handleChange}
              required
              className="mt-1 bg-gray-700/50 text-white border-gray-500 focus:ring-blue-400"
            />
          </div>

          {/* Roll Number */}
          <div>
            <Label htmlFor="rollNumber" value="Roll Number" className="text-gray-200" />
            <TextInput
              id="rollNumber"
              type="text"
              name="rollNumber"
              placeholder="Enter roll number"
              value={form.rollNumber}
              onChange={handleChange}
              required
              className="mt-1 bg-gray-700/50 text-white border-gray-500 focus:ring-blue-400"
            />
          </div>

          {/* Class + Division */}
          <div className="grid grid-cols-2 gap-4">

            {/* Class */}
            <div>
              <Label htmlFor="class" value="Class" className="text-gray-200" />
              <Select
                id="class"
                name="class"
                value={form.class}
                onChange={handleChange}
                required
                className="mt-1 bg-gray-700/50 text-white border-gray-500 focus:ring-blue-400"
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
              <Label htmlFor="division" value="Division" className="text-gray-200" />
              <Select
                id="division"
                name="division"
                value={form.division}
                onChange={handleChange}
                required
                className="mt-1 bg-gray-700/50 text-white border-gray-500 focus:ring-blue-400"
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

          {/* Parent Contact */}
          <div>
            <Label htmlFor="parentContact" value="Parent Contact" className="text-gray-200" />
            <TextInput
              id="parentContact"
              type="text"
              name="parentContact"
              placeholder="Enter parent contact number"
              value={form.parentContact}
              onChange={handleChange}
              required
              className="mt-1 bg-gray-700/50 text-white border-gray-500 focus:ring-blue-400"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="mt-2 bg-blue-600 hover:bg-blue-500 transition-all duration-300 text-white font-semibold py-2 rounded-lg"
          >
            Save Student
          </Button>

        </form>
      </Card>
    </div>
  );
}
