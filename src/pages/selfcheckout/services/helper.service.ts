// src/app/services/stripe.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  BundleDetails,
  PlanDuration,
  PlanType,
} from '../../../models/website-models';

@Injectable({
  providedIn: 'root',
})
export class PaymentHelperService {
  private readonly bundleDetails = new BehaviorSubject<BundleDetails>({
    duration: PlanDuration.MONTHLY,
    type: PlanType.START_UP,
    totalAmount: { value: 0, disValue: '$0' },
    amount: { value: 0, disValue: '$0' },
    quantity: 1,
  });

  currentBundleDetails = this.bundleDetails.asObservable();

  changeBundleDetails(plantDetails: BundleDetails) {
    this.bundleDetails.next(plantDetails);
  }
}
