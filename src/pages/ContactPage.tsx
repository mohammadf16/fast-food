import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, CheckCircle } from 'lucide-react';
import Toast from '../components/Toast';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [showToast, setShowToast] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setShowToast(true);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Adresse',
      details: ['Boulevarden 123', '9000 Aalborg', 'Danmark'],
      color: 'bg-blue-500',
    },
    {
      icon: Phone,
      title: 'Telefon',
      details: ['+45 12 34 56 78', 'Mandag - Søndag', '11:00 - 22:00'],
      color: 'bg-green-500',
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['info@sorrentopizza.dk', 'booking@sorrentopizza.dk', 'Svar inden 24 timer'],
      color: 'bg-purple-500',
    },
    {
      icon: Clock,
      title: 'Åbningstider',
      details: ['Man-Tor: 11:00-22:00', 'Fre-Lør: 11:00-23:00', 'Søndag: 12:00-21:00'],
      color: 'bg-accent',
    },
  ];

  const faqs = [
    {
      question: 'Hvor lang tid tager levering?',
      answer: 'Levering tager normalt 30-45 minutter afhængigt af afstand og travlhed.',
    },
    {
      question: 'Kan jeg bestille til en bestemt tid?',
      answer: 'Ja, du kan vælge en leveringstid op til 7 dage frem ved bestilling.',
    },
    {
      question: 'Hvad er jeres leveringsområde?',
      answer: 'Vi leverer i hele Aalborg og omegn inden for en radius af 10 km.',
    },
    {
      question: 'Tilbyder I catering?',
      answer: 'Ja, vi tilbyder catering til alle arrangementer. Kontakt os for et tilbud.',
    },
  ];

  return (
    <div className="min-h-screen bg-cream pt-24 pb-12">
      <Toast 
        message="Tak for din besked! Vi vender tilbage hurtigst muligt."
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />

      {/* Hero */}
      <section className="relative h-[40vh] mb-16 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&q=80"
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
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Kontakt Os</h1>
            <p className="text-xl text-white/80 max-w-2xl">
              Vi vil gerne høre fra dig! Spørgsmål, feedback eller booking - vi er her for at hjælpe.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6">
        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((info, index) => (
            <motion.div
              key={info.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-2xl shadow-lg"
            >
              <div className={`w-14 h-14 ${info.color} rounded-xl flex items-center justify-center mb-4`}>
                <info.icon className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold text-secondary mb-3">{info.title}</h3>
              {info.details.map((detail, i) => (
                <p key={i} className="text-gray-600 text-sm">{detail}</p>
              ))}
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <MessageSquare className="text-primary" size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-secondary">Send en Besked</h2>
                  <p className="text-gray-500 text-sm">Vi svarer inden for 24 timer</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Navn *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none transition-colors"
                      placeholder="Dit navn"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none transition-colors"
                      placeholder="din@email.dk"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Telefon</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none transition-colors"
                      placeholder="+45 12 34 56 78"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Emne *</label>
                    <select
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none transition-colors"
                    >
                      <option value="">Vælg emne</option>
                      <option value="order">Spørgsmål til ordre</option>
                      <option value="booking">Bordreservation</option>
                      <option value="catering">Catering forespørgsel</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Andet</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Besked *</label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none transition-colors resize-none"
                    placeholder="Skriv din besked her..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-primary to-accent text-white py-4 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sender...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Send Besked
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Map & FAQ */}
          <div className="space-y-8">
            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl overflow-hidden shadow-xl h-[300px]"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2170.3893943567893!2d9.9179851!3d57.0488195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x464932b6a2b7696b%3A0x861634f2bf524040!2sAalborg%2C%20Denmark!5e0!3m2!1sen!2s!4v1635000000000!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>

            {/* FAQ */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-3xl p-6 shadow-xl"
            >
              <h3 className="text-xl font-bold text-secondary mb-6 flex items-center gap-2">
                <CheckCircle className="text-primary" size={24} />
                Ofte Stillede Spørgsmål
              </h3>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="border-b border-gray-100 pb-4 last:border-0">
                    <h4 className="font-semibold text-secondary mb-1">{faq.question}</h4>
                    <p className="text-gray-600 text-sm">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-primary to-accent rounded-3xl p-8 md:p-12 text-center text-white"
        >
          <h2 className="text-3xl font-bold mb-4">Klar til at Bestille?</h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Springe køen over og bestil online. Din lækre pizza venter på dig!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="/menu"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-primary px-8 py-4 rounded-full font-bold shadow-lg"
            >
              Se Menu
            </motion.a>
            <motion.a
              href="tel:+4512345678"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full font-bold border-2 border-white/30"
            >
              Ring Nu: +45 12 34 56 78
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;
