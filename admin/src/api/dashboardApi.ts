import {axiosClient} from './axiosClient';
import {type DashboardDto, mapCandidate} from './apiTypes';
import type {Stage} from '../types';

export const dashboardApi = {
    fetchDashboard: async () => {
        const data = (await axiosClient.get<DashboardDto>('/dashboard')).data;
        return {
            stats: {
                totalCandidates: data.totalCandidates,
                placed: data.placed,
                inPipeline: data.inPipeline,
                openRoles: data.openRoles,
            },
            pipelineStats: data.stageCounts.map(item => ({
                stage: item.stage.replace(/_/g, ' ') as Stage,
                count: item.count
            })),
            roleStats: data.roleCounts,
            recentCandidates: data.recentCandidates.map(mapCandidate),
        };
    },
};
