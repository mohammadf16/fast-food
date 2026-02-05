import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChefHat, ShoppingCart, RotateCcw, Sparkles, Info, Flame, Bookmark, Save } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import Toast from '../components/Toast';
import ChefLoader from '../components/ChefLoader';

// Types for dynamic ingredients from localStorage
interface IngredientItem {
  id: string;
  name: string;
  price: number;
  image?: string;
  description?: string;
  color?: string;
  active?: boolean;
}

interface AdminIngredientItem {
  id: string;
  name: string;
  price: number;
  description?: string;
  image?: string;
  color?: string;
  isActive: boolean;
}

interface PizzaTemplate {
  id: number;
  name: string;
  description: string;
  basePrice: number;
  selectedBase: string;
  selectedSauce: string;
  selectedCheeses: string[];
  selectedMeats: string[];
  selectedVeggies: string[];
  selectedExtras: string[];
  totalPrice: number;
  createdAt: string;
}

// Default ingredients (fallback if localStorage is empty)
const DEFAULT_INGREDIENTS = {
  bases: [
    { id: 'classic', name: 'Klassisk', price: 0, description: 'Traditionel italiensk dej' },
    { id: 'thin', name: 'Tynd & Sprød', price: 0, description: 'Ekstra tynd og sprød bund' },
    { id: 'stuffed', name: 'Fyldt Kant', price: 15, description: 'Med ost i kanten' },
    { id: 'glutenfree', name: 'Glutenfri', price: 20, description: 'For glutenintolerante' },
  ],
  sauces: [
    { id: 'tomato', name: 'Tomatsauce', price: 0, image: '🍅', color: 'bg-red-500' },
    { id: 'bbq', name: 'BBQ Sauce', price: 5, image: '🍖', color: 'bg-amber-700' },
    { id: 'creme', name: 'Creme Fraiche', price: 5, image: '🥛', color: 'bg-amber-100' },
    { id: 'pesto', name: 'Pesto', price: 8, image: '🌿', color: 'bg-green-500' },
  ],
  cheeses: [
    { id: 'mozzarella', name: 'Mozzarella', price: 0, image: '🧀' },
    { id: 'cheddar', name: 'Cheddar', price: 10, image: '🧀' },
    { id: 'gorgonzola', name: 'Gorgonzola', price: 12, image: '🧀' },
    { id: 'parmesan', name: 'Parmesan', price: 12, image: '🧀' },
    { id: 'vegan', name: 'Vegansk Ost', price: 15, image: '🌱' },
  ],
  meats: [
    { id: 'pepperoni', name: 'Pepperoni', price: 15, image: '🔴' },
    { id: 'ham', name: 'Skinke', price: 15, image: '🍖' },
    { id: 'chicken', name: 'Kylling', price: 18, image: '🍗' },
    { id: 'bacon', name: 'Bacon', price: 15, image: '🥓' },
    { id: 'beef', name: 'Oksekød', price: 20, image: '🥩' },
    { id: 'salami', name: 'Salami', price: 15, image: '🔴' },
  ],
  veggies: [
    { id: 'mushrooms', name: 'Champignon', price: 8, image: '🍄' },
    { id: 'onions', name: 'Løg', price: 5, image: '🧅' },
    { id: 'peppers', name: 'Peberfrugt', price: 8, image: '🫑' },
    { id: 'olives', name: 'Oliven', price: 8, image: '🫒' },
    { id: 'tomatoes', name: 'Tomater', price: 8, image: '🍅' },
    { id: 'spinach', name: 'Spinat', price: 8, image: '🥬' },
    { id: 'corn', name: 'Majs', price: 5, image: '🌽' },
    { id: 'jalapenos', name: 'Jalapeños', price: 8, image: '🌶️' },
    { id: 'pineapple', name: 'Ananas', price: 8, image: '🍍' },
    { id: 'artichoke', name: 'Artiskok', price: 10, image: '🌿' },
  ],
  extras: [
    { id: 'garlic', name: 'Hvidløg', price: 5, image: '🧄' },
    { id: 'herbs', name: 'Friske Urter', price: 5, image: '🌿' },
    { id: 'chili', name: 'Chili Flager', price: 0, image: '🌶️' },
    { id: 'truffle', name: 'Trøffelolie', price: 15, image: '✨' },
  ],
};


const PizzaBuilderPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [ingredients, setIngredients] = useState(DEFAULT_INGREDIENTS);
  const [basePrice, setBasePrice] = useState(69);
  const [selectedBase, setSelectedBase] = useState('classic');
  const [selectedSauce, setSelectedSauce] = useState('tomato');
  const [selectedCheeses, setSelectedCheeses] = useState<string[]>(['mozzarella']);
  const [selectedMeats, setSelectedMeats] = useState<string[]>([]);
  const [selectedVeggies, setSelectedVeggies] = useState<string[]>([]);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [pizzaName, setPizzaName] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [templateName, setTemplateName] = useState('');
  const [saveError, setSaveError] = useState('');
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Load template from ProfilePage if present
  useEffect(() => {
    const template = location.state?.template as PizzaTemplate | undefined;
    if (template) {
      setSelectedBase(template.selectedBase);
      setSelectedSauce(template.selectedSauce);
      setSelectedCheeses(template.selectedCheeses);
      setSelectedMeats(template.selectedMeats);
      setSelectedVeggies(template.selectedVeggies);
      setSelectedExtras(template.selectedExtras);
      setPizzaName(template.name);
      // Clear the location state to prevent reloading on refresh
      navigate(location.pathname, { replace: true });
    }
  }, [location.state, navigate, location.pathname]);

  // Load ingredients and base price from localStorage
  useEffect(() => {
    const loadIngredients = () => {
      try {
        const savedIngredients = localStorage.getItem('pizzaIngredients');
        const savedBasePrice = localStorage.getItem('pizzaBasePrice');
        
        if (savedBasePrice) {
          setBasePrice(parseInt(savedBasePrice, 10));
        }
        
        if (savedIngredients) {
          const parsed = JSON.parse(savedIngredients) as Record<string, AdminIngredientItem[]>;
          const loadedIngredients: Record<string, IngredientItem[]> = {};

          Object.keys(parsed).forEach((key) => {
            loadedIngredients[key] = (parsed[key] || [])
              .filter((item) => item.isActive)
              .map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                description: item.description,
                image: item.image,
                color: item.color,
              }));
          });

          setIngredients(prev => ({
            ...prev,
            ...loadedIngredients,
          }));
        }
      } catch (error) {
        console.error('Error loading ingredients from localStorage:', error);
      }
    };

    loadIngredients();
    const onIngredientsUpdated = () => loadIngredients();
    window.addEventListener('pizzaIngredientsUpdated', onIngredientsUpdated);
    return () => window.removeEventListener('pizzaIngredientsUpdated', onIngredientsUpdated);
  }, []);

  const toggleItem = (id: string, _list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>) => {
    setList(prev => prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]);
  };

  const calculateTotal = () => {
    let total = basePrice;
    
    const base = ingredients.bases.find((b: IngredientItem) => b.id === selectedBase);
    total += base?.price || 0;

    const sauce = ingredients.sauces.find((s: IngredientItem) => s.id === selectedSauce);
    total += sauce?.price || 0;

    selectedCheeses.forEach(id => {
      const cheese = ingredients.cheeses.find((c: IngredientItem) => c.id === id);
      total += cheese?.price || 0;
    });

    selectedMeats.forEach(id => {
      const meat = ingredients.meats.find((m: IngredientItem) => m.id === id);
      total += meat?.price || 0;
    });

    selectedVeggies.forEach(id => {
      const veggie = ingredients.veggies.find((v: IngredientItem) => v.id === id);
      total += veggie?.price || 0;
    });

    selectedExtras.forEach(id => {
      const extra = ingredients.extras.find((e: IngredientItem) => e.id === id);
      total += extra?.price || 0;
    });

    return total;
  };

  const getDescription = () => {
    const parts = [];
    const sauce = ingredients.sauces.find(s => s.id === selectedSauce);
    if (sauce) parts.push(sauce.name);
    
    selectedCheeses.forEach(id => {
      const item = ingredients.cheeses.find(c => c.id === id);
      if (item) parts.push(item.name);
    });
    
    selectedMeats.forEach(id => {
      const item = ingredients.meats.find(m => m.id === id);
      if (item) parts.push(item.name);
    });
    
    selectedVeggies.forEach(id => {
      const item = ingredients.veggies.find(v => v.id === id);
      if (item) parts.push(item.name);
    });
    
    return parts.join(', ');
  };

  const handleAddToCart = () => {
    addToCart({
      id: Date.now(),
      name: pizzaName || 'Min Egen Pizza',
      description: getDescription(),
      price: calculateTotal(),
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=80',
      size: 'Medium',
    });
    setToastMessage('Din unikke pizza er tilføjet til kurven! 🍕');
    setShowToast(true);
  };

  const handleSaveTemplate = () => {
    if (!user) {
      setSaveError('Du skal være logget ind for at gemme en pizza skabelon.');
      setShowSaveModal(true);
      return;
    }
    setSaveError('');
    setTemplateName(pizzaName || '');
    setShowSaveModal(true);
  };

  const confirmSaveTemplate = () => {
    if (!user) {
      setSaveError('Du skal være logget ind for at gemme en skabelon.');
      return;
    }

    if (!templateName.trim()) {
      setSaveError('Indtast venligst et navn til din pizza skabelon.');
      return;
    }

    const template: PizzaTemplate = {
      id: Date.now(),
      name: templateName.trim(),
      description: getDescription(),
      basePrice: basePrice,
      selectedBase,
      selectedSauce,
      selectedCheeses,
      selectedMeats,
      selectedVeggies,
      selectedExtras,
      totalPrice: calculateTotal(),
      createdAt: new Date().toISOString(),
    };

    const savedTemplates = localStorage.getItem(`pizzaTemplates_${user.id}`);
    const templates: PizzaTemplate[] = savedTemplates ? JSON.parse(savedTemplates) : [];
    templates.push(template);
    localStorage.setItem(`pizzaTemplates_${user.id}`, JSON.stringify(templates));

    setToastMessage('Pizza skabelon gemt! 🎉');
    setShowToast(true);
    setShowSaveModal(false);
    setTemplateName('');
  };

  const resetBuilder = () => {
    setSelectedBase('classic');
    setSelectedSauce('tomato');
    setSelectedCheeses(['mozzarella']);
    setSelectedMeats([]);
    setSelectedVeggies([]);
    setSelectedExtras([]);
    setPizzaName('');
    setCurrentStep(1);
  };

  const steps = [
    { num: 1, title: 'Bund', icon: '🍕' },
    { num: 2, title: 'Sauce', icon: '🍅' },
    { num: 3, title: 'Ost', icon: '🧀' },
    { num: 4, title: 'Kød', icon: '🥩' },
    { num: 5, title: 'Grønt', icon: '🥬' },
    { num: 6, title: 'Ekstra', icon: '✨' },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#07070c] via-[#0b0b12] to-[#0b0b12] flex items-center justify-center">
        <ChefLoader message="Forbereder pizzaværkstedet..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#07070c] via-[#0b0b12] to-[#0b0b12] pt-24 pb-12">
      <Toast 
        message={toastMessage}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div 
            className="inline-flex items-center gap-2 bg-white/10 text-primary px-4 py-2 rounded-full mb-4"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles size={18} />
            <span className="font-semibold">Pizzaværksted</span>
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Design Din Drømme<span className="text-primary">pizza</span>
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Slip kreativiteten løs og byg den perfekte pizza med dine yndlingsingredienser
          </p>
        </motion.div>

        {/* Progress Steps */}
        <div className="mb-12 overflow-x-auto pb-4">
          <div className="flex justify-center gap-2 min-w-max px-4">
            {steps.map((step) => (
              <motion.button
                key={step.num}
                onClick={() => setCurrentStep(step.num)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all ${
                  currentStep === step.num
                    ? 'bg-primary text-white shadow-lg'
                    : currentStep > step.num
                    ? 'bg-primary/20 text-primary'
                    : 'bg-white/90 text-gray-700 hover:bg-white'
                }`}
              >
                <span className="text-xl">{step.icon}</span>
                <span className="font-medium hidden sm:inline">{step.title}</span>
                {currentStep > step.num && <Check size={16} className="text-primary" />}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Builder Area */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {/* Step 1: Base */}
              {currentStep === 1 && (
                <motion.div
                  key="base"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white/5 border border-white/10 backdrop-blur rounded-3xl p-6 shadow-lg"
                >
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-xl">🍕</span>
                    Vælg Din Pizzabund
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {ingredients.bases.map((base) => (
                      <motion.button
                        key={base.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedBase(base.id)}
                        className={`p-5 rounded-2xl border-2 text-left transition-all ${
                          selectedBase === base.id
                            ? 'border-primary bg-primary/5 shadow-md'
                            : 'border-gray-100 hover:border-gray-200'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-bold text-white">{base.name}</h4>
                            <p className="text-sm text-gray-300 mt-1">{base.description}</p>
                          </div>
                          {base.price > 0 && (
                            <span className="text-primary font-semibold">+{base.price} kr</span>
                          )}
                        </div>
                        {selectedBase === base.id && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center"
                          >
                            <Check size={14} className="text-white" />
                          </motion.div>
                        )}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 2: Sauce */}
              {currentStep === 2 && (
                <motion.div
                  key="sauce"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white/5 border border-white/10 backdrop-blur rounded-3xl p-6 shadow-lg"
                >
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-xl">🍅</span>
                    Vælg Sauce
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {ingredients.sauces.map((sauce) => (
                      <motion.button
                        key={sauce.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedSauce(sauce.id)}
                        className={`p-4 rounded-2xl border-2 transition-all relative ${
                          selectedSauce === sauce.id
                            ? 'border-primary bg-primary/5'
                            : 'border-gray-100 hover:border-gray-200'
                        }`}
                      >
                        <div className={`w-12 h-12 ${sauce.color} rounded-full mx-auto mb-3`} />
                        <h4 className="font-semibold text-white text-sm">{sauce.name}</h4>
                        {sauce.price > 0 && (
                          <span className="text-xs text-primary">+{sauce.price} kr</span>
                        )}
                        {selectedSauce === sauce.id && (
                          <div className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                            <Check size={12} className="text-white" />
                          </div>
                        )}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 3: Cheese */}
              {currentStep === 3 && (
                <motion.div
                  key="cheese"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white/5 border border-white/10 backdrop-blur rounded-3xl p-6 shadow-lg"
                >
                  <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-3">
                    <span className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-xl">🧀</span>
                    Vælg Ost
                  </h3>
                  <p className="text-gray-300 text-sm mb-6 flex items-center gap-2">
                    <Info size={14} />
                    Du kan vælge flere oste
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {ingredients.cheeses.map((cheese) => (
                      <motion.button
                        key={cheese.id}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => toggleItem(cheese.id, selectedCheeses, setSelectedCheeses)}
                        className={`p-4 rounded-2xl border-2 transition-all relative ${
                          selectedCheeses.includes(cheese.id)
                            ? 'border-primary bg-primary/5'
                            : 'border-gray-100 hover:border-gray-200'
                        }`}
                      >
                        <span className="text-3xl block mb-2">{cheese.image}</span>
                        <h4 className="font-semibold text-white text-sm">{cheese.name}</h4>
                        {cheese.price > 0 && (
                          <span className="text-xs text-primary">+{cheese.price} kr</span>
                        )}
                        {selectedCheeses.includes(cheese.id) && (
                          <div className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                            <Check size={12} className="text-white" />
                          </div>
                        )}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 4: Meats */}
              {currentStep === 4 && (
                <motion.div
                  key="meats"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white/5 border border-white/10 backdrop-blur rounded-3xl p-6 shadow-lg"
                >
                  <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-3">
                    <span className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-xl">🥩</span>
                    Vælg Kød (Valgfrit)
                  </h3>
                  <p className="text-gray-300 text-sm mb-6 flex items-center gap-2">
                    <Info size={14} />
                    Spring over hvis du ønsker vegetar
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {ingredients.meats.map((meat) => (
                      <motion.button
                        key={meat.id}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => toggleItem(meat.id, selectedMeats, setSelectedMeats)}
                        className={`p-4 rounded-2xl border-2 transition-all relative ${
                          selectedMeats.includes(meat.id)
                            ? 'border-primary bg-primary/5'
                            : 'border-gray-100 hover:border-gray-200'
                        }`}
                      >
                        <span className="text-3xl block mb-2">{meat.image}</span>
                        <h4 className="font-semibold text-white text-sm">{meat.name}</h4>
                        <span className="text-xs text-primary">+{meat.price} kr</span>
                        {selectedMeats.includes(meat.id) && (
                          <div className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                            <Check size={12} className="text-white" />
                          </div>
                        )}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 5: Veggies */}
              {currentStep === 5 && (
                <motion.div
                  key="veggies"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white/5 border border-white/10 backdrop-blur rounded-3xl p-6 shadow-lg"
                >
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-xl">🥬</span>
                    Vælg Grøntsager
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {ingredients.veggies.map((veggie) => (
                      <motion.button
                        key={veggie.id}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => toggleItem(veggie.id, selectedVeggies, setSelectedVeggies)}
                        className={`p-3 rounded-xl border-2 transition-all relative ${
                          selectedVeggies.includes(veggie.id)
                            ? 'border-primary bg-primary/5'
                            : 'border-gray-100 hover:border-gray-200'
                        }`}
                      >
                        <span className="text-2xl block mb-1">{veggie.image}</span>
                        <h4 className="font-medium text-white text-xs">{veggie.name}</h4>
                        <span className="text-xs text-primary">+{veggie.price} kr</span>
                        {selectedVeggies.includes(veggie.id) && (
                          <div className="absolute top-1 right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                            <Check size={10} className="text-white" />
                          </div>
                        )}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 6: Extras */}
              {currentStep === 6 && (
                <motion.div
                  key="extras"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white/5 border border-white/10 backdrop-blur rounded-3xl p-6 shadow-lg"
                >
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-xl">✨</span>
                    Tilføj Ekstra
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {ingredients.extras.map((extra) => (
                      <motion.button
                        key={extra.id}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => toggleItem(extra.id, selectedExtras, setSelectedExtras)}
                        className={`p-4 rounded-2xl border-2 transition-all relative ${
                          selectedExtras.includes(extra.id)
                            ? 'border-primary bg-primary/5'
                            : 'border-gray-100 hover:border-gray-200'
                        }`}
                      >
                        <span className="text-3xl block mb-2">{extra.image}</span>
                        <h4 className="font-semibold text-white text-sm">{extra.name}</h4>
                        {extra.price > 0 ? (
                          <span className="text-xs text-primary">+{extra.price} kr</span>
                        ) : (
                          <span className="text-xs text-primary">Gratis</span>
                        )}
                        {selectedExtras.includes(extra.id) && (
                          <div className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                            <Check size={12} className="text-white" />
                          </div>
                        )}
                      </motion.button>
                    ))}
                  </div>

                  {/* Pizza Name */}
                  <div className="mt-8 p-4 bg-white/5 border border-white/10 rounded-2xl">
                    <label className="block font-semibold text-white mb-2">
                      Giv din pizza et navn (valgfrit)
                    </label>
                    <input
                      type="text"
                      value={pizzaName}
                      onChange={(e) => setPizzaName(e.target.value)}
                      placeholder="F.eks. 'Marcos Special'"
                      className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-gray-500 focus:border-primary focus:outline-none"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
                className={`px-6 py-3 rounded-xl font-semibold ${
                  currentStep === 1
                    ? 'bg-white/10 text-gray-500 cursor-not-allowed'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                ← Tilbage
              </motion.button>
              
              {currentStep < 6 ? (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90"
                >
                  Næste →
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  className="px-6 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-semibold shadow-lg flex items-center gap-2"
                >
                  <ShoppingCart size={20} />
                  Tilføj til Kurv
                </motion.button>
              )}
            </div>
          </div>

          {/* Live Preview & Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white/5 border border-white/10 backdrop-blur rounded-3xl p-6 shadow-xl sticky top-24">
              {/* Pizza Preview - Advanced */}
              <div className="relative mb-6">
                {/* Plate */}
                <div className="w-56 h-56 mx-auto rounded-full bg-gradient-to-br from-amber-50 to-amber-100 shadow-inner p-2">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-white to-amber-50 shadow-lg relative overflow-hidden">
                    {/* Pizza */}
                    <motion.div 
                      className="absolute inset-3 rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                    >
                      {/* Crust - Outer ring */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-300 via-amber-400 to-amber-500 shadow-xl">
                        {/* Crust texture */}
                        <div className="absolute inset-0 rounded-full overflow-hidden">
                          {[...Array(16)].map((_, i) => (
                            <div
                              key={i}
                              className="absolute w-3 h-3 bg-amber-600/30 rounded-full"
                              style={{
                                left: `${50 + 45 * Math.cos((i * 22.5 * Math.PI) / 180)}%`,
                                top: `${50 + 45 * Math.sin((i * 22.5 * Math.PI) / 180)}%`,
                                transform: 'translate(-50%, -50%)',
                              }}
                            />
                          ))}
                        </div>
                      </div>
                      
                      {/* Inner pizza area */}
                      <div className="absolute inset-3 rounded-full bg-gradient-to-br from-amber-200 to-amber-300">
                        {/* Sauce layer */}
                        <motion.div
                          className={`absolute inset-1 rounded-full ${
                            selectedSauce === 'tomato' ? 'bg-gradient-to-br from-red-400 to-red-600' :
                            selectedSauce === 'bbq' ? 'bg-gradient-to-br from-amber-700 to-amber-900' :
                            selectedSauce === 'creme' ? 'bg-gradient-to-br from-amber-50 to-amber-100' :
                            'bg-gradient-to-br from-green-400 to-green-600'
                          }`}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.5 }}
                        />
                        
                        {/* Cheese layer with melted effect */}
                        <AnimatePresence>
                          {selectedCheeses.length > 0 && (
                            <motion.div
                              className="absolute inset-2 rounded-full overflow-hidden"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                            >
                              {/* Base cheese */}
                              <div className="absolute inset-0 bg-gradient-to-br from-yellow-100 via-yellow-200 to-yellow-100" />
                              {/* Melted cheese spots */}
                              {[...Array(8)].map((_, i) => (
                                <motion.div
                                  key={i}
                                  className="absolute w-6 h-6 bg-yellow-50 rounded-full opacity-70"
                                  style={{
                                    left: `${20 + (i % 3) * 30}%`,
                                    top: `${20 + Math.floor(i / 3) * 30}%`,
                                  }}
                                  animate={{ scale: [1, 1.1, 1] }}
                                  transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
                                />
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Toppings with realistic placement */}
                        <div className="absolute inset-4">
                          {[...selectedMeats, ...selectedVeggies].map((id, index) => {
                            const item = [...ingredients.meats, ...ingredients.veggies].find(x => x.id === id);
                            const positions = [
                              { x: 30, y: 20 }, { x: 60, y: 25 }, { x: 45, y: 50 },
                              { x: 20, y: 55 }, { x: 70, y: 60 }, { x: 35, y: 75 },
                              { x: 55, y: 80 }, { x: 25, y: 35 }, { x: 65, y: 45 },
                            ];
                            const pos = positions[index % positions.length];
                            
                            return (
                              <motion.div
                                key={id}
                                className="absolute text-xl drop-shadow-md"
                                style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: 'translate(-50%, -50%)' }}
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ type: 'spring', stiffness: 300, delay: index * 0.1 }}
                              >
                                {item?.image}
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Steam effect */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-8 bg-gradient-to-t from-gray-300 to-transparent rounded-full opacity-40"
                      animate={{ y: [-5, -20], opacity: [0.4, 0], scaleY: [1, 1.5] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                    />
                  ))}
                </div>

                {/* Oven glow indicator */}
                <motion.div
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-orange-200/90 px-3 py-1 rounded-full"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Flame size={14} className="text-orange-500" />
                  <span className="text-xs text-orange-800 font-medium">I ovnen</span>
                </motion.div>

                {/* Chef hat icon */}
                <motion.div
                  className="absolute -top-2 -right-2 w-12 h-12 bg-white/90 rounded-full shadow-lg flex items-center justify-center border-2 border-primary/20"
                  animate={{ y: [0, -5, 0], rotate: [0, 5, 0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <ChefHat className="text-primary" size={24} />
                </motion.div>

                {/* Ingredient counter badge */}
                <motion.div
                  className="absolute -top-2 -left-2 w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full shadow-lg flex items-center justify-center text-white font-bold text-sm"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.5 }}
                  key={selectedMeats.length + selectedVeggies.length}
                >
                  {selectedMeats.length + selectedVeggies.length + selectedCheeses.length}
                </motion.div>
              </div>

              {/* Summary */}
              <h3 className="font-bold text-xl text-white mb-4 text-center">
                {pizzaName || 'Din Pizza'}
              </h3>

              <div className="space-y-3 mb-6 max-h-48 overflow-y-auto">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Basis</span>
                  <span className="font-medium text-white">{basePrice} kr</span>
                </div>

                {ingredients.bases.find(b => b.id === selectedBase)?.price! > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">{ingredients.bases.find(b => b.id === selectedBase)?.name}</span>
                    <span className="font-medium text-white">+{ingredients.bases.find(b => b.id === selectedBase)?.price} kr</span>
                  </div>
                )}

                {[...selectedCheeses, ...selectedMeats, ...selectedVeggies, ...selectedExtras].map(id => {
                  const allItems = [...ingredients.cheeses, ...ingredients.meats, ...ingredients.veggies, ...ingredients.extras];
                  const item = allItems.find(i => i.id === id);
                  if (!item || item.price === 0) return null;
                  return (
                    <div key={id} className="flex justify-between text-sm">
                      <span className="text-gray-300">{item.image} {item.name}</span>
                      <span className="font-medium text-white">+{item.price} kr</span>
                    </div>
                  );
                })}
              </div>

              <div className="border-t border-white/10 pt-4 mb-6">
                <div className="flex justify-between items-end">
                  <span className="font-bold text-lg text-white">Total</span>
                  <motion.span 
                    key={calculateTotal()}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    className="font-bold text-3xl text-primary"
                  >
                    {calculateTotal()} kr
                  </motion.span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                className="w-full bg-gradient-to-r from-primary to-accent text-white py-4 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-2 mb-3"
              >
                <ShoppingCart size={20} />
                Læg i Kurv
              </motion.button>

              {/* Save Template Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSaveTemplate}
                className="w-full bg-white/10 border border-primary/40 text-primary py-3 rounded-xl font-semibold flex items-center justify-center gap-2 mb-3 hover:bg-white/20"
              >
                <Bookmark size={18} />
                Gem som Skabelon
              </motion.button>

              <button
                onClick={resetBuilder}
                className="w-full py-2 text-gray-300 hover:text-white text-sm flex items-center justify-center gap-2"
              >
                <RotateCcw size={14} />
                Start Forfra
              </button>
            </div>
          </div>
        </div>

        {/* Save Template Modal */}
        {showSaveModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white/95 rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Bookmark className="text-primary" size={20} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  {user ? 'Gem Pizza Skabelon' : 'Log ind påkrævet'}
                </h3>
              </div>

              {saveError && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">
                  {saveError}
                </div>
              )}

              {user ? (
                <>
                  <p className="text-gray-700 mb-4">
                    Gem din pizza som en skabelon, så du nemt kan bestille den igen senere.
                  </p>
                  <div className="mb-4">
                    <label className="block font-medium text-gray-800 mb-2">
                      Navn på skabelon
                    </label>
                    <input
                      type="text"
                      value={templateName}
                      onChange={(e) => setTemplateName(e.target.value)}
                      placeholder="F.eks. 'Min Favorit'"
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none"
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowSaveModal(false)}
                      className="flex-1 py-3 bg-gray-200 text-gray-800 rounded-xl font-medium hover:bg-gray-300"
                    >
                      Annuller
                    </button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={confirmSaveTemplate}
                      className="flex-1 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-medium"
                    >
                      <Save size={16} className="inline mr-2" />
                      Gem
                    </motion.button>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-gray-700 mb-6">
                    Du skal være logget ind for at gemme pizza skabeloner. Log ind eller opret en konto for at fortsætte.
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowSaveModal(false)}
                      className="flex-1 py-3 bg-gray-200 text-gray-800 rounded-xl font-medium hover:bg-gray-300"
                    >
                      Annuller
                    </button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setShowSaveModal(false);
                        navigate('/login');
                      }}
                      className="flex-1 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-medium"
                    >
                      Log Ind
                    </motion.button>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PizzaBuilderPage;
