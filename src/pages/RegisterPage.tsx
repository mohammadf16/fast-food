import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock, Phone, UserPlus, AlertCircle, CheckCircle } from 'lucide-react';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Adgangskoderne matcher ikke');
      return;
    }

    if (formData.password.length < 6) {
      setError('Adgangskode skal være mindst 6 tegn');
      return;
    }

    if (!/^\d{8}$/.test(formData.phone.replace(/\s/g, ''))) {
      setError('Telefonnummer skal være 8 cifre');
      return;
    }

    setIsLoading(true);

    const success = await register(
      formData.name,
      formData.email,
      formData.password,
      formData.phone
    );

    if (success) {
      navigate('/profile');
    } else {
      setError('Email er allerede registreret');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-dark pt-32 pb-20">
      <div className="max-w-md mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface rounded-3xl shadow-2xl p-8 border border-primary/10"
        >
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-3xl">S</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Opret Konto</h1>
            <p className="text-white/70">Bliv en del af Sorrento Pizza familien</p>
          </div>

          {/* Benefits */}
          <div className="bg-primary/10 border border-primary/30 rounded-xl p-4 mb-6">
            <p className="text-sm font-medium text-white mb-2">✨ Fordele ved at oprette konto:</p>
            <ul className="text-xs text-white/70 space-y-1">
              <li className="flex items-center gap-2">
                <CheckCircle size={14} />
                Hurtigere checkout
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={14} />
                Gem dine yndlingsadresser
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={14} />
                Se din ordrehistorik
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={14} />
                Eksklusive tilbud
              </li>
            </ul>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-primary/10 border border-primary/30 rounded-xl p-4 mb-6 flex items-center gap-3"
            >
              <AlertCircle className="text-primary" size={20} />
              <p className="text-sm text-white">{error}</p>
            </motion.div>
          )}

          {/* Register Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Fulde Navn
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={20} />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-white/10 bg-black/30 text-white placeholder:text-white/40 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  placeholder="Dit fulde navn"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={20} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-white/10 bg-black/30 text-white placeholder:text-white/40 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  placeholder="din@email.dk"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Telefon
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={20} />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-white/10 bg-black/30 text-white placeholder:text-white/40 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  placeholder="12345678"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Adgangskode
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={20} />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-white/10 bg-black/30 text-white placeholder:text-white/40 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  placeholder="Mindst 6 tegn"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Bekræft Adgangskode
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={20} />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-white/10 bg-black/30 text-white placeholder:text-white/40 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  placeholder="Gentag adgangskode"
                />
              </div>
            </div>

            <div className="flex items-start gap-2 pt-2">
              <input type="checkbox" required className="w-4 h-4 text-primary rounded mt-1" />
              <span className="text-sm text-white/70">
                Jeg accepterer{' '}
                <a href="#" className="text-primary hover:underline">
                  vilkår og betingelser
                </a>{' '}
                og{' '}
                <a href="#" className="text-primary hover:underline">
                  privatlivspolitik
                </a>
              </span>
            </div>

            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-primary to-accent text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center gap-2 disabled:opacity-50 mt-6"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <UserPlus size={20} />
                  Opret Konto
                </>
              )}
            </motion.button>
          </form>

          {/* Login Link */}
          <div className="mt-8 text-center">
            <p className="text-white/70">
              Har du allerede en konto?{' '}
              <Link to="/login" className="text-primary font-semibold hover:underline">
                Log ind
              </Link>
            </p>
          </div>

          {/* Back to Home */}
          <div className="mt-6 text-center">
            <Link to="/" className="text-sm text-white/60 hover:text-primary transition-colors">
              ← Tilbage til forsiden
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterPage;
