import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Logo from '@/assets/images/logo.svg'; 

export const OnboardingHeader = () => {
  return (
    <View style={styles.container}>
            <View style={styles.logoContainer}>
        <Logo width={50} height={50} />
      </View>
      <Text style={styles.title}>SubBuddy</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    height: 120,
    backgroundColor: '#0d141c',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  title: {
    fontSize: 20,
    fontWeight: 500,
    paddingTop: 6,
    color: '#FFFFFF',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
