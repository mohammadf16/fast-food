import { motion } from 'framer-motion';
import { Truck, Clock, Pizza, Shield, Leaf, Award } from 'lucide-react';

const features = [
  {
    icon: Truck,
    title: 'Gratis Levering',
    description: 'Ved ordre over 150 kr',
    color: 'from-blue-500 to-cyan-500',
    delay: 0,
  },
  {
    icon: Clock,
    title: '30 Min Garanti',
    description: 'Eller pengene tilbage',
    color: 'from-orange-500 to-red-500',
    delay: 0.1,
  },
  {
    icon: Pizza,
    title: 'Friske Ingredienser',
    description: 'Dagligt leveret fra Italien',
    color: 'from-green-500 to-emerald-500',
    delay: 0.2,
  },
  {
    icon: Shield,
    title: '100% Kvalitet',
    description: 'Tilfredshedsgaranti',
    color: 'from-purple-500 to-pink-500',
    delay: 0.3,
  },
  {
    icon: Leaf,
    title: 'Økologisk',
    description: 'Certificerede ingredienser',
    color: 'from-lime-500 to-green-600',
    delay: 0.4,
  },
  {
    icon: Award,
    title: 'Prisbelønnet',
    description: 'Bedste pizza 2023',
    color: 'from-yellow-500 to-orange-500',
    delay: 0.5,
  },
];

const Features = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-cream relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-3">
            Hvorfor Vælge <span className="text-primary">Sorrento?</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Vi tilbyder mere end bare pizza - vi leverer en komplet oplevelse
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: feature.delay, duration: 0.5 }}
              whileHover={{ y: -10, scale: 1.05 }}
              className="group relative"
            >
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full flex flex-col items-center text-center">
                {/* Icon Container */}
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                  className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-lg`}
                >
                  <feature.icon className="text-white" size={28} />
                </motion.div>

                {/* Content */}
                <h3 className="font-bold text-secondary text-sm mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-500 text-xs leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
