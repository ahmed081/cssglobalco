import type {Candidate, JobRole, JobStatus, Role, Stage, WorkMode} from '../types';

export interface PageResponse<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    number: number;
    size: number;
}

export interface ApiErrorShape {
    status?: number;
    message: string;
    details?: unknown;
}

export interface UserDto {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phone?: string;
    role?: string;
    language?: string;
    active: boolean;
}

export interface AuthResponseDto {
    accessToken: string;
    refreshToken?: string;
    expiresIn?: number;
    tokenType?: string;
    user: UserDto;
}

export interface CandidateDto {
    id: string;
    firstName: string;
    lastName: string;
    email?: string;
    phone?: string;
    linkedinUrl?: string;
    location?: string;
    source?: string;
    stage?: string;
    role?: string;
    seniority?: string;
    rating?: number;
    yearsOfExperience?: number;
    salaryExpectation?: number | string;
    availabilityDate?: string;
    currentCompany?: string;
    skills?: string;
    cvUrl?: string;
    notes?: string;
    tags?: string;
    avatarUrl?: string;
    assignedJobId?: string;
    assignedJobTitle?: string;
    languages?: string[];
    createdOn?: string;
    updatedOn?: string;
}

export interface JobRoleDto {
    id: string;
    title: string;
    department: string;
    clientCompanyId?: string;
    clientCompanyName?: string;
    location?: string;
    seniority?: string;
    status?: string;
    priority?: string;
    contractType?: string;
    workMode?: string;
    openings?: number;
    deadline?: string;
    salaryMin?: number | string;
    salaryMax?: number | string;
    description?: string;
    requiredSkills?: string;
    niceToHaveSkills?: string;
    languages?: string[];
    candidateCount?: number;
    createdOn?: string;
    updatedOn?: string;
}

export interface ClientDto {
    id: string;
    name: string;
    contactName?: string;
    contactEmail?: string;
    phone?: string;
    logoUrl?: string;
    city?: string;
    country?: string;
    active: boolean;
}

export interface DashboardDto {
    totalCandidates: number;
    placed: number;
    inPipeline: number;
    openRoles: number;
    stageCounts: { stage: string; count: number }[];
    roleCounts: { role: string; count: number }[];
    recentCandidates: CandidateDto[];
}

export interface EnumsDto {
    candidateStages: string[];
    seniorityLevels: string[];
    jobStatuses: string[];
    jobPriorities: string[];
    languages: string[];
    contractTypes: string[];
    workModes: string[];
    noteVisibilities: string[];
}

const stageToApi: Record<Stage, string> = {
    New: 'NEW',
    Screening: 'SCREENING',
    Interview: 'INTERVIEW',
    'Offer Sent': 'OFFER_SENT',
    Placed: 'PLACED',
    Rejected: 'REJECTED',
    Withdrawn: 'WITHDRAWN',
    'On Hold': 'ON_HOLD',
};

const stageFromApi: Record<string, Stage> = Object.fromEntries(
    Object.entries(stageToApi).map(([label, api]) => [api, label]),
) as Record<string, Stage>;

const statusToApi: Record<JobStatus, string> = {Open: 'OPEN', 'On Hold': 'ON_HOLD', Closed: 'CLOSED'};
const statusFromApi: Record<string, JobStatus> = {OPEN: 'Open', ON_HOLD: 'On Hold', CLOSED: 'Closed'};
const priorityFromApi: Record<string, JobRole['priority']> = {
    LOW: 'Low',
    MEDIUM: 'Medium',
    HIGH: 'High',
    URGENT: 'Urgent'
};
const priorityToApi: Record<JobRole['priority'], string> = {
    Low: 'LOW',
    Medium: 'MEDIUM',
    High: 'HIGH',
    Urgent: 'URGENT'
};
const workModeFromApi: Record<string, WorkMode> = {REMOTE: 'Remote', HYBRID: 'Hybrid', ONSITE: 'Onsite'};
const workModeToApi: Record<WorkMode, string> = {Remote: 'REMOTE', Hybrid: 'HYBRID', Onsite: 'ONSITE'};

const normalizeRole = (value?: string): Role => {
    const cleaned = (value || 'Customer Support').replace(/_/g, ' ').toLowerCase();
    if (cleaned.includes('sales')) return 'Sales';
    if (cleaned.includes('support') && cleaned.includes('it')) return 'IT Support';
    if (cleaned.includes('engineer')) return 'Engineering';
    if (cleaned.includes('admission')) return 'Admissions Officer';
    if (cleaned.includes('communication')) return 'Communications Officer';
    return 'Customer Support';
};

const splitCsv = (value?: string): string[] => (value || '').split(',').map(item => item.trim()).filter(Boolean);
const joinCsv = (value: string[]): string => value.join(', ');
const formatDate = (value?: string): string => value ? new Date(value).toLocaleDateString('en-GB') : '';

export const toApiStage = (stage: Stage): string => stageToApi[stage];
export const toApiStatus = (status: JobStatus): string => statusToApi[status];

export const mapCandidate = (dto: CandidateDto): Candidate => ({
    id: dto.id,
    fn: dto.firstName || '',
    ln: dto.lastName || '',
    role: normalizeRole(dto.role),
    sen: (dto.seniority || '').replace(/_/g, ' ') || 'Mid',
    email: dto.email || '',
    phone: dto.phone || '',
    linkedin: dto.linkedinUrl || '',
    location: dto.location || '',
    langs: dto.languages || [],
    stage: stageFromApi[dto.stage || ''] || 'New',
    rat: dto.rating || 3,
    skills: splitCsv(dto.skills),
    cv: dto.cvUrl || '',
    notes: dto.notes || '',
    clientNotes: '',
    source: dto.source || '',
    salary: dto.salaryExpectation?.toString() || '',
    availability: dto.availabilityDate || '',
    years: dto.yearsOfExperience || 0,
    company: dto.currentCompany || '',
    assignedJobId: dto.assignedJobId || '',
    recruiter: '',
    tags: splitCsv(dto.tags),
    date: formatDate(dto.createdOn),
    updated: formatDate(dto.updatedOn) || formatDate(dto.createdOn),
    lastActivity: dto.updatedOn ? 'Updated from backend' : 'Loaded from backend',
    interviewDate: '',
    avatar: dto.avatarUrl,
    stageHistory: [{
        stage: stageFromApi[dto.stage || ''] || 'New',
        date: formatDate(dto.updatedOn || dto.createdOn),
        note: 'Current stage'
    }],
    attachments: dto.cvUrl ? ['CV'] : [],
});

export const candidateToRequest = (candidate: Candidate) => ({
    firstName: candidate.fn,
    lastName: candidate.ln,
    email: candidate.email || undefined,
    phone: candidate.phone || undefined,
    linkedinUrl: candidate.linkedin || undefined,
    location: candidate.location || undefined,
    source: candidate.source || undefined,
    role: candidate.role,
    seniority: candidate.sen.toUpperCase().split(' ')[0],
    stage: toApiStage(candidate.stage),
    rating: candidate.rat,
    yearsOfExperience: candidate.years,
    salaryExpectation: Number.parseFloat(candidate.salary) || undefined,
    availabilityDate: /^\d{4}-\d{2}-\d{2}$/.test(candidate.availability) ? candidate.availability : undefined,
    currentCompany: candidate.company || undefined,
    skills: joinCsv(candidate.skills),
    cvUrl: candidate.cv || undefined,
    notes: candidate.notes || undefined,
    tags: joinCsv(candidate.tags),
    avatarUrl: candidate.avatar || undefined,
    assignedJobId: typeof candidate.assignedJobId === 'string' && candidate.assignedJobId ? candidate.assignedJobId : undefined,
    languages: candidate.langs,
});

export const mapJobRole = (dto: JobRoleDto): JobRole => ({
    id: dto.id,
    title: dto.title || '',
    dept: normalizeRole(dto.department),
    client: dto.clientCompanyName || '',
    clientCompanyId: dto.clientCompanyId,
    loc: dto.location || '',
    sen: (dto.seniority || '').replace(/_/g, ' ') || 'Mid',
    status: statusFromApi[dto.status || ''] || 'Open',
    langs: dto.languages || [],
    desc: dto.description || '',
    date: formatDate(dto.createdOn),
    salary: [dto.salaryMin, dto.salaryMax].filter(Boolean).join(' - '),
    openings: dto.openings || 1,
    deadline: dto.deadline || '',
    priority: priorityFromApi[dto.priority || ''] || 'Medium',
    recruiter: '',
    workMode: workModeFromApi[dto.workMode || ''] || 'Remote',
    contractType: (dto.contractType || 'FULL_TIME').replace(/_/g, '-').toLowerCase(),
    requiredSkills: splitCsv(dto.requiredSkills),
    niceSkills: splitCsv(dto.niceToHaveSkills),
    candidateCount: dto.candidateCount,
});

const salaryRange = (salary: string): [number | undefined, number | undefined] => {
    const values = salary.match(/\d+(\.\d+)?/g)?.map(Number) || [];
    return [values[0], values[1]];
};

export const jobRoleToRequest = (role: JobRole) => {
    const [salaryMin, salaryMax] = salaryRange(role.salary);
    return {
        title: role.title,
        department: role.dept,
        clientCompanyId: role.clientCompanyId,
        location: role.loc || undefined,
        seniority: role.sen.toUpperCase().split(' ')[0],
        status: toApiStatus(role.status),
        priority: priorityToApi[role.priority],
        contractType: role.contractType.toUpperCase().replace('-', '_'),
        workMode: workModeToApi[role.workMode],
        openings: role.openings,
        deadline: /^\d{4}-\d{2}-\d{2}$/.test(role.deadline) ? role.deadline : undefined,
        salaryMin,
        salaryMax,
        description: role.desc || undefined,
        requiredSkills: joinCsv(role.requiredSkills),
        niceToHaveSkills: joinCsv(role.niceSkills),
        languages: role.langs,
    };
};
