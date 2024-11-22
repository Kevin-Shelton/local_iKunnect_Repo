// src/app/services/stripe.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class PaymentService {

  private stripePromise: Promise<Stripe | null>;

  constructor() {
    this.stripePromise = loadStripe('pk_test_51QH3UxLmtmaPxNqrWwTvjcQV6EBcTsGygwjM9TWj894k7FOQmwgaaYZj1DhwWjPfbeDZvwLSSrsm6jn7LPPz60ft00A0V4a7v7'); // Replace with your actual Stripe public key
  }

  getStripe() {
    return this.stripePromise;
  }

  async getStripeIntent(amount: number) {
    console.log('payment amount is ::::::: ',amount)
  return await fetch(`https://dev-auth-api.ikunnect.com/create-payment-intent?amount=${amount}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
  }

 
}
