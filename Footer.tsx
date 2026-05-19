import { Link } from 'react-router-dom';
import { Share2, Globe, MessageSquare, Send } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-surface-container-highest border-t border-outline-variant mt-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter px-margin-mobile md:px-margin-desktop py-12 max-w-container-max mx-auto">
        <div className="flex flex-col gap-4">
          <div className="font-display text-headline-md font-bold text-primary">goExplore</div>
          <p className="font-sans text-body-md text-on-surface-variant max-w-xs">
            Your portal to the wonders of Sarawak. Explore ancient cultures, majestic nature, and modern vibrancy in Borneo.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h5 className="font-display text-headline-md text-on-surface">Explore</h5>
          <nav className="flex flex-col gap-2">
            <Link className="text-on-surface-variant font-medium hover:text-primary underline text-label-md" to="/destinations">Destinations</Link>
            <Link className="text-on-surface-variant font-medium hover:text-primary underline text-label-md" to="/sitemap">Sitemap</Link>
            <Link className="text-on-surface-variant font-medium hover:text-primary underline text-label-md" to="/contact">Contact Us</Link>
          </nav>
        </div>
        <div className="flex flex-col gap-4">
          <h5 className="font-display text-headline-md text-on-surface">Support</h5>
          <nav className="flex flex-col gap-2">
            <Link className="text-on-surface-variant font-medium hover:text-primary underline text-label-md" to="/privacy">Privacy Policy</Link>
            <Link className="text-on-surface-variant font-medium hover:text-primary underline text-label-md" to="/terms">Terms of Service</Link>
          </nav>
          <div className="mt-4 flex gap-4">
            <Globe className="text-primary cursor-pointer hover:scale-110 transition-transform" size={24} />
            <Share2 className="text-primary cursor-pointer hover:scale-110 transition-transform" size={24} />
            <MessageSquare className="text-primary cursor-pointer hover:scale-110 transition-transform" size={24} />
          </div>
          <div className="mt-4 flex gap-2">
             <input 
              type="text" 
              placeholder="Email address" 
              className="bg-surface rounded-lg border border-outline-variant px-4 py-2 w-full text-sm"
            />
            <button className="bg-primary text-on-primary px-4 py-2 rounded-lg hover:opacity-90 active:scale-95 transition-all">
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
      <div className="px-margin-mobile md:px-margin-desktop py-8 border-t border-outline-variant text-center">
        <p className="font-sans text-label-sm text-on-surface-variant italic">
          © 2024 goExplore. Discover the Heart of Borneo.
        </p>
      </div>
    </footer>
  );
}
