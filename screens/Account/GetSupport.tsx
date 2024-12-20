import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Linking, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { height } = Dimensions.get('window');

export const GetSupport = () => {
  const handleContactSupport = () => {
    Alert.alert(
      'Contact Support',
      'You can contact our support team at HudsonDungeyDev@outlook.com or call us at +61 473964055.'
    );
  };

  const handleOpenFAQs = () => {
    Linking.openURL('https://example.com/faqs').catch(() => {
      Alert.alert('Error', 'Unable to open the FAQs page.');
    });
  };

  const handleSubmitFeedback = () => {
    Alert.alert(
      'Submit Feedback',
      'Redirecting to the feedback form...',
      [
        {
          text: 'Go',
          onPress: () =>
            Linking.openURL('https://example.com/feedback').catch(() => {
              Alert.alert('Error', 'Unable to open the feedback form.');
            }),
        },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.listPopup}>

        {/* Contact Support */}
        <TouchableOpacity style={styles.optionItem} onPress={handleContactSupport}>
          <View style={styles.optionLabel}>
            <Ionicons name="mail-outline" size={24} color="#000" />
            <Text style={styles.optionText}>Contact Support</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#000" />
        </TouchableOpacity>

        {/* FAQs */}
        <TouchableOpacity style={styles.optionItem} onPress={handleOpenFAQs}>
          <View style={styles.optionLabel}>
            <Ionicons name="help-circle-outline" size={24} color="#000" />
            <Text style={styles.optionText}>FAQs</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#000" />
        </TouchableOpacity>

        {/* Submit Feedback */}
        <TouchableOpacity style={styles.optionItem} onPress={handleSubmitFeedback}>
          <View style={styles.optionLabel}>
            <Ionicons name="chatbubble-outline" size={24} color="#000" />
            <Text style={styles.optionText}>Submit Feedback</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#000" />
        </TouchableOpacity>
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
