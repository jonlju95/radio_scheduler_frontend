import axios from "axios";

const http = axios.create({
    baseURL: "https://localhost:7288/v1/",
    headers: {
        "Content-Type": "application/json",
    }
});

export default http;