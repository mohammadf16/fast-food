import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  Package,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  DollarSign,
  ArrowLeft,
  ChefHat,
  Truck,
  UtensilsCrossed,
  Settings,
} from 'lucide-react';

const AdminDashboard = () => {
  const { user, allOrders, updateOrderStatus } = useAuth();
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  if (!user || user.role !== 'admin') {
    navigate('/login');
    return null;
  }

  // Statistics
  const totalOrders = allOrders.length;
  const pendingOrders = allOrders.filter((o) => o.status === 'pending').length;
  const preparingOrders = allOrders.filter((o) => o.status === 'preparing').length;
  const deliveringOrders = allOrders.filter((o) => o.status === 'delivering').length;
  const deliveredOrders = allOrders.filter((o) => o.status === 'delivered').length;
  const totalRevenue = allOrders
    .filter((o) => o.status === 'delivered')
    .reduce((sum, o) => sum + o.total, 0);

  const filteredOrders =
    selectedStatus === 'all'
      ? allOrders
      : allOrders.filter((o) => o.status === selectedStatus);

  const stats = [
    {
      label: 'Total Ordrer',
      value: totalOrders,
      icon: Package,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
    },
    {
      label: 'Afventer',
      value: pendingOrders,
      icon: Clock,
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600',
    },
    {
      label: 'I Gang',
      value: preparingOrders + deliveringOrders,
      icon: TrendingUp,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
    },
    {
      label: 'Total Omsætning',
      value: `${totalRevenue.toFixed(0)} kr`,
      icon: DollarSign,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
    },
  ];

  const statusOptions = [
    { value: 'all', label: 'Alle Ordrer', count: totalOrders },
    { value: 'pending', label: 'Afventer', count: pendingOrders },
    { value: 'preparing', label: 'Tilberedes', count: preparingOrders },
    { value: 'delivering', label: 'På Vej', count: deliveringOrders },
    { value: 'delivered', label: 'Leveret', count: deliveredOrders },
  ];

  const handleStatusChange = (orderId: string, newStatus: string, estimatedTime?: number) => {
    updateOrderStatus(orderId, newStatus as any, estimatedTime);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'preparing':
        return 'bg-blue-100 text-blue-800';
      case 'ready':
        return 'bg-purple-100 text-purple-800';
      case 'delivering':
        return 'bg-orange-100 text-orange-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

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
            to="/profile"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-primary transition-colors mb-4"
          >
            <ArrowLeft size={20} />
            Tilbage til Profil
          </Link>
          <div className="flex items-center gap-4 mb-2">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center">
              <LayoutDashboard className="text-white" size={32} />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-secondary">
                Admin Dashboard
              </h1>
              <p className="text-gray-600">Administrer ordrer og se statistikker</p>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Link to="/admin/menu">
            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-r from-primary to-accent p-6 rounded-2xl text-white flex items-center gap-4 shadow-lg cursor-pointer"
            >
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                <UtensilsCrossed size={28} />
              </div>
              <div>
                <h3 className="text-xl font-bold">Administrer Menu</h3>
                <p className="text-white/80 text-sm">Tilføj, rediger eller slet produkter</p>
              </div>
            </motion.div>
          </Link>
          <Link to="/admin/settings">
            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-r from-secondary to-gray-700 p-6 rounded-2xl text-white flex items-center gap-4 shadow-lg cursor-pointer"
            >
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                <Settings size={28} />
              </div>
              <div>
                <h3 className="text-xl font-bold">Indstillinger</h3>
                <p className="text-white/80 text-sm">Åbningstider, kontakt, om os og mere</p>
              </div>
            </motion.div>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}
                >
                  <stat.icon className={stat.textColor} size={24} />
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-secondary">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Orders Management */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-6 shadow-lg"
        >
          <h2 className="text-2xl font-bold text-secondary mb-6">Ordre Styring</h2>

          {/* Status Filter */}
          <div className="flex flex-wrap gap-3 mb-6">
            {statusOptions.map((option) => (
              <motion.button
                key={option.value}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedStatus(option.value)}
                className={`px-4 py-2 rounded-xl font-medium transition-all ${
                  selectedStatus === option.value
                    ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {option.label} ({option.count})
              </motion.button>
            ))}
          </div>

          {/* Orders List */}
          <div className="space-y-4 max-h-[600px] overflow-y-auto">
            {filteredOrders.length === 0 ? (
              <div className="text-center py-12">
                <Package className="text-gray-300 mx-auto mb-4" size={60} />
                <p className="text-gray-500">Ingen ordrer at vise</p>
              </div>
            ) : (
              filteredOrders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-2 border-gray-100 rounded-xl p-4 hover:border-primary/30 transition-colors"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    {/* Order Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-bold text-lg text-secondary">
                          #{order.orderNumber}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">
                        <strong>Kunde:</strong> {order.customerInfo.name}
                      </p>
                      <p className="text-sm text-gray-600 mb-1">
                        <strong>Adresse:</strong> {order.customerInfo.address}
                      </p>
                      <p className="text-sm text-gray-600 mb-1">
                        <strong>Telefon:</strong> {order.customerInfo.phone}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleString('da-DK')}
                      </p>
                      <p className="text-lg font-bold text-primary mt-2">
                        {order.total.toFixed(0)} kr
                      </p>
                    </div>

                    {/* Items Preview */}
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-700 mb-2">
                        Varer ({order.items.length}):
                      </p>
                      <div className="space-y-1">
                        {order.items.slice(0, 3).map((item: any, i: number) => (
                          <p key={i} className="text-sm text-gray-600">
                            • {item.name} ({item.size}) × {item.quantity}
                          </p>
                        ))}
                        {order.items.length > 3 && (
                          <p className="text-sm text-gray-500">
                            +{order.items.length - 3} flere...
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2 min-w-[200px]">
                      {order.status === 'pending' && (
                        <>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleStatusChange(order.id, 'preparing', 30)}
                            className="bg-blue-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                          >
                            <ChefHat size={18} />
                            Start Tilberedning
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleStatusChange(order.id, 'cancelled')}
                            className="bg-red-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
                          >
                            <XCircle size={18} />
                            Annuller
                          </motion.button>
                        </>
                      )}
                      {order.status === 'preparing' && (
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleStatusChange(order.id, 'ready', 15)}
                          className="bg-purple-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-purple-600 transition-colors flex items-center justify-center gap-2"
                        >
                          <CheckCircle size={18} />
                          Klar til Levering
                        </motion.button>
                      )}
                      {order.status === 'ready' && (
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleStatusChange(order.id, 'delivering', 10)}
                          className="bg-orange-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
                        >
                          <Truck size={18} />
                          Send Afsted
                        </motion.button>
                      )}
                      {order.status === 'delivering' && (
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleStatusChange(order.id, 'delivered')}
                          className="bg-green-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                        >
                          <CheckCircle size={18} />
                          Marker som Leveret
                        </motion.button>
                      )}
                      {order.status === 'delivered' && (
                        <div className="bg-green-50 text-green-700 py-2 px-4 rounded-lg font-medium text-center">
                          ✓ Leveret
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
