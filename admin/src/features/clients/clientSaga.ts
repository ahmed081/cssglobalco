import {call, put, takeEvery, takeLatest} from 'redux-saga/effects';
import type {PayloadAction} from '@reduxjs/toolkit';
import {clientApi} from '../../api/clientApi';
import {normalizeApiError} from '../../api/axiosClient';
import {notificationActions} from '../notifications/notificationSlice';
import {clientActions} from './clientSlice';
import type {Client} from './clientTypes';

function* fetchClients() {
    try {
        const clients: Client[] = yield call(clientApi.fetchClients);
        yield put(clientActions.fetchClientsSuccess(clients));
    } catch (error) {
        const apiError = normalizeApiError(error);
        yield put(clientActions.clientFailure(apiError.message));
    }
}

function* createClient(action: PayloadAction<Partial<Client>>) {
    try {
        const client: Client = yield call(clientApi.createClient, action.payload);
        yield put(clientActions.createClientSuccess(client));
        yield put(notificationActions.pushNotification('success', 'Client created'));
    } catch (error) {
        const apiError = normalizeApiError(error);
        yield put(clientActions.clientFailure(apiError.message));
        yield put(notificationActions.pushNotification('error', apiError.message));
    }
}

function* updateClient(action: PayloadAction<Client>) {
    try {
        const client: Client = yield call(clientApi.updateClient, action.payload);
        yield put(clientActions.updateClientSuccess(client));
        yield put(notificationActions.pushNotification('success', 'Client updated'));
    } catch (error) {
        const apiError = normalizeApiError(error);
        yield put(clientActions.clientFailure(apiError.message));
        yield put(notificationActions.pushNotification('error', apiError.message));
    }
}

function* deleteClient(action: PayloadAction<string>) {
    try {
        const id: string = yield call(clientApi.deleteClient, action.payload);
        yield put(clientActions.deleteClientSuccess(id));
        yield put(notificationActions.pushNotification('success', 'Client deleted'));
    } catch (error) {
        const apiError = normalizeApiError(error);
        yield put(clientActions.clientFailure(apiError.message));
        yield put(notificationActions.pushNotification('error', apiError.message));
    }
}

export function* clientSaga() {
    yield takeLatest(clientActions.fetchClientsRequest.type, fetchClients);
    yield takeEvery(clientActions.createClientRequest.type, createClient);
    yield takeEvery(clientActions.updateClientRequest.type, updateClient);
    yield takeEvery(clientActions.deleteClientRequest.type, deleteClient);
}
