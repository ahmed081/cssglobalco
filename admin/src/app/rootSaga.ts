import {all} from 'redux-saga/effects';
import {authSaga} from '../features/auth/authSaga';
import {sessionSaga} from '../features/session/sessionSaga';
import {candidateSaga} from '../features/candidates/candidateSaga';
import {jobRoleSaga} from '../features/jobRoles/jobRoleSaga';
import {dashboardSaga} from '../features/dashboard/dashboardSaga';
import {clientSaga} from '../features/clients/clientSaga';
import {referenceSaga} from '../features/references/referenceSaga';
import {compatSaga} from './compatSaga';

export function* rootSaga() {
    yield all([
        authSaga(),
        sessionSaga(),
        candidateSaga(),
        jobRoleSaga(),
        dashboardSaga(),
        clientSaga(),
        referenceSaga(),
        compatSaga(),
    ]);
}
