import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter } from 'lucide-react';
import { useEffect, useState } from 'react';

const Footer = () => {
  const [settings, setSettings] = useState({
    restaurantName: 'Sorrento',
    slogan: 'PIZZA AALBORG',
    phone: '+45 98 12 34 56',
    email: 'info@sorrentopizza.dk',
    address: 'Hadsundvej 11',
    city: 'Aalborg',
    zipCode: '9000',
    openTime: '11:00',
    closeTime: '22:00',
  });

  useEffect(() => {
    const savedSettings = localStorage.getItem('restaurantSettings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings(prev => ({
          restaurantName: parsed.restaurantName || prev.restaurantName,
          slogan: parsed.slogan || prev.slogan,
          phone: parsed.phone || prev.phone,
          email: parsed.email || prev.email,
          address: parsed.address || prev.address,
          city: parsed.city || prev.city,
          zipCode: parsed.zipCode || prev.zipCode,
          openTime: parsed.openTime || prev.openTime,
          closeTime: parsed.closeTime || prev.closeTime,
        }));
      } catch {
        // ignore
      }
    }
  }, []);

  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Hjem', href: '#home' },
    { name: 'Menu', href: '#menu' },
    { name: 'Om Os', href: '#about' },
    { name: 'Galleri', href: '#gallery' },
    { name: 'Kontakt', href: '#contact' },
  ];

  const menuLinks = [
    { name: 'Klassiske Pizzaer', href: '#' },
    { name: 'Specialiteter', href: '#' },
    { name: 'Veganske Pizzaer', href: '#' },
    { name: 'Drikkevarer', href: '#' },
    { name: 'Desserter', href: '#' },
  ];

  return (
    <footer className="bg-dark text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold">{settings.restaurantName}</h3>
                <p className="text-primary text-xs">{settings.slogan}</p>
              </div>
            </div>
            <p className="text-white/70 mb-6 leading-relaxed">
              Autentisk italiensk pizza lavet med kærlighed og de fineste
              ingredienser siden 2009.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              {[
                { icon: Facebook, href: '#' },
                { icon: Instagram, href: '#' },
                { icon: Twitter, href: '#' },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="text-lg font-bold mb-6 relative">
              Hurtige Links
              <span className="absolute -bottom-2 left-0 w-10 h-1 bg-gradient-to-r from-primary to-accent rounded-full" />
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-primary transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-0 h-0.5 bg-primary group-hover:w-4 transition-all duration-300" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Menu Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-lg font-bold mb-6 relative text-primary">
              Vores Menu
              <span className="absolute -bottom-2 left-0 w-10 h-1 bg-gradient-to-r from-primary to-accent rounded-full" />
            </h4>
            <ul className="space-y-3">
              {menuLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-primary transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-0 h-0.5 bg-primary group-hover:w-4 transition-all duration-300" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="text-lg font-bold mb-6 relative">
              Kontakt Info
              <span className="absolute -bottom-2 left-0 w-10 h-1 bg-gradient-to-r from-primary to-accent rounded-full" />
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="text-primary flex-shrink-0 mt-1" size={18} />
                <span className="text-white/70">
                  {settings.address}
                  <br />
                  {settings.zipCode} {settings.city}, Danmark
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-primary" size={18} />
                <a
                  href={`tel:${settings.phone.replace(/\s/g, '')}`}
                  className="text-white/70 hover:text-primary transition-colors"
                >
                  {settings.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-primary" size={18} />
                <a
                  href={`mailto:${settings.email}`}
                  className="text-white/70 hover:text-primary transition-colors"
                >
                  {settings.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="text-primary" size={18} />
                <span className="text-white/70">
                  Man-Søn: {settings.openTime} - {settings.closeTime}
                </span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/70 text-sm">
              © {currentYear} Sorrento Pizza Aalborg. Alle rettigheder forbeholdes.
            </p>
            <div className="flex gap-6 text-sm">
              <a
                href="#"
                className="text-white/70 hover:text-primary transition-colors"
              >
                Privatlivspolitik
              </a>
              <a
                href="#"
                className="text-white/70 hover:text-primary transition-colors"
              >
                Vilkår & Betingelser
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
