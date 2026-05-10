import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {tokenStorage} from '../../api/tokenStorage';
import type {AuthUser, LoginPayload, RegisterPayload} from './authTypes';

interface AuthState {
    user: AuthUser | null;
    token: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}

const token = tokenStorage.getAccessToken();

const initialState: AuthState = {
    user: null,
    token,
    refreshToken: tokenStorage.getRefreshToken(),
    isAuthenticated: Boolean(token),
    loading: false,
    error: null,
};

const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginRequest: (state, _action: PayloadAction<LoginPayload>) => {
            state.loading = true;
            state.error = null;
        },
        registerRequest: (state, _action: PayloadAction<RegisterPayload>) => {
            state.loading = true;
            state.error = null;
        },
        authSuccess: (state, action: PayloadAction<{ user: AuthUser; token: string; refreshToken?: string }>) => {
            state.loading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.refreshToken = action.payload.refreshToken || null;
            state.isAuthenticated = true;
            state.error = null;
        },
        authFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
            state.refreshToken = null;
        },
        logout: state => {
            state.user = null;
            state.token = null;
            state.refreshToken = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.error = null;
        },
    },
});

export const authActions = slice.actions;
export default slice.reducer;
