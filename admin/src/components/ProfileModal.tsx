import {actions} from '../store/recruitSlice';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {STAGES} from '../constants';
import {Badge, Button, Modal} from './ui';

export function ProfileModal() {
    const d = useAppDispatch();
    const {candidates, ui, jobs} = useAppSelector(s => s.recruit);
    const c = candidates.find(x => x.id === ui.selectedCandidateId);
    if (!c) return null;
    const job = jobs.find(j => j.id === c.assignedJobId);
    const share = () => {
        navigator.clipboard?.writeText(`CSS GLOBAL CANDIDATE PROFILE\n${c.fn} ${c.ln}\n${c.role}\nLanguages: ${c.langs.join(', ')}\nSkills: ${c.skills.join(', ')}\nClient notes: ${c.clientNotes}`);
        alert('Client-safe profile copied')
    };
    return <Modal open={!!c} title="Candidate Profile" onClose={() => d(actions.selectCandidate(null))} wide
                  footer={<><Button onClick={() => d(actions.openCandidateModal(c.id))}>Edit</Button><Button
                      onClick={() => alert('PDF download preview')}>Download PDF</Button><Button onClick={share}>Share
                      by Email</Button><Button danger
                                               onClick={() => confirm('Delete candidate?') && d(actions.deleteCandidate(c.id))}>Delete</Button><Button
                      variant="gold" onClick={() => d(actions.selectCandidate(null))}>Close</Button></>}>
        <div className="profile-top">
            <div className="p-avatar">{c.fn[0]}{c.ln[0]}</div>
            <div>
                <div className="p-name">{c.fn} {c.ln}</div>
                <div className="p-role">{c.role} · {c.sen}</div>
                <div className="p-langs">{c.tags.map(t => <span className="p-lang" key={t}>{t}</span>)}</div>
            </div>
        </div>
        <div className="profile-body"><Info l="EMAIL" v={c.email}/><Info l="PHONE" v={c.phone}/><Info l="LOCATION"
                                                                                                      v={c.location}/><Info
            l="RATING" v={'★'.repeat(c.rat) + '☆'.repeat(5 - c.rat)}/><Info l="SOURCE" v={c.source}/><Info l="SALARY"
                                                                                                           v={c.salary}/><Info
            l="AVAILABILITY" v={c.availability}/><Info l="CURRENT COMPANY" v={c.company}/><Info l="ASSIGNED JOB"
                                                                                                v={job ? `${job.title} — ${job.client}` : 'Unassigned'}
                                                                                                full/>
            <div className="pf full"><label>PIPELINE STAGE</label>
                <div className="pipe-stages">{STAGES.map(s => <div key={s}
                                                                   className={`ps ${c.stage === s ? 'current' : ''}`}
                                                                   onClick={() => d(actions.setStage({
                                                                       id: c.id,
                                                                       stage: s,
                                                                       note: 'Changed from profile'
                                                                   }))}>{s.toUpperCase()}</div>)}</div>
            </div>
            <div className="pf full"><label>SKILLS</label><p>{c.skills.join(', ')}</p></div>
            <div className="pf full"><label>INTERNAL NOTES</label>
                <div className="notes-area">{c.notes}</div>
            </div>
            <div className="pf full"><label>CLIENT-SAFE NOTES</label>
                <div className="notes-area">{c.clientNotes || 'No client-safe notes yet.'}</div>
            </div>
            <div className="pf full"><label>STAGE HISTORY</label>{c.stageHistory.map((h, i) => <div
                className="history-row" key={i}><Badge
                stage={h.stage}>{h.stage}</Badge><b>{h.date}</b><span>{h.note}</span></div>)}</div>
            <div className="pf full"><label>ATTACHMENTS</label>
                <div className="chips">{c.attachments.length ? c.attachments.map(a => <span key={a}>📎 {a}</span>) :
                    <span>No attachments</span>}</div>
            </div>
        </div>
    </Modal>
}

function Info({l, v, full = false}: { l: string; v: string; full?: boolean }) {
    return <div className={`pf ${full ? 'full' : ''}`}><label>{l}</label><p>{v || '—'}</p></div>
}
