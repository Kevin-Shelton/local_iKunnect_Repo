// src/app/services/stripe.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class PaymentHelperService {

  private readonly licenseSource = new BehaviorSubject<number>(1);
  currentLicense = this.licenseSource.asObservable();
  private readonly totalAmount = new BehaviorSubject<string>('');
  currentTotalAmount = this.totalAmount.asObservable();
  

  changelicense(noOfLinces: number) {
    console.log('change licenseSource in ::: ', noOfLinces);
    this.licenseSource.next(noOfLinces);
  }
  changeTotalAmount(totalAmount: string) {
    console.log('change totalAmount in ::: ', totalAmount);
    this.totalAmount.next(totalAmount);
  }
}
