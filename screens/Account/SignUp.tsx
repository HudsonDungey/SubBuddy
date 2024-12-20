import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  FlatList,
  Modal,
  Image,
  Dimensions
} from 'react-native';
import { countries } from '@/lib/countries'; // Assuming this is an array of country names
import { registerUser } from '@/lib/authConfig';
import { Ionicons } from '@expo/vector-icons';
import { AddressType, User } from '@/types';
import { useUser } from '@/context/AuthContext';

export const SignUp = ({ setSignUp, enterApp }: { setSignUp?: (value: boolean) => void; enterApp?: () => void }) => {
  const { setUser } = useUser();
  const [email, setEmail] = useState('');
  const [firstName, setFirstname] = useState('');
  const [lastName, setLastname] = useState('');
  const [password, setPassword] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [address, setAddress] = useState<Partial<AddressType>>({
    addressLine1: '',
    suburb: '',
    state: '',
    postcode: '',
    countryCode: '',
  });
  const [isCountryDropdownVisible, setCountryDropdownVisible] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  // Handle selecting a country
  const handleCountrySelect = (selectedCountry: string) => {
    setAddress((prev) => ({
      ...prev, // Preserve other fields in the address
      countryCode: selectedCountry, // Update countryCode
    }));
    setCountryDropdownVisible(false);
  };

 // Reset form and navigate back
 const handleBack = () => {
  setEmail('');
  setFirstname('');
  setLastname('');
  setPassword('');
  setMobileNumber('');
  setAddress({
    addressLine1: '',
    suburb: '',
    state: '',
    postcode: '',
    countryCode: '',
  });
  if (setSignUp) setSignUp(false);
};

  // Validate and handle user registration
  const handleSignUp = async () => {
    const { addressLine1, suburb, state, postcode, countryCode } = address;
  
    if (
      !email ||
      !password ||
      !mobileNumber ||
      !firstName ||
      !lastName ||
      !addressLine1 ||
      !suburb ||
      !state ||
      !postcode ||
      !countryCode
    ) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
  
    try {
      // Call the registerUser function
      const { token, accountId } = await registerUser(
        email,
        mobileNumber,
        password,
        firstName,
        lastName,
        address as AddressType,
        countryCode
      );
  
      // Construct the user account with userId
      const userAccount: User = {
        email,
        mobile: mobileNumber, 
        firstName,
        lastName,
        token,
        address: address as AddressType,
        accountId, 
        nextBillingDate: '0',
      };
  
      // Save to state
      setUser(userAccount);
  
      Alert.alert('Success', 'You have signed up successfully!');
      enterApp();
      handleBack();
    } catch (error) {
      console.error('Sign Up Error:', error);
      Alert.alert('Error', 'An error occurred during sign-up. Please try again.');
    }
  };
  

  const handleGoogleSignUp = () => {
    Alert.alert('Google Sign Up', 'Google sign-up is not implemented yet.');
  };

  const handleFacebookSignUp = () => {
    Alert.alert('Facebook Sign Up', 'Facebook sign-up is not implemented yet.');
  };

return (
  <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome!</Text>
      </View>

      {/* Username Input */}
      <TextInput
        style={styles.input}
        placeholder="First name"
        placeholderTextColor="#888"
        value={firstName}
        onChangeText={setFirstname}
      />

      <TextInput
        style={styles.input}
        placeholder="Last name"
        placeholderTextColor="#888"
        value={lastName}
        onChangeText={setLastname}
      />

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      {/* Password Input */}
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordText}
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry={!passwordVisible}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setPasswordVisible(!passwordVisible)}
        >
          <Ionicons
            name={passwordVisible ? 'eye-off' : 'eye'}
            size={20}
            color="#888"
          />
        </TouchableOpacity>
      </View>

      {/* Mobile Number Input */}
      <TextInput
        style={styles.input}
        placeholder="Mobile Number"
        placeholderTextColor="#888"
        keyboardType="phone-pad"
        value={mobileNumber}
        onChangeText={setMobileNumber}
      />

     <View style={styles.POandState}>
      {/* Address Inputs */}
      <TextInput
        style={styles.input}
        placeholder="Address"
        placeholderTextColor="#888"
        value={address.addressLine1}
        onChangeText={(value) => setAddress({ ...address, addressLine1: value })}
      />
  

      <TextInput
        style={styles.input}
        placeholder="Suburb"
        placeholderTextColor="#888"
        value={address.suburb}
        onChangeText={(value) => setAddress({ ...address, suburb: value })}
      />
      </View>

    <View style={styles.POandState}>
    <TextInput
        style={styles.input}
        placeholder="Postcode"
        placeholderTextColor="#888"
        keyboardType="numeric"
        value={address.postcode}
        onChangeText={(value) => setAddress({ ...address, postcode: value })}
      />

      <TextInput
        style={styles.input}
        placeholder="State"
        placeholderTextColor="#888"
        value={address.state}
        onChangeText={(value) => setAddress({ ...address, state: value })}
      />
    </View>

      {/* Country Selector */}
      <TouchableOpacity
        style={[styles.input, styles.selectContainer]}
        onPress={() => setCountryDropdownVisible(true)}
      >
        <Text style={{ color: address.countryCode ? '#000' : '#888', flex: 1 }}>
          {address.countryCode || 'Select a Country'}
        </Text>
        <Ionicons name="chevron-down" size={20} color="#888" />
      </TouchableOpacity>

      {/* Country Dropdown Modal */}
      <Modal
        visible={isCountryDropdownVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setCountryDropdownVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={countries}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.countryItem}
                  onPress={() => handleCountrySelect(item)}
                >
                  <Text style={styles.countryText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setCountryDropdownVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Sign Up Button */}
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

        <View style={styles.orContainer}>
           <View style={styles.greyLine} />
           <Text style={styles.orText}>or</Text>
           <View style={styles.greyLine} />
        </View>

        <TouchableOpacity style={styles.googleButton} >
         <Image source={require('../../assets/images/google.png')} />
           <Text style={styles.googleButtonText}>Sign Up with Google</Text>
         </TouchableOpacity>
   
         <TouchableOpacity style={styles.facebookButton}>
         <Image source={require('../../assets/images/fb.png')}/>
           <Text style={styles.facebookButtonText}>Sign Up with Facebook</Text>
         </TouchableOpacity>

      {setSignUp && (
      <TouchableOpacity
          style={styles.signUpContainer}
          onPress={() => setSignUp(false)}

        >
          <Text style={styles.signUpText}>
            Already have an account? <Text style={styles.signUpLink}>Sign In</Text>
          </Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 10,
    borderRadius: 20,
    marginTop: 14,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000',
    borderRadius: 20,
  },
  signUpContainer: {
    marginTop: 22,
    alignItems: 'center',
    paddingBottom: 20
  },
  input: {
    flex: 1,
    borderRadius: 30,
    backgroundColor: '#F3F3F6',
    padding: 12,
    marginBottom: 8,
    fontSize: 16,
    color: '#000',
    height: 40
  },
  passwordContainer: {
    flex: 1,
    borderRadius: 30,
    backgroundColor: '#F3F3F6',
    marginBottom: 8,
    fontSize: 16,
    color: '#000',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40
  },
  passwordText: {
    fontSize: 16,
    paddingLeft: 12
  },
  POandState: {
   flexDirection: 'row',
   gap: 5
  },
  eyeIcon: {
    paddingHorizontal: 20, 
  },
  selectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', 
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10, 
    marginBottom: 30
  },
  greyLine: {
    flex: 1, 
    height: 1,
    backgroundColor: '#CCC',
  },
  orText: {
    marginHorizontal: 8, 
    fontSize: 16,
    color: '#666',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#262D46',
    paddingVertical: 12,
    marginTop: 6,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
  googleButton: {
    borderColor: 'black',
    borderWidth: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  googleButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 8,
  },
  facebookButton: {
    borderColor: 'black',
    borderWidth: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  facebookButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 8,
  },
  icon: {
    color: 'black'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    elevation: 5,
    marginTop: 100,
  },
  countryItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
  },
  countryText: {
    fontSize: 16,
    color: 'black',
  },
  closeButton: {
    marginTop: 16,
    padding: 12,
    backgroundColor: 'black',
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  backButton: {
    marginBlock: 12,
    alignItems: 'center',
  },
  signUpText: {
    color: 'gray',
    fontSize: 14,
  },
  signUpLink: {
    fontWeight: 'bold',
    color: 'gray',
    textDecorationLine: 'underline',
  },
});
