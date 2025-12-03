import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Lock,
  CheckCircle,
  Clock,
  Calendar,
  Zap,
  Tag,
  X,
  Gift,
} from 'lucide-react';

interface DiscountCode {
  label: string;
  code: string;
  discount: number;
  type: string;
  timestamp: number;
}

const CheckoutPage = () => {
  const { items, getTotalPrice, clearCart } = useCart();
  const { addOrder } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: 'Aalborg',
    zipCode: '',
    deliveryNotes: '',
    paymentMethod: 'card',
    deliveryType: 'asap', // asap or scheduled
    scheduledDate: '',
    scheduledTime: '',
  });

  // Discount code state
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<DiscountCode | null>(null);
  const [discountError, setDiscountError] = useState('');
  const [savedDiscount, setSavedDiscount] = useState<DiscountCode | null>(null);

  // Valid discount codes
  const validCodes: Record<string, DiscountCode> = {
    'SPIN5': { label: '5% Rabat', code: 'SPIN5', discount: 5, type: 'percent', timestamp: 0 },
    'SPIN10': { label: '10% Rabat', code: 'SPIN10', discount: 10, type: 'percent', timestamp: 0 },
    'SPIN15': { label: '15% Rabat', code: 'SPIN15', discount: 15, type: 'percent', timestamp: 0 },
    'SPIN20': { label: '20% Rabat', code: 'SPIN20', discount: 20, type: 'percent', timestamp: 0 },
    'FREEDRINK': { label: 'Gratis Drik', code: 'FREEDRINK', discount: 25, type: 'item', timestamp: 0 },
    'FREESHIP': { label: 'Gratis Levering', code: 'FREESHIP', discount: 39, type: 'shipping', timestamp: 0 },
    'WELCOME10': { label: '10% Velkomst', code: 'WELCOME10', discount: 10, type: 'percent', timestamp: 0 },
  };

  // Load saved discount from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('currentDiscount');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (new Date().getTime() - parsed.timestamp < 86400000) {
        setSavedDiscount(parsed);
      }
    }
  }, []);

  // Generate available time slots
  const getAvailableTimeSlots = () => {
    const slots = [];
    for (let hour = 11; hour <= 21; hour++) {
      slots.push(`${hour}:00`);
      if (hour < 21) slots.push(`${hour}:30`);
    }
    return slots;
  };

  // Generate available dates (next 7 days)
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push({
        value: date.toISOString().split('T')[0],
        label: i === 0 ? 'I dag' : i === 1 ? 'I morgen' : date.toLocaleDateString('da-DK', { weekday: 'long', day: 'numeric', month: 'short' }),
      });
    }
    return dates;
  };

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Apply discount code
  const applyDiscountCode = () => {
    const code = discountCode.toUpperCase().trim();
    if (validCodes[code]) {
      setAppliedDiscount(validCodes[code]);
      setDiscountError('');
      // Remove from localStorage after use
      if (savedDiscount?.code === code) {
        localStorage.removeItem('currentDiscount');
        setSavedDiscount(null);
      }
    } else {
      setDiscountError('Ugyldig rabatkode');
      setAppliedDiscount(null);
    }
  };

  const removeDiscount = () => {
    setAppliedDiscount(null);
    setDiscountCode('');
  };

  const applySavedDiscount = () => {
    if (savedDiscount) {
      setAppliedDiscount(savedDiscount);
      localStorage.removeItem('currentDiscount');
      setSavedDiscount(null);
    }
  };

  // Calculate totals with discount
  const subtotal = getTotalPrice();
  const baseDeliveryFee = subtotal > 150 ? 0 : 39;
  
  // Calculate discount amount
  let discountAmount = 0;
  let deliveryFee = baseDeliveryFee;
  
  if (appliedDiscount) {
    if (appliedDiscount.type === 'percent') {
      discountAmount = (subtotal * appliedDiscount.discount) / 100;
    } else if (appliedDiscount.type === 'shipping') {
      deliveryFee = 0;
      discountAmount = baseDeliveryFee;
    } else if (appliedDiscount.type === 'item') {
      discountAmount = appliedDiscount.discount;
    }
  }
  
  const total = subtotal + deliveryFee - (appliedDiscount?.type !== 'shipping' ? discountAmount : 0);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'Fornavn er påkrævet';
    if (!formData.lastName.trim()) newErrors.lastName = 'Efternavn er påkrævet';
    if (!formData.email.trim()) {
      newErrors.email = 'Email er påkrævet';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Ugyldig email';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefon er påkrævet';
    } else if (!/^\d{8}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Telefon skal være 8 cifre';
    }
    if (!formData.address.trim()) newErrors.address = 'Adresse er påkrævet';
    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'Postnummer er påkrævet';
    } else if (!/^\d{4}$/.test(formData.zipCode)) {
      newErrors.zipCode = 'Postnummer skal være 4 cifre';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      const orderNumber = Math.floor(100000 + Math.random() * 900000);
      
      // Save order to auth context
      addOrder({
        orderNumber,
        items: items.map(item => ({
          ...item,
          image: item.image,
        })),
        total,
        status: 'pending',
        customerInfo: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          zipCode: formData.zipCode,
        },
        paymentMethod: formData.paymentMethod,
      });
      
      clearCart();
      navigate('/order-confirmation', { state: { orderNumber, formData, total } });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: '',
      });
    }
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
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
            to="/cart"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-primary transition-colors mb-4"
          >
            <ArrowLeft size={20} />
            Tilbage til Kurv
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-secondary">
            Checkout
          </h1>
          <p className="text-gray-600 mt-2">
            Udfyld dine oplysninger for at gennemføre bestillingen
          </p>
        </motion.div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* Personal Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="text-primary" size={20} />
                  </div>
                  <h2 className="text-2xl font-bold text-secondary">
                    Personlige Oplysninger
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fornavn *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border ${
                        errors.firstName ? 'border-red-500' : 'border-gray-200'
                      } focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all`}
                      placeholder="Dit fornavn"
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Efternavn *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border ${
                        errors.lastName ? 'border-red-500' : 'border-gray-200'
                      } focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all`}
                      placeholder="Dit efternavn"
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <div className="relative">
                      <Mail
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        size={20}
                      />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full pl-11 pr-4 py-3 rounded-xl border ${
                          errors.email ? 'border-red-500' : 'border-gray-200'
                        } focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all`}
                        placeholder="din@email.dk"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Telefon *
                    </label>
                    <div className="relative">
                      <Phone
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        size={20}
                      />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full pl-11 pr-4 py-3 rounded-xl border ${
                          errors.phone ? 'border-red-500' : 'border-gray-200'
                        } focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all`}
                        placeholder="12345678"
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Delivery Address */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <MapPin className="text-primary" size={20} />
                  </div>
                  <h2 className="text-2xl font-bold text-secondary">
                    Leveringsadresse
                  </h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Adresse *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border ${
                        errors.address ? 'border-red-500' : 'border-gray-200'
                      } focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all`}
                      placeholder="Gadenavn og nummer"
                    />
                    {errors.address && (
                      <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Postnummer *
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl border ${
                          errors.zipCode ? 'border-red-500' : 'border-gray-200'
                        } focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all`}
                        placeholder="9000"
                      />
                      {errors.zipCode && (
                        <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        By
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        placeholder="Aalborg"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Leveringsnoter (valgfrit)
                    </label>
                    <textarea
                      name="deliveryNotes"
                      value={formData.deliveryNotes}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                      placeholder="F.eks. ring på dørklokken, 2. sal..."
                    />
                  </div>
                </div>
              </motion.div>

              {/* Delivery Time */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Clock className="text-primary" size={20} />
                  </div>
                  <h2 className="text-2xl font-bold text-secondary">
                    Leveringstid
                  </h2>
                </div>

                <div className="space-y-4">
                  {/* ASAP Option */}
                  <label 
                    className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      formData.deliveryType === 'asap' 
                        ? 'border-primary bg-primary/5' 
                        : 'border-gray-200 hover:border-primary/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="deliveryType"
                      value="asap"
                      checked={formData.deliveryType === 'asap'}
                      onChange={handleChange}
                      className="w-5 h-5 text-primary"
                    />
                    <Zap size={24} className="text-accent" />
                    <div className="flex-1">
                      <span className="font-semibold block">Så hurtigt som muligt</span>
                      <span className="text-sm text-gray-500">Estimeret: 30-45 minutter</span>
                    </div>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                      Anbefalet
                    </span>
                  </label>

                  {/* Scheduled Option */}
                  <label 
                    className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      formData.deliveryType === 'scheduled' 
                        ? 'border-primary bg-primary/5' 
                        : 'border-gray-200 hover:border-primary/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="deliveryType"
                      value="scheduled"
                      checked={formData.deliveryType === 'scheduled'}
                      onChange={handleChange}
                      className="w-5 h-5 text-primary"
                    />
                    <Calendar size={24} className="text-blue-500" />
                    <div className="flex-1">
                      <span className="font-semibold block">Planlæg levering</span>
                      <span className="text-sm text-gray-500">Vælg dato og tidspunkt</span>
                    </div>
                  </label>

                  {/* Date & Time Selection */}
                  {formData.deliveryType === 'scheduled' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="bg-gray-50 p-4 rounded-xl space-y-4"
                    >
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Vælg dato
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {getAvailableDates().map((date) => (
                            <button
                              key={date.value}
                              type="button"
                              onClick={() => setFormData({ ...formData, scheduledDate: date.value })}
                              className={`p-3 rounded-lg text-sm font-medium transition-all ${
                                formData.scheduledDate === date.value
                                  ? 'bg-primary text-white'
                                  : 'bg-white border border-gray-200 hover:border-primary'
                              }`}
                            >
                              {date.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {formData.scheduledDate && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Vælg tidspunkt
                          </label>
                          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 max-h-40 overflow-y-auto">
                            {getAvailableTimeSlots().map((time) => (
                              <button
                                key={time}
                                type="button"
                                onClick={() => setFormData({ ...formData, scheduledTime: time })}
                                className={`p-2 rounded-lg text-sm font-medium transition-all ${
                                  formData.scheduledTime === time
                                    ? 'bg-primary text-white'
                                    : 'bg-white border border-gray-200 hover:border-primary'
                                }`}
                              >
                                {time}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}

                      {formData.scheduledDate && formData.scheduledTime && (
                        <div className="bg-white p-3 rounded-lg border border-green-200 flex items-center gap-2">
                          <CheckCircle size={18} className="text-green-500" />
                          <span className="text-sm text-green-700">
                            Levering planlagt: {getAvailableDates().find(d => d.value === formData.scheduledDate)?.label} kl. {formData.scheduledTime}
                          </span>
                        </div>
                      )}
                    </motion.div>
                  )}
                </div>
              </motion.div>

              {/* Payment Method */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <CreditCard className="text-primary" size={20} />
                  </div>
                  <h2 className="text-2xl font-bold text-secondary">
                    Betalingsmetode
                  </h2>
                </div>

                <div className="space-y-3">
                  <label className="flex items-center gap-4 p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-primary transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={handleChange}
                      className="w-5 h-5 text-primary"
                    />
                    <CreditCard size={24} className="text-gray-600" />
                    <span className="flex-1 font-medium">Kredit/Debitkort</span>
                    <div className="flex gap-2">
                      <img src="https://img.icons8.com/color/48/visa.png" alt="Visa" className="h-6" />
                      <img src="https://img.icons8.com/color/48/mastercard.png" alt="Mastercard" className="h-6" />
                    </div>
                  </label>

                  <label className="flex items-center gap-4 p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-primary transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="mobilepay"
                      checked={formData.paymentMethod === 'mobilepay'}
                      onChange={handleChange}
                      className="w-5 h-5 text-primary"
                    />
                    <Phone size={24} className="text-gray-600" />
                    <span className="flex-1 font-medium">MobilePay</span>
                  </label>

                  <label className="flex items-center gap-4 p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-primary transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cash"
                      checked={formData.paymentMethod === 'cash'}
                      onChange={handleChange}
                      className="w-5 h-5 text-primary"
                    />
                    <span className="text-2xl">💵</span>
                    <span className="flex-1 font-medium">Kontant ved levering</span>
                  </label>
                </div>

                <div className="mt-6 flex items-center gap-2 text-sm text-gray-600 bg-green-50 p-4 rounded-xl">
                  <Lock size={16} className="text-green-600" />
                  <span>Din betaling er 100% sikker og krypteret</span>
                </div>
              </motion.div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl p-6 shadow-lg sticky top-32"
              >
                <h2 className="text-2xl font-bold text-secondary mb-6">
                  Din Ordre
                </h2>

                <div className="space-y-4 mb-6 max-h-60 overflow-y-auto">
                  {items.map((item) => {
                    const itemPrice = item.price * (item.size === 'Large' ? 1.3 : item.size === 'Medium' ? 1.15 : 1);
                    return (
                      <div key={`${item.id}-${item.size}`} className="flex gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm">{item.name}</h4>
                          <p className="text-xs text-gray-500">{item.size}</p>
                          <p className="text-sm font-bold text-primary">
                            {item.quantity} × {itemPrice.toFixed(0)} kr
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Discount Code Section */}
                <div className="border-t pt-4 mb-4">
                  <h3 className="font-semibold text-secondary mb-3 flex items-center gap-2">
                    <Tag size={18} />
                    Rabatkode
                  </h3>
                  
                  {/* Saved discount from Lucky Wheel */}
                  {savedDiscount && !appliedDiscount && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-3 mb-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Gift size={18} className="text-purple-600" />
                          <div>
                            <p className="text-sm font-medium text-purple-900">{savedDiscount.label}</p>
                            <p className="text-xs text-purple-600">Fra Lykkehjulet!</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={applySavedDiscount}
                          className="bg-purple-600 text-white px-3 py-1 rounded-lg text-sm font-medium hover:bg-purple-700"
                        >
                          Brug
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* Manual discount code input */}
                  {!appliedDiscount ? (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={discountCode}
                        onChange={(e) => {
                          setDiscountCode(e.target.value.toUpperCase());
                          setDiscountError('');
                        }}
                        placeholder="Indtast kode"
                        className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-primary focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={applyDiscountCode}
                        className="bg-secondary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800"
                      >
                        Anvend
                      </button>
                    </div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-green-50 border border-green-200 rounded-xl p-3 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <CheckCircle size={18} className="text-green-600" />
                        <div>
                          <p className="text-sm font-medium text-green-900">{appliedDiscount.label}</p>
                          <p className="text-xs text-green-600">Kode: {appliedDiscount.code}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={removeDiscount}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <X size={18} />
                      </button>
                    </motion.div>
                  )}
                  
                  {discountError && (
                    <p className="text-red-500 text-xs mt-2">{discountError}</p>
                  )}
                </div>

                <div className="border-t pt-4 space-y-3">
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
                  {appliedDiscount && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="flex justify-between text-green-600"
                    >
                      <span>Rabat ({appliedDiscount.label})</span>
                      <span className="font-semibold">-{discountAmount.toFixed(0)} kr</span>
                    </motion.div>
                  )}
                  <div className="border-t pt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-secondary">Total</span>
                      <span className="text-3xl font-bold text-primary">
                        {total.toFixed(0)} kr
                      </span>
                    </div>
                  </div>
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full mt-6 bg-gradient-to-r from-primary to-accent text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center gap-2"
                >
                  <CheckCircle size={20} />
                  Gennemfør Bestilling
                </motion.button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  Ved at gennemføre bestillingen accepterer du vores{' '}
                  <a href="#" className="text-primary hover:underline">
                    vilkår og betingelser
                  </a>
                </p>
              </motion.div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
