import React, { useEffect, useState } from 'react';
import { Heart, ArrowUp } from 'lucide-react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

const Footer: React.FC = () => {
  const [socialLinks, setSocialLinks] = useState<any[]>([]);

  useEffect(() => {
    const loadSocialLinks = async () => {
      try {
        const contactDoc = await getDoc(doc(db, 'contact', 'main'));
        if (contactDoc.exists()) {
          setSocialLinks(contactDoc.data().socialLinks || []);
        }
      } catch (error) {
        console.error('Erreur chargement social links:', error);
      }
    };

    loadSocialLinks();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const footerLinks = {
    quickLinks: [
      { label: 'Home', href: '#home' },
      { label: 'About', href: '#about' },
      { label: 'Projects', href: '#projects' },
      { label: 'Contact', href: '#contact' },
    ],
    services: [
      { label: 'Web Development', href: '#' },
      { label: 'Mobile Apps', href: '#' },
      { label: 'Backend API', href: '#' },
      { label: 'Consulting', href: '#' },
    ],
    social: [
      { label: 'GitHub', href: 'https://github.com/Rock49899' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/rock-dev-fullstack' },
      { label: 'Email', href: 'mailto:rock.houinsou@epitech.eu' },
    ],
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-orange-600 rounded-full opacity-5 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500 rounded-full opacity-5 blur-3xl"></div>

      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Column 1 - About */}
          <div className="md:col-span-1">
           
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Fullstack Developer passionate about creating innovative web and mobile solutions.
            </p>
            <div className="flex gap-3">
              <a
                href="https://github.com/Rock49899"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-orange-600 transition-all transform hover:scale-110"
                title="GitHub"
              >
                G
              </a>
              <a
                href="https://www.linkedin.com/in/rock-dev-fullstack"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-orange-600 transition-all transform hover:scale-110"
                title="LinkedIn"
              >
                L
              </a>
              <a
                href="mailto:rock.houinsou@epitech.eu"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-orange-600 transition-all transform hover:scale-110"
                title="Email"
              >
                M
              </a>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.quickLinks.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-orange-600 transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Services */}
          <div>
            <h3 className="font-bold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-orange-600 transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Newsletter */}
          <div>
            <h3 className="font-bold text-lg mb-4">Stay Updated</h3>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to get latest updates and news
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-orange-600 outline-none text-sm"
              />
              <button className="bg-orange-600 px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors">
                →
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm flex items-center gap-2">
              © {currentYear} Made with
              <Heart size={16} className="text-orange-600 fill-current" />
              by Rock HOUINSOU
            </p>

            <div className="flex gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-orange-600 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-orange-600 transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 bg-orange-600 text-white rounded-full shadow-lg hover:bg-orange-700 transition-all transform hover:scale-110 flex items-center justify-center z-50"
        aria-label="Scroll to top"
      >
        <ArrowUp size={24} />
      </button>
    </footer>
  );
};

export default Footer;