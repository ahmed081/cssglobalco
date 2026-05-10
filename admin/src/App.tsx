import './styles.css';
import {useEffect} from 'react';
import {Sidebar} from './components/Sidebar';
import {Topbar} from './components/Topbar';
import {Dashboard} from './views/Dashboard';
import {JobsView} from './views/JobsView';
import {PipelineView} from './views/PipelineView';
import {CandidatesView} from './views/CandidatesView';
import {CalendarView} from './views/CalendarView';
import {ProfileModal} from './components/ProfileModal';
import {CandidateFormModal} from './components/CandidateFormModal';
import {JobFormModal} from './components/JobFormModal';
import {ProtectedRoute} from './components/ProtectedRoute';
import {ToastHost} from './components/ToastHost';
import {API_UNAUTHORIZED_EVENT} from './api/axiosClient';
import {authActions} from './features/auth/authSlice';
import {sessionActions} from './features/session/sessionSlice';
import {candidateActions} from './features/candidates/candidateSlice';
import {jobRoleActions} from './features/jobRoles/jobRoleSlice';
import {dashboardActions} from './features/dashboard/dashboardSlice';
import {clientActions} from './features/clients/clientSlice';
import {referenceActions} from './features/references/referenceSlice';
import {notificationActions} from './features/notifications/notificationSlice';
import {useAppDispatch, useAppSelector} from './store/hooks';
import {actions} from './store/recruitSlice';

export default function App() {
    const view = useAppSelector(s => s.recruit.ui.view);
    const open = useAppSelector(s => s.recruit.ui.sidebarOpen);
    const authenticated = useAppSelector(s => s.auth.isAuthenticated);
    const d = useAppDispatch();
    useEffect(() => {
        d(sessionActions.checkSessionRequest())
    }, [d]);
    useEffect(() => {
        if (!authenticated) return;
        d(candidateActions.fetchCandidatesRequest());
        d(jobRoleActions.fetchJobRolesRequest());
        d(dashboardActions.fetchDashboardStatsRequest());
        d(clientActions.fetchClientsRequest());
        d(referenceActions.fetchReferenceDataRequest());
    }, [authenticated, d]);
    useEffect(() => {
        const handler = () => {
            d(authActions.logout());
            d(notificationActions.pushNotification('warning', 'Session expired. Please log in again.'))
        };
        window.addEventListener(API_UNAUTHORIZED_EVENT, handler);
        return () => window.removeEventListener(API_UNAUTHORIZED_EVENT, handler);
    }, [d]);
    return <><ProtectedRoute>
        <div className="layout"><Sidebar/>
            <main className="main"><Topbar/>
                <div className="content">{view === 'dashboard' && <Dashboard/>}{view === 'jobs' &&
                    <JobsView/>}{view === 'pipeline' && <PipelineView/>}{view === 'candidates' &&
                    <CandidatesView/>}{view === 'calendar' && <CalendarView/>}{view === 'settings' &&
                    <div>Settings preview</div>}</div>
            </main>
            {open && <div className="scrim"
                          onClick={() => d(actions.closeSidebar())}/>}<ProfileModal/><CandidateFormModal/><JobFormModal/>
        </div>
    </ProtectedRoute><ToastHost/></>
}
