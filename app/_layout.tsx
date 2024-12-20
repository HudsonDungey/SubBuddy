
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { UserProvider } from '@/context/AuthContext';
import { LoadingScreen } from '@/screens/Loading';
import 'react-native-reanimated';
import { TabVisibilityProvider } from "@/hooks/tabVisibility";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    CenturyGothic: require('../assets/fonts/CenturyGothic.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return <LoadingScreen/>;
  }

  return (
    <TabVisibilityProvider>
    <UserProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </UserProvider>
    </TabVisibilityProvider>
  );
}
