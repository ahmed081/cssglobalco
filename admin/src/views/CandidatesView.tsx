import {LANGS, STAGES} from '../constants';
import {Badge, Button, Empty} from '../components/ui';
import {actions} from '../store/recruitSlice';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import type {Candidate} from '../types';

export function CandidatesView() {
    const dispatch = useAppDispatch();
    const {candidates, ui, jobs} = useAppSelector(state => state.recruit);
    const q = ui.search.toLowerCase();
    let rows = candidates.filter(candidate =>
        (!ui.roleFilter || candidate.role === ui.roleFilter) &&
        (!ui.stageFilter || candidate.stage === ui.stageFilter) &&
        (!ui.langFilter || candidate.langs.includes(ui.langFilter)) &&
        (candidate.fn + candidate.ln + candidate.email + candidate.phone + candidate.role + candidate.skills.join(' ') + candidate.company).toLowerCase().includes(q),
    );
    rows = [...rows].sort((a, b) => ui.sort === 'name'
        ? (a.fn + a.ln).localeCompare(b.fn + b.ln)
        : ui.sort === 'rating'
            ? b.rat - a.rat
            : ui.sort === 'activity'
                ? b.updated.localeCompare(a.updated)
                : String(b.id).localeCompare(String(a.id)));

    return (
        <>
            <div className="filters enhanced">
                <select className="fsel" value={ui.stageFilter}
                        onChange={event => dispatch(actions.setStageFilter(event.target.value as typeof ui.stageFilter))}>
                    <option value="">All stages</option>
                    {STAGES.map(stage => <option key={stage}>{stage}</option>)}</select>
                <select className="fsel" value={ui.langFilter}
                        onChange={event => dispatch(actions.setLangFilter(event.target.value))}>
                    <option value="">All languages</option>
                    {LANGS.map(language => <option key={language}>{language}</option>)}</select>
                <select className="fsel" value={ui.sort}
                        onChange={event => dispatch(actions.setSort(event.target.value as typeof ui.sort))}>
                    <option value="newest">Newest first</option>
                    <option value="name">Name A-Z</option>
                    <option value="rating">Highest rated</option>
                    <option value="activity">Last activity</option>
                </select>
                <Button onClick={() => dispatch(actions.resetFilters())}>Reset filters</Button>
                <Button onClick={() => alert('CSV export preview')}>Export CSV</Button>
                <span className="res-count">{rows.length} candidate{rows.length !== 1 ? 's' : ''}</span>
            </div>
            {ui.selectedIds.length > 0 && <div className="bulkbar"><b>{ui.selectedIds.length} selected</b><Button
                onClick={() => dispatch(actions.bulkStage('Screening'))}>Move to Screening</Button><Button
                onClick={() => dispatch(actions.bulkStage('Rejected'))}>Reject</Button><Button
                onClick={() => dispatch(actions.clearSelection())}>Clear</Button></div>}
            {!rows.length ? (
                <Empty icon="C" title="No candidates found"
                       text={`No result for ${ui.search || 'current filters'}. Try reset filters or add a candidate.`}
                       action={<Button variant="gold" onClick={() => dispatch(actions.openCandidateModal())}>Add
                           Candidate</Button>}/>
            ) : (
                <>
                    <div className="candidate-cards-mobile">{rows.map(candidate => <CandidateCard key={candidate.id}
                                                                                                  candidate={candidate}/>)}</div>
                    <div className="table-wrap">
                        <table>
                            <thead>
                            <tr>{['', 'NAME', 'ROLE', 'JOB/CLIENT', 'LANGUAGES', 'STAGE', 'RATING', 'LAST ACTIVITY', 'ACTIONS'].map(header =>
                                <th key={header}>{header}</th>)}</tr>
                            </thead>
                            <tbody>
                            {rows.map(candidate => {
                                const job = jobs.find(item => item.id === candidate.assignedJobId);
                                return (
                                    <tr key={candidate.id}
                                        onClick={() => dispatch(actions.selectCandidate(candidate.id))}>
                                        <td><input type="checkbox" checked={ui.selectedIds.includes(candidate.id)}
                                                   onClick={event => event.stopPropagation()}
                                                   onChange={() => dispatch(actions.toggleSelect(candidate.id))}/></td>
                                        <td>
                                            <div className="name-cell">
                                                <div className="avatar-mini">{candidate.fn[0]}{candidate.ln[0]}</div>
                                                <div><b>{candidate.fn} {candidate.ln}</b>
                                                    <p>{candidate.email} - {candidate.phone}</p></div>
                                            </div>
                                        </td>
                                        <td><Badge role={candidate.role}>{candidate.role}</Badge><p
                                            className="tiny">{candidate.sen}</p></td>
                                        <td>{job ? <><b>{job.title}</b><p className="tiny">{job.client}</p></> :
                                            <span className="muted">Unassigned</span>}</td>
                                        <td>{candidate.langs.map(language => <span className="lang"
                                                                                   key={language}>{language}</span>)}</td>
                                        <td><Badge stage={candidate.stage}>{candidate.stage}</Badge></td>
                                        <td className="stars">{'*'.repeat(candidate.rat)}{'-'.repeat(5 - candidate.rat)}</td>
                                        <td><b>{candidate.lastActivity}</b><p
                                            className="tiny">Updated {candidate.updated}</p></td>
                                        <td><Button size="sm"
                                                    onClick={() => dispatch(actions.openCandidateModal(candidate.id))}>Edit</Button>
                                        </td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </div>
                    <div className="pagination"><Button>Prev</Button><span>Page 1 of 1</span><Button>Next</Button></div>
                </>
            )}
        </>
    );
}

function CandidateCard({candidate}: { candidate: Candidate }) {
    const dispatch = useAppDispatch();
    return (
        <div className="mobile-card" onClick={() => dispatch(actions.selectCandidate(candidate.id))}>
            <div className="name-cell">
                <div className="avatar-mini">{candidate.fn[0]}{candidate.ln[0]}</div>
                <div><b>{candidate.fn} {candidate.ln}</b><p>{candidate.role}</p></div>
            </div>
            <Badge stage={candidate.stage}>{candidate.stage}</Badge>
            <p>{candidate.email}</p>
            <div>{candidate.langs.map(language => <span className="lang" key={language}>{language}</span>)}</div>
            <div className="card-actions"><Button size="sm"
                                                  onClick={() => dispatch(actions.openCandidateModal(candidate.id))}>Edit</Button>
            </div>
        </div>
    );
}
