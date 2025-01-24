import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import type { Event } from '../types';

if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
  console.error('Missing Stripe public key');
}

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

interface PaymentModalProps {
  event: Event;
  onClose: () => void;
}

export function PaymentModal({ event, onClose }: PaymentModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      console.log('💳 Starting payment process for event:', event.id);
      console.log('🔑 Stripe public key:', import.meta.env.VITE_STRIPE_PUBLIC_KEY);
      
      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error('Stripe failed to load. Please check your Stripe public key.');
      }
      
      console.log('✅ Stripe loaded successfully');
      
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventId: event.id,
          quantity,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        console.error('❌ Server error:', data);
        throw new Error(data.error || 'Payment failed');
      }

      console.log('✅ Checkout session created:', data.sessionId);
      
      console.log('🔄 Redirecting to Stripe checkout...');
      const { error: stripeError } = await stripe.redirectToCheckout({
        sessionId: data.sessionId
      });

      if (stripeError) {
        console.error('❌ Stripe redirect error:', stripeError);
        throw stripeError;
      }
    } catch (err) {
      console.error('❌ Payment error:', err);
      setError(err instanceof Error ? err.message : 'Payment failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-lg p-8 max-w-md w-full relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>

        <h3 className="text-2xl font-bold mb-6">Get Tickets for {event.title}</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Number of Tickets
            </label>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="bg-gray-200 text-gray-600 px-3 py-1 rounded"
              >
                -
              </button>
              <span className="text-xl font-semibold">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity(Math.min(10, quantity + 1))}
                className="bg-gray-200 text-gray-600 px-3 py-1 rounded"
              >
                +
              </button>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center text-lg font-semibold">
              <span>Total:</span>
              <span>${(event.price * quantity).toFixed(2)}</span>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-md">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-600 text-white py-3 rounded-full font-semibold hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Processing...' : 'Proceed to Payment'}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}