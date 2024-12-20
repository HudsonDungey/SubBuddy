import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { OnboardingHeader } from '@/components/ui/OnboardingHeader';
import Image from "@/assets/images/onboarding1.svg";

export const FactPage = ({setStep} : {setStep:(value: string) => void}) => {
  const handleNext = () => {
    setStep('3');
  };

  return (
    <>
    <View>
       <OnboardingHeader />
    </View>
    <View style={styles.image}>
       <Image width={230} height={230}/>
    </View>
    <View style={styles.container}>
    <View style={styles.dotContainer}>
      <View style={[styles.dot, styles.activeDot]} />
      <View style={styles.dot} />
      <View style={styles.dot} />
    </View>
      <Text style={styles.mainText}>
        Did you know?
      </Text>
      <Text style={styles.mainText2}>
      The average Australian/New Zealander spends up to $62 dollars a month on subscriptions?
      </Text>
        <TouchableOpacity onPress={handleNext} style={styles.button}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
  },
  image: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 45,
    paddingBottom: 30
  },
  dotContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20,
  },
  dot: {
    width: 8, 
    height: 8,
    borderRadius: 5, 
    backgroundColor: 'grey', 
    marginHorizontal: 5, 
  },
  activeDot: {
    backgroundColor: 'orange', 
  },
  mainText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginBottom: 20,
  },
  mainText2: {
    fontSize: 14,
    width: '80%',
    color: '#6F758E',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#0d141c',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    width: 290,
    borderRadius: 30,
    shadowColor: '#0d141c',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
});
