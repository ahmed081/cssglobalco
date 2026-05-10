import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {authActions} from './authSlice';
import type {LoginPayload, RegisterPayload} from './authTypes';

export function useAuth() {
    const dispatch = useAppDispatch();
    const auth = useAppSelector(state => state.auth);
    return {
        ...auth,
        login: (payload: LoginPayload) => dispatch(authActions.loginRequest(payload)),
        register: (payload: RegisterPayload) => dispatch(authActions.registerRequest(payload)),
        logout: () => dispatch(authActions.logout()),
    };
}
