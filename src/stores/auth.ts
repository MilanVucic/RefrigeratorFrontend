import { defineStore } from 'pinia';
import api from '../api';

interface AuthState {
    accessToken: string | null;
}

export const useAuthStore = defineStore('auth', {
    state: (): AuthState => ({
        accessToken: localStorage.getItem('accessToken'),
    }),
    actions: {
        async login(username: string, password: string) {
            try {
                const response = await api.post<{ access: string }>('accounts/login/', { username, password });
                this.accessToken = response.data.access;
                localStorage.setItem('accessToken', this.accessToken);
            } catch (err: any) {
                throw new Error(err.response?.data?.detail || 'Login failed');
            }
        },

        async refreshToken() {
            try {
                const response = await api.post<{ access: string }>('accounts/token/refresh/');
                this.accessToken = response.data.access;
                localStorage.setItem('accessToken', this.accessToken);
            } catch (err: any) {
                this.accessToken = null;
                localStorage.removeItem('accessToken');
                throw new Error('Refresh token expired');
            }
        },

        logout() {
            this.accessToken = null;
            localStorage.removeItem('accessToken');
        },
    },
});
