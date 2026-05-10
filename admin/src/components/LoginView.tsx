import {FormEvent, useState} from 'react';
import {useAuth} from '../features/auth/useAuth';
import {Button, Field} from './ui';

export function LoginView() {
    const {login, register, loading, error} = useAuth();
    const [mode, setMode] = useState<'login' | 'register'>('login');
    const [form, setForm] = useState({firstName: '', lastName: '', email: '', password: '', phone: ''});

    const submit = (event: FormEvent) => {
        event.preventDefault();
        if (mode === 'login') login({email: form.email, password: form.password});
        else register({
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
            password: form.password,
            phone: form.phone,
            role: 'RECRUITER'
        });
    };

    return (
        <div className="auth-page">
            <form className="auth-panel" onSubmit={submit}>
                <div className="brand-logo">CSS <span>GLOBAL</span></div>
                <h1>{mode === 'login' ? 'Recruit dashboard login' : 'Create recruiter account'}</h1>
                {mode === 'register' && (
                    <div className="auth-names">
                        <Field label="First name"><input value={form.firstName} onChange={event => setForm({
                            ...form,
                            firstName: event.target.value
                        })} required/></Field>
                        <Field label="Last name"><input value={form.lastName} onChange={event => setForm({
                            ...form,
                            lastName: event.target.value
                        })} required/></Field>
                    </div>
                )}
                <Field label="Email"><input type="email" value={form.email}
                                            onChange={event => setForm({...form, email: event.target.value})} required/></Field>
                <Field label="Password"><input type="password" value={form.password}
                                               onChange={event => setForm({...form, password: event.target.value})}
                                               required minLength={8}/></Field>
                {mode === 'register' && <Field label="Phone"><input value={form.phone} onChange={event => setForm({
                    ...form,
                    phone: event.target.value
                })}/></Field>}
                {error && <div className="auth-error">{error}</div>}
                <Button variant="gold"
                        type="submit">{loading ? 'Please wait...' : mode === 'login' ? 'Login' : 'Register'}</Button>
                <button className="auth-switch" type="button"
                        onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>
                    {mode === 'login' ? 'Create an account' : 'Use existing account'}
                </button>
            </form>
        </div>
    );
}
