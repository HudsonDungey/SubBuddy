import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { height } = Dimensions.get('window');

export const Privacy = () => {
  const [isDataSharingEnabled, setIsDataSharingEnabled] = useState(false);
  const [isLocationEnabled, setIsLocationEnabled] = useState(true);

  const handleToggleDataSharing = () =>
    setIsDataSharingEnabled((prev) => !prev);

  const handleToggleLocation = () =>
    setIsLocationEnabled((prev) => !prev);

  const handleReviewPrivacyPolicy = () => {
    Alert.alert('Privacy Policy', 'This would open the privacy policy page.');
  };

  const handleRequestData = () => {
    Alert.alert(
      'Request Your Data',
      'We have received your request to access or download your data. Our team will process this soon.'
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action is irreversible.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Account Deleted', 'Your account has been deleted.');
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.listPopup}>

        {/* Data Sharing Toggle */}
        <View style={styles.settingItem}>
          <View style={styles.settingLabel}>
            <Ionicons name="analytics-outline" size={24} color="#000" />
            <Text style={styles.settingText}>Data Sharing</Text>
          </View>
          <Switch
            value={isDataSharingEnabled}
            onValueChange={handleToggleDataSharing}
            thumbColor={isDataSharingEnabled ? '#007AFF' : '#f4f3f4'}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
          />
        </View>

        {/* Location Access Toggle */}
        <View style={styles.settingItem}>
          <View style={styles.settingLabel}>
            <Ionicons name="location-outline" size={24} color="#000" />
            <Text style={styles.settingText}>Location Access</Text>
          </View>
          <Switch
            value={isLocationEnabled}
            onValueChange={handleToggleLocation}
            thumbColor={isLocationEnabled ? '#007AFF' : '#f4f3f4'}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
          />
        </View>

        {/* Privacy Policy */}
        <TouchableOpacity
          style={styles.optionItem}
          onPress={handleReviewPrivacyPolicy}
        >
          <View style={styles.optionLabel}>
            <Ionicons name="document-text-outline" size={24} color="#000" />
            <Text style={styles.optionText}>Privacy Policy</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#000" />
        </TouchableOpacity>

        {/* Request Data */}
        <TouchableOpacity
          style={styles.optionItem}
          onPress={handleRequestData}
        >
          <View style={styles.optionLabel}>
            <Ionicons name="download-outline" size={24} color="#000" />
            <Text style={styles.optionText}>Request Your Data</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#000" />
        </TouchableOpacity>

        {/* Delete Account */}
        <TouchableOpacity
          style={styles.optionItem}
          onPress={handleDeleteAccount}
        >
          <View style={styles.optionLabel}>
            <Ionicons name="trash-bin-outline" size={24} color="#FF0000" />
            <Text style={[styles.optionText, { color: '#FF0000' }]}>
              Delete Account
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#FF0000" />
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
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  settingLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  optionLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
});
