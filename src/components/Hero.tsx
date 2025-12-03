import { motion } from 'framer-motion';
import { ChevronDown, Star, Flame, Clock, Truck, Award } from 'lucide-react';

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: 'easeOut' }}
          src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1920&q=80"
          alt="Pizza Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80" />
        {/* Animated gradient overlay */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20"
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 opacity-20"
        animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        <img
          src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&q=80"
          alt="Pizza slice"
          className="w-full h-full object-cover rounded-full shadow-2xl"
        />
      </motion.div>

      <motion.div
        className="absolute bottom-40 right-10 w-32 h-32 opacity-20"
        animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      >
        <img
          src="https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=200&q=80"
          alt="Pizza"
          className="w-full h-full object-cover rounded-full shadow-2xl"
        />
      </motion.div>

      {/* Additional Floating Pizzas */}
      <motion.div
        className="absolute top-1/3 right-20 w-24 h-24 opacity-15"
        animate={{ 
          y: [0, -30, 0],
          rotate: [0, 15, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 7, repeat: Infinity, delay: 1 }}
      >
        <img
          src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200&q=80"
          alt="Pizza"
          className="w-full h-full object-cover rounded-full shadow-2xl"
        />
      </motion.div>

      <motion.div
        className="absolute bottom-1/4 left-20 w-28 h-28 opacity-15"
        animate={{ 
          y: [0, 25, 0],
          rotate: [0, -12, 0],
          scale: [1, 1.15, 1]
        }}
        transition={{ duration: 9, repeat: Infinity, delay: 2 }}
      >
        <img
          src="https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=200&q=80"
          alt="Pizza"
          className="w-full h-full object-cover rounded-full shadow-2xl"
        />
      </motion.div>

      {/* Animated Particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-accent rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-6"
          >
            <Flame className="text-[#F5A623]" size={18} />
            <span className="text-white text-sm font-medium">
              #1 Pizza i Aalborg
            </span>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className="text-[#F5A623] fill-[#F5A623]" />
              ))}
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6"
          >
            Ægte Italiensk
            <br />
            <span className="bg-gradient-to-r from-[#D4382C] via-[#F5A623] to-[#D4382C] bg-clip-text text-transparent bg-[size:200%_auto] animate-[gradient_3s_linear_infinite]">
              Pizza Oplevelse
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-200 mb-10 max-w-2xl mx-auto"
          >
            Håndlavede pizzaer med de fineste ingredienser, bagt i stenovn
            efter traditionelle italienske opskrifter
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.a
              href="#menu"
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(212, 56, 44, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-[#D4382C] to-[#F5A623] text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg flex items-center gap-2"
            >
              Se Vores Menu
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.a>
            <motion.a
              href="#order"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-[#1A1A2E] transition-colors"
            >
              Bestil Online
            </motion.a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
          >
            {[
              { number: '15+', label: 'Års Erfaring', icon: Award },
              { number: '30', label: 'Min Levering', icon: Truck },
              { number: '10K+', label: 'Glade Kunder', icon: Star },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 + index * 0.1 }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="text-center group cursor-pointer"
              >
                <motion.div 
                  className="w-12 h-12 mx-auto mb-3 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-accent/30 transition-colors"
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <stat.icon className="text-[#F5A623]" size={24} />
                </motion.div>
                <div className="text-3xl md:text-4xl font-bold text-[#F5A623]">
                  {stat.number}
                </div>
                <div className="text-gray-300 text-sm mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Quick Info Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="mt-12 flex flex-wrap justify-center gap-4"
          >
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white/80 text-sm">
              <Clock size={16} className="text-accent" />
              <span>Åben: 11:00 - 22:00</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white/80 text-sm">
              <Truck size={16} className="text-accent" />
              <span>Gratis levering over 150 kr</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center text-white/60"
        >
          <span className="text-sm mb-2">Scroll ned</span>
          <ChevronDown size={24} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
