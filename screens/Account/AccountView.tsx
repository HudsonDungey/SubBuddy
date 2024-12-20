import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '@/context/AuthContext';
import { User } from '@/types';

const { height } = Dimensions.get('window');

export const AccountView = () => {
  const { user, setUser } = useUser();
  const [editingField, setEditingField] = useState<string | null>(null);
  const [tempValue, setTempValue] = useState('');

  const handleEdit = (field: keyof User, value: string) => {
    if (!value.trim()) {
      Alert.alert('Error', `The ${field} cannot be empty.`);
      return;
    }
    const updatedUser = { ...user, [field]: value } as User;
    setUser(updatedUser);
    setEditingField(null);
    Alert.alert('Success', `${field} updated successfully.`);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.listPopup}>
        <View style={styles.infoSection}>
          {/* First Name */}
          <View style={styles.infoRow}>
            <Ionicons name="person-outline" size={24} color="#333" />
            {editingField === 'firstName' ? (
              <TextInput
                style={styles.editInput}
                value={tempValue}
                onChangeText={setTempValue}
                autoFocus
                onSubmitEditing={() => handleEdit('firstName', tempValue)}
                onBlur={() => setEditingField(null)}
              />
            ) : (
              <TouchableOpacity
                style={styles.infoTouchable}
                onPress={() => {
                  setEditingField('firstName');
                  setTempValue(user?.firstName || '');
                }}
              >
                <Text style={styles.infoText}>
                  {user?.firstName || 'Add your first name'}
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Last Name */}
          <View style={styles.infoRow}>
            <Ionicons name="person-outline" size={24} color="#333" />
            {editingField === 'lastName' ? (
              <TextInput
                style={styles.editInput}
                value={tempValue}
                onChangeText={setTempValue}
                autoFocus
                onSubmitEditing={() => handleEdit('lastName', tempValue)}
                onBlur={() => setEditingField(null)}
              />
            ) : (
              <TouchableOpacity
                style={styles.infoTouchable}
                onPress={() => {
                  setEditingField('lastName');
                  setTempValue(user?.lastName || '');
                }}
              >
                <Text style={styles.infoText}>
                  {user?.lastName || 'Add your last name'}
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Email */}
          <View style={styles.infoRow}>
            <Ionicons name="mail-outline" size={24} color="#333" />
            {editingField === 'email' ? (
              <TextInput
                style={styles.editInput}
                value={tempValue}
                onChangeText={setTempValue}
                autoFocus
                keyboardType="email-address"
                onSubmitEditing={() => handleEdit('email', tempValue)}
                onBlur={() => setEditingField(null)}
              />
            ) : (
              <TouchableOpacity
                style={styles.infoTouchable}
                onPress={() => {
                  setEditingField('email');
                  setTempValue(user?.email || '');
                }}
              >
                <Text style={styles.infoText}>{user?.email || 'Add your email'}</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Mobile */}
          <View style={styles.infoRow}>
            <Ionicons name="call-outline" size={24} color="#333" />
            {editingField === 'mobile' ? (
              <TextInput
                style={styles.editInput}
                value={tempValue}
                onChangeText={setTempValue}
                autoFocus
                keyboardType="phone-pad"
                onSubmitEditing={() => handleEdit('mobile', tempValue)}
                onBlur={() => setEditingField(null)}
              />
            ) : (
              <TouchableOpacity
                style={styles.infoTouchable}
                onPress={() => {
                  setEditingField('mobile');
                  setTempValue(user?.mobile || '');
                }}
              >
                <Text style={styles.infoText}>
                  {user?.mobile || 'Add your phone number'}
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Address */}
          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={24} color="#333" />
            {editingField === 'address' ? (
              <TextInput
                style={styles.editInput}
                value={tempValue}
                onChangeText={setTempValue}
                autoFocus
                onSubmitEditing={() => handleEdit('address', tempValue)}
                onBlur={() => setEditingField(null)}
              />
            ) : (
              <TouchableOpacity
                style={styles.infoTouchable}
                onPress={() => {
                  setEditingField('address');
                  setTempValue(user?.address?.addressLine1 || '');
                }}
              >
                <Text style={styles.infoText}>
                  {user?.address?.addressLine1 || 'Add your address'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
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
  infoSection: {
    borderRadius: 8,
    padding: 16,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 20,
  },
  infoRow: {
    borderBottomWidth: 0.5,
    paddingBottom: 16,
    borderBottomColor: "gray",
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  infoText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#555',
  },
  infoTouchable: {
    flex: 1,
    marginLeft: 12,
  },
  editInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    borderBottomWidth: 1,
    borderColor: '#CCC',
    color: '#333',
  },
});
