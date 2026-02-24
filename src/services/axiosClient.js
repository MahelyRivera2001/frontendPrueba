import axios from "axios";

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000,
    headers: {
        "Content-Type" : "application/json",
    },
});

//interceptor de request
axiosClient.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => Promise.reject(error)
);

//interceptor de response
axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            console.error("Error del servidor:", error.response.data);
        } else if (error.request) {
            console.log("No hubo respuesta del servidor.");
        } else {
            console.error("Error:", error.message);
        }

        return Promise.reject(error);
    }
);

export default axiosClient;