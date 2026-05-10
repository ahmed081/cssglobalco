import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {AuthUser} from '../auth/authTypes';

interface SessionState {
    user: AuthUser | null;
    loading: boolean;
    error: string | null;
    checked: boolean;
}

const initialState: SessionState = {user: null, loading: false, error: null, checked: false};

const slice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        checkSessionRequest: state => {
            state.loading = true;
            state.error = null;
        },
        checkSessionSuccess: (state, action: PayloadAction<AuthUser>) => {
            state.user = action.payload;
            state.loading = false;
            state.checked = true;
        },
        checkSessionFailure: (state, action: PayloadAction<string>) => {
            state.user = null;
            state.loading = false;
            state.checked = true;
            state.error = action.payload;
        },
        clearSession: state => {
            state.user = null;
            state.loading = false;
            state.checked = true;
            state.error = null;
        },
    },
});

export const sessionActions = slice.actions;
export default slice.reducer;
