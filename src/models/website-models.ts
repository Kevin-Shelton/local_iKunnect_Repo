export enum PlanType {
  TRIAL = 'Trial',
  START_UP = 'StartUp',
  GROWTH = 'Growth',
  SCALE = 'Scale',
  ENDPOINT_LICENSES = 'Endpoint Licenses',
  PREDICTIVE_DIALER = 'Predictive Dialer',
  ADVANCED_OMNICHANNEL = 'Advanced Omnichannel',
  IKUNNECT_INTELLIGENCE = 'iKunnect Intelligence',
  ADVANCED_AI_AUTOMATION = 'Advanced AI Automation'

}

export enum PlanDuration {
  MONTHLY = 'month',
  ANNUALLY = 'year',
}

export interface BasicPriceDetails {
  name: string,
  dbColumnName: DBColumnNames,
  trial: {value: string, stripeProdName: ProductNames },
  startUp: {value: string, stripeProdName: ProductNames },
  growth: {value: string, stripeProdName: ProductNames },
  scale: {value: string, stripeProdName: ProductNames },
}

export const BasicPricePlanNames = ['trial', 'startUp', 'growth', 'scale'];
export const BasicPricePlanNamesMap: { [key: string]: string } = {trial: 'Trial', startUp: 'StartUp', growth: 'Growth', scale: 'Scale'}

export enum ProductNames {
  EMPTY= '',
  SCALE_BUNDLE = 'Scale Bundle',
  Growth_Bundle = 'Growth Bundle',
  Startup_Bundle = 'Startup Bundle',
  Freemium_Bundle_with_Trial = 'Freemium Bundle with Trial',
  Endpoint_Lic_Startup = 'Endpoint Lic. (Startup)',
  Predictive_Dialer_Startup = 'Predictive Dialer (Startup)',
  Advanced_Omnichannel_Startup = 'Advanced Omnichannel (Startup)',
  Adv_iKunnect_Intelligence_Startup = 'Adv Kunnect Intelligence (Startup)',
  Endpoint_Lic_Growth = 'Endpoint Lic. (Growth)',
  Predictive_Dialer_Growth = 'Predictive Dialer (Growth)',
  Adv_iKunnect_Intelligence_Growth = 'Adv Kunnect Intelligence (Growth)',
  Advanced_AI_Automation_Scale = 'Advanced AI Automation (Scale)',
  Custom_Branding = 'Custom Branding',
  Ticketing_System = 'Ticketing System',
}

export interface ProductDetails {
  priceId: string,
  type: PlanType;
  quantity: number;
  duration: PlanDuration;
  amount: { value: number; disValue: string };
  totalAmount: { value: number; disValue: string };
}

export interface IBundleDetails {
  bundleType: PlanType;
  duration: PlanDuration;
}

export interface StripePricingDisplay {
  month: { [key: string]: { value: number; disValue: string } };
  year: { [key: string]: { value: number; disValue: string } };
}

export interface StripeCartProductDisplay {
  month: { [key: string]: ProductDetails[] };
  year: { [key: string]: ProductDetails[] };
}

export interface StripeProduct {
  description: string;
  id: string;
  name: ProductNames;
  prices: StripePrice[];
}

export interface StripePrice {
  amount: number;
  currency: string;
  id: string;
  interval: PlanDuration;
}

export interface CustomerInfoReq {
  firstName:string;
  lastName: string;
  emailId: string;
  country: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  subscribeReceiveEmails: number;
}

export enum DBColumnNames  {
  PRODUCT_ID= 'productId',
  PRODUCT_TYPE= 'productType',
  AGENT_SEATS_LICENSES= 'agent_SeatsLicenses',
  ADMIN_LICENSES= 'admin_Licenses',
  SUPERVISOR_LICENSES= 'supervisor_Licenses',
  END_POINT_LICENSES= 'endpoint_Licenses',
  PRODUCT_FEATURE_ID= 'product_FeatureId',
  BASIC_CALL_HANDLING= 'basic_CallHandling',
  ADVANCED_CALL_ROUTING= 'advanced_CallRouting',
  IVR= 'ivr',
  LOCAL_PRESENCE_DIALING= 'local_PresenceDialing',
  PREDICTIVE_DIALER= 'predictive_Dialer',
  ADVANCED_OMNI_CHANNEL= 'advanced_Omnichannel',
  TICKETING_SYSTEM= 'ticketing_Integration',
  VOICE_TO_CASE= 'voice_to_Case',
  CASE_MANAGEMETN= 'case_Mangement',
  CALL_DISPOSITION_NOTES= 'call_DispositionNotes',
  BUSINESS_HOURS_CONFIG= 'business_HoursConfig',
  VOICEMAIL_MANAGEMENT= 'voicemail_Management',
  IKUNNECT_INTELLIGENCE= 'iKunnect_Intelligence',
  NUMBER_MANAGEMENT= 'number_Management',
  ADVANCED_AI_AUTOMATION= 'advanced_AI_Automation',
  CLIENT_BRANDING= 'client_Branding',
  CUSTOMER_ID= 'customerId',
  FIRST_NAME= 'firstName',
  LAST_NAME= 'lastName',
  EMAIL_ID= 'email_Id',
  COUNTRY= 'country',
  STREET= 'street',
  CITY= 'city',
  STATE= 'state',
  ZIP_CODE= 'zipCode',
  SUBSCRIBE_RECEIVE_EMAILS= 'subscribeReceiveEmails',
  CUSTOMER_LICENSEID= 'customer_LicenseId',
  PRICE= 'price',
  QUANTITY= 'quantity',
  TOTAL_PRICE= 'total_Price'
}

export interface ProductLicnesesDetailsReq {
  productType: "string",
  agent_SeatsLicenses: "string",
  admin_Licenses: "string",
  supervisor_Licenses: "string",
  endpoint_Licenses: "string"
}

export interface ProductFeatureDetailsReq {
  basic_CallHandling: "string",
  advanced_CallRouting: "string",
  ivr: "string",
  local_PresenceDialing: "string",
  predictive_Dialer: "string",
  advanced_Omnichannel: "string",
  ticketing_Integration: "string",
  voice_to_Case: "string",
  case_Mangement: "string",
  call_DispositionNotes: "string",
  business_HoursConfig: "string",
  voicemail_Management: "string",
  iKunnect_Intelligence: "string",
  number_Management: "string",
  advanced_AI_Automation: "string",
  client_Branding: "string"
}

export interface CustomerLicenseInfoReq {
  price: number,
  quantity: number,
  total_Price: number,
  sessionId: string,
  status: string,
  subscribeReceiveEmails: number
}

export interface IWholeBundleReq {
  productDetails: ProductLicnesesDetailsReq;
  productFeatureDetails: ProductFeatureDetailsReq; 
  customerLicenseInfo: CustomerLicenseInfoReq
}

export interface CartItemsReq {
  priceId: string,
  quantity: number
}

export interface ICountry {
  name: string;
  dialCode: string;
  code: string;
}

export interface IState {
  name: string;
  state_code: string;
}