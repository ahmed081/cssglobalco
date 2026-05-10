import {MAIN_STAGES, ROLE_ICONS, ROLES, STAGE_COLORS} from '../constants';
import {Badge, Button, Card} from '../components/ui';
import {actions} from '../store/recruitSlice';
import {useAppDispatch, useAppSelector} from '../store/hooks';

export function Dashboard() {
    const dispatch = useAppDispatch();
    const {candidates, jobs, ui} = useAppSelector(state => state.recruit);
    const dashboard = useAppSelector(state => state.dashboard);
    const total = dashboard.stats?.totalCandidates ?? candidates.length;
    const placed = dashboard.stats?.placed ?? candidates.filter(candidate => candidate.stage === 'Placed').length;
    const active = dashboard.stats?.inPipeline ?? candidates.filter(candidate => !['Placed', 'Rejected', 'Withdrawn'].includes(candidate.stage)).length;
    const open = dashboard.stats?.openRoles ?? jobs.filter(job => job.status === 'Open').length;
    const recent = dashboard.recentCandidates.length ? dashboard.recentCandidates : [...candidates].sort((a, b) => String(b.id).localeCompare(String(a.id))).slice(0, 5);

    const stat = (value: number, label: string, sub: string, onClick: () => void) => (
        <Card className="stat-card clickable" onClick={onClick}>
            <div className="stat-card-val">{dashboard.loading ? '...' : value}</div>
            <div className="stat-card-lbl">{label}</div>
            <div className="stat-card-sub">{sub}</div>
        </Card>
    );

    return (
        <>
            <div className="toolbar">
                <select className="fsel" value={ui.dateRange}
                        onChange={event => dispatch(actions.setDateRange(event.target.value as typeof ui.dateRange))}>
                    <option value="7d">Last 7 days</option>
                    <option value="30d">Last 30 days</option>
                    <option value="90d">Last 90 days</option>
                    <option value="all">All time</option>
                </select>
                <Button onClick={() => alert('CSV export preview')}>Export</Button>
                <Button onClick={() => dispatch(actions.resetDemoData())}>Reset demo data</Button>
            </div>
            <div className="stats-row">
                {stat(total, 'Total Candidates', 'Backend dashboard total', () => dispatch(actions.setView('candidates')))}
                {stat(placed, 'Placed', 'Backend placed count', () => dispatch(actions.setStageFilter('Placed')))}
                {stat(active, 'In Pipeline', 'Backend active pipeline', () => dispatch(actions.setView('pipeline')))}
                {stat(open, 'Open Roles', 'Backend open roles', () => dispatch(actions.setView('jobs')))}
            </div>
            <div className="dash-grid">
                <Card>
                    <h3>Pipeline Conversion</h3>
                    {MAIN_STAGES.map(stage => {
                        const count = dashboard.pipelineStats.find(item => item.stage === stage || String(item.stage).replace(/_/g, ' ') === stage.toUpperCase())?.count ?? candidates.filter(candidate => candidate.stage === stage).length;
                        const pct = total ? Math.round(count / total * 100) : 0;
                        const [color] = STAGE_COLORS[stage];
                        return <div className="bar-row" key={stage} onClick={() => {
                            dispatch(actions.setStageFilter(stage));
                            dispatch(actions.setView('candidates'));
                        }}><span>{stage}</span>
                            <div><i style={{width: `${pct}%`, background: color}}/></div>
                            <b style={{color}}>{pct}%</b></div>;
                    })}
                </Card>
                <Card>
                    <h3>By Role</h3>
                    {ROLES.map(role => <div key={role} className="mini-row"
                                            onClick={() => dispatch(actions.setRoleFilter(role))}>
                        <span>{ROLE_ICONS[role]} {role}</span><b>{dashboard.roleStats.find(item => item.role === role)?.count ?? candidates.filter(candidate => candidate.role === role).length}</b>
                    </div>)}
                </Card>
                <Card>
                    <h3>Source Breakdown</h3>
                    {['LinkedIn', 'Referral', 'Website', 'Indeed', 'Database'].map(source => <div className="mini-row"
                                                                                                  key={source}>
                        <span>{source}</span><b>{candidates.filter(candidate => candidate.source === source).length}</b>
                    </div>)}
                </Card>
                <Card>
                    <h3>Recent Candidates</h3>
                    {recent.map(candidate => <div className="candidate-line" key={candidate.id}
                                                  onClick={() => dispatch(actions.selectCandidate(candidate.id))}>
                        <div className="avatar-mini">{candidate.fn[0]}{candidate.ln[0]}</div>
                        <div><b>{candidate.fn} {candidate.ln}</b><p>{candidate.role} - {candidate.lastActivity}</p>
                        </div>
                        <Badge stage={candidate.stage}>{candidate.stage}</Badge></div>)}
                    <Button onClick={() => dispatch(actions.setView('candidates'))}>View all recent candidates</Button>
                </Card>
                <Card><h3>Upcoming
                    Interviews</h3>{candidates.filter(candidate => candidate.interviewDate).map(candidate => <div
                    className="mini-row" key={candidate.id}>
                    <span>{candidate.fn} {candidate.ln}</span><b>{candidate.interviewDate}</b></div>)}</Card>
                <Card><h3>Client Breakdown</h3>{jobs.map(job => <div className="mini-row" key={job.id}>
                    <span>{job.client}</span><b>{job.openings} opening{job.openings > 1 ? 's' : ''}</b></div>)}</Card>
            </div>
        </>
    );
}
