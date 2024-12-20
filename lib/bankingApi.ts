import axios from 'axios';
import { Account, Transaction } from '@/types';

const BASIQ_API_URL = 'https://au-api.basiq.io';
const BASIQ_API_KEY = process.env.BASIQ_API_KEY;

const apiClient = axios.create({
  baseURL: BASIQ_API_URL,
  headers: {
    Authorization: `Bearer ${BASIQ_API_KEY}`,
    'Content-Type': 'application/json',
    'Basiq-Version': '2.1',
  },
});

export const connectBankAccount = async (
  userId: string,
  institutionId: string,
  token: string,
  credentials: {
    loginId?: string;
    password?: string;
    userToken?: string;
    securityCode?: string;
    secondaryLoginId?: string;
  }
): Promise<any> => {
  try {
    const payload: any = {
      institution: {
        id: institutionId,
      },
    };

    if (credentials.loginId && credentials.password) {
      payload.loginId = credentials.loginId;
      payload.password = credentials.password;
      if (credentials.securityCode) {
        payload.securityCode = credentials.securityCode;
      }
      if (credentials.secondaryLoginId) {
        payload.secondaryLoginId = credentials.secondaryLoginId;
      }
    } 
    else if (credentials.userToken) {
      payload.userToken = credentials.userToken;
    } 
    else {
      throw new Error('Missing required credentials for the institution.');
    }

    const response = await axios.post(
      `https://au-api.basiq.io/users/${userId}/connections`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Basiq-Version': '2.1',
        },
      }
    );

    console.log('Bank Connected - Job Created:', response.data);
    return response.data;
  } catch (error: any) {
    console.error(
      'Error connecting bank:',
      error.response?.data || error.message
    );
    throw error;
  }
};




//////
//////   AUTHENTICATE
//////

export const authenticate = async (): Promise<string> => {
  try {
    const response = await axios.post(
      `${BASIQ_API_URL}/token`,
      'scope=SERVER_ACCESS',
      {
        headers: {
          Authorization: `Basic YTgxNzg3OGEtZjAwZC00NTM2LTlmYjMtNjkyYzVmODJmOGY2OjdmNzNiNTk1LTFjY2ItNGYwYi05Njk4LWIyMjMxMWY1MzU5MA==`,
          'Content-Type': 'application/x-www-form-urlencoded',
          'Basiq-Version': '2.1',
        },
      }
    );
    return response.data.access_token;
  } catch (error) {
    console.error('Error authenticating:', error);
    throw error;
  }
};

//////
//////   CREATE USER
//////

export const createUser = async (
  token: string,
  email: string,
  mobile: string,
  firstName: string,
  lastName: string
): Promise<string> => {
  try {
    const response = await axios.post(
      `${BASIQ_API_URL}/users`,
      { email, mobile, firstName, lastName },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Basiq-Version': '2.1',
        },
      }
    );
    console.log(response.data.id)
    return response.data.id;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

//////
//////   GET USER ACCOUNTS
//////

export const getUserAccounts = async (userId: string, bankingAccount: string): Promise<Account[]> => {
  const options = {
    method: 'GET',
    url: `https://au-api.basiq.io/users/${bankingAccount}/accounts`,
    headers: {
      Authorization: `Bearer ${userId}`,
      'Content-Type': 'application/json',
      'Basiq-Version': '2.1',
    },
  };
  try {
    const response = await axios.request(options);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching user accounts:', error);
    throw error;
  }
};

//////
//////   GET ACCOUNT TRANSACTIONS
//////

export const getAccountTransactions = async (accountId: string, token: string): Promise<Transaction[]> => {
  try {
    const response = await axios.get(`${BASIQ_API_URL}/accounts/${accountId}/transactions`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Basiq-Version': '2.1',
      },
    });

    console.log('Transactions:', response.data);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching account transactions:', error);
    throw error;
  }
};

//////
//////   GET FILTERED TRANSACTIONS
//////

export const getFilteredTransactions = async (
  accountId: string,
  token: string,
  filters: { fromDate?: string; toDate?: string; category?: string }
): Promise<any[]> => {
  try {
    const queryParams = new URLSearchParams(filters).toString();
    const response = await axios.get(
      `${BASIQ_API_URL}/accounts/${accountId}/transactions?${queryParams}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Basiq-Version': '2.1',
        },
      }
    );

    console.log('Filtered Transactions:', response.data);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching filtered transactions:', error);
    throw error;
  }
};

//////
//////   GET TRANSACTION DETAILS
//////

export const getTransactionDetails = async (
  accountId: string,
  transactionId: string,
  token: string
): Promise<any> => {
  try {
    const response = await axios.get(
      `${BASIQ_API_URL}/accounts/${accountId}/transactions/${transactionId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Basiq-Version': '2.1',
        },
      }
    );

    console.log('Transaction Details:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching transaction details:', error);
    throw error;
  }
};

//////
//////   CATEGORIZE TRANSACTIONS
//////

export const categorizeTransactions = (transactions: any[]): Record<string, any[]> => {
  const categories: Record<string, any[]> = {};

  transactions.forEach((transaction) => {
    const category = transaction.category || 'Uncategorized';
    if (!categories[category]) {
      categories[category] = [];
    }
    categories[category].push(transaction);
  });

  console.log('Categorized Transactions:', categories);
  return categories;
};

export const createConsent = async (userId: string, token: string): Promise<void> => {
  const options = {
    method: 'GET',
    url: `https://au-api.basiq.io/users/${userId}/consents`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Basiq-Version': '2.1',
      },
  };
  
  try {
   const response = axios.request(options)
    console.log('Consent Created:', response);
  } catch (error) {
    console.error('Error creating consent:', error);
    throw error;
  }
};

export const fetchInstitutions = async (token: string): Promise<any[]> => {
  try {
    const response = await axios.get('https://au-api.basiq.io/institutions', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Basiq-Version': '2.1',
      },
    });

    return response.data.data;
  } catch (error) {
    console.error('Error fetching institutions:', error);
    throw error;
  }
};


