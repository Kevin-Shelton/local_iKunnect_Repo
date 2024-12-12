export enum PlanType {
  TRIAL = 'Trial',
  START_UP = 'StartUp',
  GROWTH = 'Growth',
  SCALE = 'Scale',
}

export enum PlanDuration {
  MONTHLY = 'month',
  ANNUALLY = 'year',
}

export enum ProductNames {
  SCALE_BUNDLE = 'Scale Bundle',
  Growth_Bundle = 'Growth Bundle',
  Startup_Bundle = 'Startup Bundle',
  Freemium_Bundle_with_Trial = 'Freemium Bundle with Trial',
  Endpoint_Lic_Startup= 'Endpoint Lic. (Startup)',
  Endpoint_Lic_Growth = 'Endpoint Lic. (Growth)',
  Predictive_Dialer_Growth = 'Predictive Dialer (Growth)',
  Predictive_Dialer_Startup = 'Predictive Dialer (Startup)',
  Advanced_Omnichannel_Startup = 'Advanced Omnichannel (Startup)',
  Adv_iKunnect_Intelligence_Startup = 'Adv iKunnect Intelligence (Startup)',
  Custom_Branding = 'Custom Branding',
  Ticketing_System = 'Ticketing System'

}

export interface BundleDetails {
  type: PlanType;
  quantity: number;
  duration: PlanDuration;
  amount: { value: number; disValue: string };
  totalAmount: { value: number; disValue: string };
}


export interface StripeProduct {
  description: string,
id: string,
name: ProductNames,
prices: StripePrice[]

}

export interface StripePrice {
  amount: number,
currency: string,
id: string,
interval:PlanDuration
}