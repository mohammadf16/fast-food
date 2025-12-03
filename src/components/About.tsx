import { motion } from 'framer-motion';
import { Award, Clock, Users, Heart } from 'lucide-react';

const features = [
  {
    icon: Award,
    title: 'Premium Kvalitet',
    description: 'Vi bruger kun de fineste og friskeste ingredienser fra Italien',
  },
  {
    icon: Clock,
    title: 'Hurtig Levering',
    description: 'Din pizza leveres varm og frisk inden for 30-45 minutter',
  },
  {
    icon: Users,
    title: 'Familie Opskrifter',
    description: 'Traditionelle opskrifter videregivet gennem generationer',
  },
  {
    icon: Heart,
    title: 'Lavet med Kærlighed',
    description: 'Hver pizza laves med passion og dedikation til håndværket',
  },
];

const About = () => {
  return (
    <section id="about" className="py-20 bg-[#FFF8F0] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative z-10">
              <motion.img
                src="https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=600&q=80"
                alt="Pizza making"
                className="rounded-3xl shadow-2xl w-full"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              />
            </div>
            
            {/* Decorative Elements */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, type: 'spring' }}
              className="absolute -bottom-8 -right-8 w-40 h-40 bg-gradient-to-br from-[#D4382C] to-[#F5A623] rounded-3xl -z-10"
            />
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, type: 'spring' }}
              className="absolute -top-8 -left-8 w-32 h-32 bg-[#1A1A2E] rounded-full -z-10"
            />

            {/* Experience Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="absolute bottom-8 -right-4 lg:right-8 bg-white rounded-2xl p-6 shadow-xl"
            >
              <div className="text-4xl font-bold text-[#D4382C]">15+</div>
              <div className="text-gray-600 text-sm">Års Erfaring</div>
            </motion.div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-[#D4382C] font-semibold text-sm uppercase tracking-wider"
            >
              Om Sorrento Pizza
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1A1A2E] mt-2 mb-6">
              En Passion for
              <br />
              <span className="bg-gradient-to-r from-[#D4382C] to-[#F5A623] bg-clip-text text-transparent">
                Perfekte Pizzaer
              </span>
            </h2>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Siden 2009 har Sorrento Pizza været Aalborgs foretrukne
              destination for autentisk italiensk pizza. Vores dedikerede team
              af pizzabagere bruger kun de fineste ingredienser og
              traditionelle teknikker for at skabe den perfekte pizza hver
              gang.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Vi tror på, at en god pizza starter med kvalitetsingredienser.
              Derfor importerer vi vores tomater fra San Marzano, vores
              mozzarella fra Campania, og vores olivenolie fra Toscana.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-[#D4382C] to-[#F5A623] rounded-xl flex items-center justify-center flex-shrink-0">
                    <feature.icon className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1A1A2E] mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-gray-500 text-sm">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
