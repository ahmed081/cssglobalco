import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {notificationActions, type NotificationType} from './notificationSlice';

export function useNotifications() {
    const dispatch = useAppDispatch();
    const notifications = useAppSelector(state => state.notifications.items);
    const push = (type: NotificationType, message: string) => dispatch(notificationActions.pushNotification(type, message));
    return {
        notifications,
        pushSuccess: (message: string) => push('success', message),
        pushError: (message: string) => push('error', message),
        pushWarning: (message: string) => push('warning', message),
        pushInfo: (message: string) => push('info', message),
        removeNotification: (id: string) => dispatch(notificationActions.removeNotification(id)),
    };
}
