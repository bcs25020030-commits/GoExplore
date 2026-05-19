import { Search, Filter, MapPin, Star, Heart, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useState, useMemo, useEffect } from 'react';
import Fuse from 'fuse.js';
import { destinations as allDestinations } from '../data/destinations';

interface DestinationsProps {
  user?: any;
  savedDestinations: any[];
  onToggleSave: (dest: any) => void;
}

export default function Destinations({ user, savedDestinations, onToggleSave }: DestinationsProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const searchQuery = searchParams.get('search')?.trim() || '';
  
  const [regionFilter, setRegionFilter] = useState('All Regions');
  const [activityFilter, setActivityFilter] = useState('All Activities');
  const [seasonFilter, setSeasonFilter] = useState('Any Time');
  const [localSearch, setLocalSearch] = useState(searchQuery);

  // Sync local search when URL changes (e.g. from Home search)
  useEffect(() => {
    setLocalSearch(searchQuery || '');
  }, [searchQuery]);

  const handleToggleSave = (dest: any) => {
    if (!user) {
      navigate('/signin');
      return;
    }
    onToggleSave(dest);
  };

  const destinations = useMemo(() => {
    const data = allDestinations;

    // Sanitize data for Fuse.js
    return data.map(dest => {
      if (!dest) return {} as any;
      return {
        ...dest,
        name: String(dest.name || ''),
        description: String(dest.description || ''),
        region: String(dest.region || ''),
        activity: String(dest.activity || ''),
        category: String(dest.category || ''),
        tags: Array.isArray(dest.tags) ? dest.tags.filter(t => typeof t === 'string') : []
      };
    });
  }, []);

  const fuse = useMemo(() => {
    if (!destinations || !Array.isArray(destinations) || destinations.length === 0) return null;
    return new Fuse(destinations, {
      keys: ['name', 'description', 'region', 'activity', 'category', 'tags'],
      threshold: 0.4,
      distance: 100,
    });
  }, [destinations]);

  const filteredDestinations = useMemo(() => {
    let result = Array.isArray(destinations) ? [...destinations] : [];

    if (searchQuery && typeof searchQuery === 'string' && searchQuery.trim() && fuse) {
      try {
        result = fuse.search(searchQuery.trim()).map(res => res.item);
      } catch (e) {
        console.error("Fuse search error:", e);
        result = [...destinations];
      }
    }

    return result.filter(dest => {
      if (!dest) return false;
      const matchRegion = regionFilter === 'All Regions' || (dest.region && String(dest.region) === regionFilter);
      const matchActivity = activityFilter === 'All Activities' || (dest.activity && String(dest.activity) === activityFilter);
      const matchSeason = seasonFilter === 'Any Time' || (dest.season && String(dest.season) === seasonFilter);
      return Boolean(matchRegion && matchActivity && matchSeason);
    });
  }, [fuse, searchQuery, regionFilter, activityFilter, seasonFilter, destinations]);

  const handleClearSearch = () => {
    setSearchParams({});
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12"
    >
      <header className="mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <h1 className="text-headline-lg md:text-display-lg text-primary leading-tight">
              {searchQuery ? `Searching for "${searchQuery}"` : 'Discover the Heart of Borneo'}
            </h1>
            <p className="text-on-surface-variant max-w-2xl text-body-lg">
              {searchQuery 
                ? `Showing results for your search. We've used smart matching to find the best spots.`
                : 'From mist-shrouded limestone peaks to vibrant cultural riverfronts, Sarawak offers an adventure for every traveler.'}
            </p>
          </div>
          {searchQuery && (
            <button 
              onClick={handleClearSearch}
              className="flex items-center gap-2 text-primary font-bold hover:underline"
            >
              Clear Search Results
            </button>
          )}
        </div>
      </header>

      {/* Filter Bar */}
      <section className="bg-white rounded-xl shadow-sm border border-outline-variant p-6 mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-gutter">
          <div className="space-y-2">
            <label className="text-label-md text-on-surface flex items-center gap-2 font-bold">
              <Search size={16} className="text-primary" /> Search Place
            </label>
            <input 
              type="text"
              placeholder="Search Sarawak or type a place..."
              value={localSearch}
              onChange={(e) => {
                const val = e.target.value;
                setLocalSearch(val);
                setSearchParams(prev => {
                  const p = new URLSearchParams(prev);
                  if (val) p.set('search', val);
                  else p.delete('search');
                  return p;
                });
              }}
              className="w-full bg-surface-container-low border border-outline-variant rounded-full py-3 px-6 focus:ring-2 focus:ring-secondary text-body-md shadow-sm"
            />
          </div>
          <div className="space-y-2">
            <label className="text-label-md text-on-surface flex items-center gap-2">
              <MapPin size={16} className="text-primary" /> Region
            </label>
            <select 
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
              className="w-full bg-surface-container-low border-none rounded-lg py-3 px-4 focus:ring-2 focus:ring-secondary text-body-md accent-primary"
            >
              <option>All Regions</option>
              <option>Kuching Division</option>
              <option>Miri Division</option>
              <option>Sibu Division</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-label-md text-on-surface flex items-center gap-2">
              <Filter size={16} className="text-primary" /> Activity Type
            </label>
            <select 
              value={activityFilter}
              onChange={(e) => setActivityFilter(e.target.value)}
              className="w-full bg-surface-container-low border-none rounded-lg py-3 px-4 focus:ring-2 focus:ring-secondary text-body-md accent-primary"
            >
              <option>All Activities</option>
              <option>Adventure & Hiking</option>
              <option>Culture & Heritage</option>
              <option>Wildlife Spotting</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-label-md text-on-surface flex items-center gap-2">
               Best Season
            </label>
            <select 
              value={seasonFilter}
              onChange={(e) => setSeasonFilter(e.target.value)}
              className="w-full bg-surface-container-low border-none rounded-lg py-3 px-4 focus:ring-2 focus:ring-secondary text-body-md accent-primary"
            >
              <option>Any Time</option>
              <option>Dry Season (April-Oct)</option>
              <option>Festive Season (June)</option>
            </select>
          </div>
          <div className="flex items-end">
            <button 
              onClick={() => {
                setRegionFilter('All Regions');
                setActivityFilter('All Activities');
                setSeasonFilter('Any Time');
              }}
              className="w-full bg-surface-container text-on-surface-variant font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-surface-container-high transition-all"
            >
              Reset Filters
            </button>
          </div>
        </div>
      </section>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
        <AnimatePresence>
          {filteredDestinations.map((dest) => (
            <motion.div 
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              key={dest.id} 
              className={`${dest.featured ? 'md:col-span-8' : 'md:col-span-4'} group cursor-pointer`}
            >
              <Link to={`/destinations/${dest?.id}`} className="block h-full">
                <div className="relative h-full min-h-[400px] rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col bg-white">
                  <div className={`${dest.featured ? 'h-full' : 'h-1/2'} relative overflow-hidden`}>
                    <img 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                      src={dest.image}
                      alt={dest.name}
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    {dest.featured && (
                      <div className="absolute bottom-0 left-0 p-8 text-white">
                        <div className="flex gap-2 mb-4">
                          {dest.tags?.map(tag => (
                            <span key={tag} className="bg-primary/90 text-on-primary px-3 py-1 rounded-full text-label-sm font-bold shadow-sm">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <h3 className="text-headline-lg mb-2">{dest.name}</h3>
                        <p className="text-body-md max-w-xl opacity-90">{dest.description}</p>
                      </div>
                    )}
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        handleToggleSave(dest);
                      }}
                      className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md flex items-center justify-center hover:scale-110 transition-transform z-10"
                    >
                      <Heart 
                        className={(Array.isArray(savedDestinations) && savedDestinations.some(d => String(d?.id) === String(dest?.id))) ? "text-red-500 fill-red-500" : "text-on-surface-variant hover:text-red-500 transition-colors"} 
                        size={20} 
                        fill={(Array.isArray(savedDestinations) && savedDestinations.some(d => String(d?.id) === String(dest?.id))) ? "#ef4444" : "none"}
                      />
                    </button>
                  </div>
                  {!dest.featured && (
                    <div className="h-1/2 p-6 flex flex-col justify-between">
                      <div>
                        <span className="text-secondary text-label-sm mb-2 block font-bold uppercase tracking-wider">{dest.category}</span>
                        <h3 className="text-headline-md text-primary mb-2">{dest.name}</h3>
                        <p className="text-on-surface-variant text-body-md line-clamp-3">{dest.description}</p>
                      </div>
                      <div className="flex gap-2 mt-4">
                        {dest.tags?.map(tag => (
                          <span key={tag} className="bg-surface-container px-3 py-1 rounded-md text-label-sm text-on-surface-variant font-medium">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
        {filteredDestinations.length === 0 && (
          <div className="col-span-full py-20 text-center">
            <p className="text-on-surface-variant text-headline-sm">
              {searchQuery ? `We couldn't find anything matching "${searchQuery}".` : 'No destinations found matching these criteria.'}
            </p>
            <p className="text-on-surface-variant text-body-md mt-2">
              Try different keywords or reset your filters.
            </p>
            <button 
              onClick={() => {
                setRegionFilter('All Regions');
                setActivityFilter('All Activities');
                setSeasonFilter('Any Time');
                handleClearSearch();
              }}
              className="mt-6 bg-primary text-on-primary px-8 py-3 rounded-lg font-bold shadow-md hover:opacity-90 transition-all"
            >
              Reset Everything
            </button>
          </div>
        )}
      </div>

      <div className="mt-16 flex justify-center">
        <button className="flex items-center gap-2 border-2 border-primary text-primary font-bold px-8 py-3 rounded-lg hover:bg-primary hover:text-on-primary transition-all duration-300">
          Load More Destinations
          <ChevronDown size={20} />
        </button>
      </div>
    </motion.div>
  );
}
