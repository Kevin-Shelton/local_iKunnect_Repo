import { Component } from '@angular/core';
import { LicensePlanPricing } from '../../../../config/license-bundle-pricing';
import { PaymentHelperService } from '../../../selfcheckout/services/helper.service';
import { PlanType } from '../../../../models/website-models';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pricing-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pricing-table.component.html',
  styleUrl: './pricing-table.component.scss',
})
export class PricingTableComponent {
  plans = LicensePlanPricing;
  pricePlanTypes = PlanType;

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
    this.paymentHelper.changePlanType(planType as PlanType);
    this.router.navigate(['/self-checkout']);
    window.scrollTo(0, 0);
  }
}
