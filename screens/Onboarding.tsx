import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { FactPage, PriorityPage, PriorityPage2, LogoPage } from '@/screens/OnboardingPages'

export const Onboarding = ({getStarted}: {getStarted: ()=> void}) => {
  const [step, setStep] = useState('1'); 

  const renderStep = () => {
    switch (step) {
      case '1':
        return <LogoPage setStep={setStep}/>
      case '2':
        return <FactPage setStep={setStep} />;
      case '3':
        return <PriorityPage setStep={setStep} />;
        case '4':
          return <PriorityPage2 getStarted={getStarted} />;
      default:
        return <LogoPage setStep={setStep}/>;
    }
  };

  return <SafeAreaView style={styles.container}>{renderStep()}</SafeAreaView>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d141c',
  },
});
