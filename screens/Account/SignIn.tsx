import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import * as Keychain from 'react-native-keychain';
import { useUser } from '@/context/AuthContext';
import { loginUser, saveCredentials, authenticateWithBiometrics } from '@/lib/authConfig';
import { Ionicons } from '@expo/vector-icons';
import { User } from '@/types'

export const LoginSignInPage = ({
  onSignIn,
  onSignUp,
  setSignUp,
  enterApp
}: {
  onSignIn: (user: User) => void;
  onSignUp?: () => void;
  setSignUp?: (value: boolean) => void
  enterApp?: () => void;
}) => {
  const { user, setUser } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  // useEffect(() => {
  //   biometricLogin();
  // }, []);

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter your email and password.');
      return;
    }
    try {
      const { user } = await loginUser(email, password);
      if (user) {
        setUser(user);
        onSignIn(user);
      };
      if(enterApp) 
      {enterApp()}
    } catch (error) {
      console.error('Sign-in failed:', error);
      Alert.alert('Error', 'Invalid email or password.');
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!</Text>

      <Text style={styles.emailpw}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your Email"
        placeholderTextColor="#888"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      {/* Password Input */}
      <Text style={styles.emailpw}>Password</Text>
      <View style={styles.input}>
          <TextInput
            style={styles.passwordText}
            placeholder="Enter your Password"
            placeholderTextColor="#888"
            secureTextEntry={!passwordVisible} 
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => setPasswordVisible(!passwordVisible)} 
          >
            <Ionicons
              name={passwordVisible ? 'eye-off' : 'eye'} 
              size={20}
              color="#888"
            />
          </TouchableOpacity>
        </View>

      <TouchableOpacity style={styles.forgotContainer}>
        <Text style={styles.forgotButton}>Forgot your password?</Text>
      </TouchableOpacity>

      {/* Sign In Button */}
      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      {/*} {/* Biometric Login Option */}
      {/*} <TouchableOpacity style={styles.biometricButton} onPress={() => authenticateWithBiometrics()}>*/}
      {/*}   <Ionicons name="finger-print" size={24} color="black" />*/}
      {/*}   <Text style={styles.biometricButtonText}>Use Biometric Login</Text>*/}
      {/*} </TouchableOpacity>*/}

      <View style={styles.bottomContainer}>
        {/* Grey Line */}
        <View style={styles.orContainer}>
           <View style={styles.greyLine} />
           <Text style={styles.orText}>or</Text>
           <View style={styles.greyLine} />
        </View>

        {/* Buttons Container */}
        <Text style={styles.signUpText2}>
          Sign in with:
        </Text>
          <TouchableOpacity style={styles.googleButton} >
         <Image source={require('../../assets/images/google.png')} />
           <Text style={styles.googleButtonText}>Sign Up with Google</Text>
         </TouchableOpacity>
   
         <TouchableOpacity style={styles.facebookButton}>
         <Image source={require('../../assets/images/fb.png')}/>
           <Text style={styles.facebookButtonText}>Sign Up with Facebook</Text>
         </TouchableOpacity>

        {/* Sign Up Link */}
        <TouchableOpacity
          style={styles.signUpContainer}
          onPress={setSignUp ? () => setSignUp(true) : onSignUp}

        >
          <Text style={styles.signUpText}>
            Don't have an account? <Text style={styles.signUpLink}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
  },
  emailpw: {
   width: '100%',
   paddingBottom: 5,
   textAlign: 'left',
   alignItems: 'flex-start'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#AAA',
    marginBottom: 20,
  },
  input: {
    borderRadius: 30,
    width: '100%',
    backgroundColor: '#F3F3F6',
    paddingInline: 20,
    paddingBlock: 10,
    marginBottom: 18,
    fontSize: 16,
    color: '#000',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  },
  button: {
    backgroundColor: '#262D46',
    borderWidth: 1,
    borderColor: 'black',
    paddingVertical: 8,
    paddingHorizontal: 32,
    borderRadius: 40,
    alignItems: 'center',
    width: '100%',
    marginTop: 8,
  },
  forgotContainer: {
    textAlign: 'right',
    justifyContent: 'flex-end',
    marginBottom: 10
  },
  forgotButton: {
    fontWeight: 500,
    textAlign: 'right'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  signUpContainer: {
    marginTop: 22,
    alignItems: 'center'
  },
  signUpText: {
    color: 'gray',
    fontSize: 14,
  },
  signUpText2: {
    color: 'gray',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20
  },
  signUpLink: {
    fontWeight: 'bold',
    color: 'gray',
    textDecorationLine: 'underline',
  },
  biometricButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  biometricButtonText: {
    marginLeft: 8,
    fontSize: 16,
    color: 'black',
    fontWeight: '600',
  },
  bottomContainer: {
    padding: 16,
    backgroundColor: '#FFF', // White background
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10, 
  },
  greyLine: {
    flex: 1, // Makes the line stretch to fill available space
    height: 1,
    backgroundColor: '#CCC',
  },
  orText: {
    marginHorizontal: 8, // Space between "or" and the lines
    fontSize: 16,
    color: '#666',
    fontWeight: 'bold',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomButton: {
    minWidth: 130,
    padding: 9,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 8,
    backgroundColor: '#000',
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
    width: 300
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
  passwordContainer: {
    flex: 1,
    borderRadius: 30,
    backgroundColor: '#F3F3F6',
    marginBottom: 16,
    fontSize: 16,
    color: '#000',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  passwordText: {
    fontSize: 16,
    color: '#000',
  },
});
