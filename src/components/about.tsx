import React, { useEffect, useState } from 'react';
import { Code, Smartphone, Database, Globe } from 'lucide-react';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

interface Skill {
  name: string;
  level: number;
  category: string;
}

interface Service {
  icon: string;
  title: string;
  description: string;
}

interface AboutInfo {
  title: string;
  description1: string;
  description2: string;
  image: string;
  stats: {
    projectsCompleted: number;
    languagesMastered: number;
  };
}

const About: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [aboutInfo, setAboutInfo] = useState<AboutInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Charger skills
        const skillsSnapshot = await getDocs(collection(db, 'skills'));
        setSkills(skillsSnapshot.docs.map(doc => doc.data() as Skill));

        // Charger services
        const servicesSnapshot = await getDocs(collection(db, 'services'));
        setServices(servicesSnapshot.docs.map(doc => doc.data() as Service));

        // Charger about
        const aboutDoc = await getDoc(doc(db, 'about', 'main'));
        if (aboutDoc.exists()) {
          setAboutInfo(aboutDoc.data() as AboutInfo);
        }
      } catch (error) {
        console.error('Erreur chargement:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return <div className="py-20 text-center">Chargement...</div>;
  }

  const getIcon = (iconName: string) => {
    const icons: any = {
      Code: <Code size={32} />,
      Smartphone: <Smartphone size={32} />,
      Database: <Database size={32} />,
      Globe: <Globe size={32} />,
    };
    return icons[iconName] || <Code size={32} />;
  };

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
              src={aboutInfo?.image}
              alt="About me"
              className="rounded-2xl shadow-xl w-25"
            />
          </div>

          {/* Right - Content */}
          <div className="space-y-6 animate-slideInRight">
            <h3 className="text-3xl font-bold text-gray-800">
              {aboutInfo?.title}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {aboutInfo?.description1}
            </p>
            <p className="text-gray-600 leading-relaxed">
              {aboutInfo?.description2}
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div>
                <div className="text-orange-600 text-3xl font-bold">
                  {aboutInfo?.stats.projectsCompleted}+
                </div>
                <div className="text-gray-600">Projects Completed</div>
              </div>
              <div>
                <div className="text-orange-600 text-3xl font-bold">
                  {aboutInfo?.stats.languagesMastered}+
                </div>
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
                  {getIcon(service.icon)}
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