import React from 'react';
import { Code, Smartphone, Database, Globe } from 'lucide-react';

interface Skill {
  name: string;
  level: number;
  category: string;
}

const About: React.FC = () => {
  const skills: Skill[] = [
    { name: 'Laravel', level: 85, category: 'Backend' },
     { name: 'Vue.js', level: 80, category: 'Frontend' },
     { name: 'React.js', level: 70, category: 'Frontend' },   
    { name: 'React Native', level: 65, category: 'Mobile' },
    { name: 'MongoDB', level: 70, category: 'Database' },
    { name: 'MySQL', level: 65, category: 'Database' },
  ];

  const services = [
    {
      icon: <Code size={32} />,
      title: 'Web Development',
      description: 'Modern and responsive web applications using React, Vue, and the latest technologies.',
    },
    {
      icon: <Smartphone size={32} />,
      title: 'Mobile Development',
      description: 'Cross-platform mobile apps with React Native and Flutter for iOS and Android.',
    },
    {
      icon: <Database size={32} />,
      title: 'Backend Development',
      description: 'API creation and consumption - Server-side logic management with Node.js, Express and databases.',
    },
    {
      icon: <Globe size={32} />,
      title: 'Full Stack Solutions',
      description: 'End-to-end development from concept to deployment and maintenance.',
    },
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fadeIn">
          <span className="text-orange-600 font-semibold text-sm uppercase tracking-wider">
            About Me
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2 text-gray-800">
            Who I Am
          </h2>
          <div className="w-20 h-1 bg-orange-600 mx-auto mt-4"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          {/* Left - Image */}
          <div className="relative animate-slideInLeft">
            <img
              src="https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=600&h=700&fit=crop"
              alt="About me"
              className="rounded-2xl shadow-xl w-25"
            />
            
          </div>

          {/* Right - Content */}
          <div className="space-y-6 animate-slideInRight">
            <h3 className="text-3xl font-bold text-gray-800">
              Fullstack Developer passionate about creating innovative solutions
            </h3>
            <p className="text-gray-600 leading-relaxed">
              I'm a junior fullstack developer with a strong foundation in modern web and mobile technologies. 
              I love turning ideas into elegant, functional applications that make a difference.
            </p>
            <p className="text-gray-600 leading-relaxed">
              With expertise in both frontend and backend development, I create seamless user experiences 
              backed by robust server-side architecture. Always learning, always improving.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div>
                <div className="text-orange-600 text-3xl font-bold">8+</div>
                <div className="text-gray-600">Projects Completed</div>
              </div>
              <div>
                <div className="text-orange-600 text-3xl font-bold">6+</div>
                <div className="text-gray-600">Languages Mastered</div>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Technical Skills
          </h3>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {skills.map((skill, index) => (
              <div key={index} className="space-y-2 animate-fadeIn" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">{skill.name}</span>
                  <span className="text-orange-600 font-semibold">{skill.level}%</span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div>
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-800">
            What I Offer
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-orange-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 animate-fadeIn"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="w-16 h-16 bg-orange-600 text-white rounded-xl flex items-center justify-center mb-4 transform transition-transform hover:rotate-6">
                  {service.icon}
                </div>
                <h4 className="text-xl font-bold mb-3 text-gray-800">{service.title}</h4>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
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

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default About;