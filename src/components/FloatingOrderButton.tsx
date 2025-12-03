import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, X, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';

const FloatingOrderButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { items, getTotalItems, getTotalPrice, updateQuantity } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-8 right-8 z-50"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsCartOpen(true)}
              className="relative w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full shadow-2xl flex items-center justify-center group"
            >
              {/* Pulse Effect */}
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-primary rounded-full"
              />

              {/* Icon */}
              <ShoppingBag className="text-white relative z-10" size={28} />

              {/* Badge */}
              {getTotalItems() > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg"
                >
                  {getTotalItems()}
                </motion.div>
              )}
            </motion.button>

            {/* Tooltip */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              whileHover={{ opacity: 1, x: 0 }}
              className="absolute right-20 top-1/2 -translate-y-1/2 bg-secondary text-white px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap shadow-lg pointer-events-none"
            >
              Se Din Kurv
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-primary to-accent p-6 text-white">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-2xl font-bold">Din Kurv</h2>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsCartOpen(false)}
                    className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
                  >
                    <X size={24} />
                  </motion.button>
                </div>
                <p className="text-white/80 text-sm">
                  {getTotalItems() === 0 ? 'Din kurv er tom' : `${getTotalItems()} varer i kurven`}
                </p>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-6">
                {getTotalItems() === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <ShoppingBag className="text-gray-400" size={40} />
                    </div>
                    <p className="text-gray-500 mb-6">
                      Du har ikke tilføjet noget endnu
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setIsCartOpen(false);
                        document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="bg-gradient-to-r from-primary to-accent text-white px-6 py-3 rounded-full font-semibold"
                    >
                      Gå til Menu
                    </motion.button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {items.slice(0, 3).map((item) => {
                      const itemPrice = item.price * (item.size === 'Large' ? 1.3 : item.size === 'Medium' ? 1.15 : 1);
                      return (
                        <motion.div
                          key={`${item.id}-${item.size}`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex gap-4 bg-cream p-4 rounded-xl"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <h3 className="font-bold text-secondary">{item.name}</h3>
                            <p className="text-sm text-gray-500">{item.size}</p>
                            <p className="text-primary font-bold mt-1">{(itemPrice * item.quantity).toFixed(0)} kr</p>
                          </div>
                          <div className="flex flex-col items-center justify-center gap-2">
                            <motion.button
                              whileTap={{ scale: 0.9 }}
                              onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                              className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow"
                            >
                              <Plus size={16} />
                            </motion.button>
                            <span className="font-bold">{item.quantity}</span>
                            <motion.button
                              whileTap={{ scale: 0.9 }}
                              onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                              className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow"
                            >
                              <Minus size={16} />
                            </motion.button>
                          </div>
                        </motion.div>
                      );
                    })}
                    {items.length > 3 && (
                      <p className="text-center text-sm text-gray-500">
                        +{items.length - 3} flere varer
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Footer */}
              {getTotalItems() > 0 && (
                <div className="border-t p-6 bg-gray-50">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="text-2xl font-bold text-secondary">{getTotalPrice().toFixed(0)} kr</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setIsCartOpen(false);
                      navigate('/cart');
                    }}
                    className="w-full bg-gradient-to-r from-primary to-accent text-white py-4 rounded-xl font-bold text-lg shadow-lg"
                  >
                    Se Kurv
                  </motion.button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingOrderButton;
