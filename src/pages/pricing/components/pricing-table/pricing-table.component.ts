import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  LicensePlanPricing,
  PricesByDuration,
} from '../../../../config/license-bundle-pricing';
import {
  BundleDetails,
  PlanDuration,
  PlanType,
  ProductNames,
  StripeProduct,
} from '../../../../models/website-models';
import { PaymentHelperService } from '../../../selfcheckout/services/helper.service';
import { PaymentService } from '../../../selfcheckout/services/payment.service';

@Component({
  selector: 'app-pricing-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pricing-table.component.html',
  styleUrl: './pricing-table.component.scss',
})
export class PricingTableComponent implements OnInit{
  plans = LicensePlanPricing;
  stripeBundlePricing! : {
    month: { [key: string]: { value: number; disValue: string } };
    year: { [key: string]: { value: number; disValue: string } };
  }
  priceDetByDuration = this.stripeBundlePricing?.year;
  planPeriod = PlanDuration.ANNUALLY;

  constructor(
    private readonly router: Router,
    private readonly paymentHelper: PaymentHelperService,
    private readonly paymentService: PaymentService,
  ) {}
  ngOnInit(): void {
 this.paymentService.getProducts().subscribe({
  next: res => {
    console.log('all products :::::: ', res);
    this.mergeProductsWithStripePrices(res);
  }
 })
  }
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
      this.priceDetByDuration = this.stripeBundlePricing.year;
    } else {
      this.planPeriod = PlanDuration.MONTHLY;
      this.priceDetByDuration = this.stripeBundlePricing.month;
    }
  }
  mergeProductsWithStripePrices(products: StripeProduct[]) {
    this.stripeBundlePricing = {month: {Trial: { value: 0, disValue:  `$-` }}, year: {Trial: { value: 0, disValue:  `$-` }}}
    products.filter(prd => [ProductNames.Startup_Bundle, ProductNames.SCALE_BUNDLE, ProductNames.Growth_Bundle].includes(prd.name)).forEach(prd =>{
      prd.prices.forEach(price => {
        if(price.interval === PlanDuration.MONTHLY) {
          if(prd.name === ProductNames.Startup_Bundle) {
            this.stripeBundlePricing.month['StartUp'] = { value: price.amount, disValue:  `$${price.amount}` }
          }
          if(prd.name === ProductNames.Growth_Bundle) {
            this.stripeBundlePricing.month['Growth'] = { value: price.amount, disValue:  `$${price.amount}` }
          }
          if(prd.name === ProductNames.SCALE_BUNDLE) {
            this.stripeBundlePricing.month['Scale'] = { value: price.amount, disValue:  `$${price.amount}` }
          }
        } else {
          if(prd.name === ProductNames.Startup_Bundle) {
            this.stripeBundlePricing.year['StartUp'] = { value: price.amount, disValue:  `$${price.amount}` }
          }
          if(prd.name === ProductNames.Growth_Bundle) {
            this.stripeBundlePricing.year['Growth'] = { value: price.amount, disValue:  `$${price.amount}` }
          }
          if(prd.name === ProductNames.SCALE_BUNDLE) {
            this.stripeBundlePricing.year['Scale'] = { value: price.amount, disValue:  `$${price.amount}` }
          }
        }
      })
    });
    this.priceDetByDuration = this.stripeBundlePricing.year;
   
  }

}
