import { useState, useEffect } from 'react';
import Hero from './components/Hero';
import OpenPositions from './components/OpenPositions';
import DeliveryPartner from './components/DeliveryPartner';

import Contact from './components/Contact';
import Footer from './components/Footer';
import ApplicationForm from './components/ApplicationForm';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';

function App() {
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [preselectedRole, setPreselectedRole] = useState<string | undefined>();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // Detect #admin hash in URL
  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === '#admin') {
        setIsAdmin(true);
        // Restore session from sessionStorage (persists across refresh)
        setIsAdminLoggedIn(sessionStorage.getItem('nimbasket_admin') === '1');
      } else {
        setIsAdmin(false);
        setIsAdminLoggedIn(false);
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  const handleViewPositions = () => {
    document.getElementById('positions')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleApplyDelivery = () => {
    window.open(
      'https://docs.google.com/forms/d/e/1FAIpQLScnjeSeVwQg3pNnwKNmBrgRtnQC2h4HpvCOBc7JougXLkK4bw/viewform',
      '_blank'
    );
  };

  const handleApplyRole = (role: string) => {
    setPreselectedRole(role);
    setShowApplicationForm(true);
  };

  const handleCloseForm = () => {
    setShowApplicationForm(false);
    setPreselectedRole(undefined);
  };

  // ── Admin Route ──────────────────────────────────────────
  if (isAdmin) {
    if (!isAdminLoggedIn) {
      return <AdminLogin onLogin={() => setIsAdminLoggedIn(true)} />;
    }
    return <AdminDashboard onLogout={() => setIsAdminLoggedIn(false)} />;
  }

  // ── Public Site ──────────────────────────────────────────
  return (
    <div className="min-h-screen">
      <Hero onViewPositions={handleViewPositions} onApplyDelivery={handleApplyDelivery} />
      <OpenPositions onApply={handleApplyRole} />
      <DeliveryPartner onApply={handleApplyDelivery} />

      <Contact />
      <Footer />

      {showApplicationForm && (
        <ApplicationForm onClose={handleCloseForm} preselectedRole={preselectedRole} />
      )}
    </div>
  );
}

export default App;
