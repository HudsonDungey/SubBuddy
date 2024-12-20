import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, Alert, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { height } = Dimensions.get('window');

export const Notifications = () => {
  const [isAppUpdatesEnabled, setIsAppUpdatesEnabled] = useState(true);
  const [isPromotionsEnabled, setIsPromotionsEnabled] = useState(false);
  const [isSystemAlertsEnabled, setIsSystemAlertsEnabled] = useState(true);

  const handleToggleAppUpdates = () =>
    setIsAppUpdatesEnabled((prev) => !prev);

  const handleTogglePromotions = () =>
    setIsPromotionsEnabled((prev) => !prev);

  const handleToggleSystemAlerts = () =>
    setIsSystemAlertsEnabled((prev) => !prev);

  const handleSaveSettings = () => {
    Alert.alert(
      'Settings Saved',
      'Your notification preferences have been updated.'
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.listPopup}>

        {/* App Updates Notifications */}
        <View style={styles.settingItem}>
          <View style={styles.settingLabel}>
            <Ionicons name="notifications-outline" size={24} color="#000" />
            <Text style={styles.settingText}>App Updates</Text>
          </View>
          <Switch
            value={isAppUpdatesEnabled}
            onValueChange={handleToggleAppUpdates}
            thumbColor={isAppUpdatesEnabled ? '#007AFF' : '#f4f3f4'}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
          />
        </View>

        {/* Promotional Notifications */}
        <View style={styles.settingItem}>
          <View style={styles.settingLabel}>
            <Ionicons name="megaphone-outline" size={24} color="#000" />
            <Text style={styles.settingText}>Promotions</Text>
          </View>
          <Switch
            value={isPromotionsEnabled}
            onValueChange={handleTogglePromotions}
            thumbColor={isPromotionsEnabled ? '#007AFF' : '#f4f3f4'}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
          />
        </View>

        {/* System Alerts Notifications */}
        <View style={styles.settingItem}>
          <View style={styles.settingLabel}>
            <Ionicons name="alert-circle-outline" size={24} color="#000" />
            <Text style={styles.settingText}>System Alerts</Text>
          </View>
          <Switch
            value={isSystemAlertsEnabled}
            onValueChange={handleToggleSystemAlerts}
            thumbColor={isSystemAlertsEnabled ? '#007AFF' : '#f4f3f4'}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F1630', // Deep blue background
  },
  listPopup: {
    position: 'absolute',
    bottom: 0,
    height: (3.5 / 4) * height,
    width: '100%',
    backgroundColor: '#FFFFFF', // White popup container
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
  saveContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
  saveButton: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
    padding: 10,
    textDecorationLine: 'underline',
  },
});
