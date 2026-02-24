import axios from 'axios';

const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY;

let logoutCallback: (() => void) | null = null;

export const setLogoutCallback = (cb: () => void) => {
    logoutCallback = cb;
};

const axiosInstance = axios.create({
    baseURL: '/',
    headers: {
        'Content-Type': 'application/json',
    },
});

//Request Interceptor: adding token
axiosInstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem(TOKEN_KEY);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error),
);

//Response Interceptor: detecting 401 and logingout
axiosInstance.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            if (logoutCallback) {
                logoutCallback();
            }
        }
        return Promise.reject(error);
    },
);

export default axiosInstance;
