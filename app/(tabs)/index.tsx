import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import { BlurView } from 'expo-blur'; 
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '@/context/AuthContext';
import { subscriptionType } from '@/types/index';
import { SubscriptionDetails, AddSubscriptionDetails } from '@/screens/Home';
import { SubscriptionPage } from '@/screens/OnboardingPages';
import { isUserAppSubActive } from '@/utils';
import { getDoc, doc } from 'firebase/firestore';
import { auth } from '@/lib/firebaseConfig';
import { db } from '@/lib/storageConfig';

const { height } = Dimensions.get('window');

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

export default function Home() {
  const { user } = useUser();
  const [selectedSubscription, setSelectedSubscription] =
    useState<subscriptionType | null>(null);
  const [isAddSubOpen, setIsAddSubOpen] = useState(false);
  const [showSubscribePage, setShowSubscribePage] = useState(false);
  const [hasActiveSubscription, setHasActiveSubscription] = useState(false);

  useEffect(() => {
    checkActiveSubscription();
  }, []);

  const checkActiveSubscription = async () => {
    try {
      const currentUser = auth.currentUser;

      if (!currentUser) return;

      const userDocRef = doc(db, 'users', currentUser.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const { nextBillingDate } = userDoc.data();
        const isActive = isUserAppSubActive(nextBillingDate);
        setHasActiveSubscription(isActive);
      } else {
        setHasActiveSubscription(false);
      }
    } catch (error) {
      console.error('Error checking app subscription:', error);
      setHasActiveSubscription(false);
    }
  };

  const getMonthName = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', { month: 'short' });
  };

  const openDetails = (item: subscriptionType) => {
    setSelectedSubscription(item);
  };

  const closeDetails = () => {
    setSelectedSubscription(null);
  };

  const totalCost = subscriptions.reduce((total, subscription) => {
    const cost = parseFloat(subscription.cost.replace('$', ''));
    return total + cost;
  }, 0);

  const renderSubscription = ({ item }: { item: subscriptionType }) => (
    <TouchableOpacity
      onPress={() => openDetails(item)}
      style={styles.subscriptionCard}
    >
      <View style={styles.containerMain}>
         <View>
          <Image source={require('../../assets/images/netflix.png')} style={styles.logo}/>
         </View>
      <View style={styles.subscriptionInfo}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.cardPricePerMonth}>{item.cost} / month</Text>
      </View>
      <View style={styles.dateContainer}>
         <Text style={styles.cardTitle}>{new Date(item.nextBillingDate).getDate()}</Text>
         <Text style={styles.cardPricePerMonth}>{getMonthName(item.nextBillingDate)}</Text>
      </View>
      </View>
    </TouchableOpacity>
  );

  if (showSubscribePage) {
    return <SubscriptionPage setShowSubscribePage={setShowSubscribePage}/>;
  }

  if (selectedSubscription) {
    return (
      <SubscriptionDetails
        selectedSubscription={selectedSubscription}
        closeDetails={closeDetails}
      />
    );
  }

  if (isAddSubOpen) {
    return <AddSubscriptionDetails setIsAddSubOpen={setIsAddSubOpen} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Your Subscriptions</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => console.log('Add Subscription')}
        >
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.listContainer}>
        <FlatList
          data={subscriptions}
          renderItem={renderSubscription}
          keyExtractor={(item) => item.id}
        />
        {!user?.isSubActive && (
          <>
            <BlurView intensity={10} style={StyleSheet.absoluteFill} />
            <View style={styles.overlayContainer}>
              <Text style={styles.overlayText}>Subscribe to access your subscriptions</Text>
              <TouchableOpacity
                style={styles.subscribeButton}
                onPress={() => setShowSubscribePage(true)}
              >
                <Text style={styles.subscribeButtonText}>Subscribe Now</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F1630',
    paddingTop: 50,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  header: {
    color: 'white',
    fontSize: 28,
    fontWeight: '600',
  },
  addButton: {
    backgroundColor: '#262D46',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    overflow: 'hidden',
  },
  subscriptionCard: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  cardCost: {
    fontSize: 16,
    color: '#666',
  },
  cardDate: {
    fontSize: 14,
    color: '#999',
  },
  overlayContainer: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  overlayText: {
    color: 'black',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  subscribeButton: {
    backgroundColor: '#0F1630',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  subscribeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  containerMain: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 15,
  },
  subscriptionInfo: {
    flex: 1,
  },
  cardPricePerMonth: {
    fontSize: 14,
    color: '#666',
  },
  dateContainer: {
    alignItems: 'center',
    backgroundColor: '#F3F3F6',
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
});