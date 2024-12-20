import axios from "axios";

type PaymentIntentResponse = {
  clientSecret: string;
  error?: string;
};

export const fetchPaymentIntentClientSecret = async (
): Promise<PaymentIntentResponse> => {
  try {
    const amount: number = 600; //$6.00
    const currency: string = "aud";
    const backendUrl = "http://localhost:4242/create-payment-intent";

    const response = await axios.post(backendUrl, {
      amount,
      currency,
    });

    if (response.data.clientSecret) {
      return { clientSecret: response.data.clientSecret };
    } else {
      throw new Error("Client secret not returned from the backend.");
    }
  } catch (error: any) {
    console.error("Error fetching PaymentIntent:",  error);
    return { clientSecret: "", error: error.message || "Failed to fetch client secret." };
  }
};
