import {axiosClient} from './axiosClient';
import {type JobRoleDto, jobRoleToRequest, mapJobRole, type PageResponse, toApiStatus} from './apiTypes';
import type {JobRole, JobStatus} from '../types';

export interface JobRoleSearchParams {
    q?: string;
    status?: JobStatus;
    page?: number;
    size?: number
}

export const jobRoleApi = {
    fetchJobRoles: async (params: JobRoleSearchParams = {}) => {
        const response = await axiosClient.get<PageResponse<JobRoleDto>>('/roles', {
            params: {
                q: params.q || undefined,
                status: params.status ? toApiStatus(params.status) : undefined,
                page: params.page || 0,
                size: params.size || 100
            },
        });
        return response.data.content.map(mapJobRole);
    },
    fetchJobRoleById: async (id: string) => mapJobRole((await axiosClient.get<JobRoleDto>(`/roles/${id}`)).data),
    createJobRole: async (role: JobRole) => mapJobRole((await axiosClient.post<JobRoleDto>('/roles', jobRoleToRequest(role))).data),
    updateJobRole: async (role: JobRole) => mapJobRole((await axiosClient.put<JobRoleDto>(`/roles/${role.id}`, jobRoleToRequest(role))).data),
    deleteJobRole: async (id: string) => {
        await axiosClient.delete(`/roles/${id}`);
        return id;
    },
};
