import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Save, X, Search, Flame, Leaf, Star, Image, DollarSign, Tag, FileText, Upload, Copy, Eye, BarChart3, TrendingUp, ArrowLeft } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Toast from '../components/Toast';
import ChefLoader from '../components/ChefLoader';

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
  isActive: boolean;
}

const initialMenuItems: MenuItem[] = [
  { id: 1, name: 'Margherita', description: 'Tomatsauce, mozzarella, frisk basilikum', price: 79, image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80', category: 'Klassiske', isPopular: true, isActive: true },
  { id: 2, name: 'Pepperoni', description: 'Tomatsauce, mozzarella, pepperoni', price: 89, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&q=80', category: 'Klassiske', isSpicy: true, isPopular: true, isActive: true },
  { id: 3, name: 'Quattro Formaggi', description: 'Mozzarella, gorgonzola, parmesan, ricotta', price: 99, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=80', category: 'Specialiteter', isActive: true },
  { id: 4, name: 'Diavola', description: 'Tomatsauce, mozzarella, spicy salami, chili', price: 95, image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&q=80', category: 'Specialiteter', isSpicy: true, isActive: true },
  { id: 5, name: 'Vegetariana', description: 'Tomatsauce, mozzarella, grøntsager', price: 89, image: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=400&q=80', category: 'Vegansk', isVegan: true, isActive: true },
  { id: 6, name: 'Calzone', description: 'Foldet pizza med skinke, ost og champignon', price: 99, image: 'https://images.unsplash.com/photo-1536964549204-cce9eab227bd?w=400&q=80', category: 'Specialiteter', isPopular: true, isActive: true },
];

const categories = ['Klassiske', 'Specialiteter', 'Premium', 'Vegansk', 'Drikkevarer', 'Tilbehør'];

const AdminMenuManager = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('Alle');
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  useEffect(() => {
    // Load menu items from localStorage so they can be used on the public menu
    const saved = localStorage.getItem('restaurantMenu');
    if (saved) {
      try {
        const parsed: MenuItem[] = JSON.parse(saved);
        setMenuItems(parsed);
      } catch {
        setMenuItems(initialMenuItems);
      }
    }
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Persist menu items whenever they change
  useEffect(() => {
    localStorage.setItem('restaurantMenu', JSON.stringify(menuItems));
  }, [menuItems]);

  const [formData, setFormData] = useState<Partial<MenuItem>>({
    name: '',
    description: '',
    price: 0,
    image: '',
    category: 'Klassiske',
    isSpicy: false,
    isVegan: false,
    isPopular: false,
    isNew: false,
    isActive: true,
  });

  if (!user || user.role !== 'admin') {
    navigate('/login');
    return null;
  }

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'Alle' || item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const openModal = (item?: MenuItem) => {
    if (item) {
      setEditingItem(item);
      setFormData(item);
    } else {
      setEditingItem(null);
      setFormData({
        name: '',
        description: '',
        price: 0,
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=80',
        category: 'Klassiske',
        isSpicy: false,
        isVegan: false,
        isPopular: false,
        isNew: true,
        isActive: true,
      });
    }
    setShowModal(true);
  };

  const handleSave = () => {
    if (!formData.name || !formData.price) {
      setToastMessage('Udfyld venligst navn og pris');
      setShowToast(true);
      return;
    }

    if (editingItem) {
      setMenuItems(prev => prev.map(item => 
        item.id === editingItem.id ? { ...item, ...formData } as MenuItem : item
      ));
      setToastMessage('Produkt opdateret! ✓');
    } else {
      const newItem: MenuItem = {
        ...formData,
        id: Date.now(),
        isActive: true,
      } as MenuItem;
      setMenuItems(prev => [...prev, newItem]);
      setToastMessage('Nyt produkt tilføjet! ✓');
    }

    setShowModal(false);
    setShowToast(true);
  };

  const handleDelete = (id: number) => {
    setMenuItems(prev => prev.filter(item => item.id !== id));
    setDeleteConfirm(null);
    setToastMessage('Produkt slettet');
    setShowToast(true);
  };

  const toggleActive = (id: number) => {
    setMenuItems(prev => prev.map(item =>
      item.id === id ? { ...item, isActive: !item.isActive } : item
    ));
  };

  if (isLoading) {
    return (
      <ChefLoader message="Forbereder menu administration..." />
    );
  }

  return (
    <div className="min-h-screen bg-dark pt-24 pb-12">
      <Toast 
        message={toastMessage}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Back Link */}
        <Link
          to="/admin"
          className="inline-flex items-center gap-2 text-white/70 hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft size={20} />
          Tilbage til Dashboard
        </Link>

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Menu Administration</h1>
            <p className="text-white/70">Administrer dine produkter og kategorier</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => openModal()}
            className="bg-gradient-to-r from-primary to-accent text-dark px-6 py-3 rounded-xl font-semibold flex items-center gap-2 shadow-lg"
          >
            <Plus size={20} />
            Tilføj Produkt
          </motion.button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/5 border border-white/10 p-4 rounded-xl shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <BarChart3 className="text-primary" size={20} />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{menuItems.length}</div>
              <div className="text-white/70 text-sm">Total Produkter</div>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 p-4 rounded-xl shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="text-primary" size={20} />
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">{menuItems.filter(i => i.isActive).length}</div>
              <div className="text-white/70 text-sm">Aktive</div>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 p-4 rounded-xl shadow-sm">
            <div className="text-2xl font-bold text-primary">{menuItems.filter(i => i.isPopular).length}</div>
            <div className="text-white/70 text-sm">Populære</div>
          </div>
          <div className="bg-white/5 border border-white/10 p-4 rounded-xl shadow-sm">
            <div className="text-2xl font-bold text-primary">{menuItems.filter(i => i.isNew).length}</div>
            <div className="text-white/70 text-sm">Nye</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white/5 border border-white/10 p-4 rounded-xl shadow-sm mb-6 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={20} />
            <input
              type="text"
              placeholder="Søg efter produkt..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-white/10 bg-black/30 text-white placeholder:text-white/40 rounded-lg focus:border-primary focus:outline-none"
            />
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 border border-white/10 bg-black/30 text-white rounded-lg focus:border-primary focus:outline-none"
          >
            <option value="Alle">Alle Kategorier</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Products Table */}
        <div className="bg-white/5 border border-white/10 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-black/30 border-b border-white/10">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-white/80">Produkt</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-white/80">Kategori</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-white/80">Pris</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-white/80">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-white/80">Tags</th>
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
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <div className="font-semibold text-white">{item.name}</div>
                          <div className="text-xs text-white/60 truncate max-w-[200px]">{item.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-black/30 border border-white/10 text-white/80 rounded-full text-xs font-medium">{item.category}</span>
                    </td>
                    <td className="px-4 py-3 font-semibold text-primary">{item.price} kr</td>
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
                      <div className="flex gap-1">
                        {item.isPopular && <Star size={16} className="text-accent fill-accent" />}
                        {item.isSpicy && <Flame size={16} className="text-primary" />}
                        {item.isVegan && <Leaf size={16} className="text-primary" />}
                        {item.isNew && <span className="text-xs bg-primary/20 text-primary border border-primary/40 px-1.5 rounded">NY</span>}
                      </div>
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
              Ingen produkter fundet
            </div>
          )}
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
              className="relative w-full max-w-2xl bg-secondary border border-white/10 rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-secondary border-b border-white/10 px-6 py-4 flex justify-between items-center">
                <h2 className="text-xl font-bold text-white">
                  {editingItem ? 'Rediger Produkt' : 'Tilføj Nyt Produkt'}
                </h2>
                <button onClick={() => setShowModal(false)} className="p-2 hover:bg-white/10 rounded-lg">
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Image Upload Section */}
                <div className="border-2 border-dashed border-white/20 rounded-xl p-6 text-center hover:border-primary transition-colors">
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    {/* Preview */}
                    <div className="relative group">
                      <img
                        src={formData.image || 'https://via.placeholder.com/150?text=Pizza'}
                        alt="Preview"
                        className="w-32 h-32 rounded-xl object-cover shadow-lg"
                      />
                      <div className="absolute inset-0 bg-black/50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Eye size={24} className="text-white" />
                      </div>
                    </div>
                    
                    {/* Upload Options */}
                    <div className="flex-1 space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">
                          <Upload size={14} className="inline mr-1" />
                          Upload billede
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              // Convert to base64 for demo (in production use proper upload)
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setFormData({ ...formData, image: reader.result as string });
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          className="w-full text-sm text-white/60 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
                        />
                      </div>
                      
                      <div className="relative">
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 text-white/40 text-xs px-2 bg-[#0b0b12]">eller</span>
                        <div className="border-t border-white/10"></div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-white/80 mb-1">
                          <Image size={14} className="inline mr-1" />
                          Billede URL
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={formData.image}
                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                            className="flex-1 px-3 py-2 border border-white/10 bg-black/30 text-white placeholder:text-white/40 rounded-lg focus:border-primary focus:outline-none text-sm"
                            placeholder="https://example.com/image.jpg"
                          />
                          <button
                            type="button"
                            onClick={() => navigator.clipboard.writeText(formData.image || '')}
                            className="p-2 border border-white/10 rounded-lg hover:bg-white/5"
                            title="Kopier URL"
                          >
                            <Copy size={18} className="text-white/60" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Name & Category */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-1">
                      <FileText size={14} className="inline mr-1" />
                      Produktnavn *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-white/10 bg-black/30 text-white placeholder:text-white/40 rounded-lg focus:border-primary focus:outline-none"
                      placeholder="F.eks. Margherita"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-1">
                      <Tag size={14} className="inline mr-1" />
                      Kategori
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3 py-2 border border-white/10 bg-black/30 text-white rounded-lg focus:border-primary focus:outline-none"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-1">Beskrivelse</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 border border-white/10 bg-black/30 text-white placeholder:text-white/40 rounded-lg focus:border-primary focus:outline-none"
                    rows={3}
                    placeholder="Beskriv ingredienserne..."
                  />
                </div>

                {/* Price */}
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-1">
                    <DollarSign size={14} className="inline mr-1" />
                    Pris (kr) *
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-white/10 bg-black/30 text-white rounded-lg focus:border-primary focus:outline-none"
                    min="0"
                  />
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">Tags</label>
                  <div className="flex flex-wrap gap-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.isPopular}
                        onChange={(e) => setFormData({ ...formData, isPopular: e.target.checked })}
                        className="w-4 h-4 rounded border-gray-300 text-accent focus:ring-accent"
                      />
                      <Star size={16} className="text-accent" />
                      <span className="text-sm">Populær</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.isSpicy}
                        onChange={(e) => setFormData({ ...formData, isSpicy: e.target.checked })}
                        className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <Flame size={16} className="text-primary" />
                      <span className="text-sm">Stærk</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.isVegan}
                        onChange={(e) => setFormData({ ...formData, isVegan: e.target.checked })}
                        className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <Leaf size={16} className="text-primary" />
                      <span className="text-sm">Vegansk</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.isNew}
                        onChange={(e) => setFormData({ ...formData, isNew: e.target.checked })}
                        className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <span className="text-xs bg-primary/20 text-primary border border-primary/40 px-1.5 rounded">NY</span>
                      <span className="text-sm text-white">Ny Vare</span>
                    </label>
                  </div>
                </div>
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
                  {editingItem ? 'Gem Ændringer' : 'Opret Produkt'}
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
              <h3 className="text-xl font-bold text-white mb-2">Slet Produkt?</h3>
              <p className="text-white/70 mb-6">Er du sikker på, at du vil slette dette produkt? Denne handling kan ikke fortrydes.</p>
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

export default AdminMenuManager;
