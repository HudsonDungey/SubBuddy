import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import { subscriptionType } from '@/types/index';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { height } = Dimensions.get('window');

export const SubscriptionDetails = ({
    selectedSubscription,
    closeDetails
}: {
    selectedSubscription: subscriptionType,
    closeDetails: () => void }) => {
    const navigation = useNavigation();

  const getPriorityLabel = (cost: string) => {
    const numericCost = parseFloat(cost.replace('$', ''));
    if (numericCost < 20) return 'Cheap';
    if (numericCost <= 50) return 'Reasonable';
    return 'Expensive';
  };

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

  return (
    <View style={styles.container}>
     <TouchableOpacity style={styles.mainHeaderBar}>
       <View style={styles.iconContainer} onTouchStart={closeDetails}>
         <Ionicons name="chevron-back" size={26} color="#0ff" />
       </View>
     </TouchableOpacity>
    <View style={styles.headerContainer}>
        <Image source={require('../../assets/images/netflix.png')} style={styles.logo}/>
        <View>
        <Text style={styles.header}>{selectedSubscription.name}</Text>
        <Text style={styles.header2}>Streaming</Text>
        </View>
    </View>
    <View style={styles.listPopup}>
      <View style={styles.detailRow}>
        <Text style={styles.modalText}>Amount:</Text>
        <Text style={styles.modalText2}>{selectedSubscription.cost} monthly</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.modalText}>Payment method:</Text>
        <Text style={styles.modalText2}>{`VISA (ending in 4560)`}</Text>
      </View>
      <View style={styles.detailRow}>
      <Text style={styles.modalText}>Priority Level:</Text>
        <Text style={styles.modalText2}>{getPriorityLabel(selectedSubscription.cost)}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.modalText}>Next payment:</Text>
        <Text style={styles.modalText2}>{selectedSubscription.nextBillingDate}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.modalText}>Billing cycle:</Text>
        <Text style={styles.modalText2}>{selectedSubscription.status}</Text>
      </View>
      <TouchableOpacity
        style={styles.cancelButton}
      >
        <Text style={styles.cancelButtonText}>Cancel subscription</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F1630',
  },
  mainHeaderBar: {
    marginTop: 30,
    marginBottom: 10,
    paddingInline: 20,
   },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 18,
    paddingInline: 20
  },
  header: {
    color: 'white',
    fontSize: 28,
    fontWeight: 600
  },
  header2: {
    color: 'white',
    fontSize: 15,
    fontWeight: 300
  },
  logo: {
    width: 70,
    height: 70,
    borderRadius: 20,
    marginRight: 20
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
    height: (2.9 / 4) * height,
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
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
  },
  detailRow: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: 10,
    marginBottom: 4,
  },
  modalText: {
    fontSize: 16,
    color: '#333',
  },
  modalText2: {
    fontSize: 17,
    color: 'black',
    fontWeight: 'bold',
    marginTop: 8
  },
  cancelButton: {
    marginTop: 30,
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#262D46',
    borderRadius: 30,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 500
  },
});
