
export type subscriptionType = {
    id: string,
    name: string,
    cost: string,
    nextBillingDate: string,
    status: string,
}

export type User = {
    email: string,
    mobile: string,
    firstName: string,
    lastName: string,
    address?: AddressType;
    token?: string;
    accountId?: string;
    country?: string;
    nextBillingDate?: string;
    isSubActive?: boolean;
};

export type AddressType = {
    addressLine1: string,
    suburb: string,
    state: string,
    postcode: string,
    countryCode: string
}

export interface Account {
    id: string;
    name: string;
    balance: number;
}
  
export interface Transaction {
  id: string;
  amount: number;
  date: string;
  description: string;
  category?: string;
}

export interface Institution {
    id: string;
    name: string;
    shortName: string;
    country: string;
    institutionType: string;
    serviceName: string;
    serviceType: string;
    loginIdCaption: string;
    passwordCaption: string;
    securityCodeCaption?: string; 
    logo?: {
      small: string;
      medium?: string;
      large?: string;
    };
    status: string;
    stage: string;
    tier: string;
    authorization: string;
    forgottenPasswordUrl?: string;
    userTokenCaption?: string; 
    stats?: Record<string, any>; 
    features?: Record<string, any>; 
    links?: {
      self: string;
      [key: string]: string;
    };
  }
  
  
  
