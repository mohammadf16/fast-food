import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Phone, MapPin, Package, LogOut, Clock, CheckCircle, Truck, ChefHat, Award, Gift, Bookmark, Trash2 } from 'lucide-react';

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

const ProfilePage = () => {
  const { user, logout, getUserOrders } = useAuth();
  const navigate = useNavigate();
  const orders = getUserOrders();
  const [savedTemplates, setSavedTemplates] = useState<PizzaTemplate[]>([]);
  
  // Load saved templates from localStorage
  useEffect(() => {
    if (user) {
      const saved = localStorage.getItem(`pizzaTemplates_${user.id}`);
      if (saved) {
        setSavedTemplates(JSON.parse(saved));
      }
    }
  }, [user]);

  const deleteTemplate = (templateId: number) => {
    if (!user) return;
    const updated = savedTemplates.filter(t => t.id !== templateId);
    setSavedTemplates(updated);
    localStorage.setItem(`pizzaTemplates_${user.id}`, JSON.stringify(updated));
  };

  const loadTemplate = (template: PizzaTemplate) => {
    navigate('/pizza-builder', { state: { template } });
  };
  
  // Calculate loyalty points (10 points for every 100 kr spent)
  const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);
  const loyaltyPoints = Math.floor(totalSpent / 10);
  const pointsToNextReward = 500 - (loyaltyPoints % 500);
  const progress = ((loyaltyPoints % 500) / 500) * 100;

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30';
      case 'preparing': return 'bg-blue-500/20 text-blue-400 border border-blue-500/30';
      case 'ready': return 'bg-purple-500/20 text-purple-400 border border-purple-500/30';
      case 'delivering': return 'bg-orange-500/20 text-orange-400 border border-orange-500/30';
      case 'delivered': return 'bg-green-500/20 text-green-400 border border-green-500/30';
      case 'cancelled': return 'bg-red-500/20 text-red-400 border border-red-500/30';
      default: return 'bg-primary/20 text-primary border border-primary/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return Clock;
      case 'preparing': return ChefHat;
      case 'ready': return CheckCircle;
      case 'delivering': return Truck;
      case 'delivered': return CheckCircle;
      default: return Package;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Afventer';
      case 'preparing': return 'Tilberedes';
      case 'ready': return 'Klar';
      case 'delivering': return 'På vej';
      case 'delivered': return 'Leveret';
      case 'cancelled': return 'Annulleret';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-dark pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Min Profil
          </h1>
          <p className="text-muted">Velkommen tilbage, {user.name}!</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1 space-y-8"
          >
            {/* Loyalty Card */}
            <div className="bg-gradient-to-br from-primary to-accent rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12" />
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-white/80 text-sm font-medium mb-1">Dine Point</p>
                    <h3 className="text-4xl font-bold">{loyaltyPoints}</h3>
                  </div>
                  <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                    <Award size={24} className="text-white" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-white/90">
                    <span>Næste belønning</span>
                    <span>{pointsToNextReward} point til</span>
                  </div>
                  <div className="h-2 bg-black/20 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full bg-white rounded-full"
                    />
                  </div>
                  <p className="text-xs text-white/80 mt-2 flex items-center gap-1">
                    <Gift size={12} />
                    Gratis pizza ved 500 point
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-surface rounded-2xl p-6 shadow-lg border border-primary/10">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="text-white" size={40} />
                </div>
                <h2 className="text-2xl font-bold text-white">{user.name}</h2>
                {user.role === 'admin' && (
                  <span className="inline-block bg-gradient-to-r from-primary to-accent text-black px-4 py-1 rounded-full text-sm font-semibold mt-2">
                    👑 Administrator
                  </span>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-dark rounded-xl border border-primary/10">
                  <Mail className="text-primary" size={20} />
                  <div>
                    <p className="text-xs text-muted">Email</p>
                    <p className="text-sm font-medium text-white">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-dark rounded-xl border border-primary/10">
                  <Phone className="text-primary" size={20} />
                  <div>
                    <p className="text-xs text-muted">Telefon</p>
                    <p className="text-sm font-medium text-white">{user.phone}</p>
                  </div>
                </div>

                {user.address && (
                  <div className="flex items-center gap-3 p-3 bg-dark rounded-xl border border-primary/10">
                    <MapPin className="text-primary" size={20} />
                    <div>
                      <p className="text-xs text-muted">Adresse</p>
                      <p className="text-sm font-medium text-white">{user.address}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 space-y-3">
                {user.role === 'admin' && (
                  <Link to="/admin">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-primary to-accent text-black py-3 rounded-xl font-semibold"
                    >
                      🎛️ Admin Panel
                    </motion.button>
                  </Link>
                )}
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleLogout}
                  className="w-full border-2 border-primary text-primary py-3 rounded-xl font-semibold hover:bg-primary/10 transition-colors flex items-center justify-center gap-2"
                >
                  <LogOut size={20} />
                  Log Ud
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Order History */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <div className="bg-surface rounded-2xl p-6 shadow-lg border border-primary/10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Mine Ordrer</h2>
                <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold border border-primary/30">
                  {orders.length} {orders.length === 1 ? 'ordre' : 'ordrer'}
                </span>
              </div>

              {orders.length === 0 ? (
                <div className="text-center py-12">
                  <Package className="text-white/30 mx-auto mb-4" size={60} />
                  <p className="text-muted mb-6">Du har ingen ordrer endnu</p>
                  <Link to="/#menu">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-r from-primary to-accent text-black px-6 py-3 rounded-full font-semibold"
                    >
                      Bestil Nu
                    </motion.button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4 max-h-[600px] overflow-y-auto">
                  {orders.map((order, index) => {
                    const StatusIcon = getStatusIcon(order.status);
                    return (
                      <motion.div
                        key={order.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="border-2 border-primary/10 bg-dark rounded-xl p-4 hover:border-primary/30 transition-colors"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <div className="flex items-center gap-3 mb-1">
                              <h3 className="font-bold text-lg text-secondary">
                                Ordre #{order.orderNumber}
                              </h3>
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${getStatusColor(order.status)}`}>
                                <StatusIcon size={14} />
                                {getStatusText(order.status)}
                              </span>
                            </div>
                            <p className="text-sm text-gray-500">
                              {new Date(order.createdAt).toLocaleDateString('da-DK', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-primary">{order.total.toFixed(0)} kr</p>
                            <p className="text-xs text-gray-500">{order.items.length} varer</p>
                          </div>
                        </div>

                        {order.estimatedTime && order.status !== 'delivered' && (
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
                            <p className="text-sm text-blue-800">
                              ⏱️ Estimeret leveringstid: <strong>{order.estimatedTime} minutter</strong>
                            </p>
                          </div>
                        )}

                        <div className="space-y-2 mb-3">
                          {order.items.slice(0, 2).map((item: any, i: number) => (
                            <div key={i} className="flex items-center gap-3 text-sm">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-12 h-12 rounded-lg object-cover"
                              />
                              <div className="flex-1">
                                <p className="font-medium text-secondary">{item.name}</p>
                                <p className="text-gray-500 text-xs">{item.size} × {item.quantity}</p>
                              </div>
                            </div>
                          ))}
                          {order.items.length > 2 && (
                            <p className="text-sm text-gray-500 pl-15">
                              +{order.items.length - 2} flere varer
                            </p>
                          )}
                        </div>

                        <Link to={`/order-tracking/${order.id}`}>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full border-2 border-primary text-primary py-2 rounded-lg font-medium hover:bg-primary hover:text-white transition-colors"
                          >
                            Spor Ordre
                          </motion.button>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>

          {/* Saved Templates Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 mt-8"
          >
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-secondary flex items-center gap-2">
                  <Bookmark className="text-primary" size={24} />
                  Mine Pizza Skabeloner
                </h2>
                <Link to="/pizza-builder">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold hover:bg-primary/20"
                  >
                    + Opret Ny
                  </motion.button>
                </Link>
              </div>

              {savedTemplates.length === 0 ? (
                <div className="text-center py-8">
                  <Bookmark className="text-gray-300 mx-auto mb-4" size={60} />
                  <p className="text-gray-500 mb-4">Du har ingen gemte pizza skabeloner endnu</p>
                  <Link to="/pizza-builder">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-r from-primary to-accent text-white px-6 py-3 rounded-full font-semibold"
                    >
                      🍕 Design Din Pizza
                    </motion.button>
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {savedTemplates.map((template) => (
                    <motion.div
                      key={template.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="border-2 border-gray-100 rounded-xl p-4 hover:border-primary/30 transition-colors relative group"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-bold text-lg text-secondary">{template.name}</h3>
                          <p className="text-sm text-gray-500 line-clamp-2">{template.description}</p>
                        </div>
                        <button
                          onClick={() => deleteTemplate(template.id)}
                          className="text-red-400 hover:text-red-600 p-1 rounded-lg hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity"
                          title="Slet skabelon"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-3">
                        {template.selectedMeats.length > 0 && (
                          <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
                            {template.selectedMeats.length} kød
                          </span>
                        )}
                        {template.selectedCheeses.length > 0 && (
                          <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                            {template.selectedCheeses.length} ost
                          </span>
                        )}
                        {template.selectedVeggies.length > 0 && (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                            {template.selectedVeggies.length} grønt
                          </span>
                        )}
                        {template.selectedExtras.length > 0 && (
                          <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                            {template.selectedExtras.length} ekstra
                          </span>
                        )}
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-xl font-bold text-primary">{template.totalPrice} kr</span>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => loadTemplate(template)}
                          className="bg-gradient-to-r from-primary to-accent text-white px-4 py-2 rounded-lg font-medium text-sm"
                        >
                          Bestil Nu
                        </motion.button>
                      </div>

                      <p className="text-xs text-gray-400 mt-2">
                        Gemt {new Date(template.createdAt).toLocaleDateString('da-DK')}
                      </p>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
