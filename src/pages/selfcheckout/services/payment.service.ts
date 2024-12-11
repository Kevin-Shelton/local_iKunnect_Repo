// src/app/services/stripe.service.ts
import { Injectable } from '@angular/core';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { API_URL } from '../../../config/env-config';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private stripePromise: Promise<Stripe | null>;

  constructor() {
    this.stripePromise = loadStripe(API_URL.STRIPE_API_KEY);
  }

  getStripe() {
    return this.stripePromise;
  }
  async getProducts() {
    try {
      // Fetch products from your backend
      const response = await fetch(`${API_URL.GET_PRODUCTS}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const products = await response.json();
      console.log('Available Products:', products);

      return products;
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  }
  async getStripeSession(priceId: string, quantity: number) {
    // console.log('payment amount is ::::::: ',amount)
    return await fetch(
      `${API_URL.CREATE_CHECKOUT_SESSION}?priceId=${priceId}&quantity=${quantity}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      }
    );
  }

  async getStripeSessionStatus(sessionId: string) {
    console.log('payment sessionId is ::::::: ', sessionId);
    return await fetch(`${API_URL.SESSION_STATUS}?session_id=${sessionId}`);
  }
}
