// src/app/services/stripe.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  IBundleDetails,
  PlanDuration,
  PlanType,
  StripeCartProductDisplay,
} from '../../../models/website-models';

@Injectable({
  providedIn: 'root',
})
export class PaymentHelperService {
  private readonly cartItemsWithDuration =
    new BehaviorSubject<StripeCartProductDisplay>(
      {} as StripeCartProductDisplay
    );
  currentCartItemsWithProducts = this.cartItemsWithDuration.asObservable();

  private readonly bundlePlanDetails = new BehaviorSubject<IBundleDetails>({
    bundleType: PlanType.START_UP,
    duration: PlanDuration.ANNUALLY,
  });
  currentBundlePlanDetails = this.bundlePlanDetails.asObservable();

  private readonly wholeBundleDetails = new BehaviorSubject<any>({});
  currentWholeBundleDetails = this.wholeBundleDetails.asObservable();

  private readonly subscription = new BehaviorSubject<number>(0);
  currentSubscription = this.subscription.asObservable();

  changeCartItemsWithDurationDetails(cartItems: StripeCartProductDisplay) {
    this.cartItemsWithDuration.next(cartItems);
  }

  changeBundlePlanDetails(bundleDetails: IBundleDetails) {
    this.bundlePlanDetails.next(bundleDetails);
  }

  changeWholeBundleDetails(wholeBundle: any) {
    this.wholeBundleDetails.next(wholeBundle);
  }

  changeSubcription(subNumer: number) {
    this.subscription.next(subNumer);
  }
}
