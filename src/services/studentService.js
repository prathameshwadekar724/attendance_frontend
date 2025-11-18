import api from "./api";

export const getStudents = () => api.get("/students");
export const addStudent = (data) => api.post("/students", data);
export const deleteStudent = (id) => api.delete(`/students/${id}`);

export const getStudentsForTeacher = () => api.get("/teachers/student");