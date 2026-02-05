import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Phone, Clock, MapPin, ShoppingBag, User, LogIn } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { getTotalItems } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [branding, setBranding] = useState({
    restaurantName: 'Sorrento',
    slogan: 'PIZZA AALBORG',
    phone: '+45 98 12 34 56',
    openTime: '11:00',
    closeTime: '22:00',
    address: 'Hadsundvej 11, 9000 Aalborg',
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Load restaurant branding and contact info from admin settings
    const savedSettings = localStorage.getItem('restaurantSettings');
    if (savedSettings) {
      try {
        const settings = JSON.parse(savedSettings);
        setBranding(prev => ({
          restaurantName: settings.restaurantName || prev.restaurantName,
          slogan: settings.slogan || prev.slogan,
          phone: settings.phone || prev.phone,
          openTime: settings.openTime || prev.openTime,
          closeTime: settings.closeTime || prev.closeTime,
          address: settings.address && settings.city && settings.zipCode
            ? `${settings.address}, ${settings.zipCode} ${settings.city}`
            : settings.address || prev.address,
        }));
      } catch {
        // ignore invalid settings and keep defaults
      }
    }
  }, []);

  const navLinks = [
    { name: 'Hjem', href: '/' },
    { name: 'Menu', href: '/menu' },
    { name: 'Byg Pizza', href: '/pizza-builder' },
    { name: 'Om Os', href: '/about' },
    { name: 'Galleri', href: '/gallery' },
    { name: 'Kontakt', href: '/contact' },
  ];

  return (
    <>
      {/* Top Bar */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="hidden lg:block bg-secondary text-white py-2"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Phone size={14} className="text-primary" />
              <span>{branding.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={14} className="text-primary" />
              <span>
                Man-Søn: {branding.openTime} - {branding.closeTime}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-primary" />
            <span>{branding.address}</span>
          </div>
        </div>
      </motion.div>

      {/* Main Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-secondary/95 backdrop-blur-md shadow-xl border-b border-white/10 py-3'
            : 'bg-gradient-to-b from-black/70 to-transparent py-5'
        }`}
        style={{ top: isScrolled ? 0 : 'auto' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/">
              <motion.div
                className="flex items-center gap-3"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <div>
                <h1 className={`text-2xl font-bold ${isScrolled ? 'text-white' : 'text-white'}`}>
                  {branding.restaurantName}
                </h1>
                <p className={`text-xs ${isScrolled ? 'text-primary' : 'text-primary'}`}>
                  {branding.slogan}
                </p>
              </div>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link, index) => (
                <Link key={link.name} to={link.href}>
                  <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative font-medium transition-colors ${
                    isScrolled ? 'text-white hover:text-primary' : 'text-white hover:text-primary'
                  }`}
                  whileHover={{ y: -2 }}
                >
                  {link.name}
                    <motion.span
                      className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary"
                      whileHover={{ width: '100%' }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                </Link>
              ))}
              
              {/* Cart Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/cart')}
                className="relative p-2"
              >
                <ShoppingBag 
                  className={isScrolled ? 'text-white' : 'text-white'} 
                  size={24} 
                />
                {getTotalItems() > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-danger rounded-full flex items-center justify-center text-white text-xs font-bold"
                  >
                    {getTotalItems()}
                  </motion.span>
                )}
              </motion.button>
              {/* Auth Button */}
              {user ? (
                <Link to="/profile">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 ${
                      isScrolled
                        ? 'border-primary text-primary hover:bg-primary hover:text-secondary'
                        : 'border-white/20 text-white hover:bg-white/10 hover:text-white'
                    } transition-colors`}
                  >
                    <User size={18} />
                    <span className="font-medium">{user.name.split(' ')[0]}</span>
                  </motion.div>
                </Link>
              ) : (
                <Link to="/login">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 ${
                      isScrolled
                        ? 'border-primary text-primary hover:bg-primary hover:text-secondary'
                        : 'border-white/20 text-white hover:bg-white/10 hover:text-white'
                    } transition-colors`}
                  >
                    <LogIn size={18} />
                    <span className="font-medium">Log Ind</span>
                  </motion.div>
                </Link>
              )}
              <Link to="/menu">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-primary to-accent text-secondary px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow"
                >
                  Bestil Nu
                </motion.div>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className={`lg:hidden p-2 rounded-lg ${isScrolled ? 'text-white' : 'text-white'}`}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-secondary/95 backdrop-blur-md border-t border-white/10"
            >
              <div className="px-6 py-4 space-y-4">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setIsOpen(false)}
                    className="block text-white font-medium py-2 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </motion.a>
                ))}
                {user ? (
                  <Link to="/profile" onClick={() => setIsOpen(false)}>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                      className="flex items-center gap-2 text-white font-medium py-2 hover:text-primary transition-colors"
                    >
                      <User size={18} />
                      Min Profil
                    </motion.div>
                  </Link>
                ) : (
                  <Link to="/login" onClick={() => setIsOpen(false)}>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                      className="flex items-center gap-2 text-white font-medium py-2 hover:text-primary transition-colors"
                    >
                      <LogIn size={18} />
                      Log Ind
                    </motion.div>
                  </Link>
                )}
                <Link to="/menu" onClick={() => setIsOpen(false)}>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="block bg-gradient-to-r from-primary to-accent text-secondary text-center px-6 py-3 rounded-full font-semibold"
                  >
                    Bestil Nu
                  </motion.div>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default Navbar;
