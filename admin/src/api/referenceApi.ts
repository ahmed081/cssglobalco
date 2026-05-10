import {axiosClient} from './axiosClient';
import type {EnumsDto} from './apiTypes';

export const referenceApi = {
    fetchEnums: async () => (await axiosClient.get<EnumsDto>('/reference/enums')).data,
    fetchDepartments: async () => ['Customer Support', 'Sales', 'IT Support', 'Engineering', 'Admissions Officer', 'Communications Officer'],
    fetchLanguages: async () => (await referenceApi.fetchEnums()).languages,
    fetchStages: async () => (await referenceApi.fetchEnums()).candidateStages,
    fetchSeniorityLevels: async () => (await referenceApi.fetchEnums()).seniorityLevels,
    fetchRoleStatuses: async () => (await referenceApi.fetchEnums()).jobStatuses,
};
