import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Modal } from 'react-native';
import { SignUp } from '../Account';
import { LoginSignInPage } from '../Account';
import { useUser } from '@/context/AuthContext';

const { height } = Dimensions.get('window');

export const Welcome = ({ getStarted }: { getStarted: () => void }) => {
  const [isSignUp, setSignUp] = useState(false); // State to switch between SignIn and SignUp
  const { user, setUser } = useUser();

  const enterApp = () => {
    getStarted();
  };

  return (
    <View style={styles.container}>
      <Modal
        visible={true} 
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View
            style={[
              styles.modalContent,
              { height: height * 0.93 },
            ]}
          >
            {isSignUp ? (
              <SignUp enterApp={enterApp} setSignUp={setSignUp} />
            ) : (
              <LoginSignInPage
                onSignIn={(user) => {
                  setUser(user);
                }}
                setSignUp={setSignUp} 
                enterApp={enterApp}
              />
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d141c',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 10,
    elevation: 10,
  },
});
