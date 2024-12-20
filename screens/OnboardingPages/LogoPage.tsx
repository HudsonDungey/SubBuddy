import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Logo from "@/assets/images/logo.svg";

export const LogoPage = ({ setStep }: { setStep: (value: string) => void }) => {
  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Logo width={140} height={140} />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.paymateText}>SubBuddy</Text>
        <Text style={styles.paymateTextSmall}>
          Keep your subscriptions on your terms.
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => setStep('2')}
        style={styles.getStartedButton}
      >
        <Text style={styles.getStartedText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d141c',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  logo: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  paymateText: {
    fontSize: 32,
    marginBottom: 8,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  paymateTextSmall: {
    fontSize: 16,
    fontWeight: '400',
    color: '#FFFFFF',
    marginTop: 18,
    textAlign: 'center',
  },
  getStartedButton: {
    position: 'absolute', 
    bottom: 40, 
    backgroundColor: '#AAEDFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    width: 300,
    borderRadius: 30,
    shadowColor: '#AAEDFF',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  getStartedText: {
    color: 'black',
    fontSize: 14,
    fontWeight: '500',
  },
});
