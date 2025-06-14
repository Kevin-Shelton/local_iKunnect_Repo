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

// Feature definition interface
interface FeatureDefinition {
  name: string;
  description: string;
  category: 'core-licensing' | 'channels' | 'essential-functionality' | 'support';
}

// Feature group configuration
interface FeatureGroup {
  id: string;
  title: string;
  icon: string;
  description: string;
}

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
  
  // Enhanced feature management
  expandedGroups: { [key: string]: boolean } = {};
  selectedFeatureTooltip: { [key: string]: string | null } = {};

  // Feature groups configuration
  featureGroups: FeatureGroup[] = [
    {
      id: 'core-licensing',
      title: 'Core Licensing',
      icon: 'bi-award',
      description: 'Essential licensing and user management capabilities'
    },
    {
      id: 'channels',
      title: 'Channels',
      icon: 'bi-chat-dots',
      description: 'Communication channels and interaction methods'
    },
    {
      id: 'essential-functionality',
      title: 'Essential Functionality',
      icon: 'bi-gear',
      description: 'Core platform features and operational tools'
    },
    {
      id: 'support',
      title: 'Support',
      icon: 'bi-headset',
      description: 'Customer support and assistance services'
    }
  ];

  // Feature definitions with descriptions
  featureDefinitions: FeatureDefinition[] = [
    // Core Licensing Features
    {
      name: 'Agent Desktop',
      description: 'Comprehensive agent interface with unified workspace for handling customer interactions across all channels.',
      category: 'core-licensing'
    },
    {
      name: 'Supervisor Desktop',
      description: 'Advanced supervisory tools for monitoring, coaching, and managing agent performance in real-time.',
      category: 'core-licensing'
    },
    {
      name: 'Admin Portal',
      description: 'Complete administrative control panel for system configuration, user management, and reporting.',
      category: 'core-licensing'
    },
    
    // Channels Features
    {
      name: 'Chat',
      description: 'Real-time web chat functionality with customizable chat widgets and automated routing.',
      category: 'channels'
    },
    {
      name: 'Voice',
      description: 'Full-featured voice calling with advanced telephony features, call routing, and IVR capabilities.',
      category: 'channels'
    },
    {
      name: 'Email',
      description: 'Integrated email management with automated ticketing, routing, and response templates.',
      category: 'channels'
    },
    {
      name: 'SMS/MMS',
      description: 'Two-way SMS and multimedia messaging with automated responses and conversation threading.',
      category: 'channels'
    },
    {
      name: 'Social Messaging',
      description: 'Unified social media messaging across platforms like Facebook, Twitter, and Instagram.',
      category: 'channels'
    },
    
    // Essential Functionality Features
    {
      name: 'Blended Inbound/Outbound',
      description: 'Seamless switching between inbound and outbound operations with unified agent experience.',
      category: 'essential-functionality'
    },
    {
      name: 'Geo Redundancy',
      description: 'Geographic redundancy and disaster recovery capabilities to ensure business continuity.',
      category: 'essential-functionality'
    },
    {
      name: 'Recording',
      description: 'Comprehensive call and screen recording with secure storage and compliance features.',
      category: 'essential-functionality'
    },
    {
      name: 'Dialer',
      description: 'Advanced predictive, progressive, and preview dialing capabilities for outbound campaigns.',
      category: 'essential-functionality'
    },
    {
      name: 'Essentials GM',
      description: 'Essential gamification and motivation tools to boost agent engagement and performance.',
      category: 'essential-functionality'
    },
    {
      name: 'Enterprise GM',
      description: 'Advanced gamification platform with comprehensive analytics and customizable reward systems.',
      category: 'essential-functionality'
    },
    {
      name: 'Enterprise WFM',
      description: 'Complete workforce management solution with forecasting, scheduling, and adherence monitoring.',
      category: 'essential-functionality'
    },
    {
      name: 'Interaction Analytics',
      description: 'AI-powered conversation analysis providing insights into customer sentiment and agent performance.',
      category: 'essential-functionality'
    },
    {
      name: 'Workflow Automation',
      description: 'Automated business process workflows to streamline operations and reduce manual tasks.',
      category: 'essential-functionality'
    },
    {
      name: 'Full Platform',
      description: 'Complete access to all platform capabilities including advanced integrations and customizations.',
      category: 'essential-functionality'
    },
    
    // Support Features
    {
      name: '24/7 World Class Support',
      description: 'Round-the-clock premium support with dedicated account management and priority response times.',
      category: 'support'
    }
  ];

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

  // Enhanced feature group management
  toggleFeatureGroup(groupKey: string): void {
    this.expandedGroups[groupKey] = !this.expandedGroups[groupKey];
  }

  // Get features by category
  getFeaturesByCategory(category: string): any[] {
    if (category === 'core-licensing') {
      return this.licenseTypes || [];
    }
    
    return (this.featureTypes || []).filter(feature => {
      const definition = this.getFeatureDefinition(feature['name']);
      return definition?.category === category;
    });
  }

  // Get feature definition
  getFeatureDefinition(featureName: string): FeatureDefinition | undefined {
    return this.featureDefinitions.find(def => 
      featureName.toLowerCase().includes(def.name.toLowerCase()) ||
      def.name.toLowerCase().includes(featureName.toLowerCase())
    );
  }

  // Show feature tooltip
  showFeatureTooltip(featureName: string, planType: string): void {
    const key = `${planType}-${featureName}`;
    this.selectedFeatureTooltip[key] = featureName;
  }

  // Hide feature tooltip
  hideFeatureTooltip(featureName: string, planType: string): void {
    const key = `${planType}-${featureName}`;
    this.selectedFeatureTooltip[key] = null;
  }

  // Check if tooltip should be shown
  shouldShowTooltip(featureName: string, planType: string): boolean {
    const key = `${planType}-${featureName}`;
    return this.selectedFeatureTooltip[key] === featureName;
  }

  // Get button text based on plan type
  getButtonText(planType: string): string {
    return planType === 'Trial' ? 'Start Trial' : 'Buy Now';
  }

  // Get button class based on plan type
  getButtonClass(planType: string): string {
    const baseClass = 'plan-button';
    switch (planType) {
      case 'Trial':
        return `${baseClass} trial-button`;
      case 'StartUp':
        return `${baseClass} startup-button`;
      case 'Growth':
        return `${baseClass} growth-button`;
      case 'Scale':
        return `${baseClass} scale-button`;
      default:
        return baseClass;
    }
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

