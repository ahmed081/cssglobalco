import axios, {AxiosError} from 'axios';
import {tokenStorage} from './tokenStorage';
import type {ApiErrorShape} from './apiTypes';

export const API_UNAUTHORIZED_EVENT = 'cg-recruit-api-unauthorized';

export const normalizeApiError = (error: unknown): ApiErrorShape => {
    if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{ message?: string; error?: string }>;
        return {
            status: axiosError.response?.status,
            message: axiosError.response?.data?.message || axiosError.response?.data?.error || axiosError.message || 'API request failed',
            details: axiosError.response?.data,
        };
    }
    if (error instanceof Error) return {message: error.message};
    return {message: 'Unexpected API error'};
};

export const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1/recruit',
    headers: {'Content-Type': 'application/json'},
});

axiosClient.interceptors.request.use(config => {
    const token = tokenStorage.getAccessToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

axiosClient.interceptors.response.use(
    response => response,
    error => {
        const status = axios.isAxiosError(error) ? error.response?.status : undefined;
        if (status === 401 || status === 403) {
            tokenStorage.clear();
            window.dispatchEvent(new CustomEvent(API_UNAUTHORIZED_EVENT));
        }
        return Promise.reject(normalizeApiError(error));
    },
);
