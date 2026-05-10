import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {JobRole, JobRoleSearchParams} from './jobRoleTypes';

interface JobRoleState {
    items: JobRole[];
    selectedRole: JobRole | null;
    loading: boolean;
    error: string | null;
}

const initialState: JobRoleState = {items: [], selectedRole: null, loading: false, error: null};

const slice = createSlice({
    name: 'jobRoles',
    initialState,
    reducers: {
        fetchJobRolesRequest: (state, _action: PayloadAction<JobRoleSearchParams | undefined>) => {
            state.loading = true;
            state.error = null;
        },
        fetchJobRolesSuccess: (state, action: PayloadAction<JobRole[]>) => {
            state.loading = false;
            state.items = action.payload;
        },
        fetchJobRoleByIdRequest: (state, _action: PayloadAction<string>) => {
            state.loading = true;
            state.error = null;
        },
        fetchJobRoleByIdSuccess: (state, action: PayloadAction<JobRole>) => {
            state.loading = false;
            state.selectedRole = action.payload;
            state.items = upsert(state.items, action.payload);
        },
        createJobRoleRequest: (state, _action: PayloadAction<JobRole>) => {
            state.loading = true;
            state.error = null;
        },
        createJobRoleSuccess: (state, action: PayloadAction<JobRole>) => {
            state.loading = false;
            state.items.unshift(action.payload);
        },
        updateJobRoleRequest: (state, _action: PayloadAction<JobRole>) => {
            state.loading = true;
            state.error = null;
        },
        updateJobRoleSuccess: (state, action: PayloadAction<JobRole>) => {
            state.loading = false;
            state.items = upsert(state.items, action.payload);
        },
        deleteJobRoleRequest: (state, _action: PayloadAction<string>) => {
            state.loading = true;
            state.error = null;
        },
        deleteJobRoleSuccess: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        closeJobRoleRequest: (state, _action: PayloadAction<string>) => {
            state.loading = true;
            state.error = null;
        },
        reopenJobRoleRequest: (state, _action: PayloadAction<string>) => {
            state.loading = true;
            state.error = null;
        },
        jobRoleFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

const upsert = (items: JobRole[], role: JobRole) => items.some(item => item.id === role.id) ? items.map(item => item.id === role.id ? role : item) : [role, ...items];

export const jobRoleActions = slice.actions;
export default slice.reducer;
