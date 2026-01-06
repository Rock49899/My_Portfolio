import React, { useEffect, useState } from 'react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const [contactData, setContactData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContactData = async () => {
      try {
        const contactDoc = await getDoc(doc(db, 'contact', 'main'));
        if (contactDoc.exists()) {
          setContactData(contactDoc.data());
        }
      } catch (error) {
        console.error('Erreur chargement contact:', error);
      } finally {
        setLoading(false);
      }
    };

    loadContactData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID ;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID ;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY ;

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      
      // Reset status after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    }
  };

  if (loading) return <div className="py-20 text-center">Chargement...</div>;

  return (
    <section id="contact" className="py-20 bg-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-100 rounded-full opacity-30 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-200 rounded-full opacity-20 blur-3xl"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fadeIn">
          <span className="text-orange-600 font-semibold text-sm uppercase tracking-wider">
            Get In Touch
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2 text-gray-800">
            Let's Work Together
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Have a project in mind? Let's discuss how we can bring your ideas to life
          </p>
          <div className="w-20 h-1 bg-orange-600 mx-auto mt-4"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left - Contact Info */}
          <div className="space-y-8 animate-slideInLeft">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Let's talk about your project
              </h3>
              <p className="text-gray-600 leading-relaxed">
                I'm always open to discussing new projects, creative ideas, or opportunities 
                to be part of your vision. Feel free to reach out!
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail size={24} />
                </div>
                <h4 className="font-semibold text-gray-800 mb-1">Email</h4>
                <p className="text-gray-600">{contactData?.email}</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone size={24} />
                </div>
                <h4 className="font-semibold text-gray-800 mb-1">Phone</h4>
                <p className="text-gray-600">{contactData?.phone}</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin size={24} />
                </div>
                <h4 className="font-semibold text-gray-800 mb-1">Location</h4>
                <p className="text-gray-600">{contactData?.location}</p>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-4">Follow Me</h4>
              <div className="flex gap-4">
                <a
                  href="https://github.com/Rock49899"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-orange-600 hover:text-white transition-all transform hover:scale-110"
                  title="GitHub"
                >
                  G
                </a>
                <a
                  href="https://www.linkedin.com/in/rock-dev-fullstack"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-orange-600 hover:text-white transition-all transform hover:scale-110"
                  title="LinkedIn"
                >
                  L
                </a>
                <a
                  href="mailto:rock.houinsou@epitech.eu"
                  className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-orange-600 hover:text-white transition-all transform hover:scale-110"
                  title="Email"
                >
                  M
                </a>
              </div>
            </div>
          </div>

          {/* Right - Contact Form */}
          <div className="animate-slideInRight">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-orange-600 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-orange-600 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-orange-600 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                  placeholder="Project Inquiry"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-orange-600 focus:ring-2 focus:ring-orange-200 outline-none transition-all resize-none"
                  placeholder="Tell me about your project..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-orange-600 text-white px-8 py-4 rounded-lg font-medium hover:bg-orange-700 transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send size={20} />
                  </>
                )}
              </button>

              {/* Success/Error Messages */}
              {submitStatus === 'success' && (
                <div className="p-4 bg-green-100 text-green-700 rounded-lg text-center animate-fadeIn">
                  Message envoyé avec succès ! Je vous répondrai bientôt.
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="p-4 bg-red-100 text-red-700 rounded-lg text-center animate-fadeIn">
                  Erreur lors de l'envoi. Veuillez réessayer ou me contacter directement par email.
                </div>
              )}
            </form>
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

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }

        .animate-slideInLeft {
          animation: slideInLeft 0.8s ease-out;
        }

        .animate-slideInRight {
          animation: slideInRight 0.8s ease-out;
        }
      `}</style>
    </section>
  );
};

export default Contact;