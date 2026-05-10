import type {ReactNode} from 'react';
import {useAppSelector} from '../store/hooks';
import {LoginView} from './LoginView';

export function ProtectedRoute({children}: { children: ReactNode }) {
    const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
    if (!isAuthenticated) return <LoginView/>;
    return <>{children}</>;
}
