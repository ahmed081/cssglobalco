import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {Candidate, CandidateSearchParams, EntityId, Stage} from './candidateTypes';

interface CandidateState {
    items: Candidate[];
    selectedCandidate: Candidate | null;
    loading: boolean;
    error: string | null;
    filters: CandidateSearchParams;
}

const initialState: CandidateState = {items: [], selectedCandidate: null, loading: false, error: null, filters: {}};

const slice = createSlice({
    name: 'candidates',
    initialState,
    reducers: {
        fetchCandidatesRequest: (state, action: PayloadAction<CandidateSearchParams | undefined>) => {
            state.loading = true;
            state.error = null;
            state.filters = action.payload || {};
        },
        searchCandidatesRequest: (state, action: PayloadAction<CandidateSearchParams>) => {
            state.loading = true;
            state.error = null;
            state.filters = action.payload;
        },
        fetchCandidatesSuccess: (state, action: PayloadAction<Candidate[]>) => {
            state.loading = false;
            state.items = action.payload;
        },
        fetchCandidateByIdRequest: (state, _action: PayloadAction<EntityId>) => {
            state.loading = true;
            state.error = null;
        },
        fetchCandidateByIdSuccess: (state, action: PayloadAction<Candidate>) => {
            state.loading = false;
            state.selectedCandidate = action.payload;
            state.items = upsert(state.items, action.payload);
        },
        createCandidateRequest: (state, _action: PayloadAction<Candidate>) => {
            state.loading = true;
            state.error = null;
        },
        createCandidateSuccess: (state, action: PayloadAction<Candidate>) => {
            state.loading = false;
            state.items.unshift(action.payload);
        },
        updateCandidateRequest: (state, _action: PayloadAction<Candidate>) => {
            state.loading = true;
            state.error = null;
        },
        updateCandidateSuccess: (state, action: PayloadAction<Candidate>) => {
            state.loading = false;
            state.items = upsert(state.items, action.payload);
            state.selectedCandidate = action.payload;
        },
        deleteCandidateRequest: (state, _action: PayloadAction<EntityId>) => {
            state.loading = true;
            state.error = null;
        },
        deleteCandidateSuccess: (state, action: PayloadAction<EntityId>) => {
            state.loading = false;
            state.items = state.items.filter(item => item.id !== action.payload);
            state.selectedCandidate = null;
        },
        changeCandidateStageRequest: (state, _action: PayloadAction<{ id: EntityId; stage: Stage; note?: string }>) => {
            state.loading = true;
            state.error = null;
        },
        changeCandidateStageSuccess: (state, action: PayloadAction<Candidate>) => {
            state.loading = false;
            state.items = upsert(state.items, action.payload);
            state.selectedCandidate = action.payload;
        },
        candidateFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

const upsert = (items: Candidate[], candidate: Candidate) => items.some(item => item.id === candidate.id) ? items.map(item => item.id === candidate.id ? candidate : item) : [candidate, ...items];

export const candidateActions = slice.actions;
export default slice.reducer;
