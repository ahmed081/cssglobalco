import {axiosClient} from './axiosClient';
import type {EntityId} from '../types';

export interface InterviewPayload {
    scheduledAt?: string;
    interviewer?: string;
    notes?: string;
    outcome?: string
}

export const interviewApi = {
    fetchCandidateInterviews: async (candidateId: EntityId) => (await axiosClient.get(`/candidates/${candidateId}/interviews`)).data,
    createCandidateInterview: async (candidateId: EntityId, payload: InterviewPayload) => (await axiosClient.post(`/candidates/${candidateId}/interviews`, payload)).data,
    updateCandidateInterview: async (candidateId: EntityId, interviewId: EntityId, payload: InterviewPayload) => (await axiosClient.put(`/candidates/${candidateId}/interviews/${interviewId}`, payload)).data,
    deleteCandidateInterview: async (candidateId: EntityId, interviewId: EntityId) => {
        await axiosClient.delete(`/candidates/${candidateId}/interviews/${interviewId}`);
    },
};
