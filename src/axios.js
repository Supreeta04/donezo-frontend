// src/axios.js
import axios from "axios";
import { getAuth } from "firebase/auth";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // ✅ Live backend URL
});

API.interceptors.request.use(async (config) => {
  const user = getAuth().currentUser;
  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
