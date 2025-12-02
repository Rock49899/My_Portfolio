import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import cvPdf from '../assets/pdf/CV_ROCK_H_DEV_FULLSTACK.pdf';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg py-4' : 'bg-transparent py-6'
      }`}
    >
      <nav className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold cursor-pointer hover:opacity-80 transition-opacity">
          <span className={isScrolled ? 'text-gray-800' : 'text-black'}>Portfolio</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-8">
          {['Home', 'About', 'Projects', 'Contact'].map((item) => (
            <li key={item}>
              <button
                onClick={() => scrollToSection(item.toLowerCase())}
                className={`font-medium transition-colors hover:text-orange-600 ${
                  isScrolled ? 'text-gray-700' : 'text-white'
                }`}
              >
                {item}
              </button>
            </li>
          ))}
          <li>
            <a
              href={cvPdf}
              download="CV_Rock_Houinsou.pdf"
              className="bg-orange-600 text-white px-6 py-2 rounded-full font-medium hover:bg-orange-700 transition-all transform hover:scale-105 inline-block"
            >
              Download CV
            </a>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-800"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg mt-2 py-4 px-6 animate-slideDown">
          <ul className="space-y-4">
            {['Home', 'About', 'Projects', 'Contact'].map((item) => (
              <li key={item}>
                <button
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block w-full text-left text-gray-700 font-medium hover:text-orange-600"
                >
                  {item}
                </button>
              </li>
            ))}
            <li>
              <a
                href={cvPdf}
                download="CV_Rock_Houinsou.pdf"
                className="block w-full bg-orange-600 text-white px-6 py-2 rounded-full font-medium text-center"
              >
                Download CV
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;