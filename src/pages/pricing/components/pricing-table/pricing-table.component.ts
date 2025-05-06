import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LicensePlanPricing } from '../../../../config/license-bundle-pricing';
import {
  BasicPricePlanNames,
  BasicPricePlanNamesMap,
  PlanDuration,
  PlanType,
  ProductNames,
  StripeCartProductDisplay,
  StripePrice,
  StripePricingDisplay,
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
export class PricingTableComponent implements OnInit {
  plans = LicensePlanPricing;
  licenseTypes = this.plans['licenses'].year;
  featureTypes = this.plans['features'].year;
  stripeBundlePricing!: StripePricingDisplay;
  cartProductPricing: StripeCartProductDisplay = {
    year: { Trial: [], StartUp: [], Growth: [], Scale: [] },
    month: { Trial: [], StartUp: [], Growth: [], Scale: [] },
  };
  priceDetByDuration = this.stripeBundlePricing?.month;
  planPeriod = PlanDuration.MONTHLY;

  constructor(
    private readonly router: Router,
    private readonly paymentHelper: PaymentHelperService,
    private readonly paymentService: PaymentService
  ) {}
  ngOnInit(): void {
    this.paymentService.getProducts().subscribe({
      next: res => {
        this.mergeProductsWithStripePrices(res);
      },
    });
  }
  isText(type: { value: string; stripeProdName: ProductNames }) {
    return type.value !== 'no' && type.value !== 'yes';
  }
  getDataType(
    val: { value: string; stripeProdName: ProductNames },
    type: string
  ) {
    return val.value === type;
  }
  buyPlan(planType: string) {
    this.paymentHelper.changeBundlePlanDetails({
      bundleType: planType as PlanType,
      duration:
        planType === PlanType.TRIAL ? PlanDuration.MONTHLY : this.planPeriod,
    });
    this.paymentHelper.changeCartItemsWithDurationDetails(
      this.cartProductPricing
    );
    this.paymentHelper.changeWholeBundleDetails(this.plans);
    this.router.navigate(['/self-checkout']);

    window.scrollTo(0, 0);
  }

  planDurationChange(values: any) {
    if (values.currentTarget.checked) {
      this.planPeriod = PlanDuration.ANNUALLY;
      this.priceDetByDuration = this.stripeBundlePricing.year;
      this.licenseTypes = this.plans['licenses'].year;
      this.featureTypes = this.plans['features'].year;
    } else {
      this.planPeriod = PlanDuration.MONTHLY;
      this.priceDetByDuration = this.stripeBundlePricing.month;
      this.licenseTypes = this.plans['licenses'].month;
      this.featureTypes = this.plans['features'].month;
    }
  }
  mergeProductsWithStripePrices(products: StripeProduct[]) {
    this.mergeBundlePrices(products);
    this.mergeStripeProdIntoJsonData(products);
  }

  mergeBundlePrices(products: StripeProduct[]) {
    this.stripeBundlePricing = {
      month: {},
      year: {},
    };
    products
      .filter(prd =>
        [
          ProductNames.Startup_Bundle,
          ProductNames.SCALE_BUNDLE,
          ProductNames.Growth_Bundle,
          ProductNames.Freemium_Bundle_with_Trial,
        ].includes(prd.name)
      )
      .forEach(prd => {
        prd.prices.forEach(price => {
          if (prd.name === ProductNames.Startup_Bundle) {
            this.addBundlePrice(price, PlanType.START_UP);
          }
          if (prd.name === ProductNames.Growth_Bundle) {
            this.addBundlePrice(price, PlanType.GROWTH);
          }
          if (prd.name === ProductNames.SCALE_BUNDLE) {
            this.addBundlePrice(price, PlanType.SCALE);
          }
          if (prd.name === ProductNames.Freemium_Bundle_with_Trial) {
            this.addBundlePrice(price, PlanType.TRIAL);
          }
        });
      });
    this.priceDetByDuration = this.stripeBundlePricing.month;
  }

  addBundlePrice(price: StripePrice, bundleTyep: string) {
    this.stripeBundlePricing[price.interval][bundleTyep] = {
      value: price.amount,
      disValue: `$${price.amount}`,
    };
    this.cartProductPricing[price.interval][bundleTyep].push({
      type: bundleTyep as PlanType,
      duration: price.interval,
      amount: { value: price.amount, disValue: `$${price.amount.toFixed(2)}` },
      quantity: 1,
      totalAmount: {
        value: price.amount,
        disValue: `$${price.amount.toFixed(2)}`,
      },
      priceId: price.id,
    });
  }

  mergeStripeProdIntoJsonData(products: StripeProduct[]) {
    Object.keys(this.plans).forEach(planKey => {
      Object.keys(this.plans[planKey]).forEach(value => {
        const duration: PlanDuration = value as PlanDuration;
        this.plans[planKey][duration]?.forEach(prodInfo => {
          this.getPricingCellFromJson(products, prodInfo, duration);
        });
      });
    });
  }

  getStripeProductInfo(products: StripeProduct[], prodName: string) {
    return products.find(prod => {
      return prod.name === prodName;
    });
  }
  getPricingCellFromJson(
    products: StripeProduct[],
    prodInfo: any,
    duration: PlanDuration
  ) {
    Object.keys(prodInfo)
      .filter(
        key =>
          BasicPricePlanNames.includes(key) &&
          this.getStripeProductInfo(products, prodInfo[key].stripeProdName)
      )
      .forEach(key => {
        const stipeMatchingProd = this.getStripeProductInfo(
          products,
          prodInfo[key].stripeProdName
        );
        const priceObj = stipeMatchingProd?.prices.find(
          priceObj => priceObj.interval === duration
        );
        if (priceObj) {
          prodInfo[key].value = prodInfo[key].value.replace(
            'price',
            priceObj.amount
          );
          const cartItem = {
            type: prodInfo['name'] as PlanType,
            duration: duration,
            amount: {
              value: priceObj.amount,
              disValue: `$${priceObj.amount.toFixed(2)}`,
            },
            quantity: 1,
            totalAmount: {
              value: priceObj.amount,
              disValue: `$${priceObj.amount.toFixed(2)}`,
            },
            priceId: priceObj.id,
          };
          this.cartProductPricing[duration][BasicPricePlanNamesMap[key]].push(
            cartItem
          );
        }
      });
  }
}
