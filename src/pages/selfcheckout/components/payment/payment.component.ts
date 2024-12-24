import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Stripe } from '@stripe/stripe-js';
import { API_URL } from '../../../../config/env-config';
import { IBundleDetails, IWholeBundleReq, StripeCartProductDisplay } from '../../../../models/website-models';
import { PaymentHelperService } from '../../services/helper.service';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss',
})
export class PaymentComponent implements OnInit, OnDestroy {
  stripe: Stripe | null = null;
  message: string | null = null;
  clientSecret!: string;

  cartItemsWithPlan!: StripeCartProductDisplay;
  bundlePlanDetails!: IBundleDetails;
  checkoutRef!: any;

  @Output() clientSecreteEvt: EventEmitter<string> = new EventEmitter();

  constructor(
    private readonly paymentService: PaymentService,
    private readonly helperService: PaymentHelperService
  ) { }


  async ngOnInit() {
    this.helperService.currentBundlePlanDetails.subscribe({
      next: res => {
        this.bundlePlanDetails = res;
      },
    });
    this.helperService.currentCartItemsWithProducts.subscribe({
      next: res => {
        this.cartItemsWithPlan = res;
      },
    });
    this.stripe = await this.paymentService.getStripe();
    const cartProducts = this.getCartProductReq();

    this.paymentService
      .getStripeSession(
        cartProducts
      )
      .subscribe({
        next: async res => {
          await this.initStripe(res.clientSecret);
        },
      });
  }

  async initStripe(clientSecret: string) {
    this.clientSecreteEvt.emit(clientSecret);
    this.checkoutRef = await this.stripe?.initEmbeddedCheckout({
      clientSecret,
    });

    // Mount Checkout
    this.checkoutRef?.mount('#checkout');

  }



  getCartProductReq() {
    const products = this.cartItemsWithPlan[this.bundlePlanDetails.duration][
      this.bundlePlanDetails.bundleType
    ];
    return products?.map(prod => {
      return { priceId: prod.priceId, quantity: prod.quantity }
    }).filter(prod => prod.quantity !== 0);
  }



  ngOnDestroy(): void {

    this.checkoutRef?.destroy();
  }

}
