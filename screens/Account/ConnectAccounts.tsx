import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AddBankScreen } from './AddBank';

const { height } = Dimensions.get('window');

interface BankAccount {
  id: string;
  name: string;
  accountNumber: string;
}

export const ConnectedAccounts = () => {
  const [bankDisplay, setBankDisplay] = useState(false);

  const handleAddBank = () => {
    setBankDisplay(true);
  };

  if(bankDisplay){
    return(
        <View style={styles.container}>
           <AddBankScreen />
        </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.listPopup}>
        <TouchableOpacity style={styles.addButton} onPressIn={handleAddBank}>
          <Ionicons name="add-circle-outline" size={24} color="#FFF" />
          <Text style={styles.addButtonText}>Add Bank Acount</Text>
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
  listPopup: {
    position: 'absolute',
    bottom: 0,
    height: (3.5 / 4) * height,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 16,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
    color: '#000',
    textAlign: 'center',
  },
  bankItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  bankInfo: {
    flex: 1,
  },
  bankName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  bankAccount: {
    fontSize: 14,
    color: '#666',
  },
  removeButton: {
    marginLeft: 12,
    padding: 8,
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 16,
    marginTop: 16,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0F1630', 
    padding: 10,
    width: '90%',
    borderRadius: 16,
    marginBottom: 36,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});
