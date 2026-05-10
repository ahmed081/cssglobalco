import {axiosClient} from './axiosClient';
import type {EntityId} from '../types';

export interface CandidateNotePayload {
    body: string;
    visibility?: string
}

export const noteApi = {
    fetchCandidateNotes: async (candidateId: EntityId) => (await axiosClient.get(`/candidates/${candidateId}/notes`)).data,
    addCandidateNote: async (candidateId: EntityId, payload: CandidateNotePayload) => (await axiosClient.post(`/candidates/${candidateId}/notes`, payload)).data,
};
