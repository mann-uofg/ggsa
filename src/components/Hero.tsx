import { motion } from 'framer-motion';
import { Users, Instagram } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Abstract background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-orange-100 animate-gradient" />
      
      {/* Geometric patterns */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-orange-200 opacity-20 blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-orange-300 opacity-20 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border-[100px] border-orange-100 opacity-30" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
              className="relative inline-block mb-12"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-200 to-orange-400 rounded-full blur-xl opacity-50" />
              <div className="relative w-24 h-24 flex items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-orange-600">
                <Users className="w-12 h-12 text-white" />
              </div>
            </motion.div>
            
            <h1 className="relative">
              <span className="inline-block text-6xl md:text-8xl font-bold mb-4 leading-[1.3] text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-500 py-1">
                Guelph Gujarati
              </span>
              <span className="block text-3xl md:text-5xl font-light tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-400">
                Students' Association
              </span>
            </h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-600 mt-8 mb-12 leading-relaxed max-w-2xl mx-auto"
            >
              Celebrating and preserving Gujarati culture while building a vibrant community at the University of Guelph
            </motion.p>
            
            <motion.a
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              href="https://www.instagram.com/uofg.ggsa"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-colors shadow-lg hover:shadow-xl"
            >
              <Instagram className="w-5 h-5" />
              <span>Follow Us</span>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}