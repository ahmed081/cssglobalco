import {ROLE_ICONS, ROLES} from '../constants';
import {authActions} from '../features/auth/authSlice';
import {actions} from '../store/recruitSlice';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import type {View} from '../types';

export function Sidebar() {
    const dispatch = useAppDispatch();
    const {candidates, jobs, ui} = useAppSelector(state => state.recruit);
    const user = useAppSelector(state => state.session.user || state.auth.user);
    const name = user ? `${user.firstName} ${user.lastName}`.trim() : ui.session.user;
    const initials = name.split(' ').map(part => part[0]).join('').slice(0, 2) || 'RA';

    const item = (id: View, icon: string, label: string, pill?: number) => (
        <div className={`nav-a ${ui.view === id && !ui.roleFilter ? 'on' : ''}`}
             onClick={() => dispatch(actions.setView(id))}>
            <span className="ic">{icon}</span>{label}{pill !== undefined && <span className="pill">{pill}</span>}
        </div>
    );

    return (
        <aside className={`sidebar ${ui.sidebarOpen ? 'open' : ''}`}>
            <div className="brand" onClick={() => dispatch(actions.setView('dashboard'))}>
                <div className="brand-logo">CSS <span>GLOBAL</span></div>
                <div className="brand-sub">RECRUIT</div>
            </div>
            <div className="user-card">
                <div className="avatar-mini">{initials}</div>
                <div><b>{name}</b><p>{user?.role || ui.session.role}</p></div>
                <button onClick={() => dispatch(authActions.logout())}>Logout</button>
            </div>
            <nav className="nav">
                <div className="nav-lbl">Overview</div>
                {item('dashboard', 'D', 'Dashboard')}
                {item('calendar', 'I', 'Interviews', candidates.filter(candidate => candidate.interviewDate).length)}
                <div className="nav-lbl">Roles</div>
                {item('jobs', 'R', 'All Roles', jobs.length)}
                <div className="nav-lbl">Candidates</div>
                {item('pipeline', 'P', 'Pipeline', candidates.filter(candidate => !['Placed', 'Rejected', 'Withdrawn'].includes(candidate.stage)).length)}
                {item('candidates', 'C', 'All Candidates', candidates.length)}
                <div className="nav-lbl">By Role</div>
                {ROLES.map(role => (
                    <div key={role} className={`nav-a ${ui.roleFilter === role ? 'on' : ''}`}
                         onClick={() => dispatch(actions.setRoleFilter(role))}>
                        <span className="ic">{ROLE_ICONS[role]}</span>{role.replace(' Officer', '')}
                        <span className="pill">{candidates.filter(candidate => candidate.role === role).length}</span>
                    </div>
                ))}
            </nav>
            <div className="sidebar-footer">
                <div className="sf-stat"><span className="sf-label">Total candidates</span><span
                    className="sf-val">{candidates.length}</span></div>
                <div className="sf-stat"><span className="sf-label">Placed this month</span><span
                    className="sf-val">{candidates.filter(candidate => candidate.stage === 'Placed').length}</span>
                </div>
                <div className="sf-stat"><span className="sf-label">Active roles</span><span
                    className="sf-val">{jobs.filter(job => job.status === 'Open').length}</span></div>
            </div>
        </aside>
    );
}
