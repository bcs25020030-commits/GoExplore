import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Heart, 
  Settings, 
  LogOut, 
  ChevronRight,
  TrendingUp,
  Clock,
  Navigation,
  Camera,
  User as UserIcon,
  Bell,
  Lock,
  CreditCard,
  Plus,
  Search
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { doc, updateDoc, serverTimestamp, collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { handleFirestoreError, OperationType } from '../utils/firestore';
import { logActivity } from '../utils/activities';

interface DashboardProps {
  savedDestinations: any[];
  onUpdateUser?: (data: any) => void;
}

export default function Dashboard({ savedDestinations, onUpdateUser }: DashboardProps) {
  const { user, signOut, refreshUser } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Overview');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [updating, setUpdating] = useState(false);
  const [activities, setActivities] = useState<any[]>([]);

  useEffect(() => {
    if (!user || !user.uid) return;

    const activitiesRef = collection(db, 'users', String(user.uid), 'activities');
    const q = query(activitiesRef, orderBy('timestamp', 'desc'), limit(5));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot || !snapshot.docs) {
        setActivities([]);
        return;
      }
      const docs = snapshot.docs.map(doc => {
        const data = doc.data() || {};
        return {
          id: doc.id,
          title: data.title || 'Activity',
          type: data.type || 'unknown',
          ...data
        };
      });
      setActivities(docs);
    }, (error) => {
      if (user && user.uid) {
        handleFirestoreError(error, OperationType.GET, `users/${user.uid}/activities`);
      }
    });

    return () => unsubscribe();
  }, [user]);

  // Form state for admin posting
  const [destForm, setDestForm] = useState({
    name: '',
    location: '',
    description: '',
    image: '',
    region: 'Southern Sarawak'
  });

  const handlePostDest = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Destination "' + destForm.name + '" has been posted successfully!');
    setDestForm({ name: '', location: '', description: '', image: '', region: 'Southern Sarawak' });
    setActiveTab('Overview');
  };

  // If no user, show a prompt to sign in
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-container-low p-8">
        <div className="text-center space-y-6 max-w-md">
          <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto">
            <LayoutDashboard size={40} />
          </div>
          <h1 className="text-headline-lg text-primary">Your Adventure Dashboard</h1>
          <p className="text-on-surface-variant text-body-lg">
            Track your saved destinations, planned trips, and rewards in one place. Sign in to unlock your personal dashboard.
          </p>
          <Link to="/signin">
            <button className="bg-primary text-on-primary px-8 py-3 rounded-xl font-bold shadow-md hover:opacity-90 active:scale-95 transition-all">
              Sign In to goExplore
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && user) {
      setUpdating(true);
      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          const userRef = doc(db, 'users', user.uid);
          await updateDoc(userRef, {
            avatar: reader.result as string,
            updatedAt: serverTimestamp()
          });
          await logActivity(user.uid, 'profile_update', 'Updated profile photo', 'You successfully updated your profile picture.');
          await refreshUser();
        } catch (err) {
          handleFirestoreError(err, OperationType.UPDATE, `users/${user.uid}`);
        } finally {
          setUpdating(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const sidebarLinks = [
    { name: 'Overview', icon: <LayoutDashboard size={20} /> },
    { name: 'Wishlist', icon: <Heart size={20} /> },
    { name: 'Settings', icon: <Settings size={20} /> },
  ];

  if (user && user.role === 'admin') {
    sidebarLinks.push(
      { name: 'Post Destination', icon: <Plus size={20} /> },
      { name: 'User Support', icon: <Bell size={20} /> }
    );
  }

  return (
    <div className="min-h-screen bg-surface-container-lowest flex">
      {/* Sidebar */}
      <aside className="w-72 border-r border-outline-variant bg-white flex flex-col hidden md:flex shrink-0">
        <div className="p-8 border-b border-outline-variant">
              <div className="flex items-center gap-4 mb-8">
                <div className="relative group">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-primary/20 bg-surface-container-low">
                    {user?.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-primary/40">
                        <UserIcon size={24} />
                      </div>
                    )}
                  </div>
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="absolute inset-0 bg-black/40 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Camera size={16} />
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*"
                onChange={handleAvatarChange} 
              />
            </div>
            <div>
              <div className="font-bold text-on-surface text-label-lg whitespace-nowrap overflow-hidden text-ellipsis max-w-[140px]">{user?.name}</div>
              {user?.role === 'admin' && (
                <div className="text-[10px] text-on-surface-variant font-sans px-2 py-0.5 bg-primary/5 rounded-full inline-block">
                  System Administrator
                </div>
              )}
            </div>
          </div>
          <nav className="space-y-1">
            {sidebarLinks.map((link) => (
              <button 
                key={link.name}
                onClick={() => setActiveTab(link.name)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-label-md font-bold transition-all ${
                  activeTab === link.name 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-on-surface-variant hover:bg-surface-container-low'
                }`}
              >
                {link.icon}
                {link.name}
              </button>
            ))}
          </nav>
        </div>
        <div className="p-8 mt-auto">
          <button className="w-full bg-secondary/10 text-secondary font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-secondary/20 transition-all mb-4">
             Discover Places <Navigation size={18} />
          </button>
          <button 
            onClick={async () => {
              await signOut();
              navigate('/');
            }}
            className="flex items-center gap-2 text-on-surface-variant hover:text-red-500 text-label-md font-bold transition-colors px-4 py-2 w-full text-left"
          >
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-margin-mobile md:p-12 overflow-y-auto overflow-x-hidden">
        <AnimatePresence mode="wait">
          {activeTab === 'Overview' && (
            <motion.div 
              key="overview"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              {/* Info Banner */}
              <div className="bg-primary text-on-primary p-6 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-4 mb-12 shadow-sm">
                <div>
                  <h3 className="font-bold text-headline-sm">goExplore is your Discovery Guide</h3>
                  <p className="text-sm opacity-90 font-sans">We're here to help you find the best gems in Sarawak.</p>
                </div>
              </div>

              <header className="mb-12">
                <h1 className="text-headline-lg text-on-surface mb-2">
                  Selamat Datang, {(() => {
                    if (user && typeof user.name === 'string' && user.name.trim()) {
                      return user.name.trim().split(' ')[0];
                    }
                    return 'Explorer';
                  })()}!
                </h1>
                <p className="text-on-surface-variant">Ready for your next journey in the Heart of Borneo?</p>
              </header>

              {/* Quick Actions / Recent Activity */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
                <div className="bg-white border border-outline-variant rounded-2xl p-6 shadow-sm">
                  <h3 className="font-bold text-on-surface mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    {Array.isArray(activities) && activities.length > 0 ? (
                      activities.map((act, i) => (
                        <div key={act?.id || i} className="flex justify-between items-center text-sm border-b border-outline-variant/30 pb-3 last:border-0">
                          <div className="flex gap-3 items-center">
                            <span className={`w-2 h-2 rounded-full ${act?.type === 'profile_update' ? 'bg-secondary' : 'bg-primary'}`}></span>
                            <span className="text-on-surface font-medium capitalize">
                              {act?.title || 'Unknown Activity'}
                            </span>
                          </div>
                          <span className="text-on-surface-variant font-sans text-xs">
                            {act?.timestamp?.toDate && typeof act.timestamp.toDate === 'function' ? new Date(act.timestamp.toDate()).toLocaleDateString() : 'Just now'}
                          </span>
                        </div>
                      ))
                    ) : (
                      <p className="text-on-surface-variant text-sm font-sans italic py-4">
                        No recent activities found. Start exploring and saving destinations!
                      </p>
                    )}
                  </div>
                </div>
                <div className="bg-white border border-outline-variant rounded-2xl p-6 shadow-sm">
                  <h3 className="font-bold text-on-surface mb-4">Saved Locations</h3>
                  <div className="flex items-center gap-6">
                    <div className="flex-1 h-2 bg-surface-container-low rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full shadow-[0_0_8px_rgba(var(--primary),0.5)] transition-all duration-1000"
                        style={{ width: `${Math.min(((savedDestinations?.length || 0) / 5) * 100, 100)}%` }}
                      ></div>
                    </div>
                    <span className="text-label-md font-bold text-primary">{savedDestinations?.length || 0} / 5</span>
                  </div>
                  <p className="text-xs text-on-surface-variant mt-4 font-sans italic">
                    {(savedDestinations?.length || 0) === 0 ? "You haven't saved any places yet." : `You have ${savedDestinations?.length || 0} places in your wishlist.`}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'Wishlist' && (
            <motion.div 
              key="wishlist"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="flex justify-between items-end mb-8">
                <div>
                  <h1 className="text-headline-lg text-on-surface mb-2">My Wishlist</h1>
                  <p className="text-sm text-on-surface-variant font-sans">Your curated collection of dream destinations in Sarawak.</p>
                </div>
                <Link to="/destinations" className="text-primary text-label-md font-bold hover:underline flex items-center gap-1">
                  Explore More <ChevronRight size={16} />
                </Link>
              </div>

              {(savedDestinations?.length || 0) > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-gutter">
                  {Array.isArray(savedDestinations) && savedDestinations.map((dest) => (
                    <Link to={`/destinations/${dest?.id}`} key={dest?.id || Math.random()} className="bg-white rounded-3xl overflow-hidden border border-outline-variant shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
                      <div className="h-48 relative">
                        <img src={dest?.image || ''} alt={dest?.name || 'Destination'} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute top-4 right-4 text-red-500 fill-red-500 bg-white shadow-lg p-2 rounded-full">
                          <Heart size={18} fill="currentColor" />
                        </div>
                        <div className="absolute bottom-4 left-4">
                          <span className="bg-primary/90 backdrop-blur-sm text-on-primary text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                            {dest?.tags?.[0] || 'Nature'}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="font-bold text-headline-sm text-on-surface mb-2 truncate group-hover:text-primary transition-colors">{dest?.name || 'Unknown'}</h3>
                        <p className="text-on-surface-variant text-sm font-sans line-clamp-2 mb-4">{dest?.description}</p>
                        <div className="flex justify-between items-center text-xs mt-auto pt-4 border-t border-outline-variant/30 font-sans">
                          <span className="text-on-surface-variant flex items-center gap-1">
                            <Clock size={14} /> {dest?.savedAt?.toDate && typeof dest.savedAt.toDate === 'function' ? `Added ${new Date(dest.savedAt.toDate()).toLocaleDateString()}` : 'Recently Added'}
                          </span>
                          <span className="text-primary font-bold">Details</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="bg-white border border-outline-variant rounded-[40px] p-24 text-center">
                  <div className="w-24 h-24 bg-surface-container-low text-outline-variant rounded-full flex items-center justify-center mx-auto mb-8">
                    <Heart size={48} />
                  </div>
                  <h2 className="text-headline-md text-on-surface mb-4">Your wishlist is empty</h2>
                  <p className="text-on-surface-variant font-sans max-w-sm mx-auto mb-12">
                    Start exploring Sarawak's hidden gems and add them to your wishlist to plan your next epic adventure.
                  </p>
                  <Link to="/destinations">
                    <button className="bg-primary text-on-primary px-8 py-3 rounded-xl font-bold shadow-md hover:opacity-90 transition-all">
                      Explore Destinations
                    </button>
                  </Link>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'Post Destination' && user.role === 'admin' && (
            <motion.div 
              key="post"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-white border border-outline-variant rounded-[3rem] p-12 shadow-xl">
                 <h1 className="text-display-small text-primary mb-2">Post New Destination</h1>
                 <p className="text-on-surface-variant mb-12 font-sans">Introduce a new gem of Sarawak to the community.</p>
                 
                 <form onSubmit={handlePostDest} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="space-y-2">
                          <label className="text-label-md font-bold text-on-surface-variant px-1">Destination Name</label>
                          <input 
                            required
                            type="text" 
                            className="w-full bg-surface-container-low border border-outline-variant rounded-2xl p-4 text-headline-sm font-bold focus:ring-4 ring-primary/10 transition-all outline-none"
                            placeholder="e.g. Gunung Santubong"
                            value={destForm.name}
                            onChange={(e) => setDestForm({...destForm, name: e.target.value})}
                          />
                       </div>
                       <div className="space-y-2">
                          <label className="text-label-md font-bold text-on-surface-variant px-1">Region</label>
                          <select 
                            className="w-full bg-surface-container-low border border-outline-variant rounded-2xl p-4 text-headline-sm font-bold focus:ring-4 ring-primary/10 transition-all outline-none appearance-none"
                            value={destForm.region}
                            onChange={(e) => setDestForm({...destForm, region: e.target.value})}
                          >
                             <option>Southern Sarawak</option>
                             <option>Central Sarawak</option>
                             <option>Northern Sarawak</option>
                          </select>
                       </div>
                    </div>

                    <div className="space-y-2">
                       <label className="text-label-md font-bold text-on-surface-variant px-1">Location / District</label>
                       <input 
                         required
                         type="text" 
                         className="w-full bg-surface-container-low border border-outline-variant rounded-2xl p-4 text-headline-sm font-bold focus:ring-4 ring-primary/10 transition-all outline-none"
                         placeholder="e.g. Kuching, Sarawak"
                         value={destForm.location}
                         onChange={(e) => setDestForm({...destForm, location: e.target.value})}
                       />
                    </div>

                    <div className="space-y-2">
                       <label className="text-label-md font-bold text-on-surface-variant px-1">Cover Image URL</label>
                       <input 
                         required
                         type="url" 
                         className="w-full bg-surface-container-low border border-outline-variant rounded-2xl p-4 text-body-lg font-sans focus:ring-4 ring-primary/10 transition-all outline-none"
                         placeholder="https://images.unsplash.com/..."
                         value={destForm.image}
                         onChange={(e) => setDestForm({...destForm, image: e.target.value})}
                       />
                    </div>

                    <div className="space-y-2">
                       <label className="text-label-md font-bold text-on-surface-variant px-1">Short Description</label>
                       <textarea 
                         required
                         rows={4}
                         className="w-full bg-surface-container-low border border-outline-variant rounded-2xl p-4 text-body-lg font-sans focus:ring-4 ring-primary/10 transition-all outline-none resize-none"
                         placeholder="Describe the unique charm of this place..."
                         value={destForm.description}
                         onChange={(e) => setDestForm({...destForm, description: e.target.value})}
                       />
                    </div>

                    <button type="submit" className="w-full bg-primary text-on-primary py-6 rounded-[2rem] text-headline-md font-bold shadow-2xl hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3 mt-12">
                       <Plus size={24} /> Publish Destination
                    </button>
                 </form>
              </div>
            </motion.div>
          )}

          {activeTab === 'User Support' && user.role === 'admin' && (
            <motion.div 
              key="support"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h1 className="text-display-small text-on-surface mb-2">User Support Center</h1>
              <p className="text-on-surface-variant mb-12 font-sans">Manage all incoming user inquiries and reports from Sarawak explorers.</p>
              
              <div className="bg-white border border-outline-variant rounded-[2.5rem] overflow-hidden shadow-xl">
                 <div className="p-8 border-b border-outline-variant bg-surface-container-low flex justify-between items-center">
                    <div className="flex gap-4">
                       <button className="bg-primary text-on-primary px-6 py-2 rounded-full text-sm font-bold shadow-md">All Tickets (58)</button>
                       <button className="bg-white text-on-surface px-6 py-2 rounded-full text-sm font-bold border border-outline-variant hover:bg-surface-container transition-all">Unassigned (9)</button>
                    </div>
                    <Search className="text-on-surface-variant" size={20} />
                 </div>
                 <div className="divide-y divide-outline-variant/30">
                    {[
                      { user: 'Badrul Shah', subject: 'Inquiry about Mulu Pinnacles trail', status: 'Priority', time: '12m ago' },
                      { user: 'Chen Lee', subject: 'Question: Gunung Santubong guide', status: 'Open', time: '45m ago' },
                      { user: 'Sarah Wilson', subject: 'Guide registration inquiry', status: 'Pending', time: '3h ago' },
                      { user: 'Elena Cooper', subject: 'Report: Trail closed sign missing', status: 'Priority', time: '1d ago' },
                      { user: 'John Doe', subject: 'App feedback: Dark mode request', status: 'Resolved', time: '2d ago' },
                    ].map((ticket, i) => (
                      <div key={i} className="p-8 flex items-center justify-between hover:bg-surface-container-low transition-colors cursor-pointer group">
                         <div className="flex items-center gap-6">
                            <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary font-bold text-headline-sm">
                               {ticket.user[0]}
                            </div>
                            <div>
                               <div className="font-bold text-on-surface text-lg group-hover:text-primary transition-colors">{ticket.subject}</div>
                               <p className="text-sm text-on-surface-variant font-sans mt-0.5">from <span className="font-bold">{ticket.user}</span> • {ticket.time}</p>
                            </div>
                         </div>
                         <div className="flex items-center gap-8">
                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                              ticket.status === 'Priority' ? 'bg-red-100 text-red-700' : 
                              ticket.status === 'Resolved' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                            }`}>
                               {ticket.status}
                            </span>
                            <ChevronRight className="text-on-surface-variant group-hover:translate-x-2 transition-transform" size={24} />
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'Settings' && (
            <motion.div 
              key="settings"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h1 className="text-headline-lg text-on-surface mb-2">Settings</h1>
              <p className="text-on-surface-variant mb-8 font-sans">Manage your account preferences and privacy settings.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 <div className="md:col-span-2 space-y-6">
                    <div className="bg-white border border-outline-variant rounded-2xl p-8 shadow-sm">
                       <h3 className="font-bold text-on-surface mb-6 flex items-center gap-2">
                          <UserIcon size={20} className="text-primary" /> Profile Information
                       </h3>
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div className="space-y-2">
                             <label className="text-label-sm text-on-surface-variant">Full Name</label>
                             <input type="text" defaultValue={user?.name} className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 text-sm outline-none font-bold" />
                          </div>
                          <div className="space-y-2">
                             <label className="text-label-sm text-on-surface-variant">Email Address</label>
                             <input type="email" defaultValue={user?.email} className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 text-sm outline-none font-bold" />
                          </div>
                          <div className="space-y-2 sm:col-span-2">
                             <label className="text-label-sm text-on-surface-variant">Bio / Travel Interests</label>
                             <textarea defaultValue="Nature lover and cave enthusiast exploring the beauty of Sarawak." className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 text-sm outline-none font-sans min-h-[100px] resize-none" />
                          </div>
                       </div>
                       <button className="mt-8 bg-primary text-on-primary px-8 py-3 rounded-xl font-bold shadow-md hover:opacity-90 transition-all">
                          Save Changes
                       </button>
                    </div>

                    <div className="bg-white border border-outline-variant rounded-2xl p-8 shadow-sm">
                       <h3 className="font-bold text-on-surface mb-6 flex items-center gap-2">
                          <Lock size={20} className="text-primary" /> Security & Privacy
                       </h3>
                       <div className="space-y-4">
                          <div className="flex justify-between items-center p-4 border border-outline-variant rounded-xl">
                             <div>
                                <p className="font-bold text-on-surface">Change Password</p>
                                <p className="text-xs text-on-surface-variant font-sans">Update your password regularly for better security.</p>
                             </div>
                             <button className="text-primary font-bold text-sm hover:underline">Update</button>
                          </div>
                          <div className="flex justify-between items-center p-4 border border-outline-variant rounded-xl">
                             <div>
                                <p className="font-bold text-on-surface">Two-Factor Authentication</p>
                                <p className="text-xs text-on-surface-variant font-sans">Add an extra layer of security to your account.</p>
                             </div>
                             <button className="bg-surface-container-high text-on-surface px-4 py-1 rounded-full text-xs font-bold">Enable</button>
                          </div>
                       </div>
                    </div>
                 </div>

                 <div className="space-y-6">
                    <div className="bg-white border border-outline-variant rounded-2xl p-6 shadow-sm">
                       <h3 className="font-bold text-on-surface mb-6 flex items-center gap-2">
                          <Bell size={20} className="text-primary" /> Notifications
                       </h3>
                       <div className="space-y-4">
                          {[
                            { label: 'System Announcements', active: true },
                            { label: 'New Wishlist Items', active: true },
                            { label: 'Travel Recommendations', active: false },
                          ].map((pref, i) => (
                            <div key={i} className="flex justify-between items-center">
                               <span className="text-sm font-medium">{pref.label}</span>
                               <button className={`w-10 h-5 rounded-full transition-colors relative ${pref.active ? 'bg-primary' : 'bg-outline-variant'}`}>
                                  <span className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${pref.active ? 'right-1' : 'left-1'}`}></span>
                               </button>
                            </div>
                          ))}
                       </div>
                    </div>

                    <div className="bg-white border border-outline-variant rounded-2xl p-6 shadow-sm">
                       <h3 className="font-bold text-on-surface mb-6 flex items-center gap-2">
                          <CreditCard size={20} className="text-primary" /> Subscription
                       </h3>
                       <div className="bg-secondary/5 p-4 rounded-xl border border-secondary/20 mb-6">
                          <p className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-1">Current Plan</p>
                          <p className="text-on-surface font-bold">Explorer Plan</p>
                          <p className="text-[10px] text-on-surface-variant font-sans">$9.99 / month • Renews July 1st</p>
                       </div>
                       <button className="w-full text-on-surface font-bold text-sm border border-outline-variant py-2 rounded-xl hover:bg-surface-container-low transition-colors">
                          Manage Billing
                       </button>
                    </div>
                 </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
