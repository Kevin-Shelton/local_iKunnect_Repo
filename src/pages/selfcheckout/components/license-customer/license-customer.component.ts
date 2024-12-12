import { Component, OnInit } from '@angular/core';
import { PricesByDuration } from '../../../../config/license-bundle-pricing';
import { IBundleDetails, PlanDuration, PlanType, ProductDetails, StripeCartProductDisplay } from '../../../../models/website-models';
import { PaymentHelperService } from '../../services/helper.service';

@Component({
  selector: 'app-license-customer',
  standalone: true,
  imports: [],
  templateUrl: './license-customer.component.html',
  styleUrl: './license-customer.component.scss',
})
export class LicenseCustomerComponent implements OnInit {
  cartItemDetails!: StripeCartProductDisplay;
  bundlePlan!: IBundleDetails;
  planCartItems!: ProductDetails[]
  isAnnually: boolean = false;
  constructor(private readonly paymentHelperService: PaymentHelperService) {}
  ngOnInit(): void {
    this.paymentHelperService.currentBundlePlanDetails.subscribe({
      next: res => {
        this.bundlePlan = res;
        
      },
    });
    this.paymentHelperService.currentCartItemsWithProducts.subscribe({
      next: res => {
        this.cartItemDetails = res;
        this.planCartItems = this.cartItemDetails[this.bundlePlan.duration][this.bundlePlan.bundleType];
      },
    });
  }

  planDurationChange() {
    if (this.bundlePlan.duration === PlanDuration.MONTHLY) {
      this.bundlePlan.duration = PlanDuration.ANNUALLY;
      this.planCartItems = this.cartItemDetails[this.bundlePlan.duration][this.bundlePlan.bundleType];
    } else {
      this.bundlePlan.duration = PlanDuration.MONTHLY;
      this.planCartItems = this.cartItemDetails[this.bundlePlan.duration][this.bundlePlan.bundleType];
    }
  }

  decrementBundleQuantity(product: ProductDetails) {
    if ( [PlanType.START_UP, PlanType.GROWTH, PlanType.SCALE].includes(product.type) ? product.quantity > 1 : product.quantity > 0) {
      product.quantity = product.quantity - 1;
      const total = {
        value: product.quantity * product.amount.value,
        disValue: `$${(product.quantity * product.amount.value).toFixed(2)}`,
      };
      product.totalAmount = total;
     // this.paymentHelperService.changeBundleDetails(this.bundleDetails);
    }
  }
  incrementBundleQuantity(product: ProductDetails) {
    product.quantity = product.quantity + 1;
    const total = {
      value: product.quantity * product.amount.value,
      disValue: `$${(product.quantity * product.amount.value).toFixed(2)}`,
    };
    product.totalAmount = total;

   // this.paymentHelperService.changeBundleDetails(this.bundleDetails);
  }
}
