import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, LogOut, X } from 'lucide-react';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  user?: any;
  onSignOut?: () => void;
}

export default function Navbar({ user, onSignOut }: NavbarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchQuery && typeof searchQuery === 'string' && searchQuery.trim()) {
      const q = searchQuery.trim();
      navigate(`/destinations?search=${encodeURIComponent(q)}`);
      setSearchQuery('');
    }
  };

  const handleConfirmSignOut = () => {
    if (onSignOut && typeof onSignOut === 'function') onSignOut();
    setShowSignOutConfirm(false);
  };

  return (
    <header className="bg-surface shadow-sm sticky top-0 z-50">
      <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-4 max-w-container-max mx-auto">
        <Link to="/" className="font-display text-headline-md font-bold text-primary">goExplore</Link>
        <nav className="hidden md:flex items-center gap-8">
          {Array.isArray(navLinks) && navLinks.map((link) => {
            if (!link || !link.path) return null;
            const isActive = location && location.pathname === link.path;
            return (
              <Link
                key={link.name || link.path}
                to={link.path}
                className={`${
                  isActive
                    ? 'text-primary font-bold border-b-2 border-primary pb-1'
                    : 'text-on-surface-variant font-medium hover:text-primary transition-all duration-200'
                } font-sans text-label-md`}
              >
                {link.name || 'Link'}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-4">
          <form 
            onSubmit={handleSearch}
            className="hidden lg:flex items-center bg-surface-container-low border border-outline-variant rounded-full px-4 py-1.5 focus-within:ring-2 focus-within:ring-primary transition-all"
          >
            <Search className="text-on-surface-variant cursor-pointer" size={18} onClick={() => handleSearch()} />
            <input 
              type="text" 
              placeholder="Search Sarawak..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none focus:ring-0 text-label-md px-2 w-40 font-sans"
            />
          </form>
          <button 
            onClick={() => navigate('/destinations')}
            className="lg:hidden p-2 text-on-surface-variant hover:bg-surface-variant rounded-full transition-colors"
          >
            <Search size={20} />
          </button>
          
          {user ? (
            <div className="flex items-center gap-4">
              <div className="hidden md:block w-10 h-10 rounded-full overflow-hidden border-2 border-primary/20 shrink-0">
                <img 
                  src={user?.avatar}
                  alt={user?.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <button 
                onClick={() => setShowSignOutConfirm(true)}
                className="p-2 text-on-surface-variant hover:text-red-500 transition-colors"
                title="Sign Out"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <Link to="/signin">
              <button className="bg-primary text-on-primary px-6 py-2 rounded-lg font-bold text-label-md transition-transform active:scale-95">
                Sign In
              </button>
            </Link>
          )}
        </div>
      </div>

      {/* Sign Out Confirmation Modal */}
      <AnimatePresence>
        {showSignOutConfirm && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSignOutConfirm(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-surface rounded-2xl shadow-2xl z-[70] overflow-hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                    <LogOut size={24} />
                  </div>
                  <button 
                    onClick={() => setShowSignOutConfirm(false)}
                    className="text-on-surface-variant hover:bg-surface-variant p-1 rounded-full transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
                <h3 className="text-headline-sm text-primary mb-2">Sign Out</h3>
                <p className="text-on-surface-variant text-body-md mb-8">
                  Are you sure you want to sign out? You will need to sign in again to access your saved destinations and personal recommendations.
                </p>
                <div className="flex gap-3">
                  <button 
                    onClick={() => setShowSignOutConfirm(false)}
                    className="flex-1 px-4 py-3 rounded-xl border border-outline-variant font-bold text-secondary hover:bg-surface-variant transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleConfirmSignOut}
                    className="flex-1 px-4 py-3 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 transition-colors shadow-lg"
                  >
                    Yes, Sign Out
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Destinations', path: '/destinations' },
  { name: 'About', path: '/about' },
  { name: 'Dashboard', path: '/dashboard' },
];
