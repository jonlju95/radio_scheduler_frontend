import axios from "axios";

const http = axios.create({
    baseURL: "https://localhost:7288/v1/",
    headers: {
        "Content-Type": "application/json",
    }
});

http.interceptors.request.use((config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

export default http;