import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ProfileScreen } from '@/screens/Profile';
import { LoginSignInPage, SignUp  } from '@/screens/Account';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useUser } from '@/context/AuthContext';
import { User } from '@/types';

type RootStackParamList = {
  index: undefined;
  profile: undefined;
  explore: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function settings() {
  const navigation = useNavigation<NavigationProp>();
  const { user, setUser } = useUser();
  const [isSignUp, setSignUp] = useState(false);

  const onSignIn = async (user: User) => {
    setUser(user);
  };

  const handleLogOut = () => {
    setUser(null);
  }

  const onBackButton = () => {
    navigation.navigate("index");
  };

  if (user) {
    return (
      <ProfileScreen
        user={user}
        onLogout={handleLogOut}
        onBackButton={onBackButton}
      />
    );
  }

  if(isSignUp) {
    return (
      <SignUp  setSignUp={setSignUp}/>
    )
  }

  return <LoginSignInPage onSignIn={onSignIn} setSignUp={setSignUp} />;
}