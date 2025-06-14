import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PricingService {
  constructor(private http: HttpClient) {}

  /** Fetch pricing details for the given period */
  getPrices(period: 'monthly' | 'annual'): Observable<any> {
    return this.http.get(`/api/pricing?period=${period}`);
  }

  /** Kick off Stripe checkout for a plan */
  buyPlan(plan: string, period: 'monthly' | 'annual'): void {
    // existing Stripe logic here
  }
}
