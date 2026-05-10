import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {clientActions} from './clientSlice';
import type {Client} from './clientTypes';

export function useClients() {
    const dispatch = useAppDispatch();
    const state = useAppSelector(store => store.clients);
    return {
        clients: state.items,
        loading: state.loading,
        error: state.error,
        fetchClients: () => dispatch(clientActions.fetchClientsRequest()),
        createClient: (client: Partial<Client>) => dispatch(clientActions.createClientRequest(client)),
        updateClient: (client: Client) => dispatch(clientActions.updateClientRequest(client)),
        deleteClient: (id: string) => dispatch(clientActions.deleteClientRequest(id)),
    };
}
