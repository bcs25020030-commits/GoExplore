import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Mail, Lock, User, AlertCircle } from 'lucide-react';
import { useState, FormEvent } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { handleFirestoreError, OperationType } from '../utils/firestore';
import { useAuth } from '../context/AuthContext';

export default function SignUp() {
  const navigate = useNavigate();
  const { signInWithGoogle } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      // Create user document in Firestore
      const userRef = doc(db, 'users', firebaseUser.uid);
      try {
        await setDoc(userRef, {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          name: name,
          avatar: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=400&q=80',
          role: 'user',
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      } catch (firestoreErr) {
        handleFirestoreError(firestoreErr, OperationType.CREATE, `users/${firebaseUser.uid}`);
      }

      navigate('/');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);
    try {
      await signInWithGoogle();
      navigate('/');
    } catch (err: any) {
      console.error(err);
      setError('Failed to sign in with Google. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen flex items-center justify-center bg-surface-container-low p-4"
    >
      <div className="w-full max-w-md bg-surface rounded-3xl shadow-xl overflow-hidden border border-outline-variant">
        <div className="p-8">
          <Link to="/" className="inline-flex items-center gap-2 text-primary hover:underline mb-8 font-bold">
            <ArrowLeft size={20} /> Back to Home
          </Link>
          
          <h1 className="text-display-sm text-primary mb-2">Create Account</h1>
          <p className="text-on-surface-variant mb-8">Join the community of explorers in Sarawak.</p>

          {error && (
            <div className="mb-6 p-4 bg-error-container text-on-error-container rounded-xl flex items-start gap-3 border border-error/20">
              <AlertCircle size={20} className="shrink-0 mt-0.5" />
              <p className="text-body-medium">{error}</p>
            </div>
          )}

          <div className="space-y-4 mb-8">
            <button 
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-surface-container-lowest border border-outline-variant text-on-surface font-bold py-3 px-4 rounded-xl hover:bg-surface-container-low transition-all disabled:opacity-50"
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
              Sign in with Google
            </button>
          </div>

          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-outline-variant"></div>
            </div>
            <div className="relative flex justify-center text-label-md">
              <span className="px-4 bg-surface text-on-surface-variant">Or sign up with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-label-md text-on-surface">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" size={20} />
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-label-md text-on-surface">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" size={20} />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-label-md text-on-surface">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" size={20} />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-on-primary font-bold py-4 rounded-xl shadow-md hover:opacity-95 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <motion.span 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                    className="w-5 h-5 border-2 border-on-primary/30 border-t-on-primary rounded-full inline-block"
                  />
                  Creating Account...
                </span>
              ) : 'Sign Up'}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-outline-variant text-center">
            <p className="text-on-surface-variant">
              Already have an account? {' '}
              <Link to="/signin" className="text-secondary font-bold hover:underline">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
