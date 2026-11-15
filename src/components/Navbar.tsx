import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);
  const navItems = [{
    name: 'Home',
    path: '/'
  }, {
    name: 'Projects',
    path: '/projects'
  }];
  return <nav className="fixed w-full z-50 transition-all duration-300 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center hover:text-design-gold transition-colors">
              
              <span className="font-display tracking-tight text-design-softgold hidden sm:inline-block ml-2 lg:ml-4 text-2xl lg:text-3xl font-thin">
                DESIGN ALCHEMY
              </span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-6 lg:space-x-8">
              {navItems.map(item => <Link key={item.name} to={item.path} className={`font-medium transition-all duration-200 hover:text-design-gold 
                    ${location.pathname === item.path ? 'text-design-gold border-b border-design-gold pb-1' : 'text-design-softgold'}`}>
                  {item.name}
                </Link>)}
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="inline-flex items-center justify-center p-2 rounded-md focus:outline-none text-design-softgold hover:text-design-gold" aria-expanded="false">
              <span className="sr-only">{isOpen ? 'Close menu' : 'Open menu'}</span>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && <div className="md:hidden bg-white/95 backdrop-blur-md shadow-md animate-fade-in border-t border-design-gold/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map(item => <Link key={item.name} to={item.path} className={`block px-3 py-4 text-base font-medium transition-all duration-200 
                  ${location.pathname === item.path ? 'text-design-gold border-l-2 border-design-gold pl-4' : 'text-design-softgold border-l-2 border-transparent'}`}>
                {item.name}
              </Link>)}
          </div>
        </div>}
    </nav>;
};
export default Navbar;