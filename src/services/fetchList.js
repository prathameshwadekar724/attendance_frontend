import api from "./api";

export const getAllTeachers = async()=>{
    const res =  await api.get("/teachers");
    return res.data.data;
}

export const getAllStudents = async()=>{
    const res = await api.get("/students");
    return res.data.data;
}

export const getAllStudentsForTeacher = async()=>{
    const res = await api.get("/teachers/student");
    return res.data.data;
}