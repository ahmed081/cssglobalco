import {FormEvent, useMemo, useState} from 'react';
import {actions} from '../store/recruitSlice';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {LANGS, ROLES} from '../constants';
import type {JobRole} from '../types';
import {Button, Field, Modal} from './ui';

const blank = (): JobRole => ({
    id: 'job-' + Date.now(),
    title: '',
    dept: 'Customer Support',
    client: '',
    loc: 'Remote — Casablanca',
    sen: 'Mid',
    status: 'Open',
    langs: ['EN', 'FR'],
    desc: '',
    date: new Date().toLocaleDateString('en-GB'),
    salary: '',
    openings: 1,
    deadline: '',
    priority: 'Medium',
    recruiter: 'Amal',
    workMode: 'Remote',
    contractType: 'Full-time',
    requiredSkills: [],
    niceSkills: []
});

export function JobFormModal() {
    const d = useAppDispatch();
    const {ui, jobs} = useAppSelector(s => s.recruit);
    const clients = useAppSelector(s => s.clients.items);
    const editing = jobs.find(j => j.id === ui.selectedJobId);
    const [data, setData] = useState<JobRole>(editing || blank());
    const [err, setErr] = useState('');
    useMemo(() => setData(editing || blank()), [editing, ui.jobModal]);
    if (!ui.jobModal) return null;
    const set = (k: keyof JobRole, v: any) => setData({...data, [k]: v});
    const submit = (e: FormEvent) => {
        e.preventDefault();
        if (!data.title.trim()) {
            setErr('Role title is required');
            return
        }
        editing ? d(actions.updateJob(data)) : d(actions.addJob(data));
        d(actions.closeJobModal())
    };
    return <Modal open title={editing ? 'Edit Role' : 'Create New Role'} onClose={() => d(actions.closeJobModal())} wide
                  footer={<><Button onClick={() => d(actions.closeJobModal())}>Cancel</Button><Button variant="gold"
                                                                                                      onClick={() => document.getElementById('job-form-submit')?.click()}>{editing ? 'Save Role' : 'Create Role'}</Button></>}>
        <form className="fgrid" onSubmit={submit}><Field label="Role Title *" full error={err}><input value={data.title}
                                                                                                      onChange={e => set('title', e.target.value)}/></Field><Field
            label="Department"><select value={data.dept} onChange={e => set('dept', e.target.value)}>{ROLES.map(r =>
            <option key={r}>{r}</option>)}</select></Field><Field label="Client / Company">{clients.length ?
            <select value={data.clientCompanyId || ''} onChange={e => {
                const client = clients.find(x => x.id === e.target.value);
                setData({...data, clientCompanyId: e.target.value, client: client?.name || ''})
            }}>
                <option value="">Select client</option>
                {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select> :
            <input value={data.client} onChange={e => set('client', e.target.value)}/>}</Field><Field
            label="Location"><input value={data.loc} onChange={e => set('loc', e.target.value)}/></Field><Field
            label="Seniority"><select value={data.sen}
                                      onChange={e => set('sen', e.target.value)}>{['Junior', 'Mid', 'Senior', 'Lead'].map(x =>
            <option key={x}>{x}</option>)}</select></Field><Field label="Status"><select value={data.status}
                                                                                         onChange={e => set('status', e.target.value)}>{['Open', 'On Hold', 'Closed'].map(x =>
            <option key={x}>{x}</option>)}</select></Field><Field label="Priority"><select value={data.priority}
                                                                                           onChange={e => set('priority', e.target.value)}>{['Low', 'Medium', 'High', 'Urgent'].map(x =>
            <option key={x}>{x}</option>)}</select></Field><Field label="Work Mode"><select value={data.workMode}
                                                                                            onChange={e => set('workMode', e.target.value)}>{['Remote', 'Hybrid', 'Onsite'].map(x =>
            <option key={x}>{x}</option>)}</select></Field><Field label="Salary Range"><input value={data.salary}
                                                                                              onChange={e => set('salary', e.target.value)}/></Field><Field
            label="Number of Openings"><input type="number" value={data.openings}
                                              onChange={e => set('openings', +e.target.value)}/></Field><Field
            label="Deadline"><input value={data.deadline}
                                    onChange={e => set('deadline', e.target.value)}/></Field><Field
            label="Recruiter Owner"><input value={data.recruiter}
                                           onChange={e => set('recruiter', e.target.value)}/></Field><Field
            label="Languages" full>
            <div className="lang-checks">{LANGS.map(l => <label key={l}><input type="checkbox"
                                                                               checked={data.langs.includes(l)}
                                                                               onChange={() => set('langs', data.langs.includes(l) ? data.langs.filter(x => x !== l) : [...data.langs, l])}/>{l}
            </label>)}</div>
        </Field><Field label="Required Skills" full><input value={data.requiredSkills.join(', ')}
                                                           onChange={e => set('requiredSkills', e.target.value.split(',').map(x => x.trim()).filter(Boolean))}/></Field><Field
            label="Nice-to-have Skills" full><input value={data.niceSkills.join(', ')}
                                                    onChange={e => set('niceSkills', e.target.value.split(',').map(x => x.trim()).filter(Boolean))}/></Field><Field
            label="Description / Requirements" full><textarea value={data.desc}
                                                              onChange={e => set('desc', e.target.value)}/></Field>
            <button id="job-form-submit" hidden/>
        </form>
    </Modal>
}
