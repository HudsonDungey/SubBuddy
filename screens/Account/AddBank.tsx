import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  ScrollView,
  ActivityIndicator,
  Image,
  StyleSheet,
  Alert,
  TextInput,
  Modal,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import {
  authenticate,
  fetchInstitutions,
  connectBankAccount,
  createConsent,
} from '@/lib/bankingApi'; 
import { useUser } from '@/context/AuthContext';

const { height } = Dimensions.get('window');

export const AddBankScreen = ({ getStarted }: { getStarted?: () => void }) => {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [institutions, setInstitutions] = useState<any[]>([]);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [selectedInstitution, setSelectedInstitution] = useState<any | null>(null);
  const [credentials, setCredentials] = useState({
    loginId: '',
    password: '',
    userToken: '',
    securityCode: '',
    secondaryLoginId: '',
  });
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    authenticateUser();
    fetchBankList();
  }, []);

  const authenticateUser = async () => {
    try {
      setLoading(true);
      const token = await authenticate();
      setAccessToken(token);
    } catch (error) {
      console.error('Error authenticating user:', error);
      Alert.alert('Error', 'Failed to authenticate user.');
    } finally {
      setLoading(false);
    }
  };

  const fetchBankList = async () => {
    try {
      if (user && user.token) {
        setLoading(true);
        const banks = await fetchInstitutions(user.token);
        setInstitutions(banks);
      }
    } catch (error) {
      console.error('Error fetching institutions:', error);
      Alert.alert('Error', 'Failed to fetch banks.');
    } finally {
      setLoading(false);
    }
  };

  const handleBankConnect = async () => {
    try {
      if (user && user.accountId && user.token && selectedInstitution) {
        setLoading(true);

        await createConsent(user.accountId, user.token);
        if (getStarted) {
          getStarted();
        }
        const connection = await connectBankAccount(user.accountId, selectedInstitution.id, user.token, credentials);
        console.log('Bank connected successfully:', connection);
        Alert.alert('Success', `Bank connected successfully! Job ID: ${connection.id}`);
      } else {
        Alert.alert('Error', 'Missing user or institution information.');
      }
    } catch (error) {
      console.error('Error connecting bank:', error);
      Alert.alert('Error', 'Failed to connect the bank. Please try again.');
    } finally {
      setLoading(false);
      setModalVisible(false); 
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }} style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" style={{ marginVertical: 16 }} />
      ) : (
        <>
          {institutions.length > 0 ? (
            institutions.map((institution) => (
              <View key={institution.id} style={styles.institutionCard}>
                {institution.logo?.small && (
                  <Image
                    source={{ uri: institution.logo.small }}
                    style={styles.institutionLogo}
                  />
                )}
                <View style={{ flex: 1, width: '80%' }}>
                  <Text style={styles.institutionName}>
                    {institution.name} ({institution.shortName})
                  </Text>
                  <Text style={styles.institutionDetails}>ID: {institution.id}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setSelectedInstitution(institution);
                    setModalVisible(true);
                  }}
                  style={styles.selectButton}
                >
                  <Text style={styles.buttonText}>Select</Text>
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <Text>No banks found. Please try again later.</Text>
          )}
        </>
      )}

      {/* Credentials Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
        transparent
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.sectionTitle}>Enter Credentials for {selectedInstitution?.name}</Text>
            <TextInput
              style={styles.input}
              placeholder="Login ID"
              value={credentials.loginId}
              onChangeText={(text) => setCredentials({ ...credentials, loginId: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={credentials.password}
              onChangeText={(text) => setCredentials({ ...credentials, password: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="User Token (if required)"
              value={credentials.userToken}
              onChangeText={(text) => setCredentials({ ...credentials, userToken: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Security Code (if required)"
              value={credentials.securityCode}
              onChangeText={(text) => setCredentials({ ...credentials, securityCode: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Secondary Login ID (if required)"
              value={credentials.secondaryLoginId}
              onChangeText={(text) => setCredentials({ ...credentials, secondaryLoginId: text })}
            />
            <View style={styles.modalActions}>
            <TouchableOpacity
              onPress={handleBankConnect}
              style={styles.connectButton}
            >
              <Text style={styles.connectButtonText}>Connect</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.goBackButton}
            >
              <Text style={styles.goBackButtonText}>Go Back</Text>
            </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    fontWeight: 'bold',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBlock: 16,
  },
  institutionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBlock: 24,
    borderRadius: 8,
    borderBottomWidth: 1,
    borderColor: 'gray',
    backgroundColor: '#fff',
  },
  institutionLogo: {
    width: 40,
    height: 40,
    marginRight: 16,
  },
  institutionName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  institutionDetails: {
    fontSize: 14,
    color: '#666',
  },
  selectButton: {
    backgroundColor: '#AAEDFF',
    padding: 12,
    borderRadius: 10,
  },
  buttonText: {
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    flex: 1,
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
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 8,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  modalActions: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  connectButton: {
    backgroundColor: '#001F54', 
    padding: 12,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 12,
  },
  connectButtonText: {
    color: '#FFFFFF', 
    fontSize: 16,
    fontWeight: 'bold',
  },
  goBackButton: {
    backgroundColor: '#FFFFFF', 
    padding: 12,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 12,
  },
  goBackButtonText: {
    color: '#001F54',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
