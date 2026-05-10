import {call, put, takeEvery, takeLatest} from 'redux-saga/effects';
import type {PayloadAction} from '@reduxjs/toolkit';
import {candidateApi} from '../../api/candidateApi';
import {normalizeApiError} from '../../api/axiosClient';
import {notificationActions} from '../notifications/notificationSlice';
import {candidateActions} from './candidateSlice';
import type {Candidate, CandidateSearchParams, EntityId, Stage} from './candidateTypes';

function* fetchCandidates(action: PayloadAction<CandidateSearchParams | undefined>) {
    try {
        const candidates: Candidate[] = yield call(candidateApi.fetchCandidates, action.payload);
        yield put(candidateActions.fetchCandidatesSuccess(candidates));
    } catch (error) {
        const apiError = normalizeApiError(error);
        yield put(candidateActions.candidateFailure(apiError.message));
        yield put(notificationActions.pushNotification('error', apiError.message));
    }
}

function* fetchCandidateById(action: PayloadAction<EntityId>) {
    try {
        const candidate: Candidate = yield call(candidateApi.fetchCandidateById, action.payload);
        yield put(candidateActions.fetchCandidateByIdSuccess(candidate));
    } catch (error) {
        const apiError = normalizeApiError(error);
        yield put(candidateActions.candidateFailure(apiError.message));
    }
}

function* createCandidate(action: PayloadAction<Candidate>) {
    try {
        const candidate: Candidate = yield call(candidateApi.createCandidate, action.payload);
        yield put(candidateActions.createCandidateSuccess(candidate));
        yield put(notificationActions.pushNotification('success', 'Candidate created'));
    } catch (error) {
        const apiError = normalizeApiError(error);
        yield put(candidateActions.candidateFailure(apiError.message));
        yield put(notificationActions.pushNotification('error', apiError.message));
    }
}

function* updateCandidate(action: PayloadAction<Candidate>) {
    try {
        const candidate: Candidate = yield call(candidateApi.updateCandidate, action.payload);
        yield put(candidateActions.updateCandidateSuccess(candidate));
        yield put(notificationActions.pushNotification('success', 'Candidate updated'));
    } catch (error) {
        const apiError = normalizeApiError(error);
        yield put(candidateActions.candidateFailure(apiError.message));
        yield put(notificationActions.pushNotification('error', apiError.message));
    }
}

function* deleteCandidate(action: PayloadAction<EntityId>) {
    try {
        const id: EntityId = yield call(candidateApi.deleteCandidate, action.payload);
        yield put(candidateActions.deleteCandidateSuccess(id));
        yield put(notificationActions.pushNotification('success', 'Candidate deleted'));
    } catch (error) {
        const apiError = normalizeApiError(error);
        yield put(candidateActions.candidateFailure(apiError.message));
        yield put(notificationActions.pushNotification('error', apiError.message));
    }
}

function* changeStage(action: PayloadAction<{ id: EntityId; stage: Stage; note?: string }>) {
    try {
        const candidate: Candidate = yield call(candidateApi.changeCandidateStage, action.payload.id, action.payload.stage, action.payload.note);
        yield put(candidateActions.changeCandidateStageSuccess(candidate));
        yield put(notificationActions.pushNotification('success', 'Candidate stage changed'));
    } catch (error) {
        const apiError = normalizeApiError(error);
        yield put(candidateActions.candidateFailure(apiError.message));
        yield put(notificationActions.pushNotification('error', apiError.message));
    }
}

export function* candidateSaga() {
    yield takeLatest(candidateActions.fetchCandidatesRequest.type, fetchCandidates);
    yield takeLatest(candidateActions.searchCandidatesRequest.type, fetchCandidates);
    yield takeLatest(candidateActions.fetchCandidateByIdRequest.type, fetchCandidateById);
    yield takeEvery(candidateActions.createCandidateRequest.type, createCandidate);
    yield takeEvery(candidateActions.updateCandidateRequest.type, updateCandidate);
    yield takeEvery(candidateActions.deleteCandidateRequest.type, deleteCandidate);
    yield takeEvery(candidateActions.changeCandidateStageRequest.type, changeStage);
}
