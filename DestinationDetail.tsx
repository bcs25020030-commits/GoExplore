import React, { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, MapPin, Calendar, Users, Heart, Star, Trash2, MessageSquare, Plus } from 'lucide-react';
import { destinations as allDestinations } from '../data/destinations';

interface DestinationDetailProps {
  user?: any;
  savedDestinations: any[];
  onToggleSave: (dest: any) => void;
}

export default function DestinationDetail({ user, savedDestinations, onToggleSave }: DestinationDetailProps) {
  const { id } = useParams();
  const navigate = useNavigate();

  const destination = useMemo(() => {
    return allDestinations.find(d => String(d.id) === String(id));
  }, [id]);

  const handleToggleSave = () => {
    if (!user) {
      navigate('/signin');
      return;
    }
    if (destination) {
      onToggleSave(destination);
    }
  };

  const [reviews, setReviews] = useState([
    { id: 1, userId: 'demo-user-1', userName: 'Ahmad Rafiq', text: 'The bats exodus was mind-blowing! A must-see in Sarawak.', rating: 5, date: '2024-05-10' },
    { id: 2, userId: 'demo-user-2', userName: 'Elena Gilbert', text: 'Pinnacles trek is definitely not for beginners. Be prepared!', rating: 4, date: '2024-05-08' }
  ]);
  const [newReviewText, setNewReviewText] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      navigate('/signin');
      return;
    }
    if (!newReviewText.trim()) return;

    const newReview = {
      id: Date.now(),
      userId: user?.uid || user?.id,
      userName: (() => {
        if (user?.displayName && typeof user.displayName === 'string') return user.displayName;
        if (user?.name && typeof user.name === 'string') return user.name;
        if (user?.email && typeof user.email === 'string' && user.email.includes('@')) {
          return user.email.split('@')[0];
        }
        return 'Explorer';
      })(),
      text: newReviewText,
      rating: newReviewRating,
      date: new Date().toISOString().split('T')[0]
    };

    setReviews([newReview, ...reviews]);
    setNewReviewText('');
    setNewReviewRating(5);
  };

  const handleDeleteReview = (reviewId: number) => {
    setReviews(reviews.filter(r => r.id !== reviewId));
  };

  if (!destination) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <h2 className="text-display-sm text-primary mb-4">Destination Not Found</h2>
        <Link to="/destinations" className="text-secondary font-bold hover:underline">Return to Destinations</Link>
      </div>
    );
  }

  const isSaved = Array.isArray(savedDestinations) && savedDestinations.some(d => String(d?.id) === String(destination?.id));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pb-20"
    >
      <div className="relative h-[650px] w-full">
        <img 
          src={destination.image} 
          className="w-full h-full object-cover"
          alt={destination.name}
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 detail-hero-gradient"></div>
        <div className="absolute top-8 left-8">
          <Link to="/destinations" className="bg-white/20 backdrop-blur-md p-3 rounded-full text-white hover:bg-white/40 transition-colors inline-block">
            <ArrowLeft size={24} />
          </Link>
        </div>
        <div className="absolute bottom-12 left-margin-mobile md:left-margin-desktop text-white">
          <h1 className="text-display-lg md:text-display-lg tracking-tight mb-4">{destination.name}</h1>
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <MapPin size={20} className="text-primary-fixed" />
              <span className="text-headline-sm font-medium">{destination.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Star size={20} className="text-secondary fill-secondary" />
              <span className="text-headline-sm font-medium">{destination.rating}</span>
            </div>
          </div>
        </div>
        <div className="absolute bottom-12 right-margin-mobile md:right-margin-desktop flex gap-4">
          <button 
            onClick={handleToggleSave}
            className={`${isSaved ? 'bg-white text-red-500' : 'bg-white text-on-surface-variant'} rounded-full p-4 shadow-xl hover:scale-110 transition-all`}
          >
            <Heart size={24} fill={isSaved ? "currentColor" : "none"} />
          </button>
        </div>
      </div>

      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8">
          <h2 className="text-headline-lg text-primary mb-6">About this Destination</h2>
          <p className="font-sans text-body-lg text-on-surface-variant leading-relaxed mb-8">
            {destination.description}
          </p>
          <div className="bg-surface-container rounded-2xl p-8 mb-12">
            <h3 className="text-headline-md text-on-surface mb-4 italic font-medium">Quick Overview</h3>
            <p className="text-on-surface-variant text-body-md leading-relaxed">
              {destination.overview}
            </p>
          </div>

          {destination.officialWebsite && (
            <div className="p-8 bg-primary/5 border border-primary/20 rounded-2xl mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-headline-md text-primary mb-2">Official Website</h3>
                <p className="text-on-surface-variant font-sans">Visit the official park website for more information and visitor guides.</p>
              </div>
              <a 
                href={destination.officialWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary text-on-primary px-8 py-4 rounded-xl font-bold hover:opacity-90 transition-all shadow-lg whitespace-nowrap"
              >
                Visit Site
              </a>
            </div>
          )}

          <h2 className="text-headline-lg text-primary mb-8">Top Activities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {destination.activities.map((act, i) => (
              <div key={i} className="flex gap-6 p-6 border border-outline-variant rounded-xl hover:bg-surface-container transition-colors cursor-pointer group">
                <div className="bg-primary/10 text-primary p-4 rounded-xl h-fit group-hover:bg-primary group-hover:text-on-primary transition-colors">
                  <Star size={20} />
                </div>
                <div>
                  <h4 className="text-headline-md mb-2">{act.name}</h4>
                  <p className="text-on-surface-variant text-body-md">{act.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 h-fit sticky top-24">
          <div className="bg-white border border-outline-variant rounded-2xl p-8 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-headline-md text-primary flex items-center gap-2">
                <MessageSquare size={24} /> User Reviews
              </h3>
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-label-sm font-bold">
                {reviews.length}
              </span>
            </div>

            {/* Review Form (Only if signed in) */}
            {user ? (
              <form onSubmit={handleAddReview} className="mb-8 p-4 bg-surface-container rounded-xl border border-outline-variant">
                <p className="text-label-sm text-on-surface-variant mb-2 font-bold uppercase tracking-wider">Write a Review</p>
                <div className="flex gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewReviewRating(star)}
                      className="transition-transform active:scale-90"
                    >
                      <Star 
                        size={20} 
                        className={star <= newReviewRating ? "text-secondary fill-secondary" : "text-outline"} 
                      />
                    </button>
                  ))}
                </div>
                <textarea
                  value={newReviewText}
                  onChange={(e) => setNewReviewText(e.target.value)}
                  placeholder="Share your experience..."
                  className="w-full bg-surface border-none rounded-lg p-3 text-body-md focus:ring-2 focus:ring-primary mb-3 min-h-[100px] resize-none"
                />
                <button 
                  type="submit"
                  disabled={!newReviewText.trim()}
                  className="w-full bg-primary text-on-primary py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50 transition-all"
                >
                  <Plus size={18} /> Post Review
                </button>
              </form>
            ) : (
              <div className="mb-8 p-6 bg-primary/5 rounded-xl border border-primary/20 text-center">
                <p className="text-on-surface-variant text-body-md mb-4">Sign in to share your experience with other travelers.</p>
                <Link 
                  to="/signin" 
                  className="inline-block bg-primary text-on-primary px-6 py-2 rounded-lg font-bold hover:opacity-90 transition-all shadow-md"
                >
                  Sign In to Review
                </Link>
              </div>
            )}

            {/* Reviews List */}
            <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              <AnimatePresence initial={false}>
                {reviews.map((review) => (
                  <motion.div 
                    key={review.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="border-b border-outline-variant pb-6 last:border-0"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-bold text-on-surface">{review.userName}</p>
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              size={12} 
                              className={i < review.rating ? "text-secondary fill-secondary" : "text-outline"} 
                            />
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-label-sm text-on-surface-variant">{review.date}</span>
                        {(user && (review.userId === (user.uid || user.id))) && (
                          <button 
                            onClick={() => handleDeleteReview(review.id)}
                            className="text-on-surface-variant hover:text-red-500 transition-colors p-1"
                            title="Delete review"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    </div>
                    <p className="text-body-md text-on-surface-variant leading-relaxed">
                      {review.text}
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>
              {reviews.length === 0 && (
                <div className="text-center py-10 opacity-50">
                  <MessageSquare size={48} className="mx-auto mb-4" />
                  <p>No reviews yet. Be the first to share!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
