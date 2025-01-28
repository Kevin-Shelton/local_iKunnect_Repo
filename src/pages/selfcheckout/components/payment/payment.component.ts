import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Stripe } from '@stripe/stripe-js';
import {
  CartItemsReq,
  IBundleDetails,
  PlanType,
  StripeCartProductDisplay,
} from '../../../../models/website-models';
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
    const { cartProducts, isTrial } = this.getCartProductReq();

    this.paymentService.getStripeSession(cartProducts, isTrial).subscribe({
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
    const isTrial = this.bundlePlanDetails.bundleType === PlanType.TRIAL;
    let cartProducts: CartItemsReq[] = [];
    if (isTrial) {
      const products =
        this.cartItemsWithPlan[this.bundlePlanDetails.duration][
          PlanType.START_UP
        ];
      cartProducts = products
        ?.filter(prod => prod.type === PlanType.START_UP && prod.quantity !== 0)
        .map(prod => {
          return { priceId: prod.priceId, quantity: prod.quantity };
        });
    } else {
      const products =
        this.cartItemsWithPlan[this.bundlePlanDetails.duration][
          this.bundlePlanDetails.bundleType
        ];
      cartProducts = products
        ?.map(prod => {
          return { priceId: prod.priceId, quantity: prod.quantity };
        })
        .filter(prod => prod.quantity !== 0);
    }

    return { cartProducts, isTrial };
  }

  ngOnDestroy(): void {
    console.log('calling checkout session destroy');
    this.checkoutRef?.destroy();
  }
}
