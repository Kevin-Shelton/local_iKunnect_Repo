import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  LicensePlanPricing,
  PricesByDuration,
} from '../../../../config/license-bundle-pricing';
import {
  BundleDetails,
  PlanDuration,
  PlanType,
} from '../../../../models/website-models';
import { PaymentHelperService } from '../../../selfcheckout/services/helper.service';

@Component({
  selector: 'app-pricing-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pricing-table.component.html',
  styleUrl: './pricing-table.component.scss',
})
export class PricingTableComponent {
  plans = LicensePlanPricing;
  priceDetByDuration = PricesByDuration.year;
  planPeriod = PlanDuration.ANNUALLY;

  constructor(
    private readonly router: Router,
    private readonly paymentHelper: PaymentHelperService
  ) {}
  isText(type: string) {
    return type !== 'cross' && type !== 'tick';
  }
  getDataType(val: string, type: string) {
    return val === type;
  }
  buyPlan(planType: string) {
    const bundleAmount = this.priceDetByDuration[planType];

    const budleDetails: BundleDetails = {
      type: planType as PlanType,
      amount: bundleAmount,
      totalAmount: bundleAmount,
      duration: this.planPeriod,
      quantity: 1,
    };
    this.paymentHelper.changeBundleDetails(budleDetails);
    this.router.navigate(['/self-checkout']);
    window.scrollTo(0, 0);
  }

  planDurationChange() {
    if (this.planPeriod === PlanDuration.MONTHLY) {
      this.planPeriod = PlanDuration.ANNUALLY;
      this.priceDetByDuration = PricesByDuration.year;
    } else {
      this.planPeriod = PlanDuration.MONTHLY;
      this.priceDetByDuration = PricesByDuration.month;
    }
  }
}
