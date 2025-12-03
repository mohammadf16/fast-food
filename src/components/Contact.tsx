import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Mail, Send } from 'lucide-react';

const contactInfo = [
  {
    icon: MapPin,
    title: 'Adresse',
    details: ['Hadsundvej 11', '9000 Aalborg, Danmark'],
  },
  {
    icon: Phone,
    title: 'Telefon',
    details: ['+45 98 12 34 56'],
  },
  {
    icon: Clock,
    title: 'Åbningstider',
    details: ['Man-Tors: 11:00 - 22:00', 'Fre-Søn: 11:00 - 23:00'],
  },
  {
    icon: Mail,
    title: 'Email',
    details: ['info@sorrentopizza.dk'],
  },
];

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[#D4382C] font-semibold text-sm uppercase tracking-wider"
          >
            Kontakt Os
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1A1A2E] mt-2 mb-4">
            Vi Glæder Os Til
            <br />
            At Høre Fra Dig
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Har du spørgsmål eller ønsker du at lave en reservation? Kontakt os
            i dag!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#FFF8F0] rounded-3xl p-8"
          >
            <h3 className="text-2xl font-bold text-[#1A1A2E] mb-6">
              Send Os En Besked
            </h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Navn
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#D4382C] focus:ring-2 focus:ring-[#D4382C]/20 outline-none transition-all"
                    placeholder="Dit navn"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#D4382C] focus:ring-2 focus:ring-[#D4382C]/20 outline-none transition-all"
                    placeholder="Dit telefonnummer"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#D4382C] focus:ring-2 focus:ring-[#D4382C]/20 outline-none transition-all"
                  placeholder="din@email.dk"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Besked
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#D4382C] focus:ring-2 focus:ring-[#D4382C]/20 outline-none transition-all resize-none"
                  placeholder="Din besked..."
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-[#D4382C] to-[#F5A623] text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-shadow"
              >
                <Send size={20} />
                Send Besked
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Contact Cards */}
            <div className="grid grid-cols-2 gap-4">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-[#FFF8F0] rounded-2xl p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-[#D4382C] to-[#F5A623] rounded-xl flex items-center justify-center mb-4">
                    <info.icon className="text-white" size={24} />
                  </div>
                  <h4 className="font-semibold text-[#1A1A2E] mb-2">
                    {info.title}
                  </h4>
                  {info.details.map((detail, i) => (
                    <p key={i} className="text-gray-600 text-sm">
                      {detail}
                    </p>
                  ))}
                </motion.div>
              ))}
            </div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden shadow-lg h-[300px]"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2170.5!2d9.92!3d57.05!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTfCsDAzJzAwLjAiTiA5wrA1NScxMi4wIkU!5e0!3m2!1sen!2sdk!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Sorrento Pizza Location"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
