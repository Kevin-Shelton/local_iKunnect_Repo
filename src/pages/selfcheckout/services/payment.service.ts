// src/app/services/stripe.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { BehaviorSubject, Observable } from 'rxjs';
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
      const response = await fetch(`http://localhost:4242/get-products`, {
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
  async getStripeSession(priceId: string, quantity:number) {
   // console.log('payment amount is ::::::: ',amount)
  return await fetch(`http://localhost:4242/create-checkout-session?priceId=${priceId}&quantity=${quantity}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
  }

  async getStripeSessionStatus(sessionId: string) {
    console.log('payment sessionId is ::::::: ',sessionId)
  return await fetch(`http://localhost:4242/session-status?session_id=${sessionId}`);
  }

 
}
