
import { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';
import { useIsMobile } from '@/hooks/use-mobile';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { name: 'Home', url: '#home' },
    { name: 'About', url: '#about' },
    { name: 'Skills', url: '#skills' },
    { name: 'Projects', url: '#projects' },
    { name: 'Experience', url: '#experience' },
    { name: 'Certifications', url: '#certifications' },
    { name: 'Achievements', url: '#achievements' },
    { name: 'Blog', url: '#blog' },
    { name: 'Contact', url: '#contact' },
  ];

  return (
    <nav 
      className={`fixed w-full z-50 py-4 px-6 md:px-16 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 dark:bg-portfolio-darkGray/90 shadow-md backdrop-blur-sm' : 'bg-transparent'
      }`}
    >
      <div className="flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="text-2xl font-bold text-portfolio-darkGray dark:text-white">
          ATHARVA HARANE's    <span className="text-portfolio-blue">Portfolio</span>
        </a>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <div className="flex items-center space-x-6">
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.url}
                className="text-portfolio-darkGray dark:text-white hover:text-portfolio-blue dark:hover:text-portfolio-blue transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
          <ThemeToggle />
        </div>

        {/* Mobile Navigation */}
        <div className="flex items-center space-x-4 md:hidden">
          <ThemeToggle />
          <button 
            onClick={toggleMenu}
            className="text-portfolio-darkGray dark:text-white"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && isMobile && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white dark:bg-portfolio-darkGray shadow-md py-4 px-6 flex flex-col space-y-4">
          {navLinks.map((link) => (
            <a 
              key={link.name}
              href={link.url}
              className="text-portfolio-darkGray dark:text-white hover:text-portfolio-blue dark:hover:text-portfolio-blue transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
