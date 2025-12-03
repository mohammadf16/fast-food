import { motion } from 'framer-motion';

interface ChefLoaderProps {
  message?: string;
  showProgress?: boolean;
  progress?: number;
}

const ChefLoader = ({ message = 'Forbereder...', showProgress = false, progress = 0 }: ChefLoaderProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] py-12">
      {/* Kitchen Scene */}
      <div className="relative w-80 h-64 mb-8">
        {/* Background - Kitchen Counter */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-amber-800 to-amber-700 rounded-t-lg">
          {/* Counter texture */}
          <div className="absolute inset-0 opacity-20">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="absolute h-full w-px bg-amber-900" style={{ left: `${i * 12.5}%` }} />
            ))}
          </div>
        </div>

        {/* Brick Wall Background */}
        <div className="absolute top-0 left-0 right-0 h-44 bg-gradient-to-b from-orange-200 to-orange-300 rounded-t-lg overflow-hidden">
          <div className="absolute inset-0 opacity-30">
            {[...Array(6)].map((_, row) => (
              <div key={row} className="flex" style={{ marginTop: row * 16 }}>
                {[...Array(10)].map((_, col) => (
                  <div 
                    key={col} 
                    className="w-8 h-4 border border-orange-400 bg-orange-300"
                    style={{ marginLeft: row % 2 === 0 ? 0 : -16 }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Oven */}
        <motion.div 
          className="absolute bottom-16 left-4 w-24 h-28 bg-gradient-to-b from-gray-700 to-gray-800 rounded-t-lg"
          animate={{ boxShadow: ['0 0 10px #ff6b35', '0 0 20px #ff6b35', '0 0 10px #ff6b35'] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {/* Oven door */}
          <div className="absolute top-4 left-2 right-2 h-16 bg-gray-900 rounded border-2 border-gray-600">
            {/* Fire glow */}
            <motion.div 
              className="absolute inset-2 bg-gradient-to-t from-orange-500 via-yellow-400 to-transparent rounded opacity-80"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            />
            {/* Fire flames */}
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 bg-gradient-to-t from-orange-500 to-yellow-300 rounded-t-full"
                  animate={{ height: [8, 14, 8], opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 0.3 + i * 0.1, repeat: Infinity, delay: i * 0.1 }}
                />
              ))}
            </div>
          </div>
          {/* Oven handle */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-12 h-2 bg-gray-500 rounded-full" />
        </motion.div>

        {/* Chef Character */}
        <motion.div 
          className="absolute bottom-16 right-8"
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          {/* Body */}
          <div className="relative">
            {/* Chef Hat */}
            <motion.div 
              className="absolute -top-12 left-1/2 -translate-x-1/2"
              animate={{ rotate: [-2, 2, -2] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              <div className="w-10 h-3 bg-white rounded-full" />
              <div className="w-8 h-10 bg-white rounded-t-full mx-auto -mt-1">
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-6 h-6 bg-gray-100 rounded-full opacity-50" />
              </div>
            </motion.div>
            
            {/* Head */}
            <div className="w-12 h-12 bg-amber-200 rounded-full relative">
              {/* Eyes */}
              <motion.div 
                className="absolute top-4 left-2 w-2 h-2 bg-gray-800 rounded-full"
                animate={{ scaleY: [1, 0.1, 1] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
              />
              <motion.div 
                className="absolute top-4 right-2 w-2 h-2 bg-gray-800 rounded-full"
                animate={{ scaleY: [1, 0.1, 1] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
              />
              {/* Smile */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-4 h-2 border-b-2 border-gray-800 rounded-b-full" />
              {/* Mustache */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex">
                <div className="w-3 h-1 bg-gray-700 rounded-l-full transform -rotate-12" />
                <div className="w-3 h-1 bg-gray-700 rounded-r-full transform rotate-12" />
              </div>
            </div>
            
            {/* Body */}
            <div className="w-14 h-16 bg-white rounded-lg mt-1 relative mx-auto">
              {/* Buttons */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 space-y-2">
                <div className="w-2 h-2 bg-gray-800 rounded-full" />
                <div className="w-2 h-2 bg-gray-800 rounded-full" />
              </div>
            </div>
            
            {/* Arms */}
            <motion.div 
              className="absolute top-14 -left-4 w-4 h-10 bg-white rounded-full origin-top"
              animate={{ rotate: [-20, 20, -20] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
            <motion.div 
              className="absolute top-14 -right-4 w-4 h-10 bg-white rounded-full origin-top"
              animate={{ rotate: [20, -20, 20] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
          </div>
        </motion.div>

        {/* Pizza on counter being made */}
        <motion.div 
          className="absolute bottom-20 left-1/2 -translate-x-1/2"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        >
          {/* Pizza Base */}
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-200 to-amber-300 border-4 border-amber-400 relative overflow-hidden shadow-lg">
            {/* Sauce */}
            <div className="absolute inset-2 rounded-full bg-gradient-to-br from-red-400 to-red-500" />
            {/* Cheese */}
            <div className="absolute inset-3 rounded-full bg-gradient-to-br from-yellow-100 to-yellow-200 opacity-80" />
            {/* Toppings appearing */}
            <motion.div
              className="absolute top-2 left-3 w-2 h-2 bg-red-600 rounded-full"
              animate={{ scale: [0, 1, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <motion.div
              className="absolute top-4 right-2 w-2 h-2 bg-green-600 rounded-full"
              animate={{ scale: [0, 1, 0] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
            />
            <motion.div
              className="absolute bottom-3 left-4 w-2 h-2 bg-amber-800 rounded-full"
              animate={{ scale: [0, 1, 0] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.6 }}
            />
          </div>
        </motion.div>

        {/* Ingredients floating in */}
        {['🍅', '🧀', '🍄', '🌿', '🫒'].map((emoji, index) => (
          <motion.div
            key={index}
            className="absolute text-2xl"
            initial={{ x: -50, y: 0, opacity: 0 }}
            animate={{ 
              x: [index % 2 === 0 ? -50 : 330, 160],
              y: [50 + index * 20, 130],
              opacity: [0, 1, 1, 0],
              scale: [0.5, 1, 1, 0.5],
            }}
            transition={{ 
              duration: 2,
              delay: index * 0.4,
              repeat: Infinity,
              repeatDelay: 1,
            }}
          >
            {emoji}
          </motion.div>
        ))}

        {/* Steam from oven */}
        <div className="absolute bottom-40 left-10">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-6 bg-gradient-to-t from-gray-300 to-transparent rounded-full opacity-50"
              style={{ left: i * 8 }}
              animate={{ y: [-10, -30], opacity: [0.5, 0], scale: [1, 1.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
            />
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      {showProgress && (
        <div className="w-64 mb-4">
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <p className="text-center text-sm text-gray-500 mt-2">{progress}% færdig</p>
        </div>
      )}

      {/* Loading Text */}
      <motion.div
        className="text-center"
        animate={{ opacity: [1, 0.5, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <p className="text-xl font-semibold text-secondary">{message}</p>
        <div className="flex justify-center gap-1 mt-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-primary rounded-full"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ChefLoader;
