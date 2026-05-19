import { Search, Calendar, ArrowRight, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

export default function Home({ user }: { user?: any }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery && searchQuery.trim()) {
      navigate(`/destinations?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };
  const popularDestinations = [
    {
      id: 1,
      name: 'Mulu National Park',
      description: 'Ancient caves and limestone pinnacles.',
      tag: 'Nature',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTkIc9MdGA9HOI6P1LZc4D_YgDiIkSKEJzXVY3mZWGmWBl3SXdhUMnQ19p9-zh6YyYlPgah_ZN0NG2m2a2CMea7MNMRcqKll8K723f_hmu9LmTFEbyzooBZTAR49MXXaIgKLf-uiptP5BMCoEsuagqIINstis10yYADDaZCJHFiBBi4wrbrA5jfxz7wZmF-g9KsAub1cznBJpdoQRdfEHZoleMeUBtkbx56deQEM4uy8NfKYgXFWGmHzosagx1kJSf4SscdETVxoY',
      span: 'md:col-span-7'
    },
    {
      id: 2,
      name: 'Kuching Waterfront',
      description: 'Urban culture meets history.',
      tag: 'City',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLqsHjlO4-0qzYOe1Bu9dhDfOpZSNtA3wmUuaXrJ9c-z-xGlaWagE8d2Wr3Rqwdj7iiMETlbCPkz6MU1Rr7SFnukLFtsy5VZX5YFiNqBZ_FW222ckYXZ8vAJiEO_ByYolzeOXhUBp9NnCVWSaD6BbmCLBG8D3W_0Qw56pS3pcwUVaAqNDV71rV7UFDKrpht6-EKSmsGFxkpOKen3ubfXTDkED80IurYLbfEKpiiWVnLpbIYO7--ZYKVSHKWO54ByKSqOUKGBafzwU',
      span: 'md:col-span-1'
    },
    {
      id: 3,
      name: 'Bako National Park',
      description: 'Wildlife and coastal cliffs.',
      tag: 'Wildlife',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRwtJtwEHMtKO_AILqFQVZYJwEFWWDnzDA91_0echyNPqWIPMIHDXqWEeJbzSu2OPOgeA3JOXvBgnYMlKSp1JUsTno0o5S0AS4gAhbMDYgHGdJqy0ZNS0dbDsRKAOyfSe-dDIOJ0njNusuZ4_EiMuq9zmGxsCh494x0aUSbEJKEPwxihXXylJ-qkHAS6CQoXnlsM4KhK4GVnQWnyQ8ebMXh0kKTlAnJmEaWgz6hFibJI05z2OGEDHBEBzq46vhRah75Nv5R3VoxP0',
      span: 'md:col-span-1'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <section className="relative h-[870px] w-full flex items-center justify-center overflow-hidden">
        <img 
          className="absolute inset-0 w-full h-full object-cover" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCigTZzXE3Ecj0kL-wZ7aV22ZGQIx2B4fxNZV_6-mmZKe1KGqUfD-tNhi5bPN69w3iic9qh6_5RaeBujh74eVGvcaCso5U4Eith9SmEczWSFk8yzn9RtGu5q7EoMnyyOWo-voXCCVyYrI65cNowwVSs2dyg9BtnGxCjzYT4hwvUkexYPEbF5p5TmFt0yQ9bVU_DfGJkVNMPpGX19qTqvI-zjogwIKI3FlyR9HnB0gyw3TFXKS2-4F9mFelmwpy8cTtiX6qxKBD35B0"
          alt="Sarawak Rainforest"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 hero-gradient"></div>
        <div className="relative z-10 text-center px-margin-mobile">
          <h1 className="text-white text-display-lg-mobile md:text-display-lg mb-8 tracking-tight drop-shadow-lg">
            Discover the Heart of Borneo
          </h1>
          <form 
            onSubmit={handleSearch}
            className="max-w-4xl mx-auto bg-surface p-2 rounded-full shadow-xl flex flex-col md:flex-row items-center gap-2"
          >
            <div className="flex items-center flex-1 px-6 w-full">
              <Search className="text-secondary mr-3" size={24} />
              <input 
                className="w-full border-none focus:ring-0 bg-transparent text-on-surface font-sans py-3" 
                placeholder="Where do you want to explore?" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                type="text" 
              />
            </div>
            <div className="h-8 w-px bg-outline-variant hidden md:block"></div>
            <div className="flex items-center px-6 w-full md:w-auto">
              <Calendar className="text-secondary mr-3" size={24} />
              <span className="text-on-surface-variant font-sans whitespace-nowrap">Dates</span>
            </div>
            <button 
              type="submit"
              className="bg-primary text-on-primary px-10 py-4 rounded-full font-bold hover:opacity-90 transition-opacity w-full md:w-auto shadow-md"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="text-headline-lg text-on-surface mb-2">Popular Destinations</h2>
            <p className="text-body-lg text-on-surface-variant">The most sought-after experiences in Sarawak.</p>
          </div>
          <Link to="/destinations" className="text-primary font-bold flex items-center gap-2 hover:underline group">
            View All <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter h-auto md:h-[600px]">
          <Link to={`/destinations/${popularDestinations[0].id}`} className="md:col-span-7 relative group overflow-hidden rounded-xl shadow-lg cursor-pointer block">
            <img 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
              src={popularDestinations[0].image}
              alt={popularDestinations[0].name}
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8">
              <span className="bg-primary-container text-on-primary-container px-3 py-1 rounded-full text-label-sm mb-4 inline-block">
                {popularDestinations[0].tag}
              </span>
              <h3 className="text-white text-headline-md">{popularDestinations[0].name}</h3>
              <p className="text-white/80 text-body-md">{popularDestinations[0].description}</p>
            </div>
          </Link>
          <div className="md:col-span-5 grid grid-rows-2 gap-gutter">
            {popularDestinations.slice(1).map((dest) => (
              <Link to={`/destinations/${dest.id}`} key={dest.id} className="relative group overflow-hidden rounded-xl shadow-lg cursor-pointer block">
                <img 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  src={dest.image}
                  alt={dest.name}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-white text-headline-md">{dest.name}</h3>
                  <p className="text-white/80 text-body-md">{dest.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
