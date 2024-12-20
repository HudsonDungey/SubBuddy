
export const isUserAppSubActive = (nextBillingDate: string): boolean => {
    if (!nextBillingDate || nextBillingDate == '0') return false; 
  
    const today = new Date();
    const billingDate = new Date(nextBillingDate);
  
    return billingDate >= today; 
  };
  