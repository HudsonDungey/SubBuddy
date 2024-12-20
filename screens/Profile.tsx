import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { User } from '@/types';
import { AccountView, ConnectedAccounts, Settings, Privacy, Notifications, GetSupport } from './Account';

const { height } = Dimensions.get('window');

export const ProfileScreen = ({
  user,
  onLogout,
  onBackButton,
}: {
  user: User;
  onLogout: () => void;
  onBackButton: () => void;
}) => {
  const [selectedSetting, setSelectedSetting] = useState<string | null>(null);
  const handleSettingSelection = (setting: string) => {
    setSelectedSetting(setting);
  }

  const selectedSettingName = (() => {
    switch (selectedSetting) {
      case 'AccountView':
        return 'Account';
      case 'ConnectAccounts':
        return 'Connect Bank';
      case 'Settings':
        return 'Settings';
      case 'Privacy':
        return 'Privacy';
      case 'Notifications':
        return 'Notifications';
      case 'Support':
        return 'Support';
      default:
        return '';
    }
  })(); 

  const renderContent = () => {
    switch (selectedSetting) {
        case 'AccountView':
            return < AccountView />;
        case 'ConnectAccounts':
            return <ConnectedAccounts/>;
        case 'Settings':
          return <Settings/>;
        case 'Privacy':
          return <Privacy/>;
        case 'Notifications':
          return <Notifications/>;
        case 'Support':
          return <GetSupport/>;
      default:
        return (
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.sectionTitle}>Settings</Text>
            </View>
            <View style={styles.listPopup}>
              <ScrollView>
                {/* Settings Options */}
                <View style={styles.section}>
                  <TouchableOpacity
                    style={styles.settingItem}
                    onPress={() => handleSettingSelection('AccountView')}
                  >
                    <View style={styles.titleRow}>
                      <Ionicons name="person-circle-outline" size={24} color="#000" />
                      <Text style={styles.settingText}>Account</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={24} color="#000" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.settingItem}
                    onPress={() => handleSettingSelection('ConnectAccounts')}
                  >
                    <View style={styles.titleRow}>
                      <Ionicons name="card-outline" size={24} color="#000" />
                      <Text style={styles.settingText}>Connect Accounts</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={24} color="#000" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.settingItem}
                    onPress={() => handleSettingSelection('Settings')}
                  >
                    <View style={styles.titleRow}>
                      <Ionicons name="settings-outline" size={24} color="#000" />
                      <Text style={styles.settingText}>Settings</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={24} color="#000" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.settingItem}
                    onPress={() => handleSettingSelection('Privacy')}
                  >
                    <View style={styles.titleRow}>
                      <Ionicons name="lock-closed-outline" size={24} color="#000" />
                      <Text style={styles.settingText}>Privacy</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={24} color="#000" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.settingItem}
                    onPress={() => handleSettingSelection('Notifications')}
                  >
                    <View style={styles.titleRow}>
                      <Ionicons name="notifications-outline" size={24} color="#000" />
                      <Text style={styles.settingText}>Notifications</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={24} color="#000" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.settingItem}
                    onPress={() => handleSettingSelection('Support')}
                  >
                    <View style={styles.titleRow}>
                      <Ionicons name="headset-outline" size={24} color="#000" />
                      <Text style={styles.settingText}>Get support</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={24} color="#000" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.settingItem}
                    onPress={() => handleSettingSelection('Sign Out')}
                  >
                    <View onTouchStart={onLogout} style={styles.titleRow}>
                      <Ionicons name="exit-outline" size={24} color="#000" />
                      <Text style={styles.settingText}>Sign out</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={24} color="#000" />
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </View>
        );
    }
  };
  return(
    <>
    {selectedSetting != null && (
    <View style={styles.mainHeaderBar}>
    <Ionicons onPress={() => setSelectedSetting(null)} name="chevron-back" size={34} color="white" />
    <Text style={styles.selectedSetting}>{selectedSettingName}</Text>
    </View>
    )}
    {renderContent()}
    </>
  )
};

const styles = StyleSheet.create({
  mainHeaderBar: {
    paddingTop: 30,
    paddingInline: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 16,
    backgroundColor: '#0F1630', 
   },
  container: {
    flex: 1,
    backgroundColor: '#0F1630', 
  },
  selectedSetting: {
    color: "white",
    fontSize: 28,
    fontWeight: 700
  },
  header: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingTop: 20,
    paddingBottom: 18,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 28,
    paddingTop: 8,
    fontWeight: '600',
    color: '#FFF', // White text for contrast
  },
  listPopup: {
    position: 'absolute',
    bottom: 0,
    height: (3.5 / 4) * height,
    width: '100%',
    backgroundColor: '#FFFFFF', // White popup
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 16,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  section: {
    margin: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#d2d2d7',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  settingText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  dynamicContent: {
    padding: 16,
  },
  contentText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
});
