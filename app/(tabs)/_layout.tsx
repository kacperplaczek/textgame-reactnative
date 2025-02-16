import { Tabs } from 'expo-router';
import React, {useEffect} from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import {useFonts} from "expo-font";
import * as SplashScreen from "expo-splash-screen";

export default function TabLayout() {
    const [fontsLoaded] = useFonts({
        VT323Regular: require('../../assets/fonts/VT323-Regular.ttf'),
    });

    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {display: 'none'},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Start',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
        <Tabs.Screen
            name="(akty)/akt-1"
            options={{
                title: 'Akt 1',
                tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
            }}
        />

        <Tabs.Screen
            name="(akty)/akt-2"
            options={{
                title: 'Akt 2',
                tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
            }}
        />

        <Tabs.Screen
            name="(akty)/akt-3"
            options={{
                title: 'Akt 3',
                tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
            }}
        />
    </Tabs>
  );
}
