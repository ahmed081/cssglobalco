import {call, put, select, takeEvery, takeLatest} from 'redux-saga/effects';
import type {PayloadAction} from '@reduxjs/toolkit';
import {jobRoleApi} from '../../api/jobRoleApi';
import {normalizeApiError} from '../../api/axiosClient';
import {notificationActions} from '../notifications/notificationSlice';
import {jobRoleActions} from './jobRoleSlice';
import type {JobRole, JobRoleSearchParams} from './jobRoleTypes';

function* fetchJobRoles(action: PayloadAction<JobRoleSearchParams | undefined>) {
    try {
        const roles: JobRole[] = yield call(jobRoleApi.fetchJobRoles, action.payload);
        yield put(jobRoleActions.fetchJobRolesSuccess(roles));
    } catch (error) {
        const apiError = normalizeApiError(error);
        yield put(jobRoleActions.jobRoleFailure(apiError.message));
        yield put(notificationActions.pushNotification('error', apiError.message));
    }
}

function* createJobRole(action: PayloadAction<JobRole>) {
    try {
        const role: JobRole = yield call(jobRoleApi.createJobRole, action.payload);
        yield put(jobRoleActions.createJobRoleSuccess(role));
        yield put(notificationActions.pushNotification('success', 'Role created'));
    } catch (error) {
        const apiError = normalizeApiError(error);
        yield put(jobRoleActions.jobRoleFailure(apiError.message));
        yield put(notificationActions.pushNotification('error', apiError.message));
    }
}

function* updateJobRole(action: PayloadAction<JobRole>) {
    try {
        const role: JobRole = yield call(jobRoleApi.updateJobRole, action.payload);
        yield put(jobRoleActions.updateJobRoleSuccess(role));
        yield put(notificationActions.pushNotification('success', 'Role updated'));
    } catch (error) {
        const apiError = normalizeApiError(error);
        yield put(jobRoleActions.jobRoleFailure(apiError.message));
        yield put(notificationActions.pushNotification('error', apiError.message));
    }
}

function* deleteJobRole(action: PayloadAction<string>) {
    try {
        const id: string = yield call(jobRoleApi.deleteJobRole, action.payload);
        yield put(jobRoleActions.deleteJobRoleSuccess(id));
        yield put(notificationActions.pushNotification('success', 'Role deleted'));
    } catch (error) {
        const apiError = normalizeApiError(error);
        yield put(jobRoleActions.jobRoleFailure(apiError.message));
        yield put(notificationActions.pushNotification('error', apiError.message));
    }
}

function* closeOrReopen(action: PayloadAction<string>, status: JobRole['status']) {
    const roles: JobRole[] = yield select((state: { jobRoles: { items: JobRole[] } }) => state.jobRoles.items);
    const role = roles.find(item => item.id === action.payload);
    if (role) yield put(jobRoleActions.updateJobRoleRequest({...role, status}));
}

export function* jobRoleSaga() {
    yield takeLatest(jobRoleActions.fetchJobRolesRequest.type, fetchJobRoles);
    yield takeEvery(jobRoleActions.createJobRoleRequest.type, createJobRole);
    yield takeEvery(jobRoleActions.updateJobRoleRequest.type, updateJobRole);
    yield takeEvery(jobRoleActions.deleteJobRoleRequest.type, deleteJobRole);
    yield takeEvery(jobRoleActions.closeJobRoleRequest.type, function* (action: PayloadAction<string>) {
        yield* closeOrReopen(action, 'Closed');
    });
    yield takeEvery(jobRoleActions.reopenJobRoleRequest.type, function* (action: PayloadAction<string>) {
        yield* closeOrReopen(action, 'Open');
    });
}
