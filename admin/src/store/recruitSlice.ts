import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {candidates, jobs} from '../data/seed';
import {candidateActions} from '../features/candidates/candidateSlice';
import {jobRoleActions} from '../features/jobRoles/jobRoleSlice';
import type {Candidate, EntityId, JobRole, Role, Stage, UiState, View} from '../types';

interface State {
    candidates: Candidate[];
    jobs: JobRole[];
    ui: UiState;
}

const initialState: State = {
    candidates,
    jobs,
    ui: {
        view: 'dashboard',
        roleFilter: '',
        search: '',
        sidebarOpen: false,
        selectedCandidateId: null,
        editingCandidateId: null,
        selectedJobId: null,
        candidateModal: false,
        jobModal: false,
        dateRange: '30d',
        stageFilter: '',
        langFilter: '',
        sort: 'newest',
        selectedIds: [],
        session: {user: 'Recruitment Admin', role: 'Recruitment Admin', notifications: 0, authenticated: false},
    },
};

const slice = createSlice({
    name: 'recruit',
    initialState,
    reducers: {
        setView: (state, action: PayloadAction<View>) => {
            state.ui.view = action.payload;
            state.ui.roleFilter = '';
            state.ui.sidebarOpen = false;
        },
        setRoleFilter: (state, action: PayloadAction<Role>) => {
            state.ui.view = 'candidates';
            state.ui.roleFilter = action.payload;
            state.ui.sidebarOpen = false;
        },
        setSearch: (state, action: PayloadAction<string>) => {
            state.ui.search = action.payload;
        },
        clearSearch: state => {
            state.ui.search = '';
        },
        toggleSidebar: state => {
            state.ui.sidebarOpen = !state.ui.sidebarOpen;
        },
        closeSidebar: state => {
            state.ui.sidebarOpen = false;
        },
        openCandidateModal: (state, action: PayloadAction<EntityId | undefined>) => {
            state.ui.editingCandidateId = action.payload ?? null;
            state.ui.candidateModal = true;
        },
        closeCandidateModal: state => {
            state.ui.candidateModal = false;
            state.ui.editingCandidateId = null;
        },
        openJobModal: (state, action: PayloadAction<string | undefined>) => {
            state.ui.selectedJobId = action.payload ?? null;
            state.ui.jobModal = true;
        },
        closeJobModal: state => {
            state.ui.jobModal = false;
            state.ui.selectedJobId = null;
        },
        selectCandidate: (state, action: PayloadAction<EntityId | null>) => {
            state.ui.selectedCandidateId = action.payload;
        },
        addCandidate: (state, action: PayloadAction<Candidate>) => {
            state.candidates.unshift(action.payload);
        },
        updateCandidate: (state, action: PayloadAction<Candidate>) => {
            state.candidates = state.candidates.map(candidate => candidate.id === action.payload.id ? action.payload : candidate);
        },
        deleteCandidate: (state, action: PayloadAction<EntityId>) => {
            state.candidates = state.candidates.filter(candidate => candidate.id !== action.payload);
            state.ui.selectedCandidateId = null;
        },
        setStage: (state, action: PayloadAction<{ id: EntityId; stage: Stage; note?: string }>) => {
            const candidate = state.candidates.find(item => item.id === action.payload.id);
            if (candidate) {
                candidate.stage = action.payload.stage;
                candidate.updated = new Date().toLocaleDateString('en-GB');
                candidate.lastActivity = `Moved to ${action.payload.stage}`;
                candidate.stageHistory.push({
                    stage: action.payload.stage,
                    date: new Date().toLocaleDateString('en-GB'),
                    note: action.payload.note || 'Stage updated'
                });
            }
        },
        addJob: (state, action: PayloadAction<JobRole>) => {
            state.jobs.unshift(action.payload);
        },
        updateJob: (state, action: PayloadAction<JobRole>) => {
            state.jobs = state.jobs.map(job => job.id === action.payload.id ? action.payload : job);
        },
        deleteJob: (state, action: PayloadAction<string>) => {
            state.jobs = state.jobs.filter(job => job.id !== action.payload);
        },
        setDateRange: (state, action: PayloadAction<UiState['dateRange']>) => {
            state.ui.dateRange = action.payload;
        },
        setStageFilter: (state, action: PayloadAction<'' | Stage>) => {
            state.ui.stageFilter = action.payload;
        },
        setLangFilter: (state, action: PayloadAction<string>) => {
            state.ui.langFilter = action.payload;
        },
        setSort: (state, action: PayloadAction<UiState['sort']>) => {
            state.ui.sort = action.payload;
        },
        resetFilters: state => {
            state.ui.stageFilter = '';
            state.ui.langFilter = '';
            state.ui.sort = 'newest';
        },
        toggleSelect: (state, action: PayloadAction<EntityId>) => {
            state.ui.selectedIds = state.ui.selectedIds.includes(action.payload)
                ? state.ui.selectedIds.filter(id => id !== action.payload)
                : [...state.ui.selectedIds, action.payload];
        },
        clearSelection: state => {
            state.ui.selectedIds = [];
        },
        bulkStage: (state, action: PayloadAction<Stage>) => {
            state.candidates = state.candidates.map(candidate => state.ui.selectedIds.includes(candidate.id) ? {
                ...candidate,
                stage: action.payload,
                lastActivity: `Bulk moved to ${action.payload}`
            } : candidate);
            state.ui.selectedIds = [];
        },
        resetDemoData: state => {
            state.candidates = candidates;
            state.jobs = jobs;
        },
        setSessionUser: (state, action: PayloadAction<{ user: string; role: string; authenticated: boolean }>) => {
            state.ui.session.user = action.payload.user;
            state.ui.session.role = action.payload.role;
            state.ui.session.authenticated = action.payload.authenticated;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(candidateActions.fetchCandidatesSuccess, (state, action) => {
                state.candidates = action.payload;
            })
            .addCase(candidateActions.fetchCandidateByIdSuccess, (state, action) => {
                state.candidates = upsertCandidate(state.candidates, action.payload);
            })
            .addCase(candidateActions.createCandidateSuccess, (state, action) => {
                state.candidates = upsertCandidate(state.candidates.filter(candidate => candidate.id !== action.payload.id), action.payload);
            })
            .addCase(candidateActions.updateCandidateSuccess, (state, action) => {
                state.candidates = upsertCandidate(state.candidates, action.payload);
            })
            .addCase(candidateActions.deleteCandidateSuccess, (state, action) => {
                state.candidates = state.candidates.filter(candidate => candidate.id !== action.payload);
                state.ui.selectedCandidateId = null;
            })
            .addCase(candidateActions.changeCandidateStageSuccess, (state, action) => {
                state.candidates = upsertCandidate(state.candidates, action.payload);
            })
            .addCase(jobRoleActions.fetchJobRolesSuccess, (state, action) => {
                state.jobs = action.payload;
            })
            .addCase(jobRoleActions.createJobRoleSuccess, (state, action) => {
                state.jobs = upsertJob(state.jobs.filter(job => job.id !== action.payload.id), action.payload);
            })
            .addCase(jobRoleActions.updateJobRoleSuccess, (state, action) => {
                state.jobs = upsertJob(state.jobs, action.payload);
            })
            .addCase(jobRoleActions.deleteJobRoleSuccess, (state, action) => {
                state.jobs = state.jobs.filter(job => job.id !== action.payload);
            });
    },
});

const upsertCandidate = (items: Candidate[], candidate: Candidate) => items.some(item => item.id === candidate.id) ? items.map(item => item.id === candidate.id ? candidate : item) : [candidate, ...items];
const upsertJob = (items: JobRole[], job: JobRole) => items.some(item => item.id === job.id) ? items.map(item => item.id === job.id ? job : item) : [job, ...items];

export const actions = slice.actions;
export default slice.reducer;
