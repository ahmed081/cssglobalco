import {actions} from '../store/recruitSlice';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {Button} from './ui';

const titles: any = {
    dashboard: 'Dashboard',
    jobs: 'All Roles',
    pipeline: 'Pipeline',
    candidates: 'All Candidates',
    calendar: 'Interviews',
    settings: 'Settings'
};

export function Topbar() {
    const d = useAppDispatch();
    const ui = useAppSelector(s => s.recruit.ui);
    return <header className="topbar">
        <button className="hamb" onClick={() => d(actions.toggleSidebar())}>☰</button>
        <div className="topbar-title"><span
            className="crumb">CSS Global / Recruit</span>{ui.roleFilter || titles[ui.view]}</div>
        <div className="search"><span>🔍</span><input value={ui.search}
                                                     placeholder="Search candidates, email, phone, client..."
                                                     onChange={e => d(actions.setSearch(e.target.value))}/>{ui.search &&
            <button onClick={() => d(actions.clearSearch())}>✕</button>}</div>
        <button className="notif">🔔<span>{ui.session.notifications}</span></button>
        <Button size="sm" onClick={() => d(actions.openJobModal())}>+ New Role</Button><Button variant="gold" size="sm"
                                                                                               onClick={() => d(actions.openCandidateModal())}>+
        Add Candidate</Button></header>
}
