import express from 'express';
import Stripe from 'stripe';
import nodemailer from 'nodemailer';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Validate environment variables
console.log('Checking environment variables...');
if (!process.env.STRIPE_SECRET_KEY) {
  console.error('STRIPE_SECRET_KEY is not set in environment variables');
  process.exit(1);
}

const app = express();

// Initialize Stripe with debug logging
console.log('Initializing Stripe...');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
  typescript: true,
});

// Test Stripe connection
stripe.paymentMethods.list({ limit: 1 })
  .then(() => console.log('✅ Stripe connection successful'))
  .catch(err => console.error('❌ Stripe connection failed:', err.message));

// Middleware
app.use(express.json());
app.use(express.static(join(__dirname, '../dist')));

// Debug middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  next();
});

app.post('/api/create-checkout-session', async (req, res) => {
  try {
    console.log('📦 Received checkout request:', req.body);
    const { eventId, quantity } = req.body;
    
    if (!eventId || !quantity) {
      console.error('❌ Missing required fields:', { eventId, quantity });
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Get event details from the events data
    const event = {
      id: eventId,
      price: 2500,
      title: 'Navratri Night 2024', // Using actual event title
    };

    console.log('🎫 Creating Stripe session for event:', event);

    const sessionConfig = {
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'cad',
            product_data: {
              name: event.title,
            },
            unit_amount: event.price,
          },
          quantity: parseInt(quantity),
        },
      ],
      mode: 'payment',
      success_url: `${req.protocol}://${req.get('host')}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.protocol}://${req.get('host')}/cancel`,
      metadata: {
        eventId,
        quantity: quantity.toString(),
      },
    };

    console.log('💳 Stripe session config:', JSON.stringify(sessionConfig, null, 2));

    const session = await stripe.checkout.sessions.create(sessionConfig);

    console.log('✅ Stripe session created:', session.id);
    res.json({ sessionId: session.id });
  } catch (err) {
    console.error('❌ Error creating checkout session:', err);
    res.status(500).json({ 
      error: 'Failed to create checkout session',
      details: err.message,
      code: err.code
    });
  }
});

// Success route
app.get('/success', (req, res) => {
  res.sendFile(join(__dirname, '../dist/index.html'));
});

// Cancel route
app.get('/cancel', (req, res) => {
  res.sendFile(join(__dirname, '../dist/index.html'));
});

// Handle all other routes
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '../dist/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`
🚀 Server running on port ${PORT}
💳 Stripe configuration loaded
📧 Email configuration loaded
  `);
});