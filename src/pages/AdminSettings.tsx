import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Save, Clock, MapPin, Phone, Mail, 
  Globe, Instagram, Facebook, Truck, CreditCard,
  Store, FileText, Image, Bell, Settings2, Palette,
  CheckCircle, AlertCircle, Gift, Percent, Search,
  Moon, Calendar, ShoppingBag
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Toast from '../components/Toast';

interface RestaurantSettings {
  // Branding
  restaurantName: string;
  slogan: string;
  description: string;
  logo: string;
  favicon: string;
  primaryColor: string;
  accentColor: string;
  
  // Contact
  phone: string;
  phoneSecondary: string;
  email: string;
  emailSupport: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
  googleMapsUrl: string;
  
  // Working Hours
  openTime: string;
  closeTime: string;
  closedDays: string[];
  specialHours: { date: string; openTime: string; closeTime: string; note: string }[];
  
  // Social Media
  website: string;
  instagram: string;
  facebook: string;
  twitter: string;
  youtube: string;
  tiktok: string;
  
  // Hero Section
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  heroButtonText: string;
  
  // About Us
  aboutTitle: string;
  aboutDescription: string;
  aboutImage: string;
  foundedYear: string;
  teamSize: string;
  specialties: string[];
  
  // Features/USPs
  features: { icon: string; title: string; description: string }[];
  
  // Testimonials
  showTestimonials: boolean;
  testimonials: { name: string; text: string; rating: number; image: string }[];
  
  // Trust Badges
  showTrustBadges: boolean;
  trustBadges: { icon: string; title: string; subtitle: string }[];
  
  // Notifications
  showGreeting: boolean;
  showClosedWarning: boolean;
  customClosedMessage: string;
  showPromoPopup: boolean;
  promoTitle: string;
  promoDescription: string;
  promoCode: string;
  
  // Vacation/Closed Mode
  isTemporarilyClosed: boolean;
  closedModeType: 'closed' | 'preorder';
  closedModeTitle: string;
  closedModeMessage: string;
  reopenDate: string;
  reopenTime: string;
  
  // Delivery
  deliveryEnabled: boolean;
  pickupEnabled: boolean;
  deliveryRadius: number;
  deliveryFee: number;
  freeDeliveryThreshold: number;
  minOrderAmount: number;
  estimatedDeliveryTime: string;
  estimatedPickupTime: string;
  
  // Payment
  paymentMethods: string[];
  acceptCash: boolean;
  acceptCard: boolean;
  acceptMobilePay: boolean;
  
  // SEO
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  
  // Legal
  termsUrl: string;
  privacyUrl: string;
  cookiePolicy: string;
}

const defaultSettings: RestaurantSettings = {
  restaurantName: 'Sorrento Pizza',
  slogan: 'Autentisk italiensk pizza siden 1985',
  description: 'Vi laver de bedste pizzaer i Aalborg med friske ingredienser og kærlighed.',
  logo: '',
  favicon: '',
  primaryColor: '#D4AF37',
  accentColor: '#F5D06F',
  
  phone: '+45 98 12 34 56',
  phoneSecondary: '',
  email: 'info@sorrentopizza.dk',
  emailSupport: 'support@sorrentopizza.dk',
  address: 'Hadsundvej 11',
  city: 'Aalborg',
  zipCode: '9000',
  country: 'Danmark',
  googleMapsUrl: '',
  
  openTime: '11:00',
  closeTime: '22:00',
  closedDays: [],
  specialHours: [],
  
  website: 'www.sorrentopizza.dk',
  instagram: '@sorrentopizza',
  facebook: 'SorrentoPizzaAalborg',
  twitter: '',
  youtube: '',
  tiktok: '',
  
  heroTitle: 'Autentisk Italiensk Pizza',
  heroSubtitle: 'Lavet med kærlighed og de fineste ingredienser',
  heroImage: '',
  heroButtonText: 'Se Menu',
  
  aboutTitle: 'Om Sorrento Pizza',
  aboutDescription: 'Siden 1985 har vi serveret autentisk italiensk pizza lavet med kærlighed og de fineste ingredienser. Vores hemmelige opskrift er gået i arv gennem generationer.',
  aboutImage: '',
  foundedYear: '1985',
  teamSize: '15+',
  specialties: ['Napolitansk Pizza', 'Friske Ingredienser', 'Stenovn'],
  
  features: [
    { icon: 'clock', title: 'Hurtig Levering', description: '30-45 min' },
    { icon: 'award', title: 'Kvalitet', description: 'Friske ingredienser' },
    { icon: 'heart', title: 'Lavet med Kærlighed', description: 'Siden 1985' },
  ],
  
  showTestimonials: true,
  testimonials: [],
  
  showTrustBadges: true,
  trustBadges: [
    { icon: 'shield', title: 'Sikker Betaling', subtitle: '100% sikker' },
    { icon: 'truck', title: 'Gratis Levering', subtitle: 'Over 200 kr' },
    { icon: 'award', title: 'Top Kvalitet', subtitle: 'Friske råvarer' },
  ],
  
  showGreeting: true,
  showClosedWarning: true,
  customClosedMessage: '',
  showPromoPopup: false,
  promoTitle: 'Specialtilbud!',
  promoDescription: '20% rabat på din første ordre',
  promoCode: 'WELCOME20',
  
  isTemporarilyClosed: false,
  closedModeType: 'preorder',
  closedModeTitle: 'Vi holder lukket',
  closedModeMessage: 'Vi åbner snart igen! Du kan stadig forudbestille.',
  reopenDate: '',
  reopenTime: '',
  
  deliveryEnabled: true,
  pickupEnabled: true,
  deliveryRadius: 5,
  deliveryFee: 29,
  freeDeliveryThreshold: 200,
  minOrderAmount: 100,
  estimatedDeliveryTime: '30-45 min',
  estimatedPickupTime: '15-20 min',
  
  paymentMethods: ['card', 'cash', 'mobilepay'],
  acceptCash: true,
  acceptCard: true,
  acceptMobilePay: true,
  
  metaTitle: 'Sorrento Pizza | Bedste Pizza i Aalborg',
  metaDescription: 'Bestil lækker italiensk pizza online. Hurtig levering i Aalborg.',
  metaKeywords: 'pizza, aalborg, italiensk, levering, takeaway',
  
  termsUrl: '/terms',
  privacyUrl: '/privacy',
  cookiePolicy: 'Vi bruger cookies for at forbedre din oplevelse.',
};

const weekDays = [
  { id: 'monday', label: 'Mandag' },
  { id: 'tuesday', label: 'Tirsdag' },
  { id: 'wednesday', label: 'Onsdag' },
  { id: 'thursday', label: 'Torsdag' },
  { id: 'friday', label: 'Fredag' },
  { id: 'saturday', label: 'Lørdag' },
  { id: 'sunday', label: 'Søndag' },
];

const AdminSettings = () => {
  const [settings, setSettings] = useState<RestaurantSettings>(defaultSettings);
  const [activeTab, setActiveTab] = useState('basic');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem('restaurantSettings');
    if (savedSettings) {
      setSettings({ ...defaultSettings, ...JSON.parse(savedSettings) });
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('restaurantSettings', JSON.stringify(settings));
    setToastMessage('Indstillinger gemt! ✓');
    setShowToast(true);
    setHasChanges(false);
  };

  const updateSetting = <K extends keyof RestaurantSettings>(key: K, value: RestaurantSettings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const toggleClosedDay = (day: string) => {
    setSettings(prev => ({
      ...prev,
      closedDays: prev.closedDays.includes(day)
        ? prev.closedDays.filter(d => d !== day)
        : [...prev.closedDays, day]
    }));
    setHasChanges(true);
  };

  const tabs = [
    { id: 'basic', label: 'Grundlæggende', icon: Store },
    { id: 'vacation', label: 'Ferie/Lukket', icon: Moon },
    { id: 'branding', label: 'Branding', icon: Palette },
    { id: 'hours', label: 'Åbningstider', icon: Clock },
    { id: 'contact', label: 'Kontakt', icon: Phone },
    { id: 'about', label: 'Om Os', icon: FileText },
    { id: 'social', label: 'Sociale Medier', icon: Globe },
    { id: 'notifications', label: 'Notifikationer', icon: Bell },
    { id: 'delivery', label: 'Levering', icon: Truck },
    { id: 'payment', label: 'Betaling', icon: CreditCard },
    { id: 'discounts', label: 'Rabatter', icon: Percent },
    { id: 'seo', label: 'SEO', icon: Search },
  ];

  return (
    <div className="min-h-screen bg-dark pt-24 pb-12">
      <Toast 
        message={toastMessage}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link
              to="/admin"
              className="inline-flex items-center gap-2 text-white/70 hover:text-primary transition-colors mb-4"
            >
              <ArrowLeft size={20} />
              Tilbage til Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <Settings2 className="text-primary" />
              Restaurant Indstillinger
            </h1>
            <p className="text-white/70 mt-1">Tilpas din restaurant og hjemmeside</p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSave}
            disabled={!hasChanges}
            className={`px-6 py-3 rounded-xl font-semibold flex items-center gap-2 shadow-lg ${
              hasChanges
                ? 'bg-gradient-to-r from-primary to-accent text-dark'
                : 'bg-white/10 text-white/50 cursor-not-allowed'
            }`}
          >
            <Save size={20} />
            Gem Ændringer
          </motion.button>
        </div>

        {/* Unsaved Changes Warning */}
        {hasChanges && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-primary/10 border border-primary/30 rounded-xl flex items-center gap-3"
          >
            <AlertCircle className="text-primary" size={20} />
            <span className="text-white">Du har ændringer der ikke er gemt</span>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Tabs */}
          <div className="lg:col-span-1">
            <div className="bg-surface rounded-2xl shadow-lg p-4 sticky top-24 border border-primary/10">
              <nav className="space-y-2">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-primary to-accent text-dark shadow-lg'
                        : 'text-white/70 hover:bg-white/5'
                    }`}
                  >
                    <tab.icon size={20} />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-surface rounded-2xl shadow-lg p-8 border border-primary/10"
            >
              {/* Vacation/Closed Mode Tab */}
              {activeTab === 'vacation' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Moon className="text-primary" size={24} />
                    Ferie / Midlertidig Lukket
                  </h2>
                  
                  {/* Main Toggle */}
                  <div className={`p-6 rounded-2xl border-2 transition-all ${
                    settings.isTemporarilyClosed 
                      ? 'bg-primary/10 border-primary/30' 
                      : 'bg-white/5 border-white/10'
                  }`}>
                    <label className="flex items-center justify-between cursor-pointer">
                      <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 rounded-full flex items-center justify-center ${
                          settings.isTemporarilyClosed ? 'bg-primary' : 'bg-white/10'
                        }`}>
                          <Moon size={28} className="text-white" />
                        </div>
                        <div>
                          <span className="font-bold text-lg text-white">Aktiver Lukket-tilstand</span>
                          <p className="text-sm text-white/70">
                            {settings.isTemporarilyClosed 
                              ? '⚠️ Butikken er i øjeblikket lukket for nye ordrer' 
                              : 'Butikken er åben som normalt'}
                          </p>
                        </div>
                      </div>
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={settings.isTemporarilyClosed}
                          onChange={(e) => updateSetting('isTemporarilyClosed', e.target.checked)}
                          className="sr-only"
                        />
                        <div className={`w-16 h-8 rounded-full transition-colors ${
                          settings.isTemporarilyClosed ? 'bg-primary/60' : 'bg-white/15'
                        }`}>
                          <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform mt-1 ${
                            settings.isTemporarilyClosed ? 'translate-x-9' : 'translate-x-1'
                          }`} />
                        </div>
                      </div>
                    </label>
                  </div>

                  {settings.isTemporarilyClosed && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="space-y-6"
                    >
                      {/* Mode Selection */}
                      <div>
                        <label className="block text-sm font-medium text-white/80 mb-3">
                          Vælg tilstand
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <label className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                            settings.closedModeType === 'closed'
                              ? 'border-primary bg-primary/10'
                              : 'border-white/10 hover:border-primary/40'
                          }`}>
                            <input
                              type="radio"
                              name="closedModeType"
                              value="closed"
                              checked={settings.closedModeType === 'closed'}
                              onChange={() => updateSetting('closedModeType', 'closed')}
                              className="sr-only"
                            />
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-primary/10 border border-primary/30 rounded-full flex items-center justify-center">
                                <Moon size={24} className="text-primary" />
                              </div>
                              <div>
                                <p className="font-bold text-white">Helt Lukket</p>
                                <p className="text-sm text-white/70">Ingen ordrer accepteres</p>
                              </div>
                            </div>
                          </label>
                          
                          <label className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                            settings.closedModeType === 'preorder'
                              ? 'border-primary bg-primary/10'
                              : 'border-white/10 hover:border-primary/40'
                          }`}>
                            <input
                              type="radio"
                              name="closedModeType"
                              value="preorder"
                              checked={settings.closedModeType === 'preorder'}
                              onChange={() => updateSetting('closedModeType', 'preorder')}
                              className="sr-only"
                            />
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-primary/10 border border-primary/30 rounded-full flex items-center justify-center">
                                <ShoppingBag size={24} className="text-primary" />
                              </div>
                              <div>
                                <p className="font-bold text-white">Forudbestilling</p>
                                <p className="text-sm text-white/70">Kunder kan bestille til senere</p>
                              </div>
                            </div>
                          </label>
                        </div>
                      </div>

                      {/* Custom Messages */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-white/80 mb-2">
                            Overskrift
                          </label>
                          <input
                            type="text"
                            value={settings.closedModeTitle}
                            onChange={(e) => updateSetting('closedModeTitle', e.target.value)}
                            placeholder="F.eks: Vi holder ferie"
                            className="w-full px-4 py-3 border border-white/10 bg-black/30 text-white placeholder:text-white/40 rounded-xl focus:border-primary focus:outline-none"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-white/80 mb-2">
                            Besked til kunder
                          </label>
                          <input
                            type="text"
                            value={settings.closedModeMessage}
                            onChange={(e) => updateSetting('closedModeMessage', e.target.value)}
                            placeholder="F.eks: Vi er tilbage mandag!"
                            className="w-full px-4 py-3 border border-white/10 bg-black/30 text-white placeholder:text-white/40 rounded-xl focus:border-primary focus:outline-none"
                          />
                        </div>
                      </div>

                      {/* Reopen Date/Time */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-white/80 mb-2">
                            <Calendar size={16} className="inline mr-1" />
                            Åbner igen (dato)
                          </label>
                          <input
                            type="date"
                            value={settings.reopenDate}
                            onChange={(e) => updateSetting('reopenDate', e.target.value)}
                            className="w-full px-4 py-3 border border-white/10 bg-black/30 text-white rounded-xl focus:border-primary focus:outline-none"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-white/80 mb-2">
                            <Clock size={16} className="inline mr-1" />
                            Åbner igen (tid)
                          </label>
                          <input
                            type="time"
                            value={settings.reopenTime}
                            onChange={(e) => updateSetting('reopenTime', e.target.value)}
                            className="w-full px-4 py-3 border border-white/10 bg-black/30 text-white rounded-xl focus:border-primary focus:outline-none"
                          />
                        </div>
                      </div>

                      {/* Preview */}
                      <div className="mt-6">
                        <p className="text-sm font-medium text-white/80 mb-3">Forhåndsvisning (Nattehimmel tema):</p>
                        <div className="relative rounded-2xl overflow-hidden h-80 bg-gradient-to-b from-black via-black to-black">
                          {/* Stars */}
                          {[...Array(30)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute rounded-full bg-white"
                              style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 60}%`,
                                width: Math.random() * 2 + 1,
                                height: Math.random() * 2 + 1,
                              }}
                              animate={{ opacity: [0.3, 1, 0.3] }}
                              transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
                            />
                          ))}
                          
                          {/* Moon */}
                          <motion.div
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="absolute top-4 right-6"
                          >
                            <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full shadow-lg shadow-primary/30" />
                          </motion.div>
                          
                          {/* Content */}
                          <div className="absolute inset-0 flex items-center justify-center p-4">
                            <div className="bg-black/70 backdrop-blur rounded-2xl p-6 text-center border border-primary/30 max-w-sm">
                              <motion.div
                                animate={{ rotate: [0, 5, -5, 0] }}
                                transition={{ duration: 3, repeat: Infinity }}
                                className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4"
                              >
                                <Moon size={32} className="text-black" />
                              </motion.div>
                              
                              <h3 className="text-xl font-bold text-white mb-2">
                                {settings.closedModeTitle || 'Vi holder lukket'}
                              </h3>
                              <p className="text-white/70 text-sm mb-4">
                                {settings.closedModeMessage || 'Vi åbner snart igen!'}
                              </p>
                              
                              {settings.reopenDate && (
                                <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full text-white text-xs mb-4">
                                  <Calendar size={12} />
                                  <span>
                                    {new Date(settings.reopenDate).toLocaleDateString('da-DK', { 
                                      day: 'numeric', 
                                      month: 'short' 
                                    })}
                                    {settings.reopenTime && ` kl. ${settings.reopenTime}`}
                                  </span>
                                </div>
                              )}
                              
                              {settings.closedModeType === 'preorder' && (
                                <button className="bg-primary text-black px-4 py-2 rounded-lg font-medium text-sm">
                                  🛒 Forudbestil
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {!settings.isTemporarilyClosed && (
                    <div className="p-6 bg-primary/10 rounded-xl border border-primary/30 text-center">
                      <CheckCircle size={48} className="text-primary mx-auto mb-3" />
                      <p className="text-white font-medium">Butikken er åben og kører normalt</p>
                      <p className="text-white/70 text-sm">Aktiver lukket-tilstand når du holder ferie eller lukker midlertidigt</p>
                    </div>
                  )}
                </div>
              )}

              {/* Basic Info Tab */}
              {activeTab === 'basic' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Store className="text-primary" size={24} />
                    Grundlæggende Information
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        Restaurant Navn
                      </label>
                      <input
                        type="text"
                        value={settings.restaurantName}
                        onChange={(e) => updateSetting('restaurantName', e.target.value)}
                        className="w-full px-4 py-3 border border-white/10 bg-black/30 text-white rounded-xl focus:border-primary focus:outline-none"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        Slogan
                      </label>
                      <input
                        type="text"
                        value={settings.slogan}
                        onChange={(e) => updateSetting('slogan', e.target.value)}
                        className="w-full px-4 py-3 border border-white/10 bg-black/30 text-white rounded-xl focus:border-primary focus:outline-none"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      Kort Beskrivelse
                    </label>
                    <textarea
                      value={settings.description}
                      onChange={(e) => updateSetting('description', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 border border-white/10 bg-black/30 text-white rounded-xl focus:border-primary focus:outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      <Image size={16} className="inline mr-1" />
                      Logo URL
                    </label>
                    <input
                      type="text"
                      value={settings.logo}
                      onChange={(e) => updateSetting('logo', e.target.value)}
                      placeholder="https://..."
                      className="w-full px-4 py-3 border border-white/10 bg-black/30 text-white placeholder:text-white/40 rounded-xl focus:border-primary focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Working Hours Tab */}
              {activeTab === 'hours' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Clock className="text-primary" size={24} />
                    Åbningstider
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        Åbner kl.
                      </label>
                      <input
                        type="time"
                        value={settings.openTime}
                        onChange={(e) => updateSetting('openTime', e.target.value)}
                        className="w-full px-4 py-3 border border-white/10 bg-black/30 text-white rounded-xl focus:border-primary focus:outline-none"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        Lukker kl.
                      </label>
                      <input
                        type="time"
                        value={settings.closeTime}
                        onChange={(e) => updateSetting('closeTime', e.target.value)}
                        className="w-full px-4 py-3 border border-white/10 bg-black/30 text-white rounded-xl focus:border-primary focus:outline-none"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-3">
                      Lukkedage
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {weekDays.map(day => (
                        <button
                          key={day.id}
                          onClick={() => toggleClosedDay(day.id)}
                          className={`px-4 py-2 rounded-xl font-medium transition-all ${
                            settings.closedDays.includes(day.id)
                              ? 'bg-primary/20 text-primary border-2 border-primary/40'
                              : 'bg-white/5 text-white/70 hover:bg-white/10'
                          }`}
                        >
                          {day.label}
                        </button>
                      ))}
                    </div>
                    <p className="text-sm text-white/60 mt-2">
                      Klik på en dag for at markere den som lukket
                    </p>
                  </div>
                  
                  <div className="p-4 bg-primary/10 border border-primary/30 rounded-xl">
                    <div className="flex items-center gap-2 text-primary">
                      <CheckCircle size={20} />
                      <span className="font-medium">
                        Åbningstider: {settings.openTime} - {settings.closeTime}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Contact Tab */}
              {activeTab === 'contact' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Phone className="text-primary" size={24} />
                    Kontakt Information
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        <Phone size={16} className="inline mr-1" />
                        Telefon
                      </label>
                      <input
                        type="tel"
                        value={settings.phone}
                        onChange={(e) => updateSetting('phone', e.target.value)}
                        className="w-full px-4 py-3 border border-white/10 bg-black/30 text-white rounded-xl focus:border-primary focus:outline-none"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        <Mail size={16} className="inline mr-1" />
                        Email
                      </label>
                      <input
                        type="email"
                        value={settings.email}
                        onChange={(e) => updateSetting('email', e.target.value)}
                        className="w-full px-4 py-3 border border-white/10 bg-black/30 text-white rounded-xl focus:border-primary focus:outline-none"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      <MapPin size={16} className="inline mr-1" />
                      Adresse
                    </label>
                    <input
                      type="text"
                      value={settings.address}
                      onChange={(e) => updateSetting('address', e.target.value)}
                      className="w-full px-4 py-3 border border-white/10 bg-black/30 text-white rounded-xl focus:border-primary focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* About Us Tab */}
              {activeTab === 'about' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <FileText className="text-primary" size={24} />
                    Om Os Sektion
                  </h2>
                  
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      Overskrift
                    </label>
                    <input
                      type="text"
                      value={settings.aboutTitle}
                      onChange={(e) => updateSetting('aboutTitle', e.target.value)}
                      className="w-full px-4 py-3 border border-white/10 bg-black/30 text-white rounded-xl focus:border-primary focus:outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      Beskrivelse
                    </label>
                    <textarea
                      value={settings.aboutDescription}
                      onChange={(e) => updateSetting('aboutDescription', e.target.value)}
                      rows={5}
                      className="w-full px-4 py-3 border border-white/10 bg-black/30 text-white rounded-xl focus:border-primary focus:outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      <Image size={16} className="inline mr-1" />
                      Billede URL
                    </label>
                    <input
                      type="text"
                      value={settings.aboutImage}
                      onChange={(e) => updateSetting('aboutImage', e.target.value)}
                      placeholder="https://..."
                      className="w-full px-4 py-3 border border-white/10 bg-black/30 text-white placeholder:text-white/40 rounded-xl focus:border-primary focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Social Media Tab */}
              {activeTab === 'social' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Globe className="text-primary" size={24} />
                    Sociale Medier
                  </h2>
                  
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      <Globe size={16} className="inline mr-1" />
                      Hjemmeside
                    </label>
                    <input
                      type="text"
                      value={settings.website}
                      onChange={(e) => updateSetting('website', e.target.value)}
                      className="w-full px-4 py-3 border border-white/10 bg-black/30 text-white rounded-xl focus:border-primary focus:outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      <Instagram size={16} className="inline mr-1" />
                      Instagram
                    </label>
                    <input
                      type="text"
                      value={settings.instagram}
                      onChange={(e) => updateSetting('instagram', e.target.value)}
                      className="w-full px-4 py-3 border border-white/10 bg-black/30 text-white rounded-xl focus:border-primary focus:outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      <Facebook size={16} className="inline mr-1" />
                      Facebook
                    </label>
                    <input
                      type="text"
                      value={settings.facebook}
                      onChange={(e) => updateSetting('facebook', e.target.value)}
                      className="w-full px-4 py-3 border border-white/10 bg-black/30 text-white rounded-xl focus:border-primary focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Bell className="text-primary" size={24} />
                    Notifikationer
                  </h2>
                  
                  <div className="space-y-4">
                    <label className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-xl cursor-pointer hover:bg-white/10 transition-colors">
                      <input
                        type="checkbox"
                        checked={settings.showGreeting}
                        onChange={(e) => updateSetting('showGreeting', e.target.checked)}
                        className="w-5 h-5 rounded border-white/20 bg-black/30 text-primary focus:ring-primary"
                      />
                      <div>
                        <span className="font-medium text-white">Vis velkomstbesked</span>
                        <p className="text-sm text-white/60">Vis en hilsen baseret på tid på dagen</p>
                      </div>
                    </label>
                    
                    <label className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-xl cursor-pointer hover:bg-white/10 transition-colors">
                      <input
                        type="checkbox"
                        checked={settings.showClosedWarning}
                        onChange={(e) => updateSetting('showClosedWarning', e.target.checked)}
                        className="w-5 h-5 rounded border-white/20 bg-black/30 text-primary focus:ring-primary"
                      />
                      <div>
                        <span className="font-medium text-white">Vis lukket-advarsel</span>
                        <p className="text-sm text-white/60">Advar brugere når restauranten er lukket</p>
                      </div>
                    </label>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      Tilpasset lukket-besked (valgfrit)
                    </label>
                    <textarea
                      value={settings.customClosedMessage}
                      onChange={(e) => updateSetting('customClosedMessage', e.target.value)}
                      placeholder="F.eks: Vi holder lukket i dag pga. helligdag..."
                      rows={2}
                      className="w-full px-4 py-3 border border-white/10 bg-black/30 text-white placeholder:text-white/40 rounded-xl focus:border-primary focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'delivery' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Truck className="text-primary" size={24} />
                    Levering
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="flex items-center gap-3 p-4 bg-black/30 border border-white/10 rounded-xl cursor-pointer hover:bg-black/40 transition-colors">
                      <input
                        type="checkbox"
                        checked={settings.deliveryEnabled}
                        onChange={(e) => updateSetting('deliveryEnabled', e.target.checked)}
                        className="w-5 h-5 rounded border-white/20 bg-black/30 text-primary focus:ring-primary"
                      />
                      <div>
                        <span className="font-medium text-white">Aktiver levering</span>
                        <p className="text-sm text-white/60">Tillad kunder at bestille levering</p>
                      </div>
                    </label>
                    
                    <label className="flex items-center gap-3 p-4 bg-black/30 border border-white/10 rounded-xl cursor-pointer hover:bg-black/40 transition-colors">
                      <input
                        type="checkbox"
                        checked={settings.pickupEnabled}
                        onChange={(e) => updateSetting('pickupEnabled', e.target.checked)}
                        className="w-5 h-5 rounded border-white/20 bg-black/30 text-primary focus:ring-primary"
                      />
                      <div>
                        <span className="font-medium text-white">Aktiver afhentning</span>
                        <p className="text-sm text-white/60">Tillad kunder at afhente selv</p>
                      </div>
                    </label>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        Leveringsradius (km)
                      </label>
                      <input
                        type="number"
                        value={settings.deliveryRadius}
                        onChange={(e) => updateSetting('deliveryRadius', Number(e.target.value))}
                        className="w-full px-4 py-3 border border-white/10 bg-black/30 text-white rounded-xl focus:border-primary focus:outline-none"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        Leveringsgebyr (kr)
                      </label>
                      <input
                        type="number"
                        value={settings.deliveryFee}
                        onChange={(e) => updateSetting('deliveryFee', Number(e.target.value))}
                        className="w-full px-4 py-3 border border-white/10 bg-black/30 text-white rounded-xl focus:border-primary focus:outline-none"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        Gratis levering over (kr)
                      </label>
                      <input
                        type="number"
                        value={settings.freeDeliveryThreshold}
                        onChange={(e) => updateSetting('freeDeliveryThreshold', Number(e.target.value))}
                        className="w-full px-4 py-3 border border-white/10 bg-black/30 text-white rounded-xl focus:border-primary focus:outline-none"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        Minimum ordrebeløb (kr)
                      </label>
                      <input
                        type="number"
                        value={settings.minOrderAmount}
                        onChange={(e) => updateSetting('minOrderAmount', Number(e.target.value))}
                        className="w-full px-4 py-3 border border-white/10 bg-black/30 text-white rounded-xl focus:border-primary focus:outline-none"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        Estimeret leveringstid
                      </label>
                      <input
                        type="text"
                        value={settings.estimatedDeliveryTime}
                        onChange={(e) => updateSetting('estimatedDeliveryTime', e.target.value)}
                        placeholder="F.eks: 30-45 min"
                        className="w-full px-4 py-3 border border-white/10 bg-black/30 text-white placeholder:text-white/40 rounded-xl focus:border-primary focus:outline-none"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        Estimeret afhentningstid
                      </label>
                      <input
                        type="text"
                        value={settings.estimatedPickupTime}
                        onChange={(e) => updateSetting('estimatedPickupTime', e.target.value)}
                        placeholder="F.eks: 15-20 min"
                        className="w-full px-4 py-3 border border-white/10 bg-black/30 text-white placeholder:text-white/40 rounded-xl focus:border-primary focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Branding Tab */}
              {activeTab === 'branding' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Palette className="text-primary" size={24} />
                    Branding & Farver
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        Primær Farve
                      </label>
                      <div className="flex gap-3">
                        <input
                          type="color"
                          value={settings.primaryColor}
                          onChange={(e) => updateSetting('primaryColor', e.target.value)}
                          className="w-14 h-14 rounded-xl border-2 border-white/10 cursor-pointer"
                        />
                        <input
                          type="text"
                          value={settings.primaryColor}
                          onChange={(e) => updateSetting('primaryColor', e.target.value)}
                          className="flex-1 px-4 py-3 border border-white/10 bg-black/30 text-white rounded-xl focus:border-primary focus:outline-none"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        Accent Farve
                      </label>
                      <div className="flex gap-3">
                        <input
                          type="color"
                          value={settings.accentColor}
                          onChange={(e) => updateSetting('accentColor', e.target.value)}
                          className="w-14 h-14 rounded-xl border-2 border-white/10 cursor-pointer"
                        />
                        <input
                          type="text"
                          value={settings.accentColor}
                          onChange={(e) => updateSetting('accentColor', e.target.value)}
                          className="flex-1 px-4 py-3 border border-white/10 bg-black/30 text-white rounded-xl focus:border-primary focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-xl" style={{ background: `linear-gradient(135deg, ${settings.primaryColor}, ${settings.accentColor})` }}>
                    <p className="text-white font-bold text-center">Forhåndsvisning af farver</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      Hero Overskrift
                    </label>
                    <input
                      type="text"
                      value={settings.heroTitle}
                      onChange={(e) => updateSetting('heroTitle', e.target.value)}
                      className="w-full px-4 py-3 border border-white/10 bg-black/30 text-white rounded-xl focus:border-primary focus:outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      Hero Underoverskrift
                    </label>
                    <input
                      type="text"
                      value={settings.heroSubtitle}
                      onChange={(e) => updateSetting('heroSubtitle', e.target.value)}
                      className="w-full px-4 py-3 border border-white/10 bg-black/30 text-white rounded-xl focus:border-primary focus:outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      Hero Knap Tekst
                    </label>
                    <input
                      type="text"
                      value={settings.heroButtonText}
                      onChange={(e) => updateSetting('heroButtonText', e.target.value)}
                      className="w-full px-4 py-3 border border-white/10 bg-black/30 text-white rounded-xl focus:border-primary focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Payment Tab */}
              {activeTab === 'payment' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <CreditCard className="text-primary" size={24} />
                    Betalingsmetoder
                  </h2>
                  
                  <div className="space-y-4">
                    <label className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-xl cursor-pointer hover:bg-white/10 transition-colors">
                      <input
                        type="checkbox"
                        checked={settings.acceptCard}
                        onChange={(e) => updateSetting('acceptCard', e.target.checked)}
                        className="w-5 h-5 rounded border-white/20 bg-black/30 text-primary focus:ring-primary"
                      />
                      <CreditCard size={24} className="text-primary" />
                      <div>
                        <span className="font-medium text-white">Kredit/Debitkort</span>
                        <p className="text-sm text-white/60">Visa, Mastercard, etc.</p>
                      </div>
                    </label>
                    
                    <label className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-xl cursor-pointer hover:bg-white/10 transition-colors">
                      <input
                        type="checkbox"
                        checked={settings.acceptMobilePay}
                        onChange={(e) => updateSetting('acceptMobilePay', e.target.checked)}
                        className="w-5 h-5 rounded border-white/20 bg-black/30 text-primary focus:ring-primary"
                      />
                      <Phone size={24} className="text-primary" />
                      <div>
                        <span className="font-medium text-white">MobilePay</span>
                        <p className="text-sm text-white/60">Betal med MobilePay</p>
                      </div>
                    </label>
                    
                    <label className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-xl cursor-pointer hover:bg-white/10 transition-colors">
                      <input
                        type="checkbox"
                        checked={settings.acceptCash}
                        onChange={(e) => updateSetting('acceptCash', e.target.checked)}
                        className="w-5 h-5 rounded border-white/20 bg-black/30 text-primary focus:ring-primary"
                      />
                      <span className="text-2xl">💵</span>
                      <div>
                        <span className="font-medium text-white">Kontant</span>
                        <p className="text-sm text-white/60">Betal ved levering</p>
                      </div>
                    </label>
                  </div>
                </div>
              )}

              {/* Discounts Tab */}
              {activeTab === 'discounts' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Percent className="text-primary" size={24} />
                    Rabatter & Kampagner
                  </h2>
                  
                  <div className="space-y-4">
                    <label className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-xl cursor-pointer hover:bg-white/10 transition-colors">
                      <input
                        type="checkbox"
                        checked={settings.showPromoPopup}
                        onChange={(e) => updateSetting('showPromoPopup', e.target.checked)}
                        className="w-5 h-5 rounded border-white/20 bg-black/30 text-primary focus:ring-primary"
                      />
                      <Gift size={24} className="text-primary" />
                      <div>
                        <span className="font-medium text-white">Vis Kampagne Popup</span>
                        <p className="text-sm text-white/60">Vis en popup med tilbud til nye besøgende</p>
                      </div>
                    </label>
                  </div>
                  
                  {settings.showPromoPopup && (
                    <div className="space-y-4 p-4 bg-primary/10 border border-primary/30 rounded-xl">
                      <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">
                          Kampagne Titel
                        </label>
                        <input
                          type="text"
                          value={settings.promoTitle}
                          onChange={(e) => updateSetting('promoTitle', e.target.value)}
                          className="w-full px-4 py-3 border border-white/10 bg-black/30 text-white rounded-xl focus:border-primary focus:outline-none"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">
                          Kampagne Beskrivelse
                        </label>
                        <input
                          type="text"
                          value={settings.promoDescription}
                          onChange={(e) => updateSetting('promoDescription', e.target.value)}
                          className="w-full px-4 py-3 border border-white/10 bg-black/30 text-white rounded-xl focus:border-primary focus:outline-none"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">
                          Rabatkode
                        </label>
                        <input
                          type="text"
                          value={settings.promoCode}
                          onChange={(e) => updateSetting('promoCode', e.target.value.toUpperCase())}
                          className="w-full px-4 py-3 border border-white/10 bg-black/30 text-white rounded-xl focus:border-primary focus:outline-none font-mono"
                        />
                      </div>
                    </div>
                  )}
                  
                  <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                    <h4 className="font-medium text-white mb-2">Aktive Rabatkoder</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <code className="bg-black/30 border border-white/10 text-white px-2 py-1 rounded">SPIN5</code>
                        <span className="text-white/70">5% rabat</span>
                      </div>
                      <div className="flex justify-between">
                        <code className="bg-black/30 border border-white/10 text-white px-2 py-1 rounded">SPIN10</code>
                        <span className="text-white/70">10% rabat</span>
                      </div>
                      <div className="flex justify-between">
                        <code className="bg-black/30 border border-white/10 text-white px-2 py-1 rounded">SPIN15</code>
                        <span className="text-white/70">15% rabat</span>
                      </div>
                      <div className="flex justify-between">
                        <code className="bg-black/30 border border-white/10 text-white px-2 py-1 rounded">SPIN20</code>
                        <span className="text-white/70">20% rabat</span>
                      </div>
                      <div className="flex justify-between">
                        <code className="bg-black/30 border border-white/10 text-white px-2 py-1 rounded">FREESHIP</code>
                        <span className="text-white/70">Gratis levering</span>
                      </div>
                      <div className="flex justify-between">
                        <code className="bg-black/30 border border-white/10 text-white px-2 py-1 rounded">FREEDRINK</code>
                        <span className="text-white/70">Gratis drik</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SEO Tab */}
              {activeTab === 'seo' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Search className="text-primary" size={24} />
                    SEO & Meta Tags
                  </h2>
                  
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      Meta Titel
                    </label>
                    <input
                      type="text"
                      value={settings.metaTitle}
                      onChange={(e) => updateSetting('metaTitle', e.target.value)}
                      className="w-full px-4 py-3 border border-white/10 bg-black/30 text-white rounded-xl focus:border-primary focus:outline-none"
                    />
                    <p className="text-xs text-white/60 mt-1">Anbefalet: 50-60 tegn</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      Meta Beskrivelse
                    </label>
                    <textarea
                      value={settings.metaDescription}
                      onChange={(e) => updateSetting('metaDescription', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 border border-white/10 bg-black/30 text-white rounded-xl focus:border-primary focus:outline-none"
                    />
                    <p className="text-xs text-white/60 mt-1">Anbefalet: 150-160 tegn</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      Nøgleord (kommasepareret)
                    </label>
                    <input
                      type="text"
                      value={settings.metaKeywords}
                      onChange={(e) => updateSetting('metaKeywords', e.target.value)}
                      placeholder="pizza, aalborg, levering, italiensk"
                      className="w-full px-4 py-3 border border-white/10 bg-black/30 text-white placeholder:text-white/40 rounded-xl focus:border-primary focus:outline-none"
                    />
                  </div>
                  
                  <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                    <h4 className="font-medium text-white mb-2">Forhåndsvisning i Google</h4>
                    <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                      <p className="text-primary text-lg hover:underline cursor-pointer">{settings.metaTitle || 'Sidetitel'}</p>
                      <p className="text-white/70 text-sm">{settings.website || 'www.example.com'}</p>
                      <p className="text-white/70 text-sm">{settings.metaDescription || 'Meta beskrivelse vises her...'}</p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
