import { useState, FormEvent } from 'react';
import { LogIn, ShieldCheck } from 'lucide-react';
import nimBasketLogoPng from '../../assets/nim_basket_logo.png';

interface AdminLoginProps {
    onLogin: () => void;
}

// Simple password gate — no Supabase auth dependency
const ADMIN_PASSWORD = 'NimBasket@2026';

export default function AdminLogin({ onLogin }: AdminLoginProps) {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e: FormEvent) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            // Persist login across refreshes for this session
            sessionStorage.setItem('nimbasket_admin', '1');
            onLogin();
        } else {
            setError('Incorrect password. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4"
            style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' }}>

            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <img
                        src={nimBasketLogoPng}
                        alt="Nim Basket"
                        className="w-24 h-24 mx-auto mb-3"
                        style={{ objectFit: 'contain', mixBlendMode: 'screen' }}
                    />
                    <h1 className="text-2xl font-bold text-white">Nim Basket</h1>
                    <p className="text-blue-300 text-sm mt-1">Admin Portal</p>
                </div>

                {/* Card */}
                <div style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '1rem',
                    padding: '2rem',
                    backdropFilter: 'blur(8px)',
                }}>
                    <div className="flex items-center gap-3 mb-6">
                        <div style={{ background: 'rgba(234,88,12,0.2)', borderRadius: '0.5rem', padding: '0.5rem' }}>
                            <ShieldCheck size={22} className="text-orange-400" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white">Admin Login</h2>
                            <p className="text-gray-400 text-xs">Enter your admin password</p>
                        </div>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                                placeholder="••••••••••••••"
                                autoFocus
                                style={{
                                    width: '100%', padding: '0.75rem 1rem', borderRadius: '0.5rem',
                                    background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
                                    color: '#fff', outline: 'none',
                                }}
                                onFocus={(e) => e.target.style.border = '1px solid #f97316'}
                                onBlur={(e) => e.target.style.border = '1px solid rgba(255,255,255,0.15)'}
                            />
                        </div>

                        {error && (
                            <div style={{
                                background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)',
                                borderRadius: '0.5rem', padding: '0.5rem 1rem', color: '#f87171', fontSize: '0.875rem',
                            }}>
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full py-3 font-semibold rounded-lg transition-all flex items-center justify-center gap-2"
                            style={{ background: '#ea580c', color: '#fff' }}
                            onMouseOver={(e) => (e.currentTarget.style.background = '#c2410c')}
                            onMouseOut={(e) => (e.currentTarget.style.background = '#ea580c')}
                        >
                            <LogIn size={18} /> Sign In
                        </button>
                    </form>

                    <p className="text-center text-gray-500 text-xs mt-6">
                        Only authorised Nim Basket admins can access this page.
                    </p>
                </div>
            </div>
        </div>
    );
}
