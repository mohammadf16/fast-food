import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  ArrowLeft, Package, ChefHat, CheckCircle, Truck, Phone, 
  Pizza, Flame, Timer, Sparkles, Heart, Star, ThumbsUp, MessageCircle,
  Navigation, Home, Gift, PartyPopper, Copy
} from 'lucide-react';

// Animated Pizza Preparation Scene
const PreparationAnimation = () => {
  return (
    <div className="relative h-48 w-full overflow-hidden rounded-2xl bg-gradient-to-br from-orange-100 to-yellow-50">
      {/* Oven Background */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="w-32 h-24 bg-gradient-to-b from-gray-700 to-gray-800 rounded-t-3xl relative"
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {/* Oven Window */}
          <div className="absolute inset-2 bg-gradient-to-b from-orange-500 to-red-600 rounded-t-2xl overflow-hidden">
            {/* Fire */}
            <motion.div
              className="absolute bottom-0 left-1/2 -translate-x-1/2"
              animate={{ scale: [1, 1.2, 1], y: [0, -5, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              <Flame className="text-yellow-400" size={40} />
            </motion.div>
            {/* Pizza in Oven */}
            <motion.div
              className="absolute top-4 left-1/2 -translate-x-1/2"
              animate={{ rotate: [0, 5, -5, 0], y: [0, 2, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Pizza className="text-yellow-200" size={32} />
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      {/* Floating Elements */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{ 
            x: 50 + Math.random() * 200, 
            y: 150,
            opacity: 0 
          }}
          animate={{ 
            y: -50,
            opacity: [0, 1, 0],
            rotate: Math.random() * 360
          }}
          transition={{ 
            duration: 2 + Math.random(), 
            repeat: Infinity, 
            delay: i * 0.5 
          }}
        >
          <Sparkles className="text-orange-400" size={16} />
        </motion.div>
      ))}
      
      {/* Chef */}
      <motion.div
        className="absolute left-8 bottom-4"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center">
          <ChefHat className="text-primary" size={32} />
        </div>
      </motion.div>
      
      <p className="absolute bottom-4 right-4 text-orange-700 font-medium text-sm">
        🍕 Din pizza tilberedes med kærlighed...
      </p>
    </div>
  );
};

// Delivery Animation Scene
const DeliveryAnimation = () => {
  return (
    <div className="relative h-48 w-full overflow-hidden rounded-2xl bg-gradient-to-br from-blue-100 to-green-50">
      {/* Road */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gray-700">
        {/* Road Lines */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 flex gap-8"
          animate={{ x: [0, -100] }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          {[...Array(10)].map((_, i) => (
            <div key={i} className="w-12 h-2 bg-yellow-400 rounded-full" />
          ))}
        </motion.div>
      </div>
      
      {/* Delivery Scooter */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
        animate={{ x: [-20, 20, -20], y: [0, -3, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="relative">
          <div className="w-20 h-12 bg-primary rounded-lg flex items-center justify-center shadow-xl">
            <Truck className="text-white" size={28} />
          </div>
          {/* Pizza Box */}
          <motion.div
            className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-orange-400 rounded-lg flex items-center justify-center"
            animate={{ rotate: [-5, 5, -5] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            <Pizza className="text-white" size={16} />
          </motion.div>
        </div>
      </motion.div>
      
      {/* Buildings */}
      <div className="absolute right-8 bottom-16">
        <div className="w-12 h-20 bg-gray-300 rounded-t-lg" />
        <div className="w-16 h-16 bg-gray-400 rounded-t-lg -ml-2" />
      </div>
      
      {/* House (destination) */}
      <motion.div
        className="absolute right-4 bottom-16"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        <Home className="text-green-600" size={32} />
      </motion.div>
      
      <p className="absolute bottom-4 left-4 text-blue-700 font-medium text-sm">
        🚗 På vej til dig...
      </p>
    </div>
  );
};

// Delivered Celebration
const DeliveredAnimation = () => {
  return (
    <div className="relative h-48 w-full overflow-hidden rounded-2xl bg-gradient-to-br from-green-100 to-emerald-50">
      {/* Confetti */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 rounded-full"
          style={{ 
            backgroundColor: ['#D4382C', '#F5A623', '#10B981', '#3B82F6', '#8B5CF6'][i % 5],
            left: `${Math.random() * 100}%`
          }}
          initial={{ y: -20, opacity: 1 }}
          animate={{ 
            y: 200, 
            opacity: 0,
            rotate: Math.random() * 720,
            x: (Math.random() - 0.5) * 100
          }}
          transition={{ 
            duration: 2 + Math.random(), 
            repeat: Infinity, 
            delay: Math.random() * 2 
          }}
        />
      ))}
      
      {/* Center Celebration */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <PartyPopper className="text-primary" size={48} />
        </motion.div>
        <motion.p
          className="text-green-700 font-bold text-xl mt-4"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          Velbekomme! 🎉
        </motion.p>
      </div>
      
      {/* Stars */}
      {[Star, Heart, Sparkles].map((Icon, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: `${20 + i * 30}%`, top: '20%' }}
          animate={{ 
            y: [0, -10, 0], 
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
        >
          <Icon className="text-yellow-500" size={24} />
        </motion.div>
      ))}
    </div>
  );
};

// Live Timer Component
const LiveTimer = ({ startTime }: { startTime: string }) => {
  const [elapsed, setElapsed] = useState(0);
  
  useEffect(() => {
    const start = new Date(startTime).getTime();
    const interval = setInterval(() => {
      setElapsed(Math.floor((Date.now() - start) / 1000 / 60));
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime]);
  
  return (
    <motion.div
      className="flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full"
      animate={{ scale: [1, 1.02, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <Timer className="animate-pulse" size={18} />
      <span className="font-bold">{elapsed} min</span>
      <span className="text-sm opacity-70">siden bestilling</span>
    </motion.div>
  );
};

// 🎰 Premium Lucky Wheel with Clear Design
const LuckyWheelSection = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [prize, setPrize] = useState<{ label: string; code: string; discount: number; type: string } | null>(null);
  const [copied, setCopied] = useState(false);
  const [hasSpun, setHasSpun] = useState(false);

  const prizes = [
    { label: '10% Rabat', code: 'SPIN10', discount: 10, type: 'percent', bg: '#EF4444' },
    { label: 'Gratis Drik', code: 'FREEDRINK', discount: 25, type: 'item', bg: '#3B82F6' },
    { label: '15% Rabat', code: 'SPIN15', discount: 15, type: 'percent', bg: '#10B981' },
    { label: 'Gratis Levering', code: 'FREESHIP', discount: 39, type: 'shipping', bg: '#8B5CF6' },
    { label: '5% Rabat', code: 'SPIN5', discount: 5, type: 'percent', bg: '#F59E0B' },
    { label: '20% Rabat', code: 'SPIN20', discount: 20, type: 'percent', bg: '#EC4899' },
  ];

  useEffect(() => {
    const savedPrize = localStorage.getItem('currentDiscount');
    if (savedPrize) {
      const parsed = JSON.parse(savedPrize);
      // Check if discount is still valid (24 hours)
      if (new Date().getTime() - parsed.timestamp < 86400000) {
        setHasSpun(true);
        setPrize(parsed);
      } else {
        localStorage.removeItem('currentDiscount');
      }
    }
  }, []);

  const spinWheel = () => {
    if (isSpinning || hasSpun) return;
    
    setIsSpinning(true);
    const prizeIndex = Math.floor(Math.random() * prizes.length);
    const segmentAngle = 360 / prizes.length;
    // Calculate rotation to land on prize (with extra spins)
    const targetAngle = 360 - (prizeIndex * segmentAngle) - (segmentAngle / 2);
    const totalRotation = 360 * 6 + targetAngle; // 6 full spins + target
    
    setRotation(totalRotation);
    
    setTimeout(() => {
      setIsSpinning(false);
      const wonPrize = {
        label: prizes[prizeIndex].label,
        code: prizes[prizeIndex].code,
        discount: prizes[prizeIndex].discount,
        type: prizes[prizeIndex].type,
        timestamp: new Date().getTime()
      };
      setPrize(wonPrize);
      setHasSpun(true);
      // Save to localStorage for use in checkout
      localStorage.setItem('currentDiscount', JSON.stringify(wonPrize));
    }, 4000);
  };

  const copyCode = () => {
    if (prize) {
      navigator.clipboard.writeText(prize.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (hasSpun && prize) {
    // Show saved discount
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 mb-8 text-white"
      >
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
              <Gift size={28} />
            </div>
            <div>
              <p className="text-green-100 text-sm">Din rabatkode til næste ordre:</p>
              <p className="text-2xl font-bold">{prize.label}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <code className="bg-white text-green-700 px-4 py-2 rounded-lg font-bold text-lg">
              {prize.code}
            </code>
            <button
              onClick={copyCode}
              className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors"
            >
              {copied ? <CheckCircle size={20} /> : <Copy size={20} />}
            </button>
          </div>
        </div>
        {copied && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-3 text-green-100"
          >
            ✓ Kode kopieret! Brug den ved næste bestilling.
          </motion.p>
        )}
      </motion.div>
    );
  }

  if (hasSpun) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 rounded-3xl p-8 mb-8 text-white text-center relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-40 h-40 bg-yellow-400 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-60 h-60 bg-pink-500 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="inline-flex items-center gap-2 bg-yellow-400 text-yellow-900 px-5 py-2 rounded-full font-bold mb-4"
        >
          <Sparkles size={20} />
          BONUS TIL DIG!
        </motion.div>
        
        <h3 className="text-3xl font-bold mb-2">🎰 Lykkehjulet</h3>
        <p className="text-purple-200 mb-8">Spin og vind rabat på din næste ordre!</p>

        {/* Wheel Container */}
        <div className="relative w-72 h-72 mx-auto mb-8">
          {/* Outer ring with lights */}
          <div className="absolute inset-0 rounded-full p-2">
            <div className="absolute inset-0 rounded-full border-8 border-yellow-400 shadow-[0_0_30px_rgba(250,204,21,0.5)]" />
            {/* Light bulbs */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-4 h-4 bg-yellow-300 rounded-full shadow-lg"
                style={{
                  top: `${50 - 46 * Math.cos((i * Math.PI * 2) / 12)}%`,
                  left: `${50 + 46 * Math.sin((i * Math.PI * 2) / 12)}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                animate={{ 
                  opacity: isSpinning ? [1, 0.3, 1] : 1,
                  scale: isSpinning ? [1, 0.8, 1] : 1
                }}
                transition={{ 
                  duration: 0.3, 
                  repeat: isSpinning ? Infinity : 0,
                  delay: i * 0.05
                }}
              />
            ))}
          </div>

          {/* Spinning Wheel */}
          <motion.div
            className="absolute inset-4 rounded-full overflow-hidden shadow-2xl"
            style={{ rotate: rotation }}
            animate={{ rotate: rotation }}
            transition={{ duration: 4, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <svg viewBox="0 0 200 200" className="w-full h-full">
              {prizes.map((p, i) => {
                const angle = (360 / prizes.length);
                const startAngle = i * angle - 90;
                const endAngle = startAngle + angle;
                const startRad = (startAngle * Math.PI) / 180;
                const endRad = (endAngle * Math.PI) / 180;
                const x1 = 100 + 100 * Math.cos(startRad);
                const y1 = 100 + 100 * Math.sin(startRad);
                const x2 = 100 + 100 * Math.cos(endRad);
                const y2 = 100 + 100 * Math.sin(endRad);
                const largeArc = angle > 180 ? 1 : 0;
                
                // Text position
                const midAngle = startAngle + angle / 2;
                const midRad = (midAngle * Math.PI) / 180;
                const textX = 100 + 60 * Math.cos(midRad);
                const textY = 100 + 60 * Math.sin(midRad);

                return (
                  <g key={i}>
                    <path
                      d={`M 100 100 L ${x1} ${y1} A 100 100 0 ${largeArc} 1 ${x2} ${y2} Z`}
                      fill={p.bg}
                      stroke="#fff"
                      strokeWidth="2"
                    />
                    <text
                      x={textX}
                      y={textY}
                      fill="white"
                      fontSize="11"
                      fontWeight="bold"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      transform={`rotate(${midAngle + 90}, ${textX}, ${textY})`}
                      style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}
                    >
                      {p.label}
                    </text>
                  </g>
                );
              })}
              {/* Center circle */}
              <circle cx="100" cy="100" r="25" fill="#1e1b4b" stroke="#fbbf24" strokeWidth="4" />
              <text x="100" y="100" fontSize="24" textAnchor="middle" dominantBaseline="middle">
                🍕
              </text>
            </svg>
          </motion.div>

          {/* Pointer */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 z-20">
            <motion.div
              animate={isSpinning ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 0.2, repeat: Infinity }}
            >
              <div className="w-0 h-0 border-l-[18px] border-r-[18px] border-t-[30px] border-l-transparent border-r-transparent border-t-yellow-400 drop-shadow-lg" />
            </motion.div>
          </div>
        </div>

        {/* Prize list */}
        <div className="grid grid-cols-3 gap-2 mb-6 max-w-md mx-auto">
          {prizes.map((p, i) => (
            <div
              key={i}
              className="text-xs py-2 px-3 rounded-lg text-white/90"
              style={{ backgroundColor: `${p.bg}40` }}
            >
              {p.label}
            </div>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={spinWheel}
          disabled={isSpinning}
          className={`px-10 py-4 rounded-2xl font-bold text-xl shadow-2xl transition-all ${
            isSpinning
              ? 'bg-gray-600 cursor-not-allowed text-gray-300'
              : 'bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white hover:shadow-orange-500/50'
          }`}
        >
          {isSpinning ? (
            <span className="flex items-center gap-3">
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
              >
                🎰
              </motion.span>
              Spinner...
            </span>
          ) : (
            <span className="flex items-center gap-3">
              <Sparkles size={24} />
              SPIN & VIND!
              <Sparkles size={24} />
            </span>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
};

const OrderTrackingPage = () => {
  const { orderId } = useParams();
  const { allOrders } = useAuth();
  const navigate = useNavigate();
  const [order, setOrder] = useState<any>(null);
  const [showRating, setShowRating] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [feedbackSent, setFeedbackSent] = useState(false);

  useEffect(() => {
    const foundOrder = allOrders.find((o) => o.id === orderId);
    if (foundOrder) {
      setOrder(foundOrder);
      if (foundOrder.status === 'delivered') {
        setTimeout(() => setShowRating(true), 2000);
      }
    } else {
      navigate('/profile');
    }
  }, [orderId, allOrders, navigate]);

  if (!order) return null;

  const statusSteps = [
    { 
      key: 'pending', 
      label: 'Ordre Modtaget', 
      icon: Package, 
      description: 'Din ordre er bekræftet og sendt til køkkenet',
      color: 'from-blue-500 to-cyan-500',
      emoji: '📦'
    },
    { 
      key: 'preparing', 
      label: 'Tilberedning', 
      icon: ChefHat, 
      description: 'Vores mesterkokke arbejder på din pizza',
      color: 'from-orange-500 to-red-500',
      emoji: '👨‍🍳'
    },
    { 
      key: 'ready', 
      label: 'Klar til Levering', 
      icon: CheckCircle, 
      description: 'Din varme pizza er pakket og klar',
      color: 'from-green-500 to-emerald-500',
      emoji: '✅'
    },
    { 
      key: 'delivering', 
      label: 'På Vej', 
      icon: Truck, 
      description: 'Vores chauffør er på vej til dig',
      color: 'from-purple-500 to-pink-500',
      emoji: '🚗'
    },
    { 
      key: 'delivered', 
      label: 'Leveret', 
      icon: Heart, 
      description: 'Nyd din lækre pizza!',
      color: 'from-green-500 to-teal-500',
      emoji: '🎉'
    },
  ];

  const currentStepIndex = statusSteps.findIndex((step) => step.key === order.status);
  const currentStep = statusSteps[currentStepIndex];

  // Get appropriate animation based on status
  const getStatusAnimation = () => {
    switch (order.status) {
      case 'preparing':
        return <PreparationAnimation />;
      case 'delivering':
        return <DeliveryAnimation />;
      case 'delivered':
        return <DeliveredAnimation />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream to-white pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header with Live Timer */}
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
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-2">
                Spor Din Ordre {currentStep?.emoji}
              </h1>
              <p className="text-gray-600">Ordre #{order.orderNumber}</p>
            </div>
            <LiveTimer startTime={order.createdAt || new Date().toISOString()} />
          </div>
        </motion.div>

        {/* Status Animation Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-8"
        >
          {getStatusAnimation()}
        </motion.div>

        {/* Current Status Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`bg-gradient-to-r ${currentStep?.color} p-6 rounded-2xl text-white mb-8 shadow-xl`}
        >
          <div className="flex items-center gap-4">
            <motion.div
              animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center"
            >
              <currentStep.icon size={32} />
            </motion.div>
            <div>
              <h2 className="text-2xl font-bold">{currentStep?.label}</h2>
              <p className="opacity-90">{currentStep?.description}</p>
            </div>
          </div>
        </motion.div>

        {/* Status Timeline - Horizontal for desktop */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-8 shadow-lg mb-8"
        >
          <h2 className="text-xl font-bold text-secondary mb-6">Ordre Fremgang</h2>
          
          {/* Horizontal Timeline for Desktop */}
          <div className="hidden md:block">
            <div className="relative flex justify-between items-center">
              {/* Progress Line */}
              <div className="absolute left-0 right-0 top-6 h-1 bg-gray-200">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(currentStepIndex / (statusSteps.length - 1)) * 100}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-primary to-accent"
                />
              </div>

              {/* Steps */}
              {statusSteps.map((step, index) => {
                const isCompleted = index <= currentStepIndex;
                const isCurrent = index === currentStepIndex;
                const Icon = step.icon;

                return (
                  <motion.div
                    key={step.key}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative z-10 flex flex-col items-center"
                  >
                    <motion.div
                      animate={isCurrent ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ duration: 1, repeat: Infinity }}
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        isCompleted
                          ? `bg-gradient-to-br ${step.color} text-white shadow-lg`
                          : 'bg-gray-200 text-gray-400'
                      } ${isCurrent ? 'ring-4 ring-primary/20' : ''}`}
                    >
                      <Icon size={20} />
                    </motion.div>
                    <p className={`mt-2 text-xs font-medium text-center max-w-[80px] ${
                      isCompleted ? 'text-secondary' : 'text-gray-400'
                    }`}>
                      {step.label}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Vertical Timeline for Mobile */}
          <div className="md:hidden relative">
            <div className="absolute left-6 top-0 bottom-0 w-1 bg-gray-200">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(currentStepIndex / (statusSteps.length - 1)) * 100}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="w-full bg-gradient-to-b from-primary to-accent"
              />
            </div>

            <div className="space-y-6">
              {statusSteps.map((step, index) => {
                const isCompleted = index <= currentStepIndex;
                const isCurrent = index === currentStepIndex;
                const Icon = step.icon;

                return (
                  <motion.div
                    key={step.key}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <motion.div
                      animate={isCurrent ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ duration: 1, repeat: Infinity }}
                      className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 relative z-10 ${
                        isCompleted
                          ? `bg-gradient-to-br ${step.color} text-white shadow-lg`
                          : 'bg-gray-200 text-gray-400'
                      }`}
                    >
                      <Icon size={20} />
                    </motion.div>
                    <div>
                      <h3 className={`font-bold ${isCompleted ? 'text-secondary' : 'text-gray-400'}`}>
                        {step.emoji} {step.label}
                      </h3>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Order Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Delivery Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
          >
            <h3 className="text-lg font-bold text-secondary mb-4 flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <Navigation className="text-blue-600" size={20} />
              </div>
              Leveringsadresse
            </h3>
            <div className="space-y-2 text-gray-600">
              <p className="font-medium text-secondary">{order.customerInfo.name}</p>
              <p>{order.customerInfo.address}</p>
              <p>{order.customerInfo.zipCode} {order.customerInfo.city}</p>
              <div className="flex items-center gap-2 mt-4 pt-4 border-t">
                <Phone className="text-primary" size={18} />
                <p>{order.customerInfo.phone}</p>
              </div>
            </div>
          </motion.div>

          {/* Order Items */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
          >
            <h3 className="text-lg font-bold text-secondary mb-4 flex items-center gap-2">
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                <Pizza className="text-orange-600" size={20} />
              </div>
              Din Bestilling
            </h3>
            <div className="space-y-3">
              {order.items.map((item: any, index: number) => (
                <motion.div 
                  key={index} 
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 rounded-xl object-cover shadow-md"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-secondary">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.size} × {item.quantity}</p>
                  </div>
                  <p className="font-bold text-primary">
                    {(item.price * item.quantity * (item.size === 'Large' ? 1.3 : item.size === 'Medium' ? 1.15 : 1)).toFixed(0)} kr
                  </p>
                </motion.div>
              ))}
            </div>
            <div className="border-t mt-4 pt-4">
              <div className="flex justify-between items-center">
                <span className="font-bold text-secondary">Total</span>
                <span className="text-2xl font-bold text-primary">{order.total.toFixed(0)} kr</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Rating & Feedback Section (after delivery) */}
        <AnimatePresence>
          {showRating && order.status === 'delivered' && !feedbackSent && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30 }}
              className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-8 mb-8 border-2 border-yellow-200"
            >
              <div className="text-center">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.5, repeat: 3 }}
                >
                  <Gift className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                </motion.div>
                <h3 className="text-2xl font-bold text-secondary mb-2">Hvordan var din oplevelse?</h3>
                <p className="text-gray-600 mb-6">Din feedback hjælper os med at blive bedre!</p>
                
                {/* Star Rating */}
                <div className="flex justify-center gap-2 mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <motion.button
                      key={star}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setRating(star)}
                      className="focus:outline-none"
                    >
                      <Star
                        size={40}
                        className={star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                      />
                    </motion.button>
                  ))}
                </div>
                
                {/* Comment Section */}
                {rating > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-md mx-auto"
                  >
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Fortæl os om din oplevelse... (valgfrit)"
                      className="w-full px-4 py-3 border-2 border-yellow-200 rounded-xl focus:border-yellow-400 focus:outline-none resize-none mb-4"
                      rows={3}
                    />
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setFeedbackSent(true)}
                      className="bg-gradient-to-r from-primary to-accent text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow"
                    >
                      <ThumbsUp className="inline mr-2" size={18} />
                      Send Feedback
                    </motion.button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
          
          {/* Feedback Sent Confirmation */}
          {feedbackSent && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 mb-8 border-2 border-green-200 text-center"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5, repeat: 2 }}
              >
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              </motion.div>
              <h3 className="text-2xl font-bold text-green-700 mb-2">Tak for din feedback! 💚</h3>
              <p className="text-green-600">Vi sætter stor pris på din mening og arbejder konstant på at forbedre os.</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Lucky Wheel Section - Only for delivered orders */}
        {order.status === 'delivered' && (
          <LuckyWheelSection />
        )}

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-r from-secondary to-gray-800 rounded-2xl p-8 text-white text-center"
        >
          <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-80" />
          <h3 className="text-xl font-bold mb-2">Brug for hjælp?</h3>
          <p className="mb-6 opacity-80">Vi er her for at hjælpe dig</p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="tel:+4598123456"
              className="bg-white text-secondary px-6 py-3 rounded-xl font-semibold shadow-lg"
            >
              📞 +45 98 12 34 56
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="mailto:info@sorrentopizza.dk"
              className="bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-semibold"
            >
              ✉️ info@sorrentopizza.dk
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderTrackingPage;
