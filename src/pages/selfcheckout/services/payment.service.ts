// src/app/services/stripe.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { Observable } from 'rxjs';
import { API_URL } from '../../../config/env-config';
import { IProductInfo, StripeProduct } from '../../../models/website-models';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private readonly stripePromise: Promise<Stripe | null>;

  constructor(private readonly httpClient: HttpClient) {
    this.stripePromise = loadStripe(API_URL.STRIPE_API_KEY);
  }

  getStripe() {
    return this.stripePromise;
  }

  getProducts(): Observable<StripeProduct[]> {
    return this.httpClient.get<StripeProduct[]>(API_URL.GET_PRODUCTS);
  }
  getStripeSession(
    priceId: string,
    quantity: number
  ): Observable<{ clientSecret: string }> {
    return this.httpClient.post<{ clientSecret: string }>(
      `${API_URL.CREATE_CHECKOUT_SESSION}?priceId=${priceId}&quantity=${quantity}`,
      {}
    );
  }

  getStripeSessionStatus(sessionId: string): Observable<{ status: string }> {
    return this.httpClient.get<{ status: string }>(
      `${API_URL.SESSION_STATUS}?session_id=${sessionId}`
    );
  }
  saveCustomerAndPlanDetails(payload: IProductInfo): Observable<string> {
    return this.httpClient.post<string>(
      `${API_URL.SAVE_CUSTOMER_PLAN}`, payload
    );
  }
}
