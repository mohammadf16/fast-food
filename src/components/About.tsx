import { motion } from 'framer-motion';
import { Award, Clock, Users, Heart } from 'lucide-react';
import { useEffect, useState } from 'react';

const defaultFeatures = [
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
  const [aboutTitle, setAboutTitle] = useState('En Passion for');
  const [aboutHighlight] = useState('Perfekte Pizzaer');
  const [aboutDescription, setAboutDescription] = useState(
    'Siden 2009 har Sorrento Pizza været Aalborgs foretrukne destination for autentisk italiensk pizza.'
  );
  const [aboutSecondary] = useState(
    'Vi tror på, at en god pizza starter med kvalitetsingredienser.'
  );
  const [aboutImage, setAboutImage] = useState(
    'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=600&q=80'
  );
  const [features, setFeatures] = useState(defaultFeatures);

  useEffect(() => {
    const savedSettings = localStorage.getItem('restaurantSettings');
    if (savedSettings) {
      try {
        const s = JSON.parse(savedSettings);
        if (s.aboutTitle) {
          setAboutTitle(s.aboutTitle);
        }
        if (s.aboutDescription) {
          setAboutDescription(s.aboutDescription);
        }
        if (s.aboutImage) {
          setAboutImage(s.aboutImage);
        }
        if (Array.isArray(s.features) && s.features.length) {
          // Map icon strings to actual icons where possible
          const iconMap: Record<string, any> = {
            award: Award,
            clock: Clock,
            users: Users,
            heart: Heart,
          };
          const mapped = s.features.map((f: any) => ({
            icon: iconMap[f.icon] || Award,
            title: f.title,
            description: f.description,
          }));
          setFeatures(mapped);
        }
      } catch {
        // ignore
      }
    }
  }, []);

  return (
    <section id="about" className="py-20 bg-secondary overflow-hidden relative">
      <div className="pointer-events-none absolute inset-x-0 -bottom-px h-20 bg-gradient-to-b from-transparent via-[#0b0b12]/50 to-[#0b0b12]" />
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
                src={aboutImage}
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
              className="absolute -bottom-8 -right-8 w-40 h-40 bg-gradient-to-br from-primary to-accent rounded-3xl -z-10"
            />
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, type: 'spring' }}
              className="absolute -top-8 -left-8 w-32 h-32 bg-dark rounded-full -z-10"
            />

            {/* Experience Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="absolute bottom-8 -right-4 lg:right-8 bg-surface rounded-2xl p-6 shadow-xl"
            >
              <div className="text-4xl font-bold text-primary">15+</div>
              <div className="text-muted text-sm">Års Erfaring</div>
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
              className="text-primary font-semibold text-sm uppercase tracking-wider"
            >
              Om Sorrento Pizza
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-6">
              {aboutTitle}
              <br />
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {aboutHighlight}
              </span>
            </h2>
            <p className="text-gray-200 text-lg mb-8 leading-relaxed">
              {aboutDescription}
            </p>
            <p className="text-gray-300 mb-8 leading-relaxed">
              {aboutSecondary}
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
                    <h3 className="font-semibold text-white mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-gray-300 text-sm">{feature.description}</p>
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
