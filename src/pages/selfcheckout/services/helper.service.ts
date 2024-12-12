// src/app/services/stripe.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  ProductDetails,
  PlanDuration,
  PlanType,
  StripeCartProductDisplay,
} from '../../../models/website-models';

@Injectable({
  providedIn: 'root',
})
export class PaymentHelperService {
  private readonly cartItemsWithDuration = new BehaviorSubject<StripeCartProductDisplay>({} as StripeCartProductDisplay);

  currentCartItemsWithProducts = this.cartItemsWithDuration.asObservable();

  changeProductDetails(cartItems: StripeCartProductDisplay) {
    this.cartItemsWithDuration.next(cartItems);
  }
}
