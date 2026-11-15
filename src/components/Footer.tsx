import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowRight, Instagram, Facebook } from 'lucide-react';
const Footer = () => {
  return <footer className="text-white pt-16 pb-8 bg-black/[0.88]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Column 1 - Logo and About */}
          <div className="space-y-5">
            <Link to="/" className="flex items-center">
              <img alt="BEURANT DESIGN Logo" src="/lovable-uploads/ab1cbd66-f34e-46b2-bc4f-532e66083588.png" className="h-10 sm:h-12 w-auto mr-3" />
              <span className="text-xl sm:text-2xl font-display tracking-tight font-light">DESIGN ALCHEMY</span>
            </Link>
            <p className="text-gray-300 mt-4 max-w-md">
              Creating appealing and unique spaces based on client requirements, budget and timeline. 
              Every project is handled with care from concept to completion.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="https://www.instagram.com/beurant/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-design-accent transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://www.facebook.com/Beurant/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-design-accent transition-colors">
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h4 className="text-lg font-display font-medium mb-5">Quick Links</h4>
            <nav className="space-y-3">
              <Link to="/" className="flex items-center text-gray-300 hover:text-design-accent transition-colors">
                <ArrowRight size={16} className="mr-2" />
                <span>Home</span>
              </Link>
              <Link to="/projects" className="flex items-center text-gray-300 hover:text-design-accent transition-colors">
                <ArrowRight size={16} className="mr-2" />
                <span>Projects</span>
              </Link>
              <Link to="/about" className="flex items-center text-gray-300 hover:text-design-accent transition-colors">
                <ArrowRight size={16} className="mr-2" />
                <span>About</span>
              </Link>
              <Link to="/contact" className="flex items-center text-gray-300 hover:text-design-accent transition-colors">
                <ArrowRight size={16} className="mr-2" />
                <span>Contact</span>
              </Link>
            </nav>
          </div>

          {/* Column 3 - Contact */}
          <div>
            <h4 className="text-lg font-display font-medium mb-5">Contact</h4>
            <div className="space-y-4">
              
              <div className="flex items-start">
                <Mail className="text-design-accent mr-3 mt-1 flex-shrink-0" size={18} />
                <a href="mailto:dinnerli.fer@gmail.com" className="text-gray-300 hover:text-design-accent transition-colors break-all">info@designalchemy.cc</a>
              </div>
              <div className="flex items-start">
                <Phone size={18} className="text-design-accent mr-3 mt-1 flex-shrink-0 bg-transparent" />
                <a href="tel:+94764052630" className="text-gray-300 hover:text-design-accent transition-colors">+94 764 052 630</a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} DesignAlchemy. All rights reserved.</p>
        </div>
      </div>
    </footer>;
};
export default Footer;