import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import trust from '../assets/trust.png'
import Rotten from '../assets/Rottenn.png'
interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  category: string;
}

const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const projects: Project[] = [
    {
      id: 1,
      title: 'TRUST R',
      description: 'Consumer review platform that helps shoppers make informed decisions through authentic and transparent feedback from real users.',
      image: trust,
      tags: ['laravel', 'Vue.js', 'MySQL'],
      liveUrl: 'https://sama.agence-fastlane.com/',
      githubUrl: '#',
      category: 'fullstack',
    },
    {
      id: 2,
      title: 'L\'Taf',
      description: 'Mobile task & board management app built with React Native and Expo, connecting in real-time to Trello API for seamless productivity.',
      image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600&h=400&fit=crop',
      tags: ['React Native', 'Expo', 'Trello API'],
      liveUrl: '#',
      githubUrl: '#',
      category: 'mobile',
    },
    {
      id: 3,
      title: 'Tomato Reviews',
      description: 'Full-stack movie review platform built with Next.js, allowing admins to import films from TMDB API and users to rate and review movies.',
      image: Rotten,
      tags: ['Next.js', 'React JS', 'MongoDB'],
      liveUrl: '#',
      githubUrl: '#',
      category: 'fullstack',
    },
  ];

  const filters = [
    { label: 'All', value: 'all' },
    { label: 'Web', value: 'web' },
    { label: 'Mobile', value: 'mobile' },
    { label: 'Full Stack', value: 'fullstack' },
  ];

  const filteredProjects =
    activeFilter === 'all'
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="py-20 bg-gradient-to-b from-white to-orange-50">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fadeIn">
          <span className="text-orange-600 font-semibold text-sm uppercase tracking-wider">
            Portfolio
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2 text-gray-800">
            Featured Projects
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Here are some of my recent works showcasing my skills in web and mobile development
          </p>
          <div className="w-20 h-1 bg-orange-600 mx-auto mt-4"></div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={`px-6 py-2 rounded-full font-medium transition-all transform hover:scale-105 ${
                activeFilter === filter.value
                  ? 'bg-orange-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-orange-50 shadow'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-fadeIn"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Project Image */}
              <div className="relative overflow-hidden h-56">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4 flex gap-3">
                    <a
                      href={project.liveUrl}
                      className="flex-1 bg-white text-gray-800 py-2 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-orange-600 hover:text-white transition-colors"
                    >
                      <ExternalLink size={18} />
                      Live Demo
                    </a>
                    <a
                      href={project.githubUrl}
                      className="bg-white text-gray-800 p-2 rounded-lg hover:bg-orange-600 hover:text-white transition-colors"
                    >
                      <Github size={20} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="bg-orange-50 text-orange-600 text-xs px-3 py-1 rounded-full font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {project.id === 1 ? (
                  <Link
                    to="/project/trust"
                    className="inline-flex items-center gap-2 text-orange-600 font-medium hover:gap-3 transition-all"
                  >
                    View Details
                    <ArrowRight size={18} />
                  </Link>
                ) : project.id === 2 ? (
                  <Link
                    to="/project/ltaf"
                    className="inline-flex items-center gap-2 text-orange-600 font-medium hover:gap-3 transition-all"
                  >
                    View Details
                    <ArrowRight size={18} />
                  </Link>
                ) : project.id === 3 ? (
                  <Link
                    to="/project/tomato-reviews"
                    className="inline-flex items-center gap-2 text-orange-600 font-medium hover:gap-3 transition-all"
                  >
                    View Details
                    <ArrowRight size={18} />
                  </Link>
                ) : (
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 text-orange-600 font-medium hover:gap-3 transition-all"
                  >
                    View Details
                    <ArrowRight size={18} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* See More Button */}
        <div className="text-center">
          <button className="bg-orange-600 text-white px-8 py-3 rounded-full font-medium hover:bg-orange-700 transition-all transform hover:scale-105 shadow-lg inline-flex items-center gap-2">
            See More Projects
            <ArrowRight size={20} />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default Projects;