import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import {
    LogOut, Search, Users, Briefcase, ChevronDown, ChevronUp,
    Phone, Mail, MapPin, Link, Github, DollarSign, Clock, RefreshCw
} from 'lucide-react';
import nimBasketLogoPng from '../../assets/nim_basket_logo.png';

interface Application {
    id: string;
    full_name: string;
    email: string;
    phone_number: string;
    whatsapp_number: string;
    current_location: string;
    roles: string[];
    experience: string;
    notice_period: string;
    resume_url: string | null;
    portfolio_link: string | null;
    github_link: string | null;
    expected_salary: string;
    why_join: string;
    created_at: string;
}

interface AdminDashboardProps {
    onLogout: () => void;
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
    const [applications, setApplications] = useState<Application[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [roleFilter, setRoleFilter] = useState('All');
    const [expanded, setExpanded] = useState<string | null>(null);

    const roles = ['All', 'UI/UX Designer', 'Mobile App Frontend Developer', 'Backend Developer'];

    const fetchApplications = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('job_applications')
            .select('*')
            .order('created_at', { ascending: false });

        if (!error && data) setApplications(data);
        setLoading(false);
    };

    useEffect(() => { fetchApplications(); }, []);

    const handleLogout = () => {
        sessionStorage.removeItem('nimbasket_admin');
        onLogout();
    };

    const filtered = applications.filter((app) => {
        const matchSearch =
            app.full_name.toLowerCase().includes(search.toLowerCase()) ||
            app.email.toLowerCase().includes(search.toLowerCase()) ||
            app.current_location.toLowerCase().includes(search.toLowerCase());
        const matchRole = roleFilter === 'All' || app.roles.includes(roleFilter);
        return matchSearch && matchRole;
    });

    const formatDate = (iso: string) =>
        new Date(iso).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

    const roleColor: Record<string, string> = {
        'UI/UX Designer': 'bg-purple-100 text-purple-700',
        'Mobile App Frontend Developer': 'bg-blue-100 text-blue-700',
        'Backend Developer': 'bg-green-100 text-green-700',
    };

    return (
        <div className="min-h-screen" style={{ background: '#f8f4f0' }}>

            {/* Top Nav */}
            <nav className="bg-gray-900 text-white px-6 py-3 shadow-lg sticky top-0 z-40">
                <div className="flex items-center justify-between">

                    {/* Left — brand label */}
                    <div className="flex items-center gap-2 w-1/3">
                        <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center font-bold text-sm">N</div>
                        <div>
                            <span className="font-bold text-base">Nim Basket</span>
                            <span className="text-gray-400 text-xs ml-2">Admin</span>
                        </div>
                    </div>

                    {/* Centre — logo */}
                    <div className="flex justify-center w-1/3">
                        <img
                            src={nimBasketLogoPng}
                            alt="Nim Basket Logo"
                            style={{ width: 52, height: 52, objectFit: 'contain', mixBlendMode: 'screen' }}
                        />
                    </div>

                    {/* Right — actions */}
                    <div className="flex items-center gap-3 justify-end w-1/3">
                        <button onClick={fetchApplications} className="flex items-center gap-1 text-gray-400 hover:text-white text-sm transition-colors">
                            <RefreshCw size={14} /> Refresh
                        </button>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-medium transition-colors"
                        >
                            <LogOut size={15} /> Sign Out
                        </button>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                    {[
                        { label: 'Total Applications', value: applications.length, icon: <Users size={20} />, color: 'text-orange-600', bg: 'bg-orange-50' },
                        { label: 'UI/UX Designer', value: applications.filter(a => a.roles.includes('UI/UX Designer')).length, icon: <Briefcase size={20} />, color: 'text-purple-600', bg: 'bg-purple-50' },
                        { label: 'Frontend Dev', value: applications.filter(a => a.roles.includes('Mobile App Frontend Developer')).length, icon: <Briefcase size={20} />, color: 'text-blue-600', bg: 'bg-blue-50' },
                        { label: 'Backend Dev', value: applications.filter(a => a.roles.includes('Backend Developer')).length, icon: <Briefcase size={20} />, color: 'text-green-600', bg: 'bg-green-50' },
                    ].map((stat) => (
                        <div key={stat.label} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                            <div className={`inline-flex p-2 rounded-lg ${stat.bg} ${stat.color} mb-3`}>{stat.icon}</div>
                            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                            <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Search & Filter */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6 flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by name, email or location..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                    </div>
                    <select
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                        className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
                    >
                        {roles.map(r => <option key={r}>{r}</option>)}
                    </select>
                </div>

                {/* Applications List */}
                {loading ? (
                    <div className="text-center py-16 text-gray-500">Loading applications...</div>
                ) : filtered.length === 0 ? (
                    <div className="text-center py-16 text-gray-400 bg-white rounded-xl shadow-sm">
                        No applications found.
                    </div>
                ) : (
                    <div className="space-y-3">
                        {filtered.map((app) => (
                            <div key={app.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">

                                {/* Row Header */}
                                <button
                                    onClick={() => setExpanded(expanded === app.id ? null : app.id)}
                                    className="w-full text-left px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                                >
                                    <div className="flex items-center gap-4 flex-wrap">
                                        <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-700 font-bold flex items-center justify-center text-sm flex-shrink-0">
                                            {app.full_name.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <div className="font-semibold text-gray-900">{app.full_name}</div>
                                            <div className="text-sm text-gray-500">{app.email} · {app.phone_number}</div>
                                        </div>
                                        <div className="flex flex-wrap gap-2 ml-2">
                                            {app.roles.map(role => (
                                                <span key={role} className={`text-xs px-2 py-1 rounded-full font-medium ${roleColor[role] ?? 'bg-gray-100 text-gray-600'}`}>
                                                    {role}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 ml-4 flex-shrink-0">
                                        <span className="text-xs text-gray-400 hidden sm:block">{formatDate(app.created_at)}</span>
                                        {expanded === app.id ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                                    </div>
                                </button>

                                {/* Expanded Details */}
                                {expanded === app.id && (
                                    <div className="border-t border-gray-100 px-6 py-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-gray-50">

                                        <Detail icon={<Phone size={14} />} label="Phone" value={app.phone_number} />
                                        <Detail icon={<Phone size={14} />} label="WhatsApp" value={app.whatsapp_number} />
                                        <Detail icon={<Mail size={14} />} label="Email" value={app.email} />
                                        <Detail icon={<MapPin size={14} />} label="Location" value={app.current_location} />
                                        <Detail icon={<Briefcase size={14} />} label="Experience" value={app.experience} />
                                        <Detail icon={<Clock size={14} />} label="Notice Period" value={app.notice_period} />
                                        <Detail icon={<DollarSign size={14} />} label="Expected Salary" value={app.expected_salary} />

                                        {app.portfolio_link && (
                                            <Detail icon={<Link size={14} />} label="Portfolio"
                                                value={<a href={app.portfolio_link} target="_blank" rel="noreferrer" className="text-orange-600 underline break-all">{app.portfolio_link}</a>} />
                                        )}
                                        {app.github_link && (
                                            <Detail icon={<Github size={14} />} label="GitHub"
                                                value={<a href={app.github_link} target="_blank" rel="noreferrer" className="text-orange-600 underline break-all">{app.github_link}</a>} />
                                        )}
                                        {app.resume_url && (
                                            <Detail icon={<Link size={14} />} label="Resume"
                                                value={<a href={app.resume_url} target="_blank" rel="noreferrer" className="text-orange-600 underline">Download Resume</a>} />
                                        )}

                                        <div className="sm:col-span-2 lg:col-span-3">
                                            <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Why Join Nim Basket</p>
                                            <p className="text-sm text-gray-700 bg-white rounded-lg p-3 border border-gray-200">{app.why_join}</p>
                                        </div>

                                        <div className="text-xs text-gray-400">Submitted: {formatDate(app.created_at)}</div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

function Detail({ icon, label, value }: { icon: React.ReactNode; label: string; value: React.ReactNode }) {
    return (
        <div>
            <div className="flex items-center gap-1 text-xs font-semibold text-gray-400 uppercase mb-1">
                {icon} {label}
            </div>
            <div className="text-sm text-gray-800">{value}</div>
        </div>
    );
}
