import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:5000/api" });

export const fetchUsers = () => API.get("/users");
export const addUser = (name) => API.post("/users", { name });
export const claimPoints = (userId) => API.post(`/claim/${userId}`);
export const getLeaderboard = () => API.get("/leaderboard");
export const getHistory = (page = 1) => API.get(`/history?page=${page}`);
