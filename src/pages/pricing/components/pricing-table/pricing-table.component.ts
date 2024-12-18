import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LicensePlanPricing } from '../../../../config/license-bundle-pricing';
import {
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
  licenseTypes = this.plans.licenses.year;
  featureTypes = this.plans.features.year;
  stripeBundlePricing!: StripePricingDisplay;
  cartProductPricing: StripeCartProductDisplay = {
    year: { StartUp: [], Growth: [], Scale: [] },
    month: { StartUp: [], Growth: [], Scale: [] },
  };
  priceDetByDuration = this.stripeBundlePricing?.year;
  planPeriod = PlanDuration.ANNUALLY;

  constructor(
    private readonly router: Router,
    private readonly paymentHelper: PaymentHelperService,
    private readonly paymentService: PaymentService
  ) {}
  ngOnInit(): void {
    this.paymentService.getProducts().subscribe({
      next: res => {
        console.log('all products :::::: ', res);
        this.mergeProductsWithStripePrices(res);
      },
    });
  }
  isText(type: string) {
    return type !== 'no' && type !== 'yes';
  }
  getDataType(val: string, type: string) {
    return val === type;
  }
  buyPlan(planType: string) {
    this.paymentHelper.changeBundlePlanDetails({
      bundleType: planType as PlanType,
      duration: this.planPeriod,
    });
    this.paymentHelper.changeCartItemsWithDurationDetails(this.cartProductPricing);
    this.paymentHelper.changeWholeBundleDetails(this.plans);
    this.router.navigate(['/self-checkout']);

    window.scrollTo(0, 0);
  }

  planDurationChange() {
    if (this.planPeriod === PlanDuration.MONTHLY) {
      this.planPeriod = PlanDuration.ANNUALLY;
      this.priceDetByDuration = this.stripeBundlePricing.year;
      this.licenseTypes = this.plans.licenses.year;
      this.featureTypes = this.plans.features.year;
    } else {
      this.planPeriod = PlanDuration.MONTHLY;
      this.priceDetByDuration = this.stripeBundlePricing.month;
      this.licenseTypes = this.plans.licenses.month;
      this.featureTypes = this.plans.features.month;
    }
  }
  mergeProductsWithStripePrices(products: StripeProduct[]) {
    this.mergeBundlePrices(products);
    this.mergeStartUpAdditionalPrices(products);
    this.mergeGrowthAdditionalPrices(products);
  }

  mergeBundlePrices(products: StripeProduct[]) {
    this.stripeBundlePricing = {
      month: { Trial: { value: 0, disValue: `$-` } },
      year: { Trial: { value: 0, disValue: `$-` } },
    };
    products
      .filter(prd =>
        [
          ProductNames.Startup_Bundle,
          ProductNames.SCALE_BUNDLE,
          ProductNames.Growth_Bundle,
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
        });
      });
    this.priceDetByDuration = this.stripeBundlePricing.year;
  }

  addBundlePrice(price: StripePrice, bundleTyep: string) {
    this.stripeBundlePricing[price.interval][bundleTyep] = {
      value: price.amount,
      disValue: `$${price.amount}`,
    };
    this.cartProductPricing[price.interval][bundleTyep].push({
      type: PlanType.SCALE,
      duration: price.interval,
      amount: { value: price.amount, disValue: `$${price.amount.toFixed(2)}` },
      quantity: 1,
      totalAmount: { value: price.amount, disValue: price.amount.toFixed(2) },
      priceId: price.id
    });
  }

  mergeStartUpAdditionalPrices(products: StripeProduct[]) {
    products.forEach(prod => {
      if (prod.name === ProductNames.Endpoint_Lic_Startup) {
        prod.prices.forEach(price => {
          const endpointLice = this.plans.licenses[price.interval].filter(
            license => license.name === 'Endpoint Licenses'
          );
          if (endpointLice.length > 0) {
            endpointLice[0].startUp = `+$${price.amount}/per`;
            this.cartProductPricing[price.interval]['StartUp'].push({
              type: endpointLice[0].name as PlanType,
              duration: price.interval,
              amount: {
                value: price.amount,
                disValue: price.amount.toFixed(2),
              },
              quantity: 1,
              totalAmount: {
                value: price.amount,
                disValue: price.amount.toFixed(2),
              },
              priceId: price.id
            });
          }
        });
      } else if (prod.name === ProductNames.Predictive_Dialer_Startup) {
        prod.prices.forEach(price => {
          const predictive = this.plans.features[price.interval].filter(
            license => license.name === 'Predictive Dialer'
          );
          if (predictive.length > 0) {
            predictive[0].startUp =
              price.interval === PlanDuration.ANNUALLY
                ? `+$${price.amount}/y`
                : `+$${price.amount}/m`;
            this.cartProductPricing[price.interval]['StartUp'].push({
              type: predictive[0].name as PlanType,
              duration: price.interval,
              amount: {
                value: price.amount,
                disValue: price.amount.toFixed(2),
              },
              quantity: 1,
              totalAmount: {
                value: price.amount,
                disValue: price.amount.toFixed(2),
              },
              priceId: price.id
            });
          }
        });
      } else if (prod.name === ProductNames.Advanced_Omnichannel_Startup) {
        prod.prices.forEach(price => {
          const predictive = this.plans.features[price.interval].filter(
            license => license.name === 'Advanced Omnichannel'
          );
          if (predictive.length > 0) {
            predictive[0].startUp =
              price.interval === PlanDuration.ANNUALLY
                ? `+$${price.amount}/channel/y`
                : `+$${price.amount}/channel/m`;
            this.cartProductPricing[price.interval]['StartUp'].push({
              type: predictive[0].name as PlanType,
              duration: price.interval,
              amount: {
                value: price.amount,
                disValue: price.amount.toFixed(2),
              },
              quantity: 1,
              totalAmount: {
                value: price.amount,
                disValue: price.amount.toFixed(2),
              },
              priceId: price.id
            });
          }
        });
      } else if (prod.name === ProductNames.Adv_iKunnect_Intelligence_Startup) {
        prod.prices.forEach(price => {
          const predictive = this.plans.features[price.interval].filter(
            license => license.name === 'iKunnect Intelligence'
          );
          if (predictive.length > 0) {
            predictive[0].startUp =
              price.interval === PlanDuration.ANNUALLY
                ? `+$${price.amount}/y`
                : `+$${price.amount}/m`;
            this.cartProductPricing[price.interval]['StartUp'].push({
              type: predictive[0].name as PlanType,
              duration: price.interval,
              amount: {
                value: price.amount,
                disValue: price.amount.toFixed(2),
              },
              quantity: 1,
              totalAmount: {
                value: price.amount,
                disValue: price.amount.toFixed(2),
              },
              priceId: price.id
            });
          }
        });
      }
    });
  }
  mergeGrowthAdditionalPrices(products: StripeProduct[]) {
    products.forEach(prod => {
      if (prod.name === ProductNames.Endpoint_Lic_Growth) {
        prod.prices.forEach(price => {
          const endpointLice = this.plans.licenses[price.interval].filter(
            license => license.name === 'Endpoint Licenses'
          );
          if (endpointLice.length > 0) {
            endpointLice[0].growth = `+$${price.amount}/per`;
            this.cartProductPricing[price.interval]['Growth'].push({
              type: endpointLice[0].name as PlanType,
              duration: price.interval,
              amount: {
                value: price.amount,
                disValue: price.amount.toFixed(2),
              },
              quantity: 1,
              totalAmount: {
                value: price.amount,
                disValue: price.amount.toFixed(2),
              },
              priceId: price.id
            });
          }
        });
      } else if (prod.name === ProductNames.Predictive_Dialer_Growth) {
        prod.prices.forEach(price => {
          const predictive = this.plans.features[price.interval].filter(
            license => license.name === 'Predictive Dialer'
          );
          if (predictive.length > 0) {
            predictive[0].growth =
              price.interval === PlanDuration.ANNUALLY
                ? `+$${price.amount}/y`
                : `+$${price.amount}/m`;
            this.cartProductPricing[price.interval]['Growth'].push({
              type: predictive[0].name as PlanType,
              duration: price.interval,
              amount: {
                value: price.amount,
                disValue: price.amount.toFixed(2),
              },
              quantity: 1,
              totalAmount: {
                value: price.amount,
                disValue: price.amount.toFixed(2),
              },
              priceId: price.id
            });
          }
        });
      } else if (prod.name === ProductNames.Adv_iKunnect_Intelligence_Startup) {
        prod.prices.forEach(price => {
          const predictive = this.plans.features[price.interval].filter(
            license => license.name === 'iKunnect Intelligence'
          );
          if (predictive.length > 0) {
            predictive[0].growth =
              price.interval === PlanDuration.ANNUALLY
                ? `+$${price.amount}/y`
                : `+$${price.amount}/m`;
            this.cartProductPricing[price.interval]['Growth'].push({
              type: predictive[0].name as PlanType,
              duration: price.interval,
              amount: {
                value: price.amount,
                disValue: price.amount.toFixed(2),
              },
              quantity: 1,
              totalAmount: {
                value: price.amount,
                disValue: price.amount.toFixed(2),
              },
              priceId: price.id
            });
          }
        });
      }
    });
  }
}
