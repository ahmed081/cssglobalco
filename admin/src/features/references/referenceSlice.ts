import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {EnumsDto} from '../../api/apiTypes';

interface ReferenceState {
    data: EnumsDto | null;
    loading: boolean;
    error: string | null;
}

const initialState: ReferenceState = {data: null, loading: false, error: null};

const slice = createSlice({
    name: 'references',
    initialState,
    reducers: {
        fetchReferenceDataRequest: state => {
            state.loading = true;
            state.error = null;
        },
        fetchDepartmentsRequest: state => {
            state.loading = true;
            state.error = null;
        },
        fetchLanguagesRequest: state => {
            state.loading = true;
            state.error = null;
        },
        fetchStagesRequest: state => {
            state.loading = true;
            state.error = null;
        },
        fetchSeniorityLevelsRequest: state => {
            state.loading = true;
            state.error = null;
        },
        fetchRoleStatusesRequest: state => {
            state.loading = true;
            state.error = null;
        },
        fetchReferenceDataSuccess: (state, action: PayloadAction<EnumsDto>) => {
            state.loading = false;
            state.data = action.payload;
        },
        referenceFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const referenceActions = slice.actions;
export default slice.reducer;
