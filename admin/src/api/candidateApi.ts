import {axiosClient} from './axiosClient';
import {type CandidateDto, candidateToRequest, mapCandidate, type PageResponse, toApiStage} from './apiTypes';
import type {Candidate, EntityId, Stage} from '../types';

export interface CandidateSearchParams {
    q?: string;
    stage?: Stage | '';
    role?: string;
    page?: number;
    size?: number
}

export const candidateApi = {
    fetchCandidates: async (params: CandidateSearchParams = {}) => {
        const response = await axiosClient.get<PageResponse<CandidateDto>>('/candidates', {
            params: {
                q: params.q || undefined,
                stage: params.stage ? toApiStage(params.stage) : undefined,
                role: params.role || undefined,
                page: params.page || 0,
                size: params.size || 100
            },
        });
        return response.data.content.map(mapCandidate);
    },
    fetchCandidateById: async (id: EntityId) => mapCandidate((await axiosClient.get<CandidateDto>(`/candidates/${id}`)).data),
    createCandidate: async (candidate: Candidate) => mapCandidate((await axiosClient.post<CandidateDto>('/candidates', candidateToRequest(candidate))).data),
    updateCandidate: async (candidate: Candidate) => mapCandidate((await axiosClient.put<CandidateDto>(`/candidates/${candidate.id}`, candidateToRequest(candidate))).data),
    deleteCandidate: async (id: EntityId) => {
        await axiosClient.delete(`/candidates/${id}`);
        return id;
    },
    changeCandidateStage: async (id: EntityId, stage: Stage, note?: string) => mapCandidate((await axiosClient.patch<CandidateDto>(`/candidates/${id}/stage`, {
        stage: toApiStage(stage),
        note
    })).data),
};
