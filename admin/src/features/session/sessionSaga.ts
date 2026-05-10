import {call, put, takeLatest} from 'redux-saga/effects';
import {authApi} from '../../api/authApi';
import {normalizeApiError} from '../../api/axiosClient';
import {tokenStorage} from '../../api/tokenStorage';
import {authActions} from '../auth/authSlice';
import {notificationActions} from '../notifications/notificationSlice';
import {sessionActions} from './sessionSlice';

function* checkSession() {
    if (!tokenStorage.getAccessToken()) {
        yield put(sessionActions.clearSession());
        return;
    }
    try {
        const user: Awaited<ReturnType<typeof authApi.me>> = yield call(authApi.me);
        yield put(sessionActions.checkSessionSuccess(user));
    } catch (error) {
        const apiError = normalizeApiError(error);
        tokenStorage.clear();
        yield put(sessionActions.checkSessionFailure(apiError.message));
        yield put(authActions.logout());
    }
}

function* sessionExpired() {
    yield put(authActions.logout());
    yield put(notificationActions.pushNotification('warning', 'Session expired. Please log in again.'));
}

export function* sessionSaga() {
    yield takeLatest(sessionActions.checkSessionRequest.type, checkSession);
    yield takeLatest('api/unauthorized', sessionExpired);
}
