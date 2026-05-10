import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {sessionActions} from './sessionSlice';

export function useSession() {
    const dispatch = useAppDispatch();
    const session = useAppSelector(state => state.session);
    return {
        ...session,
        checkCurrentUser: () => dispatch(sessionActions.checkSessionRequest()),
        clearSession: () => dispatch(sessionActions.clearSession()),
    };
}
