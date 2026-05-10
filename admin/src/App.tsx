import './styles.css';
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
import {useAppDispatch, useAppSelector} from './store/hooks';
import {actions} from './store/recruitSlice';

export default function App() {
    const view = useAppSelector(s => s.recruit.ui.view);
    const open = useAppSelector(s => s.recruit.ui.sidebarOpen);
    const d = useAppDispatch();
    return( <div className="layout"><Sidebar/>
        <main className="main"><Topbar/>
            <div className="content">{view === 'dashboard' && <Dashboard/>}{view === 'jobs' &&
                <JobsView/>}{view === 'pipeline' && <PipelineView/>}{view === 'candidates' &&
                <CandidatesView/>}{view === 'calendar' && <CalendarView/>}{view === 'settings' &&
                <div>Settings preview</div>}</div>
        </main>
        {open && <div className="scrim" onClick={() => d(actions.closeSidebar())}/>}<ProfileModal/><CandidateFormModal/><JobFormModal/>
    </div>)
}
