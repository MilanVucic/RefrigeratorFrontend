import axios, { AxiosError } from 'axios';
import type { AxiosRequestConfig } from 'axios';
import { useAuthStore } from './stores/auth';

// Extend AxiosRequestConfig to include _retry flag
// This will be used to prevent more than 1 retry per request
interface AxiosRequestConfigWithRetry extends AxiosRequestConfig {
    _retry?: boolean;
}

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
});

api.interceptors.request.use((config) => {
    const auth = useAuthStore();
    if (auth.accessToken) {
        config.headers = config.headers ?? {};
        config.headers['Authorization'] = `Bearer ${auth.accessToken}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError & { config?: AxiosRequestConfigWithRetry }) => {
        const originalRequest = error.config;

        if (!originalRequest) return Promise.reject(error);

        const auth = useAuthStore();

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                await auth.refreshToken();
                if (auth.accessToken) {
                    originalRequest.headers = originalRequest.headers ?? {};
                    originalRequest.headers['Authorization'] = `Bearer ${auth.accessToken}`;
                    return api(originalRequest);
                }
            } catch {
                auth.logout();
            }
        }

        return Promise.reject(error);
    }
);

export default api;