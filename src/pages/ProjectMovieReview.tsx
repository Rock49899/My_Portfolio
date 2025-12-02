import React from 'react';
import { ExternalLink, Github, ArrowLeft, CheckCircle, Code, Database, Server } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Rottenimg from '../assets/Rottenn.png'

const ProjectMovieReview: React.FC = () => {
    const navigate = useNavigate();

    const features = [
        'Recherche et import de films via API TMDB',
        'Gestion complète du catalogue par l\'admin',
        'Consultation des films avec détails complets',
        'Système de critiques, notes et commentaires',
    ];

    const techStack = [
        { name: 'Next.js 14', icon: Code, color: 'text-black' },
        { name: 'Prisma ORM', icon: Database, color: 'text-blue-600' },
        { name: 'MongoDB', icon: Database, color: 'text-green-600' },
        { name: 'TMDB API', icon: Server, color: 'text-orange-600' },
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
                                src={Rottenimg}
                                alt="Tomato Reviews Platform"
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
                                🎬 Plateforme Web Full-Stack
                            </span>
                        </div>

                        <h1 className="text-5xl font-bold text-gray-900">
                            Tomato Reviews
                        </h1>

                        <p className="text-xl text-gray-600 leading-relaxed">
                            Plateforme web construite avec Next.js permettant aux administrateurs d'importer des films
                            depuis TheMovieDB, de les stocker dans MongoDB via Prisma, et aux utilisateurs de consulter
                            et publier leurs critiques.
                        </p>

                        <div className="flex gap-4 pt-4">
                            <a
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-full font-medium hover:bg-orange-700 transition-all transform hover:scale-105 shadow-lg"
                            >
                                <ExternalLink size={20} />
                                Voir le site
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
                        Tomato Reviews permet aux administrateurs de rechercher des films via l'API TheMovieDB,
                        de les importer et gérer dans la base de données, tandis que les utilisateurs peuvent
                        consulter la liste complète des films, voir les détails (synopsis, genres, durée, image),
                        et ajouter des critiques avec notes et commentaires.
                        <span className="text-orange-600 font-semibold"> Les utilisateurs peuvent modifier ou supprimer
                            uniquement leurs propres reviews</span>, garantissant une gestion sécurisée et authentifiée
                        du contenu communautaire.
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
                                <p>Architecture full-stack avec Next.js App Router</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-white rounded-full mt-2"></div>
                                <p>Intégration API REST TheMovieDB</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-white rounded-full mt-2"></div>
                                <p>ORM Prisma pour accès typé à MongoDB</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-white rounded-full mt-2"></div>
                                <p>Routes admin protégées via Auth.js</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-white rounded-full mt-2"></div>
                                <p>Backend et frontend unifiés dans app/</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-white rounded-full mt-2"></div>
                                <p>Rendu serveur (SSR/ISR) pour SEO optimal</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-white rounded-full mt-2"></div>
                                <p>Système CRUD complet pour reviews</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-white rounded-full mt-2"></div>
                                <p>Sécurisation JWT/OAuth2 pour édition</p>
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

export default ProjectMovieReview;
