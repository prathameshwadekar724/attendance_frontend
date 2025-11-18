import api from "./api";

export const markAttendance = (data) => api.post("/attendance/mark", data);
export const getTodayAttendance = () => api.get("/attendance/today");
export const getTodayAttendanceForAdmin =  () => api.get("/attendance/admin/today");