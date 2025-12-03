import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, Search, Phone, ArrowLeft } from 'lucide-react';

const NotFoundPage = () => {
  // Floating pizza ingredients animation
  const ingredients = [
    { emoji: '🍅', delay: 0, x: -100, y: -50 },
    { emoji: '🧀', delay: 0.5, x: 100, y: -30 },
    { emoji: '🍄', delay: 1, x: -80, y: 50 },
    { emoji: '🫒', delay: 1.5, x: 120, y: 40 },
    { emoji: '🌿', delay: 2, x: -120, y: 0 },
    { emoji: '🧅', delay: 2.5, x: 80, y: -60 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream to-white flex items-center justify-center px-6 py-20 overflow-hidden relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4382C' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Floating Ingredients */}
      {ingredients.map((item, index) => (
        <motion.div
          key={index}
          className="absolute text-4xl md:text-6xl"
          initial={{ opacity: 0, x: item.x, y: item.y }}
          animate={{ 
            opacity: [0, 1, 1, 0],
            y: [item.y, item.y - 100],
            rotate: [0, 360],
          }}
          transition={{
            duration: 4,
            delay: item.delay,
            repeat: Infinity,
            repeatDelay: 2,
          }}
          style={{ left: `calc(50% + ${item.x}px)`, top: `calc(50% + ${item.y}px)` }}
        >
          {item.emoji}
        </motion.div>
      ))}

      <div className="max-w-3xl mx-auto text-center relative z-10">
        {/* 404 Animation */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20, duration: 0.8 }}
          className="relative inline-block mb-8"
        >
          <div className="flex items-center justify-center gap-2 md:gap-4">
            <motion.span 
              className="text-8xl md:text-[12rem] font-bold text-primary"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              4
            </motion.span>
            
            {/* Pizza as zero */}
            <motion.div
              className="relative w-24 h-24 md:w-40 md:h-40"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              {/* Pizza base */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-200 to-amber-400 shadow-2xl" />
              <div className="absolute inset-2 rounded-full bg-gradient-to-br from-amber-100 to-amber-300 border-4 border-amber-400" />
              {/* Sauce */}
              <div className="absolute inset-4 rounded-full bg-gradient-to-br from-red-400 to-red-500" />
              {/* Cheese */}
              <div className="absolute inset-6 rounded-full bg-gradient-to-br from-yellow-100 to-yellow-200 opacity-90" />
              {/* Toppings */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid grid-cols-2 gap-1">
                  <span className="text-sm md:text-xl">🍕</span>
                  <span className="text-sm md:text-xl">🧀</span>
                  <span className="text-sm md:text-xl">🍅</span>
                  <span className="text-sm md:text-xl">🌿</span>
                </div>
              </div>
            </motion.div>
            
            <motion.span 
              className="text-8xl md:text-[12rem] font-bold text-primary"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
            >
              4
            </motion.span>
          </div>
        </motion.div>

        {/* Chef illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <div className="text-6xl md:text-8xl">👨‍🍳</div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl md:text-5xl font-bold text-secondary mb-4"
        >
          Mama Mia! Siden er Væk!
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-gray-600 text-lg md:text-xl mb-4 max-w-xl mx-auto"
        >
          Det ser ud til, at denne side er blevet spist... eller måske brændt i ovnen! 
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-gray-500 mb-10"
        >
          Bare rolig, vi har masser af andre lækre sider til dig!
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(212, 56, 44, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-primary to-accent text-white px-8 py-4 rounded-full font-bold shadow-lg flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <Home size={20} />
              Tilbage til Forsiden
            </motion.button>
          </Link>
          
          <Link to="/menu">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-secondary border-2 border-gray-200 px-8 py-4 rounded-full font-bold hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <Search size={20} />
              Se Menuen
            </motion.button>
          </Link>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg"
        >
          <h3 className="font-semibold text-secondary mb-4">Populære Sider</h3>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/" className="text-primary hover:text-accent transition-colors flex items-center gap-1 text-sm">
              <ArrowLeft size={14} /> Forside
            </Link>
            <span className="text-gray-300">|</span>
            <Link to="/menu" className="text-primary hover:text-accent transition-colors text-sm">Menu</Link>
            <span className="text-gray-300">|</span>
            <Link to="/about" className="text-primary hover:text-accent transition-colors text-sm">Om Os</Link>
            <span className="text-gray-300">|</span>
            <Link to="/contact" className="text-primary hover:text-accent transition-colors text-sm">Kontakt</Link>
            <span className="text-gray-300">|</span>
            <Link to="/pizza-builder" className="text-primary hover:text-accent transition-colors text-sm">Byg Pizza</Link>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-200">
            <a 
              href="tel:+4512345678" 
              className="inline-flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
            >
              <Phone size={16} />
              Brug for hjælp? Ring: +45 12 34 56 78
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFoundPage;
