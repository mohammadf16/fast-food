import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Edit2, Trash2, Save, X, Search, ArrowLeft, 
  Pizza, Droplets, Beef, Carrot, Sparkles,
  DollarSign, Tag, Image, GripVertical
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Toast from '../components/Toast';
import ChefLoader from '../components/ChefLoader';

interface Ingredient {
  id: string;
  name: string;
  price: number;
  description?: string;
  image?: string;
  color?: string;
  isActive: boolean;
}

interface IngredientCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  multiSelect: boolean;
  required: boolean;
}

const defaultCategories: IngredientCategory[] = [
  { id: 'bases', name: 'Pizzabund', icon: 'Pizza', description: 'Vælg din pizzabund', multiSelect: false, required: true },
  { id: 'sauces', name: 'Sauce', icon: 'Droplets', description: 'Vælg din sauce', multiSelect: false, required: true },
  { id: 'cheeses', name: 'Ost', icon: 'Droplets', description: 'Vælg dine oste', multiSelect: true, required: true },
  { id: 'meats', name: 'Kød', icon: 'Beef', description: 'Vælg dit kød', multiSelect: true, required: false },
  { id: 'veggies', name: 'Grøntsager', icon: 'Carrot', description: 'Vælg grøntsager', multiSelect: true, required: false },
  { id: 'extras', name: 'Ekstra', icon: 'Sparkles', description: 'Tilføj ekstra', multiSelect: true, required: false },
];

const defaultIngredients: Record<string, Ingredient[]> = {
  bases: [
    { id: 'classic', name: 'Klassisk', price: 0, description: 'Traditionel italiensk dej', isActive: true },
    { id: 'thin', name: 'Tynd & Sprød', price: 0, description: 'Ekstra tynd og sprød bund', isActive: true },
    { id: 'stuffed', name: 'Fyldt Kant', price: 15, description: 'Med ost i kanten', isActive: true },
    { id: 'glutenfree', name: 'Glutenfri', price: 20, description: 'For glutenintolerante', isActive: true },
  ],
  sauces: [
    { id: 'tomato', name: 'Tomatsauce', price: 0, color: '#D4AF37', isActive: true },
    { id: 'bbq', name: 'BBQ Sauce', price: 5, color: '#B88A1E', isActive: true },
    { id: 'creme', name: 'Creme Fraiche', price: 5, color: '#F5D06F', isActive: true },
    { id: 'pesto', name: 'Pesto', price: 8, color: '#F5D06F', isActive: true },
  ],
  cheeses: [
    { id: 'mozzarella', name: 'Mozzarella', price: 0, image: '🧀', isActive: true },
    { id: 'cheddar', name: 'Cheddar', price: 10, image: '🧀', isActive: true },
    { id: 'gorgonzola', name: 'Gorgonzola', price: 12, image: '🧀', isActive: true },
    { id: 'parmesan', name: 'Parmesan', price: 12, image: '🧀', isActive: true },
    { id: 'vegan', name: 'Vegansk Ost', price: 15, image: '🌱', isActive: true },
  ],
  meats: [
    { id: 'pepperoni', name: 'Pepperoni', price: 15, image: '🔴', isActive: true },
    { id: 'ham', name: 'Skinke', price: 15, image: '🍖', isActive: true },
    { id: 'chicken', name: 'Kylling', price: 18, image: '🍗', isActive: true },
    { id: 'bacon', name: 'Bacon', price: 15, image: '🥓', isActive: true },
    { id: 'beef', name: 'Oksekød', price: 20, image: '🥩', isActive: true },
    { id: 'salami', name: 'Salami', price: 15, image: '🔴', isActive: true },
  ],
  veggies: [
    { id: 'mushrooms', name: 'Champignon', price: 8, image: '🍄', isActive: true },
    { id: 'onions', name: 'Løg', price: 5, image: '🧅', isActive: true },
    { id: 'peppers', name: 'Peberfrugt', price: 8, image: '🫑', isActive: true },
    { id: 'olives', name: 'Oliven', price: 8, image: '🫒', isActive: true },
    { id: 'tomatoes', name: 'Tomater', price: 8, image: '🍅', isActive: true },
    { id: 'spinach', name: 'Spinat', price: 8, image: '🥬', isActive: true },
    { id: 'corn', name: 'Majs', price: 5, image: '🌽', isActive: true },
    { id: 'jalapenos', name: 'Jalapeños', price: 8, image: '🌶️', isActive: true },
    { id: 'pineapple', name: 'Ananas', price: 8, image: '🍍', isActive: true },
    { id: 'artichoke', name: 'Artiskok', price: 10, image: '🌿', isActive: true },
  ],
  extras: [
    { id: 'garlic', name: 'Hvidløg', price: 5, image: '🧄', isActive: true },
    { id: 'herbs', name: 'Friske Urter', price: 5, image: '🌿', isActive: true },
    { id: 'chili', name: 'Chili Flager', price: 0, image: '🌶️', isActive: true },
    { id: 'truffle', name: 'Trøffelolie', price: 15, image: '✨', isActive: true },
  ],
};

const iconMap: Record<string, React.ElementType> = {
  Pizza, Droplets, Beef, Carrot, Sparkles
};

const AdminIngredientsManager = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [categories] = useState<IngredientCategory[]>(defaultCategories);
  const [ingredients, setIngredients] = useState<Record<string, Ingredient[]>>(defaultIngredients);
  const [activeCategory, setActiveCategory] = useState('bases');
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<Ingredient | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [basePrice, setBasePrice] = useState(69);

  useEffect(() => {
    const savedIngredients = localStorage.getItem('pizzaIngredients');
    const savedBasePrice = localStorage.getItem('pizzaBasePrice');
    if (savedIngredients) {
      try {
        const parsed = JSON.parse(savedIngredients);
        setIngredients(parsed);
      } catch {
        setIngredients(defaultIngredients);
      }
    }
    if (savedBasePrice) {
      setBasePrice(Number(savedBasePrice));
    }
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem('pizzaIngredients', JSON.stringify(ingredients));
    window.dispatchEvent(new Event('pizzaIngredientsUpdated'));
  }, [ingredients]);

  useEffect(() => {
    localStorage.setItem('pizzaBasePrice', basePrice.toString());
    window.dispatchEvent(new Event('pizzaIngredientsUpdated'));
  }, [basePrice]);

  const [formData, setFormData] = useState<Partial<Ingredient>>({
    name: '',
    price: 0,
    description: '',
    image: '',
    color: '',
    isActive: true,
  });

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-dark pt-24 pb-12 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Adgang nægtet</h1>
          <p className="text-white/70 mb-6">Du skal være administrator for at se denne side.</p>
          <Link to="/login" className="text-primary hover:underline">
            Gå til login
          </Link>
        </div>
      </div>
    );
  }

  const currentCategory = categories.find(c => c.id === activeCategory);
  const currentIngredients = ingredients[activeCategory] || [];
  
  const filteredItems = currentIngredients.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openModal = (item?: Ingredient) => {
    if (item) {
      setEditingItem(item);
      setFormData(item);
    } else {
      setEditingItem(null);
      setFormData({
        name: '',
        price: 0,
        description: '',
        image: '',
        color: '',
        isActive: true,
      });
    }
    setShowModal(true);
  };

  const handleSave = () => {
    if (!formData.name || formData.price === undefined) {
      setToastMessage('Udfyld venligst navn og pris');
      setShowToast(true);
      return;
    }

    const newItem: Ingredient = {
      ...formData,
      id: editingItem ? editingItem.id : Date.now().toString(),
      isActive: formData.isActive ?? true,
    } as Ingredient;

    setIngredients(prev => ({
      ...prev,
      [activeCategory]: editingItem
        ? prev[activeCategory].map(item => item.id === editingItem.id ? newItem : item)
        : [...prev[activeCategory], newItem]
    }));

    setToastMessage(editingItem ? 'Ingrediens opdateret! ✓' : 'Ny ingrediens tilføjet! ✓');
    setShowModal(false);
    setShowToast(true);
  };

  const handleDelete = (id: string) => {
    setIngredients(prev => ({
      ...prev,
      [activeCategory]: prev[activeCategory].filter(item => item.id !== id)
    }));
    setDeleteConfirm(null);
    setToastMessage('Ingrediens slettet');
    setShowToast(true);
  };

  const toggleActive = (id: string) => {
    setIngredients(prev => ({
      ...prev,
      [activeCategory]: prev[activeCategory].map(item =>
        item.id === id ? { ...item, isActive: !item.isActive } : item
      )
    }));
  };

  const getTotalActiveIngredients = () => {
    return Object.values(ingredients).reduce((acc, cat) => acc + cat.filter(i => i.isActive).length, 0);
  };

  if (isLoading) {
    return <ChefLoader message="Forbereder ingrediens administration..." />;
  }

  return (
    <div className="min-h-screen bg-dark pt-24 pb-12">
      <Toast 
        message={toastMessage}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />

      <div className="max-w-7xl mx-auto px-6">
        <Link
          to="/admin"
          className="inline-flex items-center gap-2 text-white/70 hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft size={20} />
          Tilbage til Dashboard
        </Link>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Pizza Ingredienser</h1>
            <p className="text-white/70">Administrer ingredienser til pizzabyggeren</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => openModal()}
            className="bg-gradient-to-r from-primary to-accent text-dark px-6 py-3 rounded-xl font-semibold flex items-center gap-2 shadow-lg"
          >
            <Plus size={20} />
            Tilføj Ingrediens
          </motion.button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/5 border border-white/10 p-4 rounded-xl shadow-sm">
            <div className="text-2xl font-bold text-white">{getTotalActiveIngredients()}</div>
            <div className="text-white/70 text-sm">Aktive Ingredienser</div>
          </div>
          <div className="bg-white/5 border border-white/10 p-4 rounded-xl shadow-sm">
            <div className="text-2xl font-bold text-primary">{categories.length}</div>
            <div className="text-white/70 text-sm">Kategorier</div>
          </div>
          <div className="bg-white/5 border border-white/10 p-4 rounded-xl shadow-sm">
            <div className="text-2xl font-bold text-primary">{basePrice} kr</div>
            <div className="text-white/70 text-sm">Basis Pris</div>
          </div>
          <div className="bg-white/5 border border-white/10 p-4 rounded-xl shadow-sm">
            <div className="text-2xl font-bold text-primary">
              {currentIngredients.filter(i => i.isActive).length}
            </div>
            <div className="text-white/70 text-sm">{currentCategory?.name}</div>
          </div>
        </div>

        {/* Base Price Setting */}
        <div className="bg-white/5 border border-white/10 p-4 rounded-xl shadow-sm mb-6">
          <label className="flex items-center gap-2 text-sm font-medium text-white/80 mb-2">
            <DollarSign size={16} />
            Basis Pris for Pizza
          </label>
          <div className="flex items-center gap-4">
            <input
              type="number"
              value={basePrice}
              onChange={(e) => setBasePrice(Number(e.target.value))}
              className="w-32 px-4 py-2 border border-white/10 bg-black/30 text-white rounded-lg focus:border-primary focus:outline-none"
              min="0"
            />
            <span className="text-white/60">kr (startpris før ingredienser)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Category Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/5 border border-white/10 rounded-2xl shadow-sm p-4 sticky top-24">
              <h3 className="font-semibold text-white/80 mb-4 px-2">Kategorier</h3>
              <nav className="space-y-2">
                {categories.map(cat => {
                  const Icon = iconMap[cat.icon];
                  const count = ingredients[cat.id]?.filter(i => i.isActive).length || 0;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setActiveCategory(cat.id);
                        setSearchQuery('');
                      }}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                        activeCategory === cat.id
                          ? 'bg-gradient-to-r from-primary to-accent text-dark shadow-lg'
                          : 'text-white/70 hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {Icon && <Icon size={20} />}
                        <span className="font-medium">{cat.name}</span>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        activeCategory === cat.id ? 'bg-white/20' : 'bg-black/30 border border-white/10'
                      }`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white/5 border border-white/10 rounded-2xl shadow-sm overflow-hidden">
              {/* Header */}
              <div className="p-4 border-b border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-xl font-bold text-white">{currentCategory?.name}</h2>
                  <p className="text-sm text-white/60">{currentCategory?.description}</p>
                </div>
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                  <input
                    type="text"
                    placeholder="Søg ingredienser..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-white/10 bg-black/30 text-white placeholder:text-white/40 rounded-lg focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-black/30 border-b border-white/10">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-white/80 w-12"></th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-white/80">Ingrediens</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-white/80">Pris</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-white/80">Status</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-white/80">Handlinger</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {filteredItems.map((item) => (
                      <motion.tr 
                        key={item.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="hover:bg-white/5 transition-colors"
                      >
                        <td className="px-4 py-3">
                          <GripVertical size={16} className="text-white/20" />
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            {item.image && (
                              <span className="text-2xl">{item.image}</span>
                            )}
                            {item.color && (
                              <div 
                                className="w-8 h-8 rounded-full border-2 border-white/10"
                                style={{ backgroundColor: item.color }}
                              />
                            )}
                            <div>
                              <div className="font-semibold text-white">{item.name}</div>
                              {item.description && (
                                <div className="text-xs text-white/60">{item.description}</div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="font-semibold text-primary">
                            {item.price === 0 ? 'Gratis' : `+${item.price} kr`}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => toggleActive(item.id)}
                            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                              item.isActive 
                                ? 'bg-primary/20 text-primary border border-primary/40 hover:bg-primary/25' 
                                : 'bg-white/5 text-white/70 border border-white/10 hover:bg-white/10'
                            }`}
                          >
                            {item.isActive ? 'Aktiv' : 'Inaktiv'}
                          </button>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex justify-end gap-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => openModal(item)}
                              className="p-2 text-white/60 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                            >
                              <Edit2 size={18} />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => setDeleteConfirm(item.id)}
                              className="p-2 text-white/60 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                            >
                              <Trash2 size={18} />
                            </motion.button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredItems.length === 0 && (
                <div className="text-center py-12 text-white/60">
                  <p>Ingen ingredienser fundet</p>
                  <button
                    onClick={() => openModal()}
                    className="text-primary hover:underline mt-2"
                  >
                    Tilføj din første ingrediens
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Edit/Add Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              className="relative w-full max-w-lg bg-secondary border border-white/10 rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-secondary border-b border-white/10 px-6 py-4 flex justify-between items-center">
                <h2 className="text-xl font-bold text-white">
                  {editingItem ? 'Rediger Ingrediens' : 'Tilføj Ny Ingrediens'}
                </h2>
                <button onClick={() => setShowModal(false)} className="p-2 hover:bg-white/10 rounded-lg">
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    <Tag size={14} className="inline mr-1" />
                    Navn *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-white/10 bg-black/30 text-white placeholder:text-white/40 rounded-xl focus:border-primary focus:outline-none"
                    placeholder="F.eks. Pepperoni"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    <DollarSign size={14} className="inline mr-1" />
                    Pris (kr) *
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full px-4 py-3 border border-white/10 bg-black/30 text-white rounded-xl focus:border-primary focus:outline-none"
                    min="0"
                    placeholder="0 for gratis"
                  />
                  <p className="text-xs text-white/60 mt-1">Sæt til 0 for gratis ingrediens</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Beskrivelse (valgfrit)
                  </label>
                  <input
                    type="text"
                    value={formData.description || ''}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-3 border border-white/10 bg-black/30 text-white placeholder:text-white/40 rounded-xl focus:border-primary focus:outline-none"
                    placeholder="Kort beskrivelse..."
                  />
                </div>

                {activeCategory === 'sauces' ? (
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      Farve
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={formData.color || '#ef4444'}
                        onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                        className="w-12 h-12 rounded-xl border-2 border-white/10 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={formData.color || ''}
                        onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                        className="flex-1 px-4 py-3 border border-white/10 bg-black/30 text-white placeholder:text-white/40 rounded-xl focus:border-primary focus:outline-none"
                        placeholder="#ef4444"
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      <Image size={14} className="inline mr-1" />
                      Emoji / Ikon
                    </label>
                    <input
                      type="text"
                      value={formData.image || ''}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      className="w-full px-4 py-3 border border-white/10 bg-black/30 text-white placeholder:text-white/40 rounded-xl focus:border-primary focus:outline-none"
                      placeholder="F.eks. 🍕 🧀 🥩"
                    />
                  </div>
                )}

                <label className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-xl cursor-pointer hover:bg-white/10 transition-colors">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-5 h-5 rounded border-white/20 bg-black/30 text-primary focus:ring-primary"
                  />
                  <span className="font-medium text-white">Aktiv (synlig for kunder)</span>
                </label>
              </div>

              <div className="sticky bottom-0 bg-secondary border-t border-white/10 px-6 py-4 flex justify-end gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-white/70 hover:bg-white/10 rounded-lg transition-colors"
                >
                  Annuller
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSave}
                  className="px-6 py-2 bg-gradient-to-r from-primary to-accent text-dark rounded-lg font-semibold flex items-center gap-2"
                >
                  <Save size={18} />
                  {editingItem ? 'Gem Ændringer' : 'Tilføj Ingrediens'}
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation */}
      <AnimatePresence>
        {deleteConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeleteConfirm(null)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative bg-[#0b0b12] border border-white/10 rounded-2xl p-6 max-w-sm w-full text-center"
            >
              <div className="w-16 h-16 bg-primary/10 border border-primary/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="text-primary" size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Slet Ingrediens?</h3>
              <p className="text-white/70 mb-6">Er du sikker på, at du vil slette denne ingrediens? Denne handling kan ikke fortrydes.</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 px-4 py-2 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition-colors"
                >
                  Annuller
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirm)}
                  className="flex-1 px-4 py-2 bg-primary text-black rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  Slet
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminIngredientsManager;
