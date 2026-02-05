import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Package, Clock, MapPin, Phone, Mail, Home } from 'lucide-react';

const OrderConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderNumber, formData, total } = location.state || {};

  useEffect(() => {
    if (!orderNumber) {
      navigate('/');
    }
  }, [orderNumber, navigate]);

  if (!orderNumber) return null;

  const estimatedTime = new Date(Date.now() + 30 * 60 * 1000).toLocaleTimeString('da-DK', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="min-h-screen bg-dark pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        {/* Success Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
          className="text-center mb-8"
        >
          <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
            <CheckCircle className="text-white" size={64} />
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Tak for din bestilling!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-xl text-muted"
          >
            Din ordre er modtaget og bliver tilberedt
          </motion.p>
        </motion.div>

        {/* Order Number */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-primary to-accent text-black rounded-2xl p-8 text-center mb-8 shadow-xl"
        >
          <p className="text-sm uppercase tracking-wider mb-2 opacity-70">
            Ordre Nummer
          </p>
          <p className="text-5xl font-bold tracking-wider">#{orderNumber}</p>
        </motion.div>

        {/* Status Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-surface rounded-2xl p-8 shadow-lg mb-8 border border-primary/10"
        >
          <h2 className="text-2xl font-bold text-white mb-6">
            Ordre Status
          </h2>
          <div className="space-y-6">
            {[
              {
                icon: CheckCircle,
                title: 'Ordre Modtaget',
                description: 'Din ordre er bekræftet',
                status: 'completed',
              },
              {
                icon: Package,
                title: 'Tilberedning',
                description: 'Vores pizzabagere er i gang',
                status: 'active',
              },
              {
                icon: Clock,
                title: 'Klar til Levering',
                description: `Estimeret tid: ${estimatedTime}`,
                status: 'pending',
              },
              {
                icon: MapPin,
                title: 'På Vej',
                description: 'Din pizza er på vej til dig',
                status: 'pending',
              },
            ].map((step) => (
              <div key={step.title} className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                    step.status === 'completed'
                      ? 'bg-green-100 text-green-600'
                      : step.status === 'active'
                      ? 'bg-primary/10 text-primary animate-pulse'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  <step.icon size={24} />
                </div>
                <div className="flex-1">
                  <h3
                    className={`font-bold ${
                      step.status === 'pending' ? 'text-gray-400' : 'text-secondary'
                    }`}
                  >
                    {step.title}
                  </h3>
                  <p
                    className={`text-sm ${
                      step.status === 'pending' ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Delivery Details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <h3 className="text-xl font-bold text-secondary mb-4">
              Leveringsoplysninger
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="text-primary mt-1" size={20} />
                <div>
                  <p className="font-medium text-secondary">
                    {formData.firstName} {formData.lastName}
                  </p>
                  <p className="text-gray-600 text-sm">{formData.address}</p>
                  <p className="text-gray-600 text-sm">
                    {formData.zipCode} {formData.city}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-primary" size={20} />
                <p className="text-gray-600">{formData.phone}</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="text-primary" size={20} />
                <p className="text-gray-600">{formData.email}</p>
              </div>
              {formData.deliveryNotes && (
                <div className="mt-4 p-3 bg-cream rounded-lg">
                  <p className="text-sm text-gray-600">
                    <strong>Note:</strong> {formData.deliveryNotes}
                  </p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 }}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <h3 className="text-xl font-bold text-secondary mb-4">
              Ordre Oversigt
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between text-gray-600">
                <span>Total Betalt</span>
                <span className="text-2xl font-bold text-primary">
                  {total.toFixed(0)} kr
                </span>
              </div>
              <div className="border-t pt-3">
                <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 p-3 rounded-lg">
                  <CheckCircle size={16} />
                  <span>Betaling gennemført</span>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Estimeret leveringstid: 30-45 min</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Du modtager en SMS når pizzaen er på vej</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-primary to-accent text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 shadow-lg"
            >
              <Home size={20} />
              Tilbage til Forsiden
            </motion.button>
          </Link>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.print()}
            className="border-2 border-primary text-primary px-8 py-4 rounded-full font-bold hover:bg-primary hover:text-white transition-colors"
          >
            Print Kvittering
          </motion.button>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600 mb-4">
            Har du spørgsmål til din ordre?
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <a
              href="tel:+4598123456"
              className="text-primary hover:underline font-medium"
            >
              Ring til os: +45 98 12 34 56
            </a>
            <span className="text-gray-400">|</span>
            <a
              href="mailto:info@sorrentopizza.dk"
              className="text-primary hover:underline font-medium"
            >
              Email: info@sorrentopizza.dk
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
