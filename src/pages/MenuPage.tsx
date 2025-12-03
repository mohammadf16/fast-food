import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Leaf, Star, ShoppingCart, X, Search, Filter, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Toast from '../components/Toast';

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
  isNew?: boolean;
  ingredients?: string[];
}

const menuItems: MenuItem[] = [
  // Klassiske
  {
    id: 1,
    name: 'Margherita',
    description: 'Tomatsauce, mozzarella, frisk basilikum',
    price: 79,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80',
    category: 'Klassiske',
    isPopular: true,
    ingredients: ['Tomatsauce', 'Mozzarella', 'Basilikum', 'Olivenolie'],
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
    ingredients: ['Tomatsauce', 'Mozzarella', 'Pepperoni'],
  },
  {
    id: 3,
    name: 'Hawaii',
    description: 'Tomatsauce, mozzarella, skinke, ananas',
    price: 89,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80',
    category: 'Klassiske',
    ingredients: ['Tomatsauce', 'Mozzarella', 'Skinke', 'Ananas'],
  },
  // Specialiteter
  {
    id: 4,
    name: 'Quattro Formaggi',
    description: 'Mozzarella, gorgonzola, parmesan, ricotta',
    price: 99,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=80',
    category: 'Specialiteter',
    ingredients: ['Mozzarella', 'Gorgonzola', 'Parmesan', 'Ricotta'],
  },
  {
    id: 5,
    name: 'Prosciutto e Funghi',
    description: 'Tomatsauce, mozzarella, parmaskinke, champignon',
    price: 109,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80',
    category: 'Specialiteter',
    ingredients: ['Tomatsauce', 'Mozzarella', 'Parmaskinke', 'Champignon'],
  },
  {
    id: 6,
    name: 'Diavola',
    description: 'Tomatsauce, mozzarella, spicy salami, chili, jalapeños',
    price: 99,
    image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&q=80',
    category: 'Specialiteter',
    isSpicy: true,
    ingredients: ['Tomatsauce', 'Mozzarella', 'Spicy Salami', 'Chili', 'Jalapeños'],
  },
  {
    id: 7,
    name: 'Calzone',
    description: 'Foldet pizza med skinke, ost og champignon',
    price: 109,
    image: 'https://images.unsplash.com/photo-1536964549204-cce9eab227bd?w=400&q=80',
    category: 'Specialiteter',
    isPopular: true,
    ingredients: ['Tomatsauce', 'Mozzarella', 'Skinke', 'Champignon'],
  },
  {
    id: 8,
    name: 'Capricciosa',
    description: 'Tomatsauce, mozzarella, skinke, champignon, artiskok, oliven',
    price: 109,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80',
    category: 'Specialiteter',
    ingredients: ['Tomatsauce', 'Mozzarella', 'Skinke', 'Champignon', 'Artiskok', 'Oliven'],
  },
  // Premium
  {
    id: 9,
    name: 'Tartufo',
    description: 'Creme fraiche, mozzarella, trøffelolie, parmesan, rucola',
    price: 139,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=80',
    category: 'Premium',
    isNew: true,
    ingredients: ['Creme Fraiche', 'Mozzarella', 'Trøffelolie', 'Parmesan', 'Rucola'],
  },
  {
    id: 10,
    name: 'Frutti di Mare',
    description: 'Tomatsauce, mozzarella, rejer, muslinger, blæksprutte, hvidløg',
    price: 149,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80',
    category: 'Premium',
    ingredients: ['Tomatsauce', 'Mozzarella', 'Rejer', 'Muslinger', 'Blæksprutte', 'Hvidløg'],
  },
  {
    id: 11,
    name: 'Parma',
    description: 'Tomatsauce, mozzarella, parmaskinke, rucola, parmesan',
    price: 129,
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&q=80',
    category: 'Premium',
    isPopular: true,
    ingredients: ['Tomatsauce', 'Mozzarella', 'Parmaskinke', 'Rucola', 'Parmesan'],
  },
  // Vegansk
  {
    id: 12,
    name: 'Vegetariana',
    description: 'Tomatsauce, mozzarella, peberfrugt, løg, champignon, oliven',
    price: 89,
    image: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=400&q=80',
    category: 'Vegansk',
    isVegan: true,
    ingredients: ['Tomatsauce', 'Mozzarella', 'Peberfrugt', 'Løg', 'Champignon', 'Oliven'],
  },
  {
    id: 13,
    name: 'Vegansk Special',
    description: 'Tomatsauce, vegansk ost, grøntsager, basilikum',
    price: 99,
    image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=400&q=80',
    category: 'Vegansk',
    isVegan: true,
    ingredients: ['Tomatsauce', 'Vegansk Ost', 'Grøntsager', 'Basilikum'],
  },
  {
    id: 14,
    name: 'Garden Fresh',
    description: 'Pesto, vegansk ost, tomater, spinat, artiskok',
    price: 109,
    image: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=400&q=80',
    category: 'Vegansk',
    isVegan: true,
    isNew: true,
    ingredients: ['Pesto', 'Vegansk Ost', 'Tomater', 'Spinat', 'Artiskok'],
  },
  // Drikkevarer
  {
    id: 15,
    name: 'Coca-Cola',
    description: '33cl dåse',
    price: 25,
    image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400&q=80',
    category: 'Drikkevarer',
  },
  {
    id: 16,
    name: 'San Pellegrino',
    description: '50cl flaske mineralvand',
    price: 30,
    image: 'https://images.unsplash.com/photo-1560512823-829485b8bf24?w=400&q=80',
    category: 'Drikkevarer',
  },
  // Tilbehør
  {
    id: 17,
    name: 'Hvidløgsbrød',
    description: 'Sprødt brød med hvidløgssmør og urter',
    price: 35,
    image: 'https://images.unsplash.com/photo-1619535860434-ba1d8fa12536?w=400&q=80',
    category: 'Tilbehør',
    isPopular: true,
  },
  {
    id: 18,
    name: 'Tiramisu',
    description: 'Hjemmelavet italiensk dessert',
    price: 55,
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&q=80',
    category: 'Tilbehør',
  },
];

const categories = ['Alle', 'Klassiske', 'Specialiteter', 'Premium', 'Vegansk', 'Drikkevarer', 'Tilbehør'];

const MenuPage = () => {
  const [activeCategory, setActiveCategory] = useState('Alle');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [selectedSize, setSelectedSize] = useState<'Small' | 'Medium' | 'Large'>('Medium');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({ spicy: false, vegan: false, popular: false });
  const [showToast, setShowToast] = useState(false);
  const { addToCart } = useCart();

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = activeCategory === 'Alle' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilters = (!filters.spicy || item.isSpicy) &&
                          (!filters.vegan || item.isVegan) &&
                          (!filters.popular || item.isPopular);
    return matchesCategory && matchesSearch && matchesFilters;
  });

  const handleAddToCart = () => {
    if (!selectedItem) return;
    
    const multiplier = selectedSize === 'Large' ? 1.3 : selectedSize === 'Medium' ? 1.15 : 1;
    
    addToCart({
      id: selectedItem.id,
      name: selectedItem.name,
      description: selectedItem.description,
      price: Math.round(selectedItem.price * multiplier),
      image: selectedItem.image,
      size: selectedSize,
    });
    
    setShowToast(true);
    setSelectedItem(null);
    setSelectedSize('Medium');
  };

  return (
    <div className="min-h-screen bg-cream pt-24 pb-12">
      <Toast 
        message="Tilføjet til kurven! 🍕"
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-4">
            Vores <span className="text-primary">Menu</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Udforsk vores udvalg af autentiske italienske pizzaer og lækkerier
          </p>
        </motion.div>

        {/* Search and Filter Bar */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Søg efter pizza eller ingrediens..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none bg-white"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowFilters(!showFilters)}
            className={`px-6 py-3 rounded-xl flex items-center gap-2 ${
              showFilters ? 'bg-primary text-white' : 'bg-white text-gray-700 border-2 border-gray-200'
            }`}
          >
            <Filter size={20} />
            Filtre
            <ChevronDown size={16} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </motion.button>
        </div>

        {/* Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8 overflow-hidden"
            >
              <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-wrap gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.spicy}
                    onChange={(e) => setFilters({ ...filters, spicy: e.target.checked })}
                    className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <Flame size={18} className="text-primary" />
                  <span>Stærk</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.vegan}
                    onChange={(e) => setFilters({ ...filters, vegan: e.target.checked })}
                    className="w-5 h-5 rounded border-gray-300 text-green-500 focus:ring-green-500"
                  />
                  <Leaf size={18} className="text-green-500" />
                  <span>Vegansk</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.popular}
                    onChange={(e) => setFilters({ ...filters, popular: e.target.checked })}
                    className="w-5 h-5 rounded border-gray-300 text-accent focus:ring-accent"
                  />
                  <Star size={18} className="text-accent fill-accent" />
                  <span>Populær</span>
                </label>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Category Tabs */}
        <div className="mb-8 overflow-x-auto pb-2">
          <div className="flex gap-2 min-w-max">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2.5 rounded-full font-medium transition-all whitespace-nowrap ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <p className="text-gray-500 mb-6">
          Viser {filteredItems.length} {filteredItems.length === 1 ? 'resultat' : 'resultater'}
        </p>

        {/* Menu Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                    {item.isNew && (
                      <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                        Ny
                      </span>
                    )}
                    {item.isPopular && (
                      <span className="bg-accent text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                        <Star size={10} className="fill-white" /> Populær
                      </span>
                    )}
                    {item.isSpicy && (
                      <span className="bg-primary text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                        <Flame size={10} /> Stærk
                      </span>
                    )}
                    {item.isVegan && (
                      <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                        <Leaf size={10} /> Vegansk
                      </span>
                    )}
                  </div>

                  {/* Price */}
                  <div className="absolute bottom-3 right-3">
                    <span className="bg-white text-primary font-bold px-3 py-1.5 rounded-full shadow-lg">
                      {item.price} kr
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-bold text-secondary mb-1">{item.name}</h3>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">{item.description}</p>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedItem(item)}
                    className="w-full bg-secondary text-white py-2.5 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-primary transition-colors"
                  >
                    <ShoppingCart size={18} />
                    Tilføj
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Ingen resultater fundet</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('Alle');
                setFilters({ spicy: false, vegan: false, popular: false });
              }}
              className="mt-4 text-primary font-semibold hover:underline"
            >
              Nulstil filtre
            </button>
          </div>
        )}
      </div>

      {/* Item Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              <div className="relative h-56">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white"
                >
                  <X size={20} />
                </button>

                <div className="absolute bottom-4 left-6 right-6">
                  <h3 className="text-2xl font-bold text-white">{selectedItem.name}</h3>
                  <p className="text-white/80 text-sm">{selectedItem.description}</p>
                </div>
              </div>

              <div className="p-6">
                {/* Ingredients */}
                {selectedItem.ingredients && (
                  <div className="mb-6">
                    <h4 className="font-semibold text-secondary mb-2">Ingredienser:</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedItem.ingredients.map((ing) => (
                        <span
                          key={ing}
                          className="bg-cream text-gray-700 px-3 py-1 rounded-full text-sm"
                        >
                          {ing}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Size Selection (only for food items) */}
                {!['Drikkevarer', 'Tilbehør'].includes(selectedItem.category) && (
                  <div className="mb-6">
                    <h4 className="font-semibold text-secondary mb-3">Vælg størrelse:</h4>
                    <div className="grid grid-cols-3 gap-3">
                      {(['Small', 'Medium', 'Large'] as const).map((size) => {
                        const multiplier = size === 'Large' ? 1.3 : size === 'Medium' ? 1.15 : 1;
                        const price = Math.round(selectedItem.price * multiplier);
                        
                        return (
                          <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`p-3 rounded-xl border-2 transition-all ${
                              selectedSize === size
                                ? 'border-primary bg-primary/5'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div className="text-center">
                              <div className="font-bold text-secondary">
                                {size === 'Small' ? 'Lille' : size === 'Medium' ? 'Medium' : 'Stor'}
                              </div>
                              <div className="text-sm text-gray-500">
                                {size === 'Small' ? '25 cm' : size === 'Medium' ? '30 cm' : '35 cm'}
                              </div>
                              <div className="text-primary font-semibold mt-1">{price} kr</div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  className="w-full bg-gradient-to-r from-primary to-accent text-white py-4 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={20} />
                  Tilføj til Kurv
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MenuPage;
