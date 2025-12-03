import { motion } from 'framer-motion';
import { Percent, Gift, Zap, ArrowRight } from 'lucide-react';

const offers = [
  {
    icon: Percent,
    badge: '20% OFF',
    title: 'Student Rabat',
    description: 'Vis dit studiekort og få 20% rabat på alle pizzaer',
    color: 'from-blue-600 to-purple-600',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=80',
  },
  {
    icon: Gift,
    badge: 'KØB 2 FÅ 1',
    title: 'Familie Deal',
    description: 'Køb 2 store pizzaer og få en medium pizza gratis',
    color: 'from-pink-600 to-rose-600',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80',
  },
  {
    icon: Zap,
    badge: 'HURTIG DEAL',
    title: 'Happy Hour',
    description: 'Hver dag kl. 15-17: Alle pizzaer til halv pris!',
    color: 'from-orange-600 to-red-600',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&q=80',
  },
];

const SpecialOffers = () => {
  return (
    <section className="py-20 bg-secondary relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -top-32 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute -bottom-32 -right-32 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="inline-block mb-4"
          >
            <span className="bg-gradient-to-r from-primary to-accent text-white px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider shadow-lg">
              🔥 Specielle Tilbud
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-4">
            Utrolige Tilbud
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-yellow-400">
              Kun For Dig!
            </span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Grib disse fantastiske tilbud, før de udløber
          </p>
        </motion.div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {offers.map((offer, index) => (
            <motion.div
              key={offer.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              <div className="relative overflow-hidden rounded-3xl bg-white shadow-2xl">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <motion.img
                    src={offer.image}
                    alt={offer.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  {/* Badge */}
                  <motion.div
                    initial={{ rotate: -12 }}
                    whileHover={{ rotate: 0, scale: 1.1 }}
                    className={`absolute top-4 right-4 bg-gradient-to-br ${offer.color} text-white px-4 py-2 rounded-xl font-bold text-sm shadow-lg`}
                  >
                    {offer.badge}
                  </motion.div>

                  {/* Icon */}
                  <div className="absolute bottom-4 left-4">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${offer.color} flex items-center justify-center shadow-lg`}>
                      <offer.icon className="text-white" size={24} />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-secondary mb-2">
                    {offer.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {offer.description}
                  </p>

                  {/* CTA Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full bg-gradient-to-r ${offer.color} text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-shadow`}
                  >
                    Bestil Nu
                    <ArrowRight size={18} />
                  </motion.button>
                </div>

                {/* Glow Effect */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${offer.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none`}></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-300 mb-4">
            Tilbuddene er gyldige i begrænset tid. Skyn dig!
          </p>
          <motion.a
            href="#menu"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 bg-white text-secondary px-8 py-4 rounded-full font-bold hover:bg-cream transition-colors shadow-xl"
          >
            Se Hele Menuen
            <ArrowRight size={20} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default SpecialOffers;
