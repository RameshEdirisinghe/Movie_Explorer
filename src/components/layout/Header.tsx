import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, Heart, LogOut, Popcorn } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import SearchBar from '../ui/SearchBar';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Handle scroll events for header transparency/background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black/80 backdrop-blur-md shadow-md' : 'bg-gradient-to-b from-black/80 to-transparent'
    }`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-yellow-500 font-bold text-xl">
            <Popcorn />
            <span className="hidden sm:inline">MovieExplorer</span>
          </Link>

          {/* Search (hidden on mobile) */}
          <div className="hidden md:block md:w-1/2 lg:w-1/3">
            {isAuthenticated && <SearchBar />}
          </div>

          {/* Navigation (desktop) */}
          <nav className="hidden md:flex items-center gap-6">
            {isAuthenticated ? (
              <>
                <Link to="/" className="text-white hover:text-yellow-500 transition">
                  Home
                </Link>
                <Link to="/favorites" className="text-white hover:text-yellow-500 transition">
                  <Heart size={20} />
                </Link>
                <button 
                  onClick={toggleTheme} 
                  className="text-white hover:text-yellow-500 transition"
                  aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                  {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                </button>
                <button 
                  onClick={logout} 
                  className="text-white hover:text-yellow-500 transition flex items-center gap-1"
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link to="/login" className="text-white hover:text-yellow-500 transition">
                Login
              </Link>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white p-2"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-3 p-4 bg-gray-900 rounded-lg">
            {isAuthenticated && (
              <div className="mb-4">
                <SearchBar />
              </div>
            )}
            <nav className="flex flex-col gap-4">
              {isAuthenticated ? (
                <>
                  <Link to="/" className="text-white hover:text-yellow-500 transition py-2">
                    Home
                  </Link>
                  <Link to="/favorites" className="text-white hover:text-yellow-500 transition py-2 flex items-center gap-2">
                    <Heart size={20} />
                    <span>Favorites</span>
                  </Link>
                  <button 
                    onClick={toggleTheme} 
                    className="text-white hover:text-yellow-500 transition py-2 flex items-center gap-2 w-full text-left"
                  >
                    {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                  </button>
                  <button 
                    onClick={logout} 
                    className="text-white hover:text-yellow-500 transition py-2 flex items-center gap-2"
                  >
                    <LogOut size={20} />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <Link to="/login" className="text-white hover:text-yellow-500 transition py-2">
                  Login
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;