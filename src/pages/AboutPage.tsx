import { motion } from 'framer-motion';
import { Award, Users, Clock, Heart, MapPin, Phone, Mail, ChefHat } from 'lucide-react';

const teamMembers = [
  {
    name: 'Marco Rossi',
    role: 'Grundlægger & Chefkok',
    image: 'https://images.unsplash.com/photo-1583394293214-28ez5b9e34ec?w=300&q=80',
    description: 'Med over 25 års erfaring fra Napoli, bringer Marco autentiske italienske traditioner til Danmark.',
  },
  {
    name: 'Sofia Bianchi',
    role: 'Køkkenchef',
    image: 'https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?w=300&q=80',
    description: 'Sofia specialiserer sig i at skabe nye, innovative pizzaopskrifter med lokale ingredienser.',
  },
  {
    name: 'Luca Ferrari',
    role: 'Despecialist',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&q=80',
    description: 'Luca har perfektioneret kunsten at lave den perfekte pizzadej gennem 15 år.',
  },
];

const milestones = [
  { year: '2008', title: 'Grundlagt', description: 'Sorrento Pizza åbnede sine døre i Aalborg centrum' },
  { year: '2012', title: 'Første pris', description: 'Vinder af "Bedste Pizza i Nordjylland"' },
  { year: '2016', title: 'Udvidelse', description: 'Åbnede vores andet sted og startede levering' },
  { year: '2020', title: 'Online bestilling', description: 'Lancerede vores digitale platform' },
  { year: '2024', title: '10.000+ kunder', description: 'Nåede milepælen med 10.000 glade kunder' },
];

const values = [
  {
    icon: Heart,
    title: 'Passion',
    description: 'Vi elsker det vi laver og det smager man i hver bid',
  },
  {
    icon: Award,
    title: 'Kvalitet',
    description: 'Kun de bedste ingredienser importeret direkte fra Italien',
  },
  {
    icon: Users,
    title: 'Fællesskab',
    description: 'Vi støtter lokale leverandører og giver tilbage til samfundet',
  },
  {
    icon: Clock,
    title: 'Tradition',
    description: 'Autentiske opskrifter overleveret gennem generationer',
  },
];

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-dark pt-24 pb-12">
      {/* Hero Section */}
      <section className="relative h-[50vh] mb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1579751626657-72bc17010498?w=1920&q=80"
            alt="Restaurant"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
        </div>
        <div className="relative h-full max-w-7xl mx-auto px-6 flex items-end pb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Vores Historie</h1>
            <p className="text-xl text-white/80 max-w-2xl">
              Fra et lille familiekøkken i Sorrento til Aalborgs mest elskede pizzeria
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6">
        {/* Story Section */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-primary mb-6">
                En Drøm Født i Italien
              </h2>
              <div className="space-y-4 text-white/70">
                <p>
                  Det hele startede i 2008, da Marco Rossi besluttede at bringe sin families 
                  hundrede år gamle pizzaopskrifter fra Sorrento-kysten til Danmark. Med kun 
                  en stenovn og en drøm om at dele ægte italiensk pizza, åbnede han dørene 
                  til Sorrento Pizza.
                </p>
                <p>
                  I dag, efter mere end 15 år, er vi stolte over at være Aalborgs foretrukne 
                  pizzeria. Vores hemmelighed? Vi går aldrig på kompromis med kvaliteten. 
                  Hver eneste ingrediens er nøje udvalgt, og vores dej hæver i præcis 48 timer 
                  - ligesom i det gamle Italien.
                </p>
                <p>
                  Vi importerer stadig vores San Marzano tomater fra Napoli, vores mozzarella 
                  fra Campania, og vores olivenolie fra Toscana. Fordi den ægte smag kræver 
                  ægte ingredienser.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=600&q=80"
                alt="Pizza Making"
                className="rounded-3xl shadow-2xl"
              />
              <motion.div
                className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <ChefHat className="text-primary" size={32} />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary">15+</div>
                    <div className="text-muted">Års Erfaring</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Values */}
        <section className="mb-20">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-secondary text-center mb-12"
          >
            Vores Værdier
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-surface p-6 rounded-2xl shadow-lg text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="text-dark" size={28} />
                </div>
                <h3 className="text-xl font-bold text-secondary mb-2">{value.title}</h3>
                <p className="text-muted text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section className="mb-20">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-secondary text-center mb-12"
          >
            Vores Rejse
          </motion.h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary to-accent" />
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={`relative flex items-center mb-8 ${
                  index % 2 === 0 ? 'justify-start' : 'justify-end'
                }`}
              >
                <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                  <div className="bg-surface p-6 rounded-2xl shadow-lg">
                    <span className="text-primary font-bold text-2xl">{milestone.year}</span>
                    <h3 className="text-xl font-bold text-secondary mt-2">{milestone.title}</h3>
                    <p className="text-muted text-sm mt-1">{milestone.description}</p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white border-4 border-primary rounded-full" />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="mb-20">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-secondary text-center mb-4"
          >
            Mød Holdet
          </motion.h2>
          <p className="text-muted text-center mb-12 max-w-2xl mx-auto">
            De passionerede mennesker bag hver eneste pizza
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-surface rounded-3xl overflow-hidden shadow-lg group"
              >
                <div className="h-64 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-secondary">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-muted text-sm">{member.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Awards */}
        <section className="mb-20">
          <div className="bg-gradient-to-r from-primary to-accent rounded-3xl p-8 md:p-12 text-dark text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <Award size={48} className="mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-4">Prisvindende Kvalitet</h2>
              <p className="text-dark/90 max-w-2xl mx-auto mb-8">
                Vi er stolte modtagere af adskillige priser for vores engagement i kvalitet og autenticitet
              </p>
              <div className="flex flex-wrap justify-center gap-8">
                <div className="text-center">
                  <div className="text-4xl font-bold">🏆</div>
                  <p className="text-sm mt-2">Bedste Pizza 2023</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold">⭐</div>
                  <p className="text-sm mt-2">4.9 Rating</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold">🥇</div>
                  <p className="text-sm mt-2">Top 10 i Danmark</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact Info */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="bg-surface p-6 rounded-2xl shadow-lg flex items-center gap-4"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center">
                <MapPin className="text-primary" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-secondary">Adresse</h3>
                <p className="text-muted text-sm">Boulevarden 123, 9000 Aalborg</p>
              </div>
            </motion.a>

            <motion.a
              href="tel:+4512345678"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-surface p-6 rounded-2xl shadow-lg flex items-center gap-4"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center">
                <Phone className="text-primary" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-secondary">Telefon</h3>
                <p className="text-muted text-sm">+45 12 34 56 78</p>
              </div>
            </motion.a>

            <motion.a
              href="mailto:info@sorrentopizza.dk"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="bg-surface p-6 rounded-2xl shadow-lg flex items-center gap-4"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center">
                <Mail className="text-primary" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-secondary">Email</h3>
                <p className="text-muted text-sm">info@sorrentopizza.dk</p>
              </div>
            </motion.a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
