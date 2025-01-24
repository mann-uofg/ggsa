import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { events } from '../data';
import { useState } from 'react';
import { Event } from '../types';
import { PaymentModal } from './PaymentModal';

export function Events() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  return (
    <section id="events" className="relative py-32 overflow-hidden">
      {/* Abstract background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-orange-100 animate-gradient" />
      
      {/* Geometric patterns */}
      <div className="absolute inset-0">
        <div className="absolute top-40 right-20 w-72 h-72 rounded-full bg-orange-200 opacity-20 blur-3xl" />
        <div className="absolute bottom-40 left-20 w-96 h-96 rounded-full bg-orange-300 opacity-20 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full border-[120px] border-orange-100 opacity-30 rotate-45" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl font-bold text-center mb-20">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-400">
              Upcoming Events
            </span>
          </h2>
          
          <div className="flex justify-center">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="group relative max-w-xl w-full"
              >
                <div className="absolute inset-0 bg-white rounded-2xl shadow-lg transform transition-transform group-hover:scale-[1.02]" />
                <div className="relative">
                  <div className="aspect-[16/9] overflow-hidden rounded-t-2xl">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover transform transition-transform group-hover:scale-105"
                    />
                  </div>
                  
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-3 text-gray-900">
                      {event.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-6 line-clamp-2">
                      {event.description}
                    </p>
                    
                    <div className="space-y-3 mb-8">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-5 h-5 mr-3" />
                        {format(event.date, 'MMMM d, yyyy')}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Clock className="w-5 h-5 mr-3" />
                        {format(event.date, 'h:mm a')}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-5 h-5 mr-3" />
                        {event.venue}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-500">
                        ${event.price}
                      </span>
                      <button
                        onClick={() => setSelectedEvent(event)}
                        className="px-8 py-3 bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                      >
                        Get Tickets
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedEvent && (
          <PaymentModal
            event={selectedEvent}
            onClose={() => setSelectedEvent(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}