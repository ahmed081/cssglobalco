import {axiosClient} from './axiosClient';
import type {AuthResponseDto, UserDto} from './apiTypes';

export interface LoginPayload {
    email: string;
    password: string
}

export interface RegisterPayload {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone?: string;
    role?: string
}

export const authApi = {
    login: async (payload: LoginPayload) => (await axiosClient.post<AuthResponseDto>('/auth/login', payload)).data,
    register: async (payload: RegisterPayload) => (await axiosClient.post<AuthResponseDto>('/auth/register', payload)).data,
    me: async () => (await axiosClient.get<UserDto>('/auth/me')).data,
};
