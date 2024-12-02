export enum PlanType {
    TRIAL= 'Trial',
    START_UP = 'StartUp',
    GROWTH = 'Growth',
    SCALE = 'Scale',
   
  }
  
  export interface AdminLoginInfo {

    callerId: string;
    adminLoginId: string;
    agentExtension: string;
  }