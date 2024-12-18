import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Stripe } from '@stripe/stripe-js';
import { API_URL } from '../../../../config/env-config';
import { IBundleDetails, StripeCartProductDisplay } from '../../../../models/website-models';
import { PaymentHelperService } from '../../services/helper.service';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss',
})
export class PaymentComponent implements OnInit {
  stripe: Stripe | null = null;
  message: string | null = null;
  clientSecret!: string;
  // eslint-disable-next-line
  stripeElements!: any;
  cartItemsWithPlan!: StripeCartProductDisplay;
  bundlePlanDetails!: IBundleDetails;

  constructor(
    private readonly paymentService: PaymentService,
    private readonly helperService: PaymentHelperService
  ) {}

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
    const checkout = await this.stripe?.initEmbeddedCheckout({
      clientSecret,
    });

    // Mount Checkout
    checkout?.mount('#checkout');

    // this.stripeElements = this.stripe?.elements({clientSecret, appearance:{
    //   theme: 'stripe',
    // } });

    // if (this.stripeElements) {
    //   const paymentElementOptions = {
    //     layout: "tabs",
    //   } as StripeCardElementOptions;
    //   const cardElement = this.stripeElements.create('payment', paymentElementOptions);
    //   cardElement.mount('#payment-element');
    // }
  }

  async pay() {
    await this.stripe?.confirmPayment({
      elements: this.stripeElements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${API_URL.SELF_CHECKOUT}`,
      },
    });
  }

  getCartProductReq() {
   const products =this.cartItemsWithPlan[this.bundlePlanDetails.duration][
    this.bundlePlanDetails.bundleType
  ];
  return products?.map(prod => {
    return {priceId: prod.priceId, quantity: prod.quantity}
  })
  }
}
