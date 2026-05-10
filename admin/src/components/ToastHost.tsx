import {useEffect} from 'react';
import {useNotifications} from '../features/notifications/useNotifications';

export function ToastHost() {
    const {notifications, removeNotification} = useNotifications();
    useEffect(() => {
        const timers = notifications.map(item => window.setTimeout(() => removeNotification(item.id), 5000));
        return () => timers.forEach(timer => window.clearTimeout(timer));
    }, [notifications, removeNotification]);

    return (
        <div className="toast-host">
            {notifications.map(item => (
                <button key={item.id} className={`toast toast-${item.type}`}
                        onClick={() => removeNotification(item.id)}>
                    {item.message}
                </button>
            ))}
        </div>
    );
}
