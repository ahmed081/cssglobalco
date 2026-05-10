import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {Client} from './clientTypes';

interface ClientState {
    items: Client[];
    loading: boolean;
    error: string | null;
}

const initialState: ClientState = {items: [], loading: false, error: null};

const slice = createSlice({
    name: 'clients',
    initialState,
    reducers: {
        fetchClientsRequest: state => {
            state.loading = true;
            state.error = null;
        },
        fetchClientsSuccess: (state, action: PayloadAction<Client[]>) => {
            state.loading = false;
            state.items = action.payload;
        },
        createClientRequest: (state, _action: PayloadAction<Partial<Client>>) => {
            state.loading = true;
            state.error = null;
        },
        createClientSuccess: (state, action: PayloadAction<Client>) => {
            state.loading = false;
            state.items.unshift(action.payload);
        },
        updateClientRequest: (state, _action: PayloadAction<Client>) => {
            state.loading = true;
            state.error = null;
        },
        updateClientSuccess: (state, action: PayloadAction<Client>) => {
            state.loading = false;
            state.items = state.items.map(item => item.id === action.payload.id ? action.payload : item);
        },
        deleteClientRequest: (state, _action: PayloadAction<string>) => {
            state.loading = true;
            state.error = null;
        },
        deleteClientSuccess: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        clientFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const clientActions = slice.actions;
export default slice.reducer;
