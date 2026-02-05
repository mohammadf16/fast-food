import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { offers } from '../data/offers';

const SpecialOffers = () => {
  const MotionLink = motion(Link);

  return (
    <section id="special-offers" className="py-20 bg-dark relative overflow-hidden">
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
            <span className="bg-gradient-to-r from-primary to-accent text-dark px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider shadow-lg">
              ًں”¥ Specielle Tilbud
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-4">
            Utrolige Tilbud
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Kun For Dig!
            </span>
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Grib disse fantastiske tilbud, fأ¸r de udlأ¸ber
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
              <div className="relative overflow-hidden rounded-3xl bg-white/5 border border-white/10 shadow-2xl">
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
                  <h3 className="text-xl font-bold text-white mb-2">
                    {offer.title}
                  </h3>
                  <p className="text-white/70 mb-4 leading-relaxed">
                    {offer.description}
                  </p>

                  {/* CTA Button */}
                  <MotionLink
                    to={`/offers/${offer.id}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full bg-gradient-to-r ${offer.color} text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-shadow`}
                  >
                    Bestil Nu
                    <ArrowRight size={18} />
                  </MotionLink>
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
          <p className="text-white/70 mb-4">
            Tilbuddene er gyldige i begrأ¦nset tid. Skyn dig!
          </p>
          <motion.a
            href="#menu"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 bg-primary text-black px-8 py-4 rounded-full font-bold hover:bg-primary/90 transition-colors shadow-xl"
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

