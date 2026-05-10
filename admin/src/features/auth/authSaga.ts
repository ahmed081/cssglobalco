import {call, put, takeEvery} from 'redux-saga/effects';
import type {PayloadAction} from '@reduxjs/toolkit';
import {authApi} from '../../api/authApi';
import {normalizeApiError} from '../../api/axiosClient';
import {tokenStorage} from '../../api/tokenStorage';
import {notificationActions} from '../notifications/notificationSlice';
import {sessionActions} from '../session/sessionSlice';
import {authActions} from './authSlice';
import type {LoginPayload, RegisterPayload} from './authTypes';

function* login(action: PayloadAction<LoginPayload>) {
    try {
        const response: Awaited<ReturnType<typeof authApi.login>> = yield call(authApi.login, action.payload);
        tokenStorage.setTokens(response.accessToken, response.refreshToken);
        yield put(authActions.authSuccess({
            user: response.user,
            token: response.accessToken,
            refreshToken: response.refreshToken
        }));
        yield put(sessionActions.checkSessionSuccess(response.user));
        yield put(notificationActions.pushNotification('success', 'Login successful'));
    } catch (error) {
        const apiError = normalizeApiError(error);
        yield put(authActions.authFailure(apiError.message));
        yield put(notificationActions.pushNotification('error', apiError.message));
    }
}

function* register(action: PayloadAction<RegisterPayload>) {
    try {
        const response: Awaited<ReturnType<typeof authApi.register>> = yield call(authApi.register, action.payload);
        tokenStorage.setTokens(response.accessToken, response.refreshToken);
        yield put(authActions.authSuccess({
            user: response.user,
            token: response.accessToken,
            refreshToken: response.refreshToken
        }));
        yield put(sessionActions.checkSessionSuccess(response.user));
        yield put(notificationActions.pushNotification('success', 'Registration successful'));
    } catch (error) {
        const apiError = normalizeApiError(error);
        yield put(authActions.authFailure(apiError.message));
        yield put(notificationActions.pushNotification('error', apiError.message));
    }
}

function* logout() {
    tokenStorage.clear();
    yield put(sessionActions.clearSession());
    yield put(notificationActions.pushNotification('info', 'Logged out'));
}

export function* authSaga() {
    yield takeEvery(authActions.loginRequest.type, login);
    yield takeEvery(authActions.registerRequest.type, register);
    yield takeEvery(authActions.logout.type, logout);
}
