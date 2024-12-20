import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { subscriptionType } from '@/types/index'; // Ensure `subscriptionType` is correctly imported and defined

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const subscriptions: subscriptionType[] = [
  {
    id: '1',
    name: 'Netflix',
    cost: '$15.99',
    nextBillingDate: '2023-12-15',
    status: 'Active',
  },
  {
    id: '2',
    name: 'Spotify',
    cost: '$9.99',
    nextBillingDate: '2023-12-01',
    status: 'Active',
  },
  {
    id: '3',
    name: 'Adobe Creative Cloud',
    cost: '$52.99',
    nextBillingDate: '2023-12-20',
    status: 'Inactive',
  },
];

export default function SubscriptionTracker() {
  const renderSubscription = ({ item }: { item: subscriptionType }) => (
    <ThemedView style={styles.subscriptionCard}>
      <View style={styles.subscriptionInfo}>
        <ThemedText type="defaultSemiBold">{item.name}</ThemedText>
        <ThemedText>{item.cost} / month</ThemedText>
        <ThemedText type="default">Next Billing: {item.nextBillingDate}</ThemedText>
      </View>
      <TouchableOpacity
        style={[styles.statusBadge, item.status === 'Active' ? styles.active : styles.inactive]}
      >
        <Text style={styles.statusText}>{item.status}</Text>
      </TouchableOpacity>
    </ThemedView>
  );

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.header}>
        All Subscriptions
      </ThemedText>
      <FlatList
        data={subscriptions}
        renderItem={renderSubscription}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  header: {
    marginBottom: 16,
    marginTop: 20,
    fontSize: 20,
  },
  listContent: {
    gap: 16,
  },
  subscriptionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  subscriptionInfo: {
    flex: 1,
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundColor: '#D1FADF',
  },
  inactive: {
    backgroundColor: '#FFE3E3',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333333',
  },
});
