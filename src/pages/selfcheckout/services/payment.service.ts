// src/app/services/stripe.service.ts
import { Injectable } from '@angular/core';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { API_URL } from '../../../config/env-config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StripeProduct } from '../../../models/website-models';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private stripePromise: Promise<Stripe | null>;

  constructor(private httpClient: HttpClient) {
    this.stripePromise = loadStripe(API_URL.STRIPE_API_KEY);

  }

  getStripe() {
    return this.stripePromise;
  }


  getProducts(): Observable<StripeProduct[]> {   
    console.log('calling get products are ',API_URL.GET_PRODUCTS)
      return this.httpClient.get<StripeProduct[]>(API_URL.GET_PRODUCTS);
    
  }
   getStripeSession(priceId: string, quantity: number): Observable<{clientSecret: string}> {
   
    return this.httpClient.post<{clientSecret: string}>(`${API_URL.CREATE_CHECKOUT_SESSION}?priceId=${priceId}&quantity=${quantity}`, {});
   
  }

   getStripeSessionStatus(sessionId: string): Observable<{status: string}> {
    return this.httpClient.get<{status: string}>(`${API_URL.SESSION_STATUS}?session_id=${sessionId}`);
  }
}
