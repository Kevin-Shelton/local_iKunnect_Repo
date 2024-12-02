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
    console.log('urlis ::::::::::::::::::::::::::',API_URL.STRIPE_SESSION_CREATE)
    this.stripePromise = loadStripe('pk_test_51QH3UxLmtmaPxNqrWwTvjcQV6EBcTsGygwjM9TWj894k7FOQmwgaaYZj1DhwWjPfbeDZvwLSSrsm6jn7LPPz60ft00A0V4a7v7'); // Replace with your actual Stripe public key
  }

  getStripe() {
    return this.stripePromise;
  }

  async getStripeSession(amount: number) {
    console.log('payment amount is ::::::: ',amount)
  return await fetch(`http://localhost:4242/create-checkout-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({priceId: 'price_1QPugJLmtmaPxNqrw4tsXoZT', quantity: 1}),
      });
  }

  async getStripeSessionStatus(sessionId: string) {
    console.log('payment sessionId is ::::::: ',sessionId)
  return await fetch(`http://localhost:4242/session-status?session_id=${sessionId}`);
  }

 
}
