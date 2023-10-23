import axios from "axios";

//@ts-ignore
const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;

export const http = axios.create({
    baseURL: BASE_URL,
    timeout: 5000
});
