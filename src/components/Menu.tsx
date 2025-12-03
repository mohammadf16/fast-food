import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Leaf, Star, ShoppingCart, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Toast from './Toast';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isSpicy?: boolean;
  isVegan?: boolean;
  isPopular?: boolean;
}

const menuItems: MenuItem[] = [
  {
    id: 1,
    name: 'Margherita',
    description: 'Tomatsauce, mozzarella, frisk basilikum',
    price: 79,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80',
    category: 'Klassiske',
    isPopular: true,
  },
  {
    id: 2,
    name: 'Pepperoni',
    description: 'Tomatsauce, mozzarella, pepperoni',
    price: 89,
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&q=80',
    category: 'Klassiske',
    isSpicy: true,
    isPopular: true,
  },
  {
    id: 3,
    name: 'Quattro Formaggi',
    description: 'Mozzarella, gorgonzola, parmesan, ricotta',
    price: 99,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=80',
    category: 'Specialiteter',
  },
  {
    id: 4,
    name: 'Prosciutto e Funghi',
    description: 'Tomatsauce, mozzarella, skinke, champignon',
    price: 95,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80',
    category: 'Specialiteter',
  },
  {
    id: 5,
    name: 'Diavola',
    description: 'Tomatsauce, mozzarella, spicy salami, chili',
    price: 95,
    image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&q=80',
    category: 'Specialiteter',
    isSpicy: true,
  },
  {
    id: 6,
    name: 'Vegetariana',
    description: 'Tomatsauce, mozzarella, grøntsager',
    price: 89,
    image: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=400&q=80',
    category: 'Vegansk',
    isVegan: true,
  },
  {
    id: 7,
    name: 'Calzone',
    description: 'Foldet pizza med skinke, ost og champignon',
    price: 99,
    image: 'https://images.unsplash.com/photo-1536964549204-cce9eab227bd?w=400&q=80',
    category: 'Specialiteter',
    isPopular: true,
  },
  {
    id: 8,
    name: 'Vegansk Special',
    description: 'Tomatsauce, vegansk ost, grøntsager',
    price: 95,
    image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=400&q=80',
    category: 'Vegansk',
    isVegan: true,
  },
];

const categories = ['Alle', 'Klassiske', 'Specialiteter', 'Vegansk'];

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('Alle');
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [selectedSize, setSelectedSize] = useState<'Small' | 'Medium' | 'Large'>('Medium');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const { addToCart } = useCart();

  const filteredItems =
    activeCategory === 'Alle'
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  return (
    <>
    <Toast 
      message={toastMessage}
      isVisible={showToast}
      onClose={() => setShowToast(false)}
      type="success"
    />
    <section id="menu" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[#D4382C] font-semibold text-sm uppercase tracking-wider"
          >
            Vores Menu
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1A1A2E] mt-2 mb-4">
            Lækre Pizzaer
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Udforsk vores udvalg af håndlavede pizzaer, lavet med friske
            ingredienser og kærlighed til det italienske køkken
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-[#D4382C] to-[#F5A623] text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Menu Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                onHoverStart={() => setHoveredItem(item.id)}
                onHoverEnd={() => setHoveredItem(null)}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                {/* Image Container */}
                <div className="relative h-48 overflow-hidden">
                  <motion.img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    animate={{
                      scale: hoveredItem === item.id ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.4 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    {item.isPopular && (
                      <span className="bg-[#F5A623] text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">
                        <Star size={12} className="fill-white" />
                        Populær
                      </span>
                    )}
                    {item.isSpicy && (
                      <span className="bg-[#D4382C] text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">
                        <Flame size={12} />
                        Stærk
                      </span>
                    )}
                    {item.isVegan && (
                      <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">
                        <Leaf size={12} />
                        Vegansk
                      </span>
                    )}
                  </div>

                  {/* Price Tag */}
                  <div className="absolute bottom-4 right-4">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="bg-white text-[#D4382C] font-bold text-lg px-4 py-2 rounded-full shadow-lg"
                    >
                      {item.price} kr
                    </motion.div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#1A1A2E] mb-2">
                    {item.name}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4">{item.description}</p>

                  {/* Add to Cart Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedItem(item)}
                    className="w-full bg-[#1A1A2E] text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-[#D4382C] transition-colors duration-300"
                  >
                    <ShoppingCart size={18} />
                    Tilføj til kurv
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View Full Menu CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 border-2 border-[#D4382C] text-[#D4382C] px-8 py-4 rounded-full font-semibold hover:bg-[#D4382C] hover:text-white transition-all duration-300"
          >
            Se Hele Menuen
            <span>→</span>
          </motion.a>
        </motion.div>
      </div>

      {/* Size Selection Modal - Fixed for mobile */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 100 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 100 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              {/* Image Header */}
              <div className="relative h-56 md:h-64">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                
                {/* Close Button */}
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                >
                  <X size={20} className="text-gray-800" />
                </motion.button>

                {/* Badges on image */}
                <div className="absolute top-4 left-4 flex gap-2">
                  {selectedItem.isPopular && (
                    <span className="bg-[#F5A623] text-white text-xs px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                      <Star size={12} className="fill-white" />
                      Populær
                    </span>
                  )}
                  {selectedItem.isSpicy && (
                    <span className="bg-[#D4382C] text-white text-xs px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                      <Flame size={12} />
                      Stærk
                    </span>
                  )}
                  {selectedItem.isVegan && (
                    <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                      <Leaf size={12} />
                      Vegansk
                    </span>
                  )}
                </div>

                {/* Title on image */}
                <div className="absolute bottom-4 left-6 right-6">
                  <h3 className="text-3xl font-bold text-white mb-1 drop-shadow-lg">
                    {selectedItem.name}
                  </h3>
                  <p className="text-white/90 text-sm drop-shadow">{selectedItem.description}</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Size Selection */}
                <div className="mb-6">
                  <h4 className="font-bold text-secondary mb-4 text-lg flex items-center gap-2">
                    <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary text-sm">1</span>
                    Vælg Størrelse
                  </h4>
                  <div className="grid grid-cols-3 gap-3">
                    {(['Small', 'Medium', 'Large'] as const).map((size) => {
                      const multiplier = size === 'Large' ? 1.3 : size === 'Medium' ? 1.15 : 1;
                      const price = Math.round(selectedItem.price * multiplier);
                      const diameter = size === 'Small' ? '25 cm' : size === 'Medium' ? '30 cm' : '35 cm';
                      
                      return (
                        <motion.button
                          key={size}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => setSelectedSize(size)}
                          className={`p-4 rounded-2xl border-2 transition-all relative overflow-hidden ${
                            selectedSize === size
                              ? 'border-primary bg-gradient-to-br from-primary/10 to-accent/10 shadow-lg'
                              : 'border-gray-200 hover:border-primary/50 hover:bg-gray-50'
                          }`}
                        >
                          {selectedSize === size && (
                            <motion.div
                              layoutId="selected-size"
                              className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5"
                            />
                          )}
                          <div className="text-center relative z-10">
                            <div className="text-2xl mb-1">{size === 'Small' ? '🍕' : size === 'Medium' ? '🍕' : '🍕'}</div>
                            <div className={`font-bold ${selectedSize === size ? 'text-primary' : 'text-secondary'}`}>
                              {size === 'Small' ? 'Lille' : size === 'Medium' ? 'Medium' : 'Stor'}
                            </div>
                            <div className="text-xs text-gray-500 mb-2">{diameter}</div>
                            <div className={`text-lg font-bold ${selectedSize === size ? 'text-primary' : 'text-secondary'}`}>
                              {price} kr
                            </div>
                          </div>
                          {selectedSize === size && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute -top-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center"
                            >
                              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            </motion.div>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Price Summary */}
                <div className="bg-cream rounded-2xl p-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Pris for {selectedSize === 'Small' ? 'lille' : selectedSize === 'Medium' ? 'medium' : 'stor'}:</span>
                    <span className="text-2xl font-bold text-primary">
                      {Math.round(selectedItem.price * (selectedSize === 'Large' ? 1.3 : selectedSize === 'Medium' ? 1.15 : 1))} kr
                    </span>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    addToCart({
                      id: selectedItem.id,
                      name: selectedItem.name,
                      description: selectedItem.description,
                      price: selectedItem.price,
                      image: selectedItem.image,
                      size: selectedSize,
                    });
                    setToastMessage(`${selectedItem.name} (${selectedSize === 'Small' ? 'Lille' : selectedSize === 'Medium' ? 'Medium' : 'Stor'}) tilføjet til kurv!`);
                    setShowToast(true);
                    setSelectedItem(null);
                    setSelectedSize('Medium');
                  }}
                  className="w-full bg-gradient-to-r from-primary to-accent text-white py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-3 group"
                >
                  <ShoppingCart size={22} className="group-hover:scale-110 transition-transform" />
                  Tilføj til Kurv
                  <motion.span
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    className="text-xl"
                  >
                    →
                  </motion.span>
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
    </>
  );
};

export default Menu;
