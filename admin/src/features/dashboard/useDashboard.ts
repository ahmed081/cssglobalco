import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {dashboardActions} from './dashboardSlice';

export function useDashboard() {
    const dispatch = useAppDispatch();
    const state = useAppSelector(store => store.dashboard);
    return {
        ...state,
        refreshDashboard: () => dispatch(dashboardActions.fetchDashboardStatsRequest()),
    };
}
