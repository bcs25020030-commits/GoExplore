/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Destinations from './pages/Destinations';
import DestinationDetail from './pages/DestinationDetail';
import Dashboard from './pages/Dashboard';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import { AuthProvider, useAuth } from './context/AuthContext';
import { collection, onSnapshot, doc, setDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './lib/firebase';
import { logActivity } from './utils/activities';
import { handleFirestoreError, OperationType } from './utils/firestore';

function AppContent() {
  const location = useLocation();
  const { user, signOut } = useAuth();
  const [savedDestinations, setSavedDestinations] = useState<any[]>([]);

  useEffect(() => {
    if (!user || !user.uid) {
      setSavedDestinations([]);
      return;
    }

    const savedRef = collection(db, 'users', String(user.uid), 'savedDestinations');
    const unsubscribe = onSnapshot(savedRef, (snapshot) => {
      if (!snapshot || !snapshot.docs) {
        setSavedDestinations([]);
        return;
      }
      const destinations = snapshot.docs.map(doc => {
        const data = doc.data() || {};
        return { 
          id: data.id || doc.id, 
          name: data.name || 'Unknown Destination',
          image: data.image || '',
          description: data.description || '',
          ...data 
        };
      });
      setSavedDestinations(destinations);
    }, (error) => {
      if (user && user.uid) {
        handleFirestoreError(error, OperationType.GET, `users/${user.uid}/savedDestinations`);
      }
    });

    return () => unsubscribe();
  }, [user]);

  const toggleSaveDestination = async (dest: any) => {
    if (!user || !user.uid || !dest || !dest.id) return;

    const isSaved = Array.isArray(savedDestinations) && savedDestinations.some(d => d && String(d.id) === String(dest.id));
    const destId = String(dest.id);
    const destRef = doc(db, 'users', String(user.uid), 'savedDestinations', destId);

    try {
      if (isSaved) {
        await deleteDoc(destRef);
        if (dest?.name) {
          await logActivity(user.uid, 'unsave_destination', `Unsaved ${dest.name}`, `You removed ${dest.name} from your saved places.`);
        }
      } else {
        await setDoc(destRef, {
          ...dest,
          savedAt: serverTimestamp()
        });
        if (dest?.name) {
          await logActivity(user.uid, 'save_destination', `Saved ${dest.name}`, `You added ${dest.name} to your saved places.`);
        }
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `users/${user.uid}/savedDestinations/${dest.id}`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar user={user} onSignOut={signOut} />
      <main className="flex-grow overflow-hidden">
        <AnimatePresence mode="wait">
          <Routes location={location}>
            <Route path="/" element={<Home user={user} />} />
            <Route 
              path="/destinations" 
              element={
                <Destinations 
                  user={user}
                  savedDestinations={savedDestinations} 
                  onToggleSave={toggleSaveDestination} 
                />
              } 
            />
            <Route 
              path="/destinations/:id" 
              element={
                <DestinationDetail 
                  user={user} 
                  savedDestinations={savedDestinations} 
                  onToggleSave={toggleSaveDestination} 
                />
              } 
            />
            <Route path="/about" element={<About />} />
            <Route 
              path="/dashboard" 
              element={
                <Dashboard 
                  savedDestinations={savedDestinations} 
                  onUpdateUser={() => {}} // This should be handled by AuthContext now
                />
              } 
            />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
