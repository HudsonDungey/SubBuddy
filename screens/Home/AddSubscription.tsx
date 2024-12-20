import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { height } = Dimensions.get('window');

export const AddSubscriptionDetails = ({
    setIsAddSubOpen,
  }: {
    setIsAddSubOpen: (value: boolean) => void;
  }) => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [nextPaymentDate, setNextPaymentDate] = useState('');
  const [billingCycle, setBillingCycle] = useState('');

  useEffect(() => {
    navigation.setOptions({
      tabBarStyle: { display: 'none' },
    });

    return () => {
      navigation.setOptions({
        tabBarStyle: undefined,
      });
    };
  }, [navigation]);

  const handleSaveSubscription = () => {
    console.log({
      name,
      amount,
      paymentMethod,
      nextPaymentDate,
      billingCycle,
    });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.mainHeaderBar} onPress={() => setIsAddSubOpen(false)}>
        <View style={styles.iconContainer}>
          <Ionicons name="chevron-back" size={26} color="#0ff" />
        </View>
      </TouchableOpacity>
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.header}>Add Subscription</Text>
        </View>
      </View>
      <View style={styles.listPopup}>
        <View style={styles.detailRow}>
          <Text style={styles.modalText}>Subscription Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter subscription name"
            placeholderTextColor="#888"
            value={name}
            onChangeText={setName}
          />
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.modalText}>Amount</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter subscription cost"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.modalText}>Payment Method</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter payment method (e.g., VISA)"
            placeholderTextColor="#888"
            value={paymentMethod}
            onChangeText={setPaymentMethod}
          />
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.modalText}>Next Payment Date</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter next payment date"
            placeholderTextColor="#888"
            value={nextPaymentDate}
            onChangeText={setNextPaymentDate}
          />
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.modalText}>Billing Cycle</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter billing cycle"
            placeholderTextColor="#888"
            value={billingCycle}
            onChangeText={setBillingCycle}
          />
        </View>
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveSubscription}>
          <Text style={styles.saveButtonText}>Save Subscription</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F1630',
  },
  mainHeaderBar: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 18,
    paddingHorizontal: 20,
  },
  header: {
    color: 'white',
    fontSize: 28,
    fontWeight: '600',
  },
  header2: {
    color: 'white',
    fontSize: 15,
    fontWeight: '300',
  },
  logo: {
    width: 70,
    height: 70,
    borderRadius: 20,
    marginRight: 20,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 25,
    backgroundColor: '#262D46',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listPopup: {
    position: 'absolute',
    bottom: 0,
    height: (3.2 / 4) * height,
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 16,
    paddingTop: 30,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  detailRow: {
    marginBottom: 16,
  },
  modalText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 600,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    color: '#333',
  },
  saveButton: {
    marginTop: 20,
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#262D46',
    borderRadius: 30,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});
