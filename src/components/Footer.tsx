import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
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
    <footer className="bg-[#0F0F1A] text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-[#D4382C] to-[#F5A623] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold">Sorrento</h3>
                <p className="text-[#F5A623] text-xs">PIZZA AALBORG</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
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
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#D4382C] transition-colors"
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
              <span className="absolute -bottom-2 left-0 w-10 h-1 bg-gradient-to-r from-[#D4382C] to-[#F5A623] rounded-full" />
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-[#F5A623] transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-0 h-0.5 bg-[#F5A623] group-hover:w-4 transition-all duration-300" />
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
            <h4 className="text-lg font-bold mb-6 relative">
              Vores Menu
              <span className="absolute -bottom-2 left-0 w-10 h-1 bg-gradient-to-r from-[#D4382C] to-[#F5A623] rounded-full" />
            </h4>
            <ul className="space-y-3">
              {menuLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-[#F5A623] transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-0 h-0.5 bg-[#F5A623] group-hover:w-4 transition-all duration-300" />
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
              <span className="absolute -bottom-2 left-0 w-10 h-1 bg-gradient-to-r from-[#D4382C] to-[#F5A623] rounded-full" />
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="text-[#F5A623] flex-shrink-0 mt-1" size={18} />
                <span className="text-gray-400">
                  Hadsundvej 11
                  <br />
                  9000 Aalborg, Danmark
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-[#F5A623]" size={18} />
                <a
                  href="tel:+4598123456"
                  className="text-gray-400 hover:text-[#F5A623] transition-colors"
                >
                  +45 98 12 34 56
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-[#F5A623]" size={18} />
                <a
                  href="mailto:info@sorrentopizza.dk"
                  className="text-gray-400 hover:text-[#F5A623] transition-colors"
                >
                  info@sorrentopizza.dk
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="text-[#F5A623]" size={18} />
                <span className="text-gray-400">Man-Søn: 11:00 - 22:00</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} Sorrento Pizza Aalborg. Alle rettigheder forbeholdes.
            </p>
            <div className="flex gap-6 text-sm">
              <a
                href="#"
                className="text-gray-400 hover:text-[#F5A623] transition-colors"
              >
                Privatlivspolitik
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-[#F5A623] transition-colors"
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
