import {call, put, takeLatest} from 'redux-saga/effects';
import {dashboardApi} from '../../api/dashboardApi';
import {normalizeApiError} from '../../api/axiosClient';
import {notificationActions} from '../notifications/notificationSlice';
import {dashboardActions} from './dashboardSlice';
import type {DashboardData} from './dashboardTypes';

function* fetchDashboard() {
    try {
        const dashboard: DashboardData = yield call(dashboardApi.fetchDashboard);
        yield put(dashboardActions.fetchDashboardSuccess(dashboard));
    } catch (error) {
        const apiError = normalizeApiError(error);
        yield put(dashboardActions.dashboardFailure(apiError.message));
        yield put(notificationActions.pushNotification('error', apiError.message));
    }
}

export function* dashboardSaga() {
    yield takeLatest(dashboardActions.fetchDashboardStatsRequest.type, fetchDashboard);
    yield takeLatest(dashboardActions.fetchPipelineStatsRequest.type, fetchDashboard);
    yield takeLatest(dashboardActions.fetchRoleStatsRequest.type, fetchDashboard);
    yield takeLatest(dashboardActions.fetchRecentCandidatesRequest.type, fetchDashboard);
}
