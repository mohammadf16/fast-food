import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BadgePercent, CheckCircle2, Info, Phone, Sparkles } from 'lucide-react';
import { offers } from '../data/offers';

const OfferDetailsPage = () => {
  const { offerId } = useParams();
  const offer = offers.find((item) => item.id === offerId);

  if (!offer) {
    return (
      <div className="min-h-screen bg-dark pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-surface rounded-3xl p-10 text-center shadow-2xl border border-white/10">
            <div className="w-14 h-14 mx-auto rounded-full bg-primary/20 flex items-center justify-center mb-4">
              <Info className="text-primary" size={26} />
            </div>
            <h1 className="text-3xl font-bold text-white mb-3">Tilbud ikke fundet</h1>
            <p className="text-muted mb-8">
              Vi kunne ikke finde det tilbud. Se vores aktuelle tilbud eller ga til menuen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 bg-surface-2 text-white px-6 py-3 rounded-full hover:bg-surface transition-colors"
              >
                <ArrowLeft size={18} />
                Tilbage til forsiden
              </Link>
              <Link
                to="/menu"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-accent text-dark px-6 py-3 rounded-full font-semibold"
              >
                Se menuen
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const relatedOffers = offers.filter((item) => item.id !== offer.id);
  const Icon = offer.icon;
  const MotionLink = motion(Link);
  const contactNote =
    offer.id === 'student-rabat'
      ? 'For studierabat skal gyldigt studiekort vises. Kontakt os for skole- eller studieaftaler.'
      : offer.id === 'familie-deal'
      ? 'For store familieordrer eller events kan vi lave en aftale. Kontakt os for at fa rabat.'
      : 'Happy Hour gaelder kun kl. 15:00-17:00. Kontakt os hvis du har spoergsmaal til tidsrummet.';

  return (
    <div className="min-h-screen bg-dark pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        <MotionLink
          to="/"
          whileHover={{ x: -4 }}
          className="inline-flex items-center gap-2 text-muted hover:text-white transition-colors mb-6"
        >
          <ArrowLeft size={16} />
          Tilbage
        </MotionLink>

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl"
          >
            <img src={offer.image} alt={offer.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className={`inline-flex items-center gap-2 bg-gradient-to-r ${offer.color} text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg`}>
                <BadgePercent size={16} />
                {offer.badge}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-white mt-4">{offer.title}</h1>
              <p className="text-white/80 mt-2">{offer.description}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-surface rounded-3xl p-8 border border-white/10 shadow-2xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${offer.color} flex items-center justify-center shadow-lg`}>
                <Icon className="text-white" size={22} />
              </div>
              <div>
                <p className="text-muted text-sm">Aktuelt tilbud</p>
                <h2 className="text-2xl font-bold text-white">{offer.title}</h2>
              </div>
            </div>

            <p className="text-white/70 leading-relaxed mb-6">{offer.highlight}</p>

            <div className="flex flex-wrap gap-3 mb-6">
              {offer.schedule.map((item) => (
                <span
                  key={item}
                  className="bg-white/5 border border-white/10 text-muted px-3 py-1.5 rounded-full text-sm"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <MotionLink
                to={offer.cta.primaryTo}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r ${offer.color} text-white px-6 py-3 rounded-full font-semibold shadow-lg`}
              >
                {offer.cta.primaryLabel}
                <ArrowRight size={18} />
              </MotionLink>
              <MotionLink
                to={offer.cta.secondaryTo}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white px-6 py-3 rounded-full"
              >
                {offer.cta.secondaryLabel}
              </MotionLink>
            </div>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-surface-2 rounded-2xl p-6 border border-white/10"
          >
            <div className="flex items-center gap-2 text-white mb-4">
              <Sparkles size={18} className="text-primary" />
              <h3 className="font-semibold text-lg">Dette far du</h3>
            </div>
            <ul className="space-y-3">
              {offer.includes.map((item) => (
                <li key={item} className="flex items-start gap-2 text-muted">
                  <CheckCircle2 size={16} className="text-primary mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-surface-2 rounded-2xl p-6 border border-white/10"
          >
            <div className="flex items-center gap-2 text-white mb-4">
              <BadgePercent size={18} className="text-primary" />
              <h3 className="font-semibold text-lg">Saadan bruger du det</h3>
            </div>
            <ol className="space-y-3">
              {offer.steps.map((item, index) => (
                <li key={item} className="flex items-start gap-3 text-muted">
                  <span className="w-6 h-6 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center mt-0.5">
                    {index + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-surface-2 rounded-2xl p-6 border border-white/10"
          >
            <div className="flex items-center gap-2 text-white mb-4">
              <Info size={18} className="text-primary" />
              <h3 className="font-semibold text-lg">Vilkaar</h3>
            </div>
            <ul className="space-y-3">
              {offer.finePrint.map((item) => (
                <li key={item} className="flex items-start gap-2 text-muted">
                  <CheckCircle2 size={16} className="text-primary mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 bg-surface rounded-3xl p-8 border border-white/10 shadow-xl"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Saadan faar du rabatten</h3>
              <p className="text-muted max-w-2xl">{contactNote}</p>
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

        {relatedOffers.length > 0 && (
          <div className="mt-14">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">Flere tilbud</h3>
              <Link to="/menu" className="text-primary hover:text-accent transition-colors">
                Se menuen
              </Link>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {relatedOffers.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ y: -6 }}
                  className="group relative"
                >
                  <Link to={`/offers/${item.id}`} className="block bg-surface rounded-2xl overflow-hidden border border-white/10 shadow-xl">
                    <div className="relative h-40 overflow-hidden">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4">
                        <span className={`inline-flex items-center gap-2 bg-gradient-to-r ${item.color} text-white px-3 py-1.5 rounded-full text-xs font-semibold`}>
                          {item.badge}
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <h4 className="text-lg font-semibold text-white mb-2">{item.title}</h4>
                      <p className="text-muted text-sm">{item.description}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OfferDetailsPage;

