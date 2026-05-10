import {combineReducers} from '@reduxjs/toolkit';
import recruit from '../store/recruitSlice';
import auth from '../features/auth/authSlice';
import session from '../features/session/sessionSlice';
import candidates from '../features/candidates/candidateSlice';
import jobRoles from '../features/jobRoles/jobRoleSlice';
import dashboard from '../features/dashboard/dashboardSlice';
import clients from '../features/clients/clientSlice';
import notifications from '../features/notifications/notificationSlice';
import references from '../features/references/referenceSlice';

export const rootReducer = combineReducers({
    recruit,
    auth,
    session,
    candidates,
    jobRoles,
    dashboard,
    clients,
    notifications,
    references,
});
