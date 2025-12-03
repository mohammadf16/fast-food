import { motion } from 'framer-motion';

interface PizzaLoaderProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

const PizzaLoader = ({ message = 'Forbereder din pizza...', size = 'md' }: PizzaLoaderProps) => {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
  };

  const toppings = [
    { color: '#D4382C', delay: 0 },
    { color: '#F5A623', delay: 0.2 },
    { color: '#4CAF50', delay: 0.4 },
    { color: '#8B4513', delay: 0.6 },
  ];

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <div className={`relative ${sizeClasses[size]}`}>
        {/* Pizza base */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-200 to-amber-300 shadow-lg"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        >
          {/* Crust */}
          <div className="absolute inset-1 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 border-4 border-amber-300" />
          
          {/* Sauce */}
          <motion.div
            className="absolute inset-3 rounded-full bg-gradient-to-br from-red-400 to-red-500"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
          
          {/* Cheese */}
          <motion.div
            className="absolute inset-4 rounded-full bg-gradient-to-br from-yellow-200 to-yellow-300 opacity-80"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          />
        </motion.div>

        {/* Animated toppings */}
        {toppings.map((topping, index) => (
          <motion.div
            key={index}
            className="absolute w-3 h-3 rounded-full"
            style={{ 
              backgroundColor: topping.color,
              left: `${25 + (index % 2) * 50}%`,
              top: `${25 + Math.floor(index / 2) * 50}%`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [0, 1.2, 1],
              opacity: [0, 1, 1],
            }}
            transition={{ 
              duration: 0.6,
              delay: topping.delay,
              repeat: Infinity,
              repeatDelay: 2,
            }}
          />
        ))}

        {/* Steam effect */}
        <motion.div
          className="absolute -top-4 left-1/2 -translate-x-1/2 flex gap-1"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1.5 h-4 bg-gray-300 rounded-full opacity-60"
              animate={{
                y: [-5, -15],
                opacity: [0.6, 0],
                scaleY: [1, 1.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </motion.div>
      </div>

      {message && (
        <motion.p
          className="text-gray-600 font-medium text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {message}
        </motion.p>
      )}
    </div>
  );
};

export default PizzaLoader;
