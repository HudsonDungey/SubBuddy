import { Tabs } from "expo-router";
import React, { useState } from "react";
import { Platform, StatusBar } from "react-native";
import { Welcome } from "@/screens/Home";
import { Onboarding } from "@/screens/Onboarding";
import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { TabVisibilityProvider, useTabVisibility } from "@/hooks/tabVisibility";

export default function TabLayout() {
  const [isOnboarding, setIsOnboarding] = useState(true); 
  const [isWelcome, setIsWelcome] = useState(false); 
  const { hideTabs } = useTabVisibility(); 

  const getStarted = () => {
    setIsWelcome(true);
    setIsOnboarding(false);
  };

  const startApp = () => {
    setIsWelcome(false);
  };

  if (isOnboarding) {
    return <Onboarding getStarted={getStarted} />;
  }

  if (isWelcome) {
    return <Welcome getStarted={startApp} />;
  }

  return (
    <>
      <StatusBar hidden={hideTabs} />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#2f4f4f",
          tabBarInactiveTintColor: "#2f4f4f",
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: [
            {
              backgroundColor: "white",
            },
            hideTabs && { display: "none" }, 
          ],
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "bold",
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="house.fill" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="gear.badge" color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
