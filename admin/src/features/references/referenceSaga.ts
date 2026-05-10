import {call, put, takeLatest} from 'redux-saga/effects';
import {referenceApi} from '../../api/referenceApi';
import {normalizeApiError} from '../../api/axiosClient';
import {referenceActions} from './referenceSlice';
import type {EnumsDto} from '../../api/apiTypes';

function* fetchReferenceData() {
    try {
        const data: EnumsDto = yield call(referenceApi.fetchEnums);
        yield put(referenceActions.fetchReferenceDataSuccess(data));
    } catch (error) {
        const apiError = normalizeApiError(error);
        yield put(referenceActions.referenceFailure(apiError.message));
    }
}

export function* referenceSaga() {
    yield takeLatest(referenceActions.fetchReferenceDataRequest.type, fetchReferenceData);
    yield takeLatest(referenceActions.fetchDepartmentsRequest.type, fetchReferenceData);
    yield takeLatest(referenceActions.fetchLanguagesRequest.type, fetchReferenceData);
    yield takeLatest(referenceActions.fetchStagesRequest.type, fetchReferenceData);
    yield takeLatest(referenceActions.fetchSeniorityLevelsRequest.type, fetchReferenceData);
    yield takeLatest(referenceActions.fetchRoleStatusesRequest.type, fetchReferenceData);
}
