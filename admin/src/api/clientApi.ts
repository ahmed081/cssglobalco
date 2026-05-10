import {axiosClient} from './axiosClient';
import type {ClientDto, PageResponse} from './apiTypes';

export const clientApi = {
    fetchClients: async () => (await axiosClient.get<PageResponse<ClientDto>>('/clients', {params: {size: 100}})).data.content,
    createClient: async (payload: Partial<ClientDto>) => (await axiosClient.post<ClientDto>('/clients', payload)).data,
    updateClient: async (payload: ClientDto) => (await axiosClient.put<ClientDto>(`/clients/${payload.id}`, payload)).data,
    deleteClient: async (id: string) => {
        await axiosClient.delete(`/clients/${id}`);
        return id;
    },
};
