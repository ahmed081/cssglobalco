import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {DashboardData, DashboardStats} from './dashboardTypes';
import type {Candidate} from '../../types';

interface DashboardState {
    stats: DashboardStats | null;
    pipelineStats: DashboardData['pipelineStats'];
    roleStats: DashboardData['roleStats'];
    recentCandidates: Candidate[];
    loading: boolean;
    error: string | null;
}

const initialState: DashboardState = {
    stats: null,
    pipelineStats: [],
    roleStats: [],
    recentCandidates: [],
    loading: false,
    error: null
};

const slice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        fetchDashboardStatsRequest: state => {
            state.loading = true;
            state.error = null;
        },
        fetchPipelineStatsRequest: state => {
            state.loading = true;
            state.error = null;
        },
        fetchRoleStatsRequest: state => {
            state.loading = true;
            state.error = null;
        },
        fetchRecentCandidatesRequest: state => {
            state.loading = true;
            state.error = null;
        },
        fetchDashboardSuccess: (state, action: PayloadAction<DashboardData>) => {
            state.loading = false;
            state.stats = action.payload.stats;
            state.pipelineStats = action.payload.pipelineStats;
            state.roleStats = action.payload.roleStats;
            state.recentCandidates = action.payload.recentCandidates;
        },
        dashboardFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const dashboardActions = slice.actions;
export default slice.reducer;
