import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';
import { offers } from '../data/offers';

const OffersPage = () => {
  return (
    <div className="min-h-screen bg-dark pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 bg-white/10 text-white/80 px-4 py-2 rounded-full text-sm">
            Aktuelle tilbud
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-4">Vores Tilbud</h1>
          <p className="text-muted mt-3 max-w-2xl mx-auto">
            Vaelg det tilbud der passer bedst til dig. Klik for detaljer og vilkaar.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.map((offer, index) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative"
            >
              <div className="relative overflow-hidden rounded-3xl bg-white/5 border border-white/10 shadow-2xl">
                <div className="relative h-48 overflow-hidden">
                  <motion.img
                    src={offer.image}
                    alt={offer.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.4 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute top-4 right-4">
                    <span className={`bg-gradient-to-br ${offer.color} text-white px-4 py-2 rounded-xl font-bold text-xs shadow-lg`}>
                      {offer.badge}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{offer.title}</h3>
                  <p className="text-white/70 mb-4 leading-relaxed">{offer.description}</p>

                  <Link
                    to={`/offers/${offer.id}`}
                    className={`w-full bg-gradient-to-r ${offer.color} text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-shadow`}
                  >
                    Se detaljer
                    <ArrowRight size={18} />
                  </Link>
                </div>

                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${offer.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none`}></div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 bg-surface rounded-3xl p-8 border border-white/10 shadow-xl"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Saerlige rabatter?</h2>
              <p className="text-muted max-w-xl">
                For familie-, studerende- eller skoleaftaler: kontakt os, saa skraeddrsyr vi tilbuddet.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="tel:+4598123456"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-accent text-dark px-6 py-3 rounded-full font-semibold"
              >
                <Phone size={18} />
                Ring: +45 98 12 34 56
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white px-6 py-3 rounded-full"
              >
                Kontakt os
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OffersPage;
