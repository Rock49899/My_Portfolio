import React from 'react';
import { Github, Linkedin, Mail, ArrowDown } from 'lucide-react';
import portrait from '../assets/PORRRTRAIT.png';

const Hero: React.FC = () => {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-orange-50 overflow-hidden"
    >
      <div className="absolute top-20 right-10 w-64 h-64 bg-orange-200 rounded-full opacity-20 animate-float"></div>
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-orange-300 rounded-full opacity-10 animate-float-delayed"></div>
      <div className="absolute top-1/2 right-1/4 w-40 h-40 bg-orange-400 rounded-full opacity-15 animate-pulse"></div>

      <div className="container mx-auto px-6 py-32 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 animate-slideInLeft">
            <div className="inline-block">
              <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-medium">
                👋 Welcome to my portfolio
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Hi, I'm{'  '}
              <span className="text-orange-600 relative">
                Rock HOUINSOU
                <svg className="absolute -bottom-2 left-0 w-full" height="12" viewBox="0 0 200 12">
                  <path d="M0 8 Q50 2, 100 8 T200 8" stroke="#FF6B35" strokeWidth="3" fill="none" />
                </svg>
              </span>
            </h1>

            <h2 className="text-2xl md:text-3xl text-gray-600 font-light">
              Fullstack Developer Junior
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed max-w-lg">
              Passionate about crafting elegant web & mobile solutions using modern technologies. 
              Specialized in Laravel, Vue, Node.js, React and mobile development.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={scrollToProjects}
                className="bg-orange-600 text-white px-8 py-3 rounded-full font-medium hover:bg-orange-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                View My Work
              </button>
              <button className="border-2 border-orange-600 text-orange-600 px-8 py-3 rounded-full font-medium hover:bg-orange-50 transition-all">
                Contact Me
              </button>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 pt-4">
              <a
                href="https://github.com/Rock49899"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-orange-600 hover:text-white transition-all transform hover:scale-110"
              >
                <Github size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/rock-dev-fullstack"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-orange-600 hover:text-white transition-all transform hover:scale-110"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="mailto:rock.houinsou@epitech.eu"
                className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-orange-600 hover:text-white transition-all transform hover:scale-110"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative animate-slideInRight">
            <div className="relative z-10">
              <img
                src={portrait}
                alt="Rock HOUINSOU"
                className="rounded-3xl shadow-2xl w-full max-w-md mx-auto transform hover:scale-105 transition-transform duration-300"
              />
              {/* Decorative Elements */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-orange-600 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-orange-400 rounded-full opacity-20 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="text-orange-600" size={32} />
        </div>
      </div>

      <style>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }

        @keyframes float-delayed {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-30px) rotate(-5deg);
          }
        }

        .animate-slideInLeft {
          animation: slideInLeft 0.8s ease-out;
        }

        .animate-slideInRight {
          animation: slideInRight 0.8s ease-out;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;