import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc, getDoc, arrayUnion } from 'firebase/firestore';
import { db } from './storageConfig';
import { auth} from './firebaseConfig'; 
import * as SecureStore from 'expo-secure-store';
import * as LocalAuthentication from 'expo-local-authentication';
import { authenticate, createUser } from './bankingApi';
import { User, AddressType, subscriptionType } from '@/types'

// Updated Register User
export const registerUser = async (
  email: string,
  mobileNumber: string,
  password: string,
  firstName: string,
  lastName: string,
  address: AddressType,
  country: string
): Promise<User> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Generate Basiq token
    const token = await authenticate();
    const accountId = await createUser(token, email, mobileNumber, firstName, lastName);
    // Prepare user data for Basiq
    const userData: User = {
      email,
      mobile: mobileNumber,
      firstName,
      lastName,
      address,
      token,
      accountId,
      country,
      nextBillingDate: '0',
      isSubActive: false,
    };
    // Create Basiq user and get userId from the response
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid, 
      ...userData,
      createdAt: new Date(),
    });

    return { ...userData };
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

// Updated Login User
export const loginUser = async (email: string, password: string): Promise<{ user: User | null }> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;
    const newToken = await authenticate();
    const userDocRef = doc(db, 'users', firebaseUser.uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const userData = userDoc.data() as User;
      const updatedUserData = {
        ...userData,
        token: newToken, 
        updatedAt: new Date(),
      };
      await setDoc(userDocRef, updatedUserData, { merge: true });
      return { user: updatedUserData };
    } else {
      console.warn('User document does not exist in Firestore.');
      return { user: null };
    }
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
};


// Logout User
export const logoutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

// Secure Store Functions (Unchanged)
export const saveCredentials = async (key: string, value: string) => {
  try {
    await SecureStore.setItemAsync(key, value, {
      keychainAccessible: SecureStore.WHEN_UNLOCKED,
    });
  } catch (error) {
    console.error('Failed to save credentials:', error);
  }
};

export const loadCredentials = async (key: string) => {
  try {
    const value = await SecureStore.getItemAsync(key);
    if (value) {
      console.log('Credentials loaded successfully:', value);
      return value;
    } else {
      console.log('No credentials found');
      return null;
    }
  } catch (error) {
    console.error('Failed to load credentials:', error);
  }
};

export const deleteCredentials = async (key: string) => {
  try {
    await SecureStore.deleteItemAsync(key);
    console.log('Credentials deleted successfully!');
  } catch (error) {
    console.error('Failed to delete credentials:', error);
  }
};

export const authenticateWithBiometrics = async () => {
  const hasHardware = await LocalAuthentication.hasHardwareAsync();
  const supportedTypes = await LocalAuthentication.supportedAuthenticationTypesAsync();

  if (hasHardware && supportedTypes.length > 0) {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Authenticate with Biometrics',
    });

    if (result.success) {
      console.log('Authentication successful!');
      // Proceed to load credentials
    } else {
      console.error('Authentication failed:', result.error);
    }
  } else {
    console.log('Biometric authentication is not supported on this device.');
  }
};

export const addSubscription = async (
  duration: 'monthly' | '6-months' | 'yearly'
) => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error('No user is currently logged in.');
    }
    const userDocRef = doc(db, 'users', currentUser.uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const today = new Date();
      let nextBillingDate = new Date(today);

      if (duration === 'monthly') {
        nextBillingDate.setMonth(nextBillingDate.getMonth() + 1); 
      } else if (duration === '6-months') {
        nextBillingDate.setMonth(nextBillingDate.getMonth() + 6); 
      } else if (duration === 'yearly') {
        nextBillingDate.setFullYear(nextBillingDate.getFullYear() + 1); 
      }
      const subscription = {
        id: '01',
        name: 'Hudson Dungey',
        cost: '$6',
        nextBillingDate: '20/12/2026',
        status: 'active',
      }
      const updatedUserData = {
        subscriptions: arrayUnion(subscription), 
        nextBillingDate: nextBillingDate.toISOString(), 
        updatedAt: new Date(),
        isSubActive: true,
      };

      await setDoc(userDocRef, updatedUserData, { merge: true });

      console.log('Subscription and next billing date updated successfully!');
    } else {
      console.warn('User document does not exist in Firestore.');
      throw new Error('User document not found.');
    }
  } catch (error) {
    console.error('Error adding subscription and updating billing date:', error);
    throw error;
  }
};
