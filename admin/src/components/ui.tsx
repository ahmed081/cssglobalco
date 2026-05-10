import type {ReactNode} from 'react';
import {ROLE_COLORS, STAGE_COLORS} from '../constants';

export function Button({children, onClick, variant = 'white', size = 'md', danger = false, type = 'button'}: {
    children: ReactNode;
    onClick?: () => void;
    variant?: 'white' | 'gold' | 'ghost';
    size?: 'sm' | 'md';
    danger?: boolean;
    type?: 'button' | 'submit'
}) {
    return <button type={type} onClick={onClick}
                   className={`btn btn-${variant} btn-${size} ${danger ? 'btn-danger' : ''}`}>{children}</button>
}

export function Card({children, className = '', onClick}: {
    children: ReactNode;
    className?: string;
    onClick?: () => void
}) {
    return <div onClick={onClick} className={`card ${className}`}>{children}</div>
}

export function Badge({children, tone = 'muted', role, stage}: {
    children: ReactNode;
    tone?: string;
    role?: string;
    stage?: string
}) {
    const c = stage ? STAGE_COLORS[stage] : role ? ROLE_COLORS[role] : undefined;
    return <span className="badge"
                 style={c ? {background: c[1], color: c[0], borderColor: `${c[0]}40`} : undefined}>{children}</span>
}

export function Empty({icon, title, text, action}: { icon: string; title: string; text: string; action?: ReactNode }) {
    return <div className="empty">
        <div className="empty-icon">{icon}</div>
        <h3>{title}</h3><p>{text}</p>{action}</div>
}

export function Modal({open, title, onClose, children, footer, wide = false}: {
    open: boolean;
    title: string;
    onClose: () => void;
    children: ReactNode;
    footer?: ReactNode;
    wide?: boolean
}) {
    if (!open) return null;
    return <div className="overlay open" onMouseDown={onClose}>
        <div className={`modal ${wide ? 'modal-wide' : ''}`} onMouseDown={e => e.stopPropagation()}>
            <div className="mhdr"><h2>{title}</h2>
                <button className="mclose" onClick={onClose}>✕</button>
            </div>
            <div className="mbody">{children}</div>
            {footer && <div className="mfoot">{footer}</div>}</div>
    </div>
}

export function Field({label, children, full = false, error}: {
    label: string;
    children: ReactNode;
    full?: boolean;
    error?: string
}) {
    return <div className={`ff ${full ? 'full' : ''}`}><label>{label}</label>{children}{error &&
        <small className="err">{error}</small>}</div>
}
