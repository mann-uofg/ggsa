import { motion } from 'framer-motion';
import { Heart, Users, Calendar } from 'lucide-react';

export function About() {
  const features = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Cultural Heritage",
      description: "Preserving and sharing our rich Gujarati traditions"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Community",
      description: "Building lasting friendships and connections"
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Events",
      description: "Organizing cultural celebrations and gatherings"
    }
  ];

  return (
    <section id="about" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-white" />
      
      {/* Abstract shapes */}
      <div className="absolute right-0 top-0 w-1/3 h-full bg-orange-100 opacity-50 -skew-x-12 translate-x-1/2" />
      <div className="absolute left-0 bottom-0 w-1/4 h-1/2 bg-orange-200 opacity-30 -skew-x-12" />

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <h2 className="text-5xl font-bold text-center mb-20">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-400">
              About Us
            </span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-white rounded-2xl shadow-lg transform transition-transform group-hover:scale-[1.02]" />
                <div className="relative p-8">
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-6 text-white">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="relative max-w-3xl mx-auto text-center space-y-8">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-lg text-gray-600 leading-relaxed"
            >
              The Guelph Gujarati Students' Association is dedicated to promoting and preserving Gujarati culture within the University of Guelph community. We create a home away from home for Gujarati students while sharing our rich cultural heritage with the broader university community.
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-600 leading-relaxed"
            >
              Founded in 2024, we've grown into a vibrant community that celebrates our traditions through cultural events, educational programs, and social gatherings. Our mission is to foster cultural understanding, build lasting friendships, and create memorable experiences for all our members.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}