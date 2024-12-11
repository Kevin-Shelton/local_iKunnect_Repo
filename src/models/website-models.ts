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

export interface BundleDetails {
  type: PlanType;
  quantity: number;
  duration: PlanDuration;
  amount: { value: number; disValue: string };
  totalAmount: { value: number; disValue: string };
}
