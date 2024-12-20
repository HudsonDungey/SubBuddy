import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  Dimensions,
  Switch,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { height } = Dimensions.get('window');

export const Settings = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [isCurrencyModalVisible, setCurrencyModalVisible] = useState(false);

  const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD'];

  const handleCurrencyChange = (currency: string) => {
    setSelectedCurrency(currency);
    setCurrencyModalVisible(false);
  };

  const handleToggleDarkMode = () => setIsDarkMode((prev) => !prev);
  const handleToggleNotifications = () =>
    setIsNotificationsEnabled((prev) => !prev);

  const handleUpdatePassword = () => {
    Alert.alert('Update Password', 'This would open a password update flow.');
  };

  const handleViewTerms = () => {
    Alert.alert('Terms of Service', 'Display terms of service content here.');
  };

  return (
    <View style={styles.container}>
      <View style={styles.listPopup}>

        {/* Dark Mode Toggle */}
        <View style={styles.settingItem}>
          <View style={styles.settingLabel}>
            <Ionicons name="moon-outline" size={24} color="#000" />
            <Text style={styles.settingText}>Dark Mode</Text>
          </View>
          <Switch
            value={isDarkMode}
            onValueChange={handleToggleDarkMode}
            thumbColor={isDarkMode ? '#007AFF' : '#f4f3f4'}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
          />
        </View>

        {/* Currency Selection */}
        <View style={styles.settingItem} onTouchStart={() => setCurrencyModalVisible(true)}>
          <TouchableOpacity
            style={styles.settingLabel}
          >
            <Ionicons name="cash-outline" size={24} color="#000" />
            <Text style={styles.settingText}>Currency</Text>
          </TouchableOpacity>
          <Text style={styles.selectedCurrency}>{selectedCurrency}</Text>
        </View>

        {/* Notifications Toggle */}
        <View style={styles.settingItem}>
          <View style={styles.settingLabel}>
            <Ionicons name="notifications-outline" size={24} color="#000" />
            <Text style={styles.settingText}>Enable Notifications</Text>
          </View>
          <Switch
            value={isNotificationsEnabled}
            onValueChange={handleToggleNotifications}
            thumbColor={isNotificationsEnabled ? '#007AFF' : '#f4f3f4'}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
          />
        </View>

        {/* Update Password */}
        <TouchableOpacity
          style={styles.optionItem}
          onPress={handleUpdatePassword}
        >
          <View style={styles.optionLabel}>
            <Ionicons name="key-outline" size={24} color="#000" />
            <Text style={styles.optionText}>Update Password</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#000" />
        </TouchableOpacity>

        {/* View Terms of Service */}
        <TouchableOpacity style={styles.optionItem} onPress={handleViewTerms}>
          <View style={styles.optionLabel}>
            <Ionicons name="document-text-outline" size={24} color="#000" />
            <Text style={styles.optionText}>Terms of Service</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Currency Selection Modal */}
      <Modal
        transparent={true}
        visible={isCurrencyModalVisible}
        animationType="slide"
        onRequestClose={() => setCurrencyModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Currency</Text>
            <FlatList
              data={currencies}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.currencyItem}
                  onPress={() => handleCurrencyChange(item)}
                >
                  <Text style={styles.currencyText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setCurrencyModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  selectedCurrency: {
    fontSize: 16,
    color: '#4C4E52',
    fontWeight: '500',
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFF',
    margin: 16,
    borderRadius: 8,
    padding: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
    color: '#000',
  },
  currencyItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
  },
  currencyText: {
    fontSize: 16,
    color: '#000',
  },
  closeButton: {
    marginTop: 16,
    alignSelf: 'center',
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  closeButtonText: {
    color: '#FFF',
    fontWeight: '600',
  },
});
