import React from 'react';
import { ExternalLink, Github, ArrowLeft, CheckCircle, Code, Database, Smartphone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Trelltech from '../assets/TrellTech.png'

const ProjectLtaf: React.FC = () => {
    const navigate = useNavigate();

    const features = [
        'Authentification OAuth Trello sécurisée',
        'Synchronisation temps réel avec Trello',
        'Gestion complète des workspaces et boards',
        'CRUD complet des listes et cartes',
    ];

    const techStack = [
        { name: 'React Native', icon: Smartphone, color: 'text-blue-600' },
        { name: 'Expo', icon: Code, color: 'text-purple-600' },
        { name: 'TypeScript', icon: Code, color: 'text-blue-500' },
        { name: 'Trello API', icon: Database, color: 'text-orange-600' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
            {/* Header */}
            <div className="container mx-auto px-6 py-8">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors group"
                >
                    <ArrowLeft className="group-hover:-translate-x-1 transition-transform" size={20} />
                    <span>Retour aux projets</span>
                </button>
            </div>

            {/* Hero Section */}
            <section className="container mx-auto px-6 py-12">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left: Image */}
                    <div className="relative animate-slideInLeft">
                        <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                            <img
                                src={Trelltech}
                                alt="L'Taf Mobile Application"
                                className="w-full h-auto transform hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        </div>
                        <div className="absolute -top-6 -right-6 w-32 h-32 bg-orange-400 rounded-full opacity-20 animate-pulse"></div>
                        <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-orange-600 rounded-full opacity-20 animate-pulse"></div>
                    </div>

                    {/* Right: Info */}
                    <div className="space-y-6 animate-slideInRight">
                        <div className="inline-block">
                            <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-medium">
                                📱 Application Mobile
                            </span>
                        </div>

                        <h1 className="text-5xl font-bold text-gray-900">
                            L'Taf
                        </h1>

                        <p className="text-xl text-gray-600 leading-relaxed">
                            Application mobile de gestion de tâches et de projets, construite avec React Native et Expo,
                            qui se connecte en temps réel à l'API Trello pour une productivité maximale.
                        </p>

                        <div className="flex gap-4 pt-4">
                            <a
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-full font-medium hover:bg-orange-700 transition-all transform hover:scale-105 shadow-lg"
                            >
                                <ExternalLink size={20} />
                                Voir la démo
                            </a>
                            <a
                                href="#"
                                className="flex items-center gap-2 border-2 border-orange-600 text-orange-600 px-6 py-3 rounded-full font-medium hover:bg-orange-50 transition-all"
                            >
                                <Github size={20} />
                                Code source
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Objective Section */}
            <section className="container mx-auto px-6 py-16">
                <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 animate-fadeIn">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">
                        Objectif du projet
                    </h2>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        Le but de L'Taf est de fournir une interface mobile simple mais puissante pour se connecter
                        à son compte Trello via OAuth, consulter rapidement ses boards et projets, gérer facilement
                        ses listes et ses cartes, et effectuer un CRUD complet (création, édition, suppression, déplacement).
                        L'application met l'accent sur
                        <span className="text-orange-600 font-semibold"> la productivité et l'ergonomie mobile</span>,
                        permettant d'accéder à toutes les données Trello sans backend intermédiaire.
                    </p>
                </div>
            </section>

            {/* Features Section */}
            <section className="container mx-auto px-6 py-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
                    Fonctionnalités principales
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 animate-fadeInUp"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="flex items-start gap-4">
                                <CheckCircle className="text-orange-600 flex-shrink-0 mt-1" size={24} />
                                <p className="text-gray-700 text-lg">{feature}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Tech Stack Section */}
            <section className="container mx-auto px-6 py-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
                    Technologies utilisées
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {techStack.map((tech, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:scale-110 text-center animate-fadeInUp"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <tech.icon className={`${tech.color} mx-auto mb-3`} size={40} />
                            <h3 className="font-semibold text-gray-900">{tech.name}</h3>
                        </div>
                    ))}
                </div>
            </section>

            {/* Technical Highlights */}
            <section className="container mx-auto px-6 py-16 pb-24">
                <div className="bg-gradient-to-br from-orange-600 to-orange-700 rounded-3xl shadow-2xl p-8 md:p-12 text-white">
                    <h2 className="text-3xl font-bold mb-8">
                        Pourquoi ce projet est intéressant techniquement ?
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-white rounded-full mt-2"></div>
                                <p>Intégration complète de OAuth Trello</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-white rounded-full mt-2"></div>
                                <p>Gestion sécurisée des tokens via Expo SecureStore</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-white rounded-full mt-2"></div>
                                <p>Architecture claire avec Context API</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-white rounded-full mt-2"></div>
                                <p>Navigation avancée multi-niveaux</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-white rounded-full mt-2"></div>
                                <p>Appels API complexes et multiples</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-white rounded-full mt-2"></div>
                                <p>Mise en place d'un CRUD complet</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-white rounded-full mt-2"></div>
                                <p>Aucune base de données — tout en direct via Trello</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-white rounded-full mt-2"></div>
                                <p>Gestion d'états asynchrones et chargements progressifs</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

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

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideInLeft {
          animation: slideInLeft 0.8s ease-out;
        }

        .animate-slideInRight {
          animation: slideInRight 0.8s ease-out;
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
        </div>
    );
};

export default ProjectLtaf;
