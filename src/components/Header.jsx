import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };

    
    checkMobile();
    
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const navigationItems = [
   {
  name: 'ARC 2.0',
  type: 'external',
  url: 'https://arc.austrc.com/' 
},
    {
      name: 'Governing Panel',
      path: '/governing-panel',
      dropdown: [
        'Hall of Fame',
        'Fall 2024',
        'Spring 2024', 
        'Fall 2023',
        'Spring 2023',
        'Fall 2022',
        'Spring 2022',
        'Fall 2021'
      ]
    },
    {
      name: 'Activities',
      path: '/activities',
      dropdown: [
        'Workshops',
        'Events',
        'Educational Activities',
        'Social Activities'
      ]
    },
    {
      name: 'Research and project',
      path: '/research'
    },
    {
      name: 'Enthusiast Acquisition',
      path: '/enthusiast'
    },
    {
      name: 'About us',
      path: '/about'
    }
  ];

  // Determine header background
  const getHeaderBackground = () => {
    if (isMobile) {
      return 'bg-white shadow-sm'; 
    }
    return isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent';
  };

  // Determine text color
  const getTextColor = () => {
    if (isMobile) {
      return 'text-gray-900'; // Always dark text on mobile
    }
    return isScrolled ? 'text-gray-900' : 'text-gray-900';
  };

  const toggleDropdown = (itemName) => {
    setActiveDropdown(activeDropdown === itemName ? null : itemName);
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${getHeaderBackground()}`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          
          {/* Logo - Left Side */}
          <Link to="/" className="flex items-center space-x-3">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3"
            >
              {/* ImageKit Logo */}
              <img 
                src="https://ik.imagekit.io/mekt2pafz/logo2.png?updatedAt=1763912058171" 
               
                className="w-10 h-10 rounded-lg object-contain"
              />
              <div className="flex flex-col">
                <span className={`text-xl font-bold ${getTextColor()} group-hover:text-green-600 transition-colors`}>AUST ROBOTICS CLUB </span>
                
              </div>
            </motion.div>
          </Link>

          {/* Centered Navigation - Desktop Only */}
          <nav className="hidden lg:flex items-center space-x-1 relative">
            {navigationItems.map((item) => (
              <div key={item.name} className="relative">
                {item.dropdown ? (
                  /* Dropdown Items */
                  <div 
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(item.name)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button
                      onClick={() => toggleDropdown(item.name)}
                      className={`flex items-center space-x-1 px-4 py-2 rounded-full font-medium transition-colors duration-300 ${getTextColor()} hover:text-green-600`}
                    >
                      <span>{item.name}</span>
                      <ChevronDown size={16} className={`transition-transform ${
                        activeDropdown === item.name ? 'rotate-180' : ''
                      }`} />
                    </button>

                    {/* Dropdown Menu */}
                    {activeDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                      >
                        {item.dropdown.map((dropdownItem) => (
                          <Link
                            key={dropdownItem}
                            to={`/${dropdownItem.toLowerCase().replace(/\s+/g, '-')}`}
                            className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors"
                            onClick={() => setActiveDropdown(null)}
                          >
                            {dropdownItem}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </div>
                ) : (
                  /* Regular Items */
                  <div className="relative">
                    <Link
                      to={item.path}
                      className={`px-4 py-2 rounded-full font-medium transition-colors duration-300 ${getTextColor()} hover:text-green-600`}
                    >
                      {item.name}
                    </Link>
                    <motion.div
                      className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-500"
                      whileHover={{ width: '100%' }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Side - CTA Button - Desktop Only */}
          <div className="hidden lg:flex items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-green-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-green-600 transition-all shadow-lg"
            >
              Join Us
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden text-gray-900" // Always dark on mobile
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="lg:hidden mt-4 pb-4 border-t border-gray-200 pt-4 bg-white" // Always white background on mobile
          >
            <div className="flex flex-col space-y-2">
              {navigationItems.map((item) => (
                <div key={item.name}>
                  {item.dropdown ? (
                    <div>
                      <button
                        onClick={() => toggleDropdown(item.name)}
                        className="flex items-center justify-between w-full px-4 py-3 text-gray-900 font-medium hover:text-green-600 transition-colors"
                      >
                        <span>{item.name}</span>
                        <ChevronDown size={16} className={`transition-transform ${
                          activeDropdown === item.name ? 'rotate-180' : ''
                        }`} />
                      </button>
                      
                      {/* Mobile Dropdown */}
                      {activeDropdown === item.name && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="ml-4 border-l-2 border-green-200 pl-4 space-y-2 bg-gray-50 rounded-r-lg"
                        >
                          {item.dropdown.map((dropdownItem) => (
                            <Link
                              key={dropdownItem}
                              to={`/${dropdownItem.toLowerCase().replace(/\s+/g, '-')}`}
                              className="block px-4 py-2 text-gray-700 hover:text-green-600 transition-colors hover:bg-green-50 rounded-lg"
                              onClick={() => {
                                setActiveDropdown(null);
                                setIsMenuOpen(false);
                              }}
                            >
                              {dropdownItem}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.path}
                      className="block px-4 py-3 text-gray-900 font-medium hover:text-green-600 transition-colors hover:bg-gray-50 rounded-lg"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              
              {/* Mobile CTA Button */}
              <div className="pt-4 border-t border-gray-200">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-green-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-600 transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Join Us
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;