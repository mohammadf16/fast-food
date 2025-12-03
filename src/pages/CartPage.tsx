import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, ArrowRight } from 'lucide-react';

const CartPage = () => {
  const { items, updateQuantity, removeFromCart, getTotalPrice } = useCart();

  const deliveryFee = getTotalPrice() > 150 ? 0 : 29;
  const subtotal = getTotalPrice();
  const total = subtotal + deliveryFee;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-cream pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="text-gray-400" size={60} />
            </div>
            <h1 className="text-4xl font-bold text-secondary mb-4">
              Din Kurv Er Tom
            </h1>
            <p className="text-gray-600 mb-8">
              Tilføj nogle lækre pizzaer til din kurv for at fortsætte
            </p>
            <Link to="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-primary to-accent text-white px-8 py-4 rounded-full font-bold inline-flex items-center gap-2"
              >
                <ArrowLeft size={20} />
                Tilbage til Menu
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-primary transition-colors mb-4"
          >
            <ArrowLeft size={20} />
            Fortsæt med at handle
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-secondary">
            Din Kurv
          </h1>
          <p className="text-gray-600 mt-2">
            {items.length} {items.length === 1 ? 'vare' : 'varer'} i kurven
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => {
              const itemPrice = item.price * (item.size === 'Large' ? 1.3 : item.size === 'Medium' ? 1.15 : 1);
              
              return (
                <motion.div
                  key={`${item.id}-${item.size}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="flex gap-6">
                    {/* Image */}
                    <div className="w-32 h-32 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-xl font-bold text-secondary">
                            {item.name}
                          </h3>
                          <p className="text-gray-500 text-sm">
                            {item.description}
                          </p>
                          <div className="mt-2">
                            <span className="inline-block bg-cream px-3 py-1 rounded-full text-sm font-medium text-primary">
                              {item.size}
                            </span>
                          </div>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => removeFromCart(item.id, item.size)}
                          className="text-red-500 hover:text-red-600 p-2"
                        >
                          <Trash2 size={20} />
                        </motion.button>
                      </div>

                      {/* Quantity & Price */}
                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center gap-3 bg-cream rounded-full p-1">
                          <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() =>
                              updateQuantity(item.id, item.size, item.quantity - 1)
                            }
                            className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow hover:shadow-md transition-shadow"
                          >
                            <Minus size={16} />
                          </motion.button>
                          <span className="font-bold text-lg w-8 text-center">
                            {item.quantity}
                          </span>
                          <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() =>
                              updateQuantity(item.id, item.size, item.quantity + 1)
                            }
                            className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow hover:shadow-md transition-shadow"
                          >
                            <Plus size={16} />
                          </motion.button>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary">
                            {(itemPrice * item.quantity).toFixed(0)} kr
                          </div>
                          <div className="text-sm text-gray-500">
                            {itemPrice.toFixed(0)} kr × {item.quantity}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 shadow-lg sticky top-32"
            >
              <h2 className="text-2xl font-bold text-secondary mb-6">
                Ordre Oversigt
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold">{subtotal.toFixed(0)} kr</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Levering</span>
                  <span className="font-semibold">
                    {deliveryFee === 0 ? (
                      <span className="text-green-600">Gratis</span>
                    ) : (
                      `${deliveryFee} kr`
                    )}
                  </span>
                </div>
                {deliveryFee > 0 && (
                  <div className="text-sm text-gray-500 bg-cream p-3 rounded-lg">
                    💡 Tilføj {(150 - subtotal).toFixed(0)} kr mere for gratis levering
                  </div>
                )}
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-secondary">Total</span>
                    <span className="text-3xl font-bold text-primary">
                      {total.toFixed(0)} kr
                    </span>
                  </div>
                </div>
              </div>

              <Link to="/checkout">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-primary to-accent text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center gap-2"
                >
                  Gå til Betaling
                  <ArrowRight size={20} />
                </motion.button>
              </Link>

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    ✓
                  </div>
                  <span>Sikker betaling</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    ✓
                  </div>
                  <span>30 minutters levering</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    ✓
                  </div>
                  <span>100% tilfredshedsgaranti</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
