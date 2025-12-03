import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue } from 'framer-motion';
import { Pizza, ChefHat, Sparkles, Heart, Star, Flame, Clock, Truck, Award } from 'lucide-react';
// Sparkles is used in EpicLoader orbiting elements
import Hero from '../components/Hero';
import Features from '../components/Features';
import Menu from '../components/Menu';
import SpecialOffers from '../components/SpecialOffers';
import About from '../components/About';
import Gallery from '../components/Gallery';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';

// Epic Loading Screen Component
const EpicLoader = () => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('');

  const loadingMessages = [
    { text: 'Tænder ovnen...', icon: Flame },
    { text: 'Forbereder dejen...', icon: Pizza },
    { text: 'Tilføjer hemmelige ingredienser...', icon: Sparkles },
    { text: 'Mesterkokken er klar...', icon: ChefHat },
    { text: 'Velkommen til Sorrento!', icon: Heart },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const index = Math.min(Math.floor(progress / 20), loadingMessages.length - 1);
    setLoadingText(loadingMessages[index].text);
  }, [progress]);

  const CurrentIcon = loadingMessages[Math.min(Math.floor(progress / 20), loadingMessages.length - 1)].icon;

  return (
    <motion.div 
      className="fixed inset-0 z-[100] bg-gradient-to-br from-[#1A1A2E] via-[#2D2D44] to-[#1A1A2E] flex items-center justify-center overflow-hidden"
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000), 
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
              opacity: 0.1 
            }}
            animate={{ 
              y: [null, Math.random() * -200],
              rotate: [0, 360],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{ 
              duration: 3 + Math.random() * 2, 
              repeat: Infinity, 
              delay: Math.random() * 2 
            }}
          >
            <Pizza className="text-primary/20" size={20 + Math.random() * 30} />
          </motion.div>
        ))}
      </div>

      {/* Glowing Orbs */}
      <motion.div
        className="absolute w-96 h-96 bg-primary/20 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1], 
          x: [-50, 50, -50],
          y: [-30, 30, -30]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute w-72 h-72 bg-accent/20 rounded-full blur-3xl"
        animate={{ 
          scale: [1.2, 1, 1.2], 
          x: [50, -50, 50],
          y: [30, -30, 30]
        }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      {/* Main Content */}
      <div className="relative z-10 text-center px-6">
        {/* Animated Logo */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", duration: 1, bounce: 0.5 }}
          className="relative mb-8"
        >
          <motion.div 
            className="w-32 h-32 mx-auto bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-2xl"
            animate={{ 
              boxShadow: [
                '0 0 30px rgba(212, 56, 44, 0.5)',
                '0 0 60px rgba(245, 166, 35, 0.5)',
                '0 0 30px rgba(212, 56, 44, 0.5)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <CurrentIcon className="text-white" size={60} />
            </motion.div>
          </motion.div>

          {/* Orbiting Elements */}
          {[Star, Heart, Sparkles].map((Icon, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2"
              animate={{ rotate: 360 }}
              transition={{ duration: 3 + i, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: '0 0' }}
            >
              <motion.div
                style={{ 
                  transform: `translateX(${70 + i * 15}px) translateY(-50%)`,
                }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.3 }}
              >
                <Icon className="text-accent" size={16 + i * 4} />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Brand Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-5xl md:text-7xl font-bold text-white mb-2"
        >
          <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%] animate-gradient">
            Sorrento
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-accent text-xl tracking-[0.3em] mb-10"
        >
          PIZZA AALBORG
        </motion.p>

        {/* Loading Text */}
        <motion.div
          key={loadingText}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-white/80 text-lg mb-6 h-8"
        >
          {loadingText}
        </motion.div>

        {/* Progress Bar */}
        <div className="w-64 mx-auto">
          <div className="h-2 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
            <motion.div
              className="h-full bg-gradient-to-r from-primary via-accent to-primary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
          <motion.p 
            className="text-white/60 text-sm mt-2"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {progress}%
          </motion.p>
        </div>

        {/* Features Preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex justify-center gap-8 mt-10"
        >
          {[
            { icon: Clock, text: 'Hurtig' },
            { icon: Truck, text: 'Levering' },
            { icon: Award, text: 'Kvalitet' },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="text-center"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
            >
              <item.icon className="text-accent mx-auto mb-1" size={24} />
              <span className="text-white/60 text-xs">{item.text}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

// Smart Restaurant Notification
const SmartNotification = () => {
  const [notification, setNotification] = useState<{ show: boolean; message: string; type: 'greeting' | 'warning' | 'info' }>({ 
    show: false, 
    message: '', 
    type: 'greeting' 
  });

  useEffect(() => {
    // Get restaurant settings (in real app, this would come from context/API)
    const settings = JSON.parse(localStorage.getItem('restaurantSettings') || '{}');
    const openTime = settings.openTime || '11:00';
    const closeTime = settings.closeTime || '22:00';
    
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const currentTime = hour * 60 + minute;
    
    const [openHour, openMin] = openTime.split(':').map(Number);
    const [closeHour, closeMin] = closeTime.split(':').map(Number);
    const openTimeMinutes = openHour * 60 + openMin;
    const closeTimeMinutes = closeHour * 60 + closeMin;
    
    const isOpen = currentTime >= openTimeMinutes && currentTime < closeTimeMinutes;
    const closingSoon = isOpen && (closeTimeMinutes - currentTime) <= 30;
    const openingSoon = !isOpen && (openTimeMinutes - currentTime) <= 30 && (openTimeMinutes - currentTime) > 0;
    
    let message = '';
    let type: 'greeting' | 'warning' | 'info' = 'greeting';
    
    if (!isOpen && !openingSoon) {
      message = `🌙 Vi er lukket nu. Åbningstider: ${openTime} - ${closeTime}`;
      type = 'warning';
    } else if (openingSoon) {
      message = `⏰ Vi åbner snart kl. ${openTime}!`;
      type = 'info';
    } else if (closingSoon) {
      message = `⚠️ Vi lukker snart! Sidste ordre inden kl. ${closeTime}`;
      type = 'warning';
    } else if (hour >= 5 && hour < 12) {
      message = '🌅 God morgen! Friske pizzaer venter på dig';
      type = 'greeting';
    } else if (hour >= 12 && hour < 17) {
      message = '🌞 God eftermiddag! Tid til en lækker frokost?';
      type = 'greeting';
    } else if (hour >= 17 && hour < 21) {
      message = '🌆 God aften! Perfekt tid til aftensmad';
      type = 'greeting';
    }
    
    if (message) {
      // Show notification after 1 second
      const showTimer = setTimeout(() => {
        setNotification({ show: true, message, type });
      }, 1000);
      
      // Hide after 5 seconds
      const hideTimer = setTimeout(() => {
        setNotification(prev => ({ ...prev, show: false }));
      }, 6000);
      
      return () => {
        clearTimeout(showTimer);
        clearTimeout(hideTimer);
      };
    }
  }, []);

  return (
    <AnimatePresence>
      {notification.show && (
        <motion.div
          initial={{ opacity: 0, y: -100, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: -100, x: '-50%' }}
          className="fixed top-24 left-1/2 z-50"
        >
          <motion.div 
            className={`px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 ${
              notification.type === 'warning' 
                ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                : notification.type === 'info'
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                : 'bg-white text-secondary border border-gray-100'
            }`}
            whileHover={{ scale: 1.02 }}
          >
            <span className="font-medium">{notification.message}</span>
            <button 
              onClick={() => setNotification(prev => ({ ...prev, show: false }))}
              className="ml-2 opacity-70 hover:opacity-100"
            >
              ✕
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Magnetic Button Effect Component
const MagneticButton = ({ children, className, onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.3);
    y.set((e.clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={className}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
};

// Scroll to Top Button
const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const toggleVisibility = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setIsVisible(scrolled > 500);
      setScrollProgress((scrolled / maxScroll) * 100);
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          className="fixed bottom-6 left-6 z-50"
        >
          <MagneticButton
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="relative w-14 h-14 bg-secondary rounded-full shadow-xl flex items-center justify-center text-white group overflow-hidden"
          >
            {/* Progress Ring */}
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle
                cx="28"
                cy="28"
                r="24"
                fill="none"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="3"
              />
              <motion.circle
                cx="28"
                cy="28"
                r="24"
                fill="none"
                stroke="#F5A623"
                strokeWidth="3"
                strokeDasharray={150}
                strokeDashoffset={150 - (scrollProgress * 1.5)}
                strokeLinecap="round"
              />
            </svg>
            <motion.span
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-xl font-bold"
            >
              ↑
            </motion.span>
          </MagneticButton>
        </motion.div>
      )}
    </AnimatePresence>
  );
};


// Parallax Scroll Effect
const ParallaxSection = ({ children }: { children: React.ReactNode }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative">
      {/* Floating Pizza Elements */}
      <motion.div
        className="fixed top-20 right-10 pointer-events-none opacity-10 hidden xl:block"
        style={{ y: scrollY * 0.1 }}
      >
        <Pizza size={100} className="text-primary" />
      </motion.div>
      <motion.div
        className="fixed top-40 left-10 pointer-events-none opacity-10 hidden xl:block"
        style={{ y: scrollY * 0.15, rotate: scrollY * 0.02 }}
      >
        <Pizza size={60} className="text-accent" />
      </motion.div>
      {children}
    </div>
  );
};

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <EpicLoader />}
      </AnimatePresence>

      {!isLoading && (
        <>
          {/* Smart Notification based on time & restaurant hours */}
          <SmartNotification />
          
          <ParallaxSection>
            <motion.main
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Hero />
              <Features />
              <Menu />
              <SpecialOffers />
              <About />
              <Gallery />
              <Testimonials />
              <Contact />
            </motion.main>
          </ParallaxSection>
          
          {/* Scroll to Top Button */}
          <ScrollToTop />
        </>
      )}
    </>
  );
};

export default HomePage;
