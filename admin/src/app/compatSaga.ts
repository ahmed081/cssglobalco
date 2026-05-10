import {put, takeEvery} from 'redux-saga/effects';
import type {PayloadAction} from '@reduxjs/toolkit';
import {actions as recruitActions} from '../store/recruitSlice';
import {candidateActions} from '../features/candidates/candidateSlice';
import {jobRoleActions} from '../features/jobRoles/jobRoleSlice';
import type {Candidate, EntityId, JobRole, Stage} from '../types';

export function* compatSaga() {
    yield takeEvery(recruitActions.addCandidate.type, function* (action: PayloadAction<Candidate>) {
        yield put(candidateActions.createCandidateRequest(action.payload));
    });
    yield takeEvery(recruitActions.updateCandidate.type, function* (action: PayloadAction<Candidate>) {
        yield put(candidateActions.updateCandidateRequest(action.payload));
    });
    yield takeEvery(recruitActions.deleteCandidate.type, function* (action: PayloadAction<EntityId>) {
        yield put(candidateActions.deleteCandidateRequest(action.payload));
    });
    yield takeEvery(recruitActions.setStage.type, function* (action: PayloadAction<{
        id: EntityId;
        stage: Stage;
        note?: string
    }>) {
        yield put(candidateActions.changeCandidateStageRequest(action.payload));
    });
    yield takeEvery(recruitActions.addJob.type, function* (action: PayloadAction<JobRole>) {
        yield put(jobRoleActions.createJobRoleRequest(action.payload));
    });
    yield takeEvery(recruitActions.updateJob.type, function* (action: PayloadAction<JobRole>) {
        yield put(jobRoleActions.updateJobRoleRequest(action.payload));
    });
    yield takeEvery(recruitActions.deleteJob.type, function* (action: PayloadAction<string>) {
        yield put(jobRoleActions.deleteJobRoleRequest(action.payload));
    });
}
