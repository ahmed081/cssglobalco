import type {Candidate, Stage} from '../../types';

export interface DashboardStats {
    totalCandidates: number;
    placed: number;
    inPipeline: number;
    openRoles: number;
}

export interface DashboardData {
    stats: DashboardStats;
    pipelineStats: { stage: Stage | string; count: number }[];
    roleStats: { role: string; count: number }[];
    recentCandidates: Candidate[];
}
