import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ChefHat, ShoppingCart, RotateCcw } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Toast from './Toast';

const INGREDIENTS = {
  sauces: [
    { id: 'tomato', name: 'Tomatsauce', price: 0, image: '🍅' },
    { id: 'bbq', name: 'BBQ Sauce', price: 5, image: '🍖' },
    { id: 'creme', name: 'Creme Fraiche', price: 5, image: '🥛' },
  ],
  cheeses: [
    { id: 'mozzarella', name: 'Mozzarella', price: 0, image: '🧀' },
    { id: 'cheddar', name: 'Cheddar', price: 10, image: '🧀' },
    { id: 'gorgonzola', name: 'Gorgonzola', price: 12, image: '🧀' },
    { id: 'vegan', name: 'Vegansk Ost', price: 15, image: '🌱' },
  ],
  meats: [
    { id: 'pepperoni', name: 'Pepperoni', price: 15, image: '🥓' },
    { id: 'ham', name: 'Skinke', price: 15, image: '🍖' },
    { id: 'chicken', name: 'Kylling', price: 15, image: '🍗' },
    { id: 'bacon', name: 'Bacon', price: 15, image: '🥓' },
    { id: 'beef', name: 'Oksekød', price: 18, image: '🥩' },
  ],
  veggies: [
    { id: 'mushrooms', name: 'Champignon', price: 8, image: '🍄' },
    { id: 'onions', name: 'Løg', price: 5, image: '🧅' },
    { id: 'peppers', name: 'Peberfrugt', price: 8, image: '🫑' },
    { id: 'olives', name: 'Oliven', price: 8, image: '🫒' },
    { id: 'pineapple', name: 'Ananas', price: 8, image: '🍍' },
    { id: 'corn', name: 'Majs', price: 5, image: '🌽' },
    { id: 'jalapenos', name: 'Jalapeños', price: 8, image: '🌶️' },
  ],
};

const BASE_PRICE = 69;

const PizzaBuilder = () => {
  const [selectedSauce, setSelectedSauce] = useState('tomato');
  const [selectedCheese, setSelectedCheese] = useState('mozzarella');
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const [showToast, setShowToast] = useState(false);
  const { addToCart } = useCart();

  const toggleTopping = (id: string) => {
    setSelectedToppings(prev => 
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  const calculateTotal = () => {
    let total = BASE_PRICE;
    const sauce = INGREDIENTS.sauces.find(s => s.id === selectedSauce);
    const cheese = INGREDIENTS.cheeses.find(c => c.id === selectedCheese);
    total += sauce?.price || 0;
    total += cheese?.price || 0;

    selectedToppings.forEach(tId => {
      const meat = INGREDIENTS.meats.find(m => m.id === tId);
      const veggie = INGREDIENTS.veggies.find(v => v.id === tId);
      if (meat) total += meat.price;
      if (veggie) total += veggie.price;
    });

    return total;
  };

  const handleAddToCart = () => {
    const sauce = INGREDIENTS.sauces.find(s => s.id === selectedSauce);
    const cheese = INGREDIENTS.cheeses.find(c => c.id === selectedCheese);
    
    const description = [
      sauce?.name,
      cheese?.name,
      ...selectedToppings.map(id => {
        const meat = INGREDIENTS.meats.find(m => m.id === id);
        const veggie = INGREDIENTS.veggies.find(v => v.id === id);
        return meat?.name || veggie?.name;
      })
    ].join(', ');

    addToCart({
      id: Date.now(), // Unique ID
      name: 'Min Egen Pizza',
      description: description,
      price: calculateTotal(),
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=80',
      size: 'Medium',
    });

    setShowToast(true);
    // Reset builder
    setSelectedToppings([]);
    setSelectedSauce('tomato');
    setSelectedCheese('mozzarella');
  };

  return (
    <section className="py-20 bg-cream">
      <Toast 
        message="Din unikke pizza er tilføjet til kurven!"
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
      
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <ChefHat className="text-primary" size={32} />
          </div>
          <h2 className="text-4xl font-bold text-secondary mb-4">Design Din Egen Pizza</h2>
          <p className="text-gray-600">Slip din indre kok løs! Vælg præcis de ingredienser du elsker.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Ingredients Selection */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Sauce */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="font-bold text-lg text-secondary mb-4 flex items-center gap-2">
                1. Vælg Sauce
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {INGREDIENTS.sauces.map(sauce => (
                  <button
                    key={sauce.id}
                    onClick={() => setSelectedSauce(sauce.id)}
                    className={`p-3 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                      selectedSauce === sauce.id
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-100 hover:border-gray-200'
                    }`}
                  >
                    <span className="text-2xl">{sauce.image}</span>
                    <span className="text-sm font-medium">{sauce.name}</span>
                    {sauce.price > 0 && <span className="text-xs text-primary">+{sauce.price} kr</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Cheese */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="font-bold text-lg text-secondary mb-4 flex items-center gap-2">
                2. Vælg Ost
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {INGREDIENTS.cheeses.map(cheese => (
                  <button
                    key={cheese.id}
                    onClick={() => setSelectedCheese(cheese.id)}
                    className={`p-3 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                      selectedCheese === cheese.id
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-100 hover:border-gray-200'
                    }`}
                  >
                    <span className="text-2xl">{cheese.image}</span>
                    <span className="text-sm font-medium">{cheese.name}</span>
                    {cheese.price > 0 && <span className="text-xs text-primary">+{cheese.price} kr</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Toppings */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="font-bold text-lg text-secondary mb-4 flex items-center gap-2">
                3. Vælg Toppings
              </h3>
              
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">Kød</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {INGREDIENTS.meats.map(item => (
                    <button
                      key={item.id}
                      onClick={() => toggleTopping(item.id)}
                      className={`p-3 rounded-xl border-2 transition-all flex flex-col items-center gap-2 relative ${
                        selectedToppings.includes(item.id)
                          ? 'border-primary bg-primary/5'
                          : 'border-gray-100 hover:border-gray-200'
                      }`}
                    >
                      {selectedToppings.includes(item.id) && (
                        <div className="absolute top-2 right-2 text-primary">
                          <Check size={14} />
                        </div>
                      )}
                      <span className="text-2xl">{item.image}</span>
                      <span className="text-sm font-medium">{item.name}</span>
                      <span className="text-xs text-primary">+{item.price} kr</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">Grøntsager</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {INGREDIENTS.veggies.map(item => (
                    <button
                      key={item.id}
                      onClick={() => toggleTopping(item.id)}
                      className={`p-3 rounded-xl border-2 transition-all flex flex-col items-center gap-2 relative ${
                        selectedToppings.includes(item.id)
                          ? 'border-primary bg-primary/5'
                          : 'border-gray-100 hover:border-gray-200'
                      }`}
                    >
                      {selectedToppings.includes(item.id) && (
                        <div className="absolute top-2 right-2 text-primary">
                          <Check size={14} />
                        </div>
                      )}
                      <span className="text-2xl">{item.image}</span>
                      <span className="text-sm font-medium">{item.name}</span>
                      <span className="text-xs text-primary">+{item.price} kr</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Summary Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-xl sticky top-24">
              <h3 className="font-bold text-xl text-secondary mb-6 text-center">Din Kreation</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Basis Pizza (Medium)</span>
                  <span className="font-medium">{BASE_PRICE} kr</span>
                </div>
                
                {INGREDIENTS.sauces.find(s => s.id === selectedSauce)?.price! > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{INGREDIENTS.sauces.find(s => s.id === selectedSauce)?.name}</span>
                    <span className="font-medium">+{INGREDIENTS.sauces.find(s => s.id === selectedSauce)?.price} kr</span>
                  </div>
                )}

                {INGREDIENTS.cheeses.find(c => c.id === selectedCheese)?.price! > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{INGREDIENTS.cheeses.find(c => c.id === selectedCheese)?.name}</span>
                    <span className="font-medium">+{INGREDIENTS.cheeses.find(c => c.id === selectedCheese)?.price} kr</span>
                  </div>
                )}

                {selectedToppings.map(id => {
                  const item = [...INGREDIENTS.meats, ...INGREDIENTS.veggies].find(i => i.id === id);
                  return (
                    <div key={id} className="flex justify-between text-sm">
                      <span className="text-gray-600">{item?.name}</span>
                      <span className="font-medium">+{item?.price} kr</span>
                    </div>
                  );
                })}
                
                <div className="border-t pt-4 flex justify-between items-end">
                  <span className="font-bold text-lg text-secondary">Total</span>
                  <span className="font-bold text-3xl text-primary">{calculateTotal()} kr</span>
                </div>
              </div>

              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  className="w-full bg-gradient-to-r from-primary to-accent text-white py-4 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={20} />
                  Læg i Kurv
                </motion.button>
                
                <button 
                  onClick={() => {
                    setSelectedToppings([]);
                    setSelectedSauce('tomato');
                    setSelectedCheese('mozzarella');
                  }}
                  className="w-full py-2 text-gray-500 hover:text-gray-800 text-sm flex items-center justify-center gap-1"
                >
                  <RotateCcw size={14} />
                  Nulstil Valg
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PizzaBuilder;
