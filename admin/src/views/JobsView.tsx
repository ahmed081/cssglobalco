import {ROLE_COLORS, ROLE_ICONS} from '../constants';
import {Badge, Button, Card, Empty} from '../components/ui';
import {actions} from '../store/recruitSlice';
import {useAppDispatch, useAppSelector} from '../store/hooks';

export function JobsView() {
    const dispatch = useAppDispatch();
    const {jobs, candidates, ui} = useAppSelector(state => state.recruit);
    const q = ui.search.toLowerCase();
    const rows = jobs.filter(job => (job.title + job.client + job.dept + job.desc + job.requiredSkills.join(' ')).toLowerCase().includes(q));

    return (
        <>
            <div className="toolbar">
                <Button variant="gold" onClick={() => dispatch(actions.openJobModal())}>+ Create role</Button>
                <Button onClick={() => alert('Duplicate role preview: choose a role card first')}>Duplicate
                    selected</Button>
                <Button onClick={() => alert('Role export preview')}>Export roles</Button>
            </div>
            {!rows.length ? (
                <Empty icon="R" title="No roles found" text="Create your first opening or clear filters."
                       action={<Button variant="gold" onClick={() => dispatch(actions.openJobModal())}>New
                           Role</Button>}/>
            ) : (
                <div className="jobs-grid rich">
                    {rows.map(job => {
                        const [color, background] = ROLE_COLORS[job.dept];
                        const count = job.candidateCount ?? candidates.filter(candidate => candidate.assignedJobId === job.id).length;
                        return (
                            <Card key={job.id} className="job-card-rich">
                                <div className="job-head">
                                    <div className="job-icon" style={{background, color}}>{ROLE_ICONS[job.dept]}</div>
                                    <div><h3>{job.title}</h3><p>{job.client} - {job.loc}</p></div>
                                    <Badge stage={job.status === 'Open' ? 'Placed' : job.status}>{job.status}</Badge>
                                </div>
                                <p className="desc">{job.desc}</p>
                                <div className="meta-grid">
                                    <span>{job.salary}</span><span>{job.workMode}</span><span>{job.contractType}</span><span>{job.openings} openings</span><span>{job.deadline}</span><span>{job.priority}</span><span>{job.recruiter}</span><span>{count} assigned</span>
                                </div>
                                <div className="chips">{job.requiredSkills.map(skill => <span
                                    key={skill}>{skill}</span>)}</div>
                                <div className="card-actions">
                                    <Button onClick={() => dispatch(actions.openJobModal(job.id))}>Edit</Button>
                                    <Button onClick={() => alert(job.desc)}>Details</Button>
                                    <Button onClick={() => dispatch(actions.updateJob({
                                        ...job,
                                        status: job.status === 'Closed' ? 'Open' : 'Closed'
                                    }))}>{job.status === 'Closed' ? 'Reopen' : 'Close'}</Button>
                                    <Button danger
                                            onClick={() => confirm('Delete this role?') && dispatch(actions.deleteJob(job.id))}>Delete</Button>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            )}
        </>
    );
}
