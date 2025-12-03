import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Moon } from 'lucide-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingOrderButton from './components/FloatingOrderButton';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import OrderTrackingPage from './pages/OrderTrackingPage';
import AdminDashboard from './pages/AdminDashboard';
import NotFoundPage from './pages/NotFoundPage';
import MenuPage from './pages/MenuPage';
import AboutPage from './pages/AboutPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';
import PizzaBuilderPage from './pages/PizzaBuilderPage';
import AdminMenuManager from './pages/AdminMenuManager';
import AdminSettings from './pages/AdminSettings';

// Global Night Mode Overlay for Closed/Preorder Mode
const NightModeOverlay = () => {
  const [settings, setSettings] = useState<any>(null);
  const location = useLocation();
  
  useEffect(() => {
    const savedSettings = localStorage.getItem('restaurantSettings');
    if (savedSettings) {
      const parsed = JSON.parse(savedSettings);
      if (parsed.isTemporarilyClosed) {
        setSettings(parsed);
      } else {
        setSettings(null);
      }
    }
  }, [location.pathname]);

  if (!settings?.isTemporarilyClosed) return null;
  
  // Don't show on admin pages
  if (location.pathname.startsWith('/admin')) return null;

  // Generate stars with fixed positions (using index as seed)
  const stars = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: ((i * 17) % 100),
    y: ((i * 23) % 100),
    size: (i % 3) + 1,
    delay: (i % 5) * 0.5,
    duration: 2 + (i % 3),
  }));

  return (
    <>
      {/* Subtle night overlay - doesn't block interaction */}
      <div className="fixed inset-0 z-[5] pointer-events-none">
        {/* Very subtle dark tint */}
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/30 via-purple-950/20 to-indigo-950/30" />
        
        {/* Subtle stars - fewer and more transparent */}
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute rounded-full bg-white/60"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
            }}
            animate={{ opacity: [0.1, 0.4, 0.1] }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
            }}
          />
        ))}

        {/* Small moon in corner */}
        <motion.div
          className="absolute top-24 right-6"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-yellow-200 rounded-full blur-xl opacity-20 scale-150" />
            <div className="relative w-10 h-10 bg-gradient-to-br from-yellow-100 via-yellow-200 to-yellow-300 rounded-full shadow-lg opacity-80">
              <div className="absolute top-1 left-2 w-1.5 h-1.5 bg-yellow-300/50 rounded-full" />
              <div className="absolute top-3 right-2 w-2 h-2 bg-yellow-300/40 rounded-full" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Small floating badge - minimal and non-intrusive */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="fixed bottom-24 right-4 z-[85] pointer-events-auto"
      >
        <div className="bg-indigo-900/90 backdrop-blur-xl rounded-xl px-4 py-3 border border-purple-500/30 shadow-xl max-w-xs">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="w-8 h-8 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full flex items-center justify-center flex-shrink-0"
            >
              <Moon size={16} className="text-yellow-800" />
            </motion.div>
            <div className="min-w-0">
              <p className="text-white text-sm font-medium truncate">
                {settings.closedModeType === 'preorder' ? '📦 Forudbestilling aktiv' : '🌙 Lukket'}
              </p>
              <p className="text-purple-300 text-xs truncate">
                {settings.reopenDate 
                  ? `Åbner ${new Date(settings.reopenDate).toLocaleDateString('da-DK', { day: 'numeric', month: 'short' })}`
                  : settings.closedModeMessage || 'Vi åbner snart'
                }
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

function AppContent() {
  return (
    <div className="min-h-screen">
      <NightModeOverlay />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/pizza-builder" element={<PizzaBuilderPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/order-tracking/:orderId" element={<OrderTrackingPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/menu" element={<AdminMenuManager />} />
        <Route path="/admin/settings" element={<AdminSettings />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
      <FloatingOrderButton />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
