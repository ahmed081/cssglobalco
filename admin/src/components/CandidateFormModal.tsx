import {FormEvent, useMemo, useState} from 'react';
import {actions} from '../store/recruitSlice';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {LANGS, ROLES, STAGES} from '../constants';
import type {Candidate} from '../types';
import {Button, Field, Modal} from './ui';

const blank = (jobId = ''): Candidate => ({
    id: Date.now(),
    fn: '',
    ln: '',
    role: 'Customer Support',
    sen: 'Mid (3-5 yrs)',
    email: '',
    phone: '',
    linkedin: '',
    location: 'Casablanca',
    langs: ['EN', 'FR'],
    stage: 'New',
    rat: 3,
    skills: [],
    cv: '',
    notes: '',
    clientNotes: '',
    source: 'LinkedIn',
    salary: '',
    availability: 'Immediate',
    years: 3,
    company: '',
    assignedJobId: jobId,
    recruiter: 'Amal',
    tags: [],
    date: new Date().toLocaleDateString('en-GB'),
    updated: new Date().toLocaleDateString('en-GB'),
    lastActivity: 'Profile created',
    interviewDate: '',
    stageHistory: [{stage: 'New', date: new Date().toLocaleDateString('en-GB'), note: 'Created'}],
    attachments: []
});

export function CandidateFormModal() {
    const d = useAppDispatch();
    const {ui, candidates, jobs} = useAppSelector(s => s.recruit);
    const editing = candidates.find(c => c.id === ui.editingCandidateId);
    const [data, setData] = useState<Candidate>(editing || blank());
    const [errors, setErrors] = useState<Record<string, string>>({});
    useMemo(() => setData(editing || blank()), [editing, ui.candidateModal]);
    if (!ui.candidateModal) return null;
    const set = (k: keyof Candidate, v: any) => setData({...data, [k]: v});
    const submit = (e: FormEvent) => {
        e.preventDefault();
        const er: any = {};
        if (!data.fn) er.fn = 'First name is required';
        if (!data.ln) er.ln = 'Last name is required';
        if (data.email && !/^[^@]+@[^@]+\.[^@]+$/.test(data.email)) er.email = 'Invalid email';
        if (candidates.some(c => c.id !== data.id && c.email && c.email === data.email)) er.email = 'Duplicate candidate email';
        setErrors(er);
        if (Object.keys(er).length) return;
        editing ? d(actions.updateCandidate(data)) : d(actions.addCandidate(data));
        d(actions.closeCandidateModal())
    };
    return <Modal open title={editing ? 'Edit Candidate' : 'Add Candidate'}
                  onClose={() => d(actions.closeCandidateModal())} wide
                  footer={<><Button onClick={() => d(actions.closeCandidateModal())}>Cancel</Button><Button
                      variant="gold" type="submit"
                      onClick={() => document.getElementById('cand-form-submit')?.click()}>{editing ? 'Save Changes' : 'Save Candidate'}</Button></>}>
        <form onSubmit={submit} className="fgrid"><Field label="First Name *" error={errors.fn}><input value={data.fn}
                                                                                                       onChange={e => set('fn', e.target.value)}/></Field><Field
            label="Last Name *" error={errors.ln}><input value={data.ln}
                                                         onChange={e => set('ln', e.target.value)}/></Field><Field
            label="Role"><select value={data.role} onChange={e => set('role', e.target.value)}>{ROLES.map(r => <option
            key={r}>{r}</option>)}</select></Field><Field label="Assigned Job"><select value={data.assignedJobId}
                                                                                       onChange={e => set('assignedJobId', e.target.value)}>
            <option value="">Unassigned</option>
            {jobs.map(j => <option value={j.id} key={j.id}>{j.title} — {j.client}</option>)}</select></Field><Field
            label="Email" error={errors.email}><input value={data.email} onChange={e => set('email', e.target.value)}/></Field><Field
            label="Phone"><input value={data.phone} onChange={e => set('phone', e.target.value)}/></Field><Field
            label="Stage"><select value={data.stage} onChange={e => set('stage', e.target.value)}>{STAGES.map(s =>
            <option key={s}>{s}</option>)}</select></Field><Field label="Rating"><select value={data.rat}
                                                                                         onChange={e => set('rat', +e.target.value)}>{[5, 4, 3, 2, 1].map(r =>
            <option value={r} key={r}>{'★'.repeat(r)}{'☆'.repeat(5 - r)}</option>)}</select></Field><Field
            label="Languages" full>
            <div className="lang-checks">{LANGS.map(l => <label key={l}><input type="checkbox"
                                                                               checked={data.langs.includes(l)}
                                                                               onChange={() => set('langs', data.langs.includes(l) ? data.langs.filter(x => x !== l) : [...data.langs, l])}/>{l}
            </label>)}</div>
        </Field><Field label="Skills / Tech Stack" full><input value={data.skills.join(', ')}
                                                               onChange={e => set('skills', e.target.value.split(',').map(x => x.trim()).filter(Boolean))}/></Field><Field
            label="Candidate Source"><select value={data.source}
                                             onChange={e => set('source', e.target.value)}>{['LinkedIn', 'Referral', 'Website', 'Indeed', 'Database'].map(x =>
            <option key={x}>{x}</option>)}</select></Field><Field label="Salary Expectation"><input value={data.salary}
                                                                                                    onChange={e => set('salary', e.target.value)}/></Field><Field
            label="Availability"><input value={data.availability} onChange={e => set('availability', e.target.value)}/></Field><Field
            label="Years Experience"><input type="number" value={data.years}
                                            onChange={e => set('years', +e.target.value)}/></Field><Field
            label="Current Company"><input value={data.company} onChange={e => set('company', e.target.value)}/></Field><Field
            label="Recruiter Owner"><input value={data.recruiter}
                                           onChange={e => set('recruiter', e.target.value)}/></Field><Field
            label="LinkedIn"><input value={data.linkedin}
                                    onChange={e => set('linkedin', e.target.value)}/></Field><Field
            label="CV Link / Upload UI"><input value={data.cv} onChange={e => set('cv', e.target.value)}
                                               placeholder="Paste link or use future upload"/></Field><Field
            label="Interview Date"><input value={data.interviewDate}
                                          onChange={e => set('interviewDate', e.target.value)}/></Field><Field
            label="Tags" full><input value={data.tags.join(', ')}
                                     onChange={e => set('tags', e.target.value.split(',').map(x => x.trim()).filter(Boolean))}/></Field><Field
            label="Internal Notes" full><textarea value={data.notes}
                                                  onChange={e => set('notes', e.target.value)}/></Field><Field
            label="Client-Safe Notes" full><textarea value={data.clientNotes}
                                                     onChange={e => set('clientNotes', e.target.value)}/></Field>
            <button id="cand-form-submit" hidden/>
        </form>
    </Modal>
}
