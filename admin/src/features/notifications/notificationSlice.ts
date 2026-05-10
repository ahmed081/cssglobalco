import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface Notification {
    id: string;
    type: NotificationType;
    message: string;
}

interface NotificationState {
    items: Notification[];
}

const initialState: NotificationState = {items: []};

const slice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        pushNotification: {
            reducer: (state, action: PayloadAction<Notification>) => {
                state.items.push(action.payload);
            },
            prepare: (type: NotificationType, message: string) => ({
                payload: {
                    id: `${Date.now()}-${Math.random()}`,
                    type,
                    message
                }
            }),
        },
        removeNotification: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        clearNotifications: state => {
            state.items = [];
        },
    },
});

export const notificationActions = slice.actions;
export default slice.reducer;
