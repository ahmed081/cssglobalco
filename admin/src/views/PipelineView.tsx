import {MAIN_STAGES, STAGE_COLORS} from '../constants';
import {Badge, Button} from '../components/ui';
import {actions} from '../store/recruitSlice';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import type {EntityId} from '../types';

export function PipelineView() {
    const dispatch = useAppDispatch();
    const {candidates, ui, jobs} = useAppSelector(state => state.recruit);
    const q = ui.search.toLowerCase();
    const move = (id: EntityId, dir: number) => {
        const candidate = candidates.find(item => item.id === id);
        if (!candidate) return;
        const currentIndex = MAIN_STAGES.indexOf(candidate.stage);
        dispatch(actions.setStage({
            id,
            stage: MAIN_STAGES[Math.max(0, Math.min(MAIN_STAGES.length - 1, currentIndex + dir))]
        }));
    };

    return (
        <>
            <div className="toolbar">
                <Button onClick={() => alert('Drag & drop visual placeholder: use action buttons in this UI demo')}>Drag
                    mode</Button>
                <Button onClick={() => alert('Custom stages preview')}>Customize stages</Button>
                <div className="legend">{MAIN_STAGES.map(stage => <span key={stage}><i
                    style={{background: STAGE_COLORS[stage][0]}}/> {stage}</span>)}</div>
            </div>
            <div className="pipeline">
                {MAIN_STAGES.map(stage => {
                    const [color] = STAGE_COLORS[stage];
                    const items = candidates.filter(candidate => candidate.stage === stage && (candidate.fn + candidate.ln + candidate.email + candidate.phone + candidate.role).toLowerCase().includes(q)).sort((a, b) => b.rat - a.rat);
                    return (
                        <div className="pipe-col" key={stage}>
                            <div className="pipe-col-hdr">
                                <div className="pipe-col-title" style={{color}}>{stage.toUpperCase()}</div>
                                <div className="pipe-count">{items.length}</div>
                            </div>
                            {items.map(candidate => {
                                const job = jobs.find(item => item.id === candidate.assignedJobId);
                                return (
                                    <div className="cand-tile" key={candidate.id}
                                         onClick={() => dispatch(actions.selectCandidate(candidate.id))}>
                                        <div className="tile-top">
                                            <div>
                                                <div className="tile-name">{candidate.fn} {candidate.ln}</div>
                                                <div className="tile-role">{candidate.role}</div>
                                            </div>
                                            <Badge stage={candidate.stage}>{candidate.stage}</Badge></div>
                                        <div className="tile-langs">{candidate.langs.map(language => <span
                                            className="lang" key={language}>{language}</span>)}</div>
                                        <div
                                            className="tile-rating">{'*'.repeat(candidate.rat)}{'-'.repeat(5 - candidate.rat)}</div>
                                        <p className="tile-mini">{candidate.attachments.length} files
                                            - {candidate.cv ? 'CV attached' : 'No CV'}</p>
                                        <p className="tile-mini">{job?.client || 'No assigned job'}</p>
                                        <p className="tile-mini">{candidate.lastActivity}</p>
                                        {candidate.interviewDate &&
                                            <p className="tile-mini">{candidate.interviewDate}</p>}
                                        <div className="tile-btns">
                                            <button className="tile-btn" onClick={event => {
                                                event.stopPropagation();
                                                move(candidate.id, -1);
                                            }}>Back
                                            </button>
                                            <button className="tile-btn adv" onClick={event => {
                                                event.stopPropagation();
                                                move(candidate.id, 1);
                                            }}>Advance
                                            </button>
                                            <button className="tile-btn danger" onClick={event => {
                                                event.stopPropagation();
                                                dispatch(actions.setStage({
                                                    id: candidate.id,
                                                    stage: 'Rejected',
                                                    note: 'Rejected from board'
                                                }));
                                            }}>Reject
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                            {!items.length && <div className="col-empty">Drop candidates here</div>}
                        </div>
                    );
                })}
            </div>
        </>
    );
}
