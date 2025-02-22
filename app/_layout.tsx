import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import * as Notifications from 'expo-notifications';
import * as NavigationBar from 'expo-navigation-bar'
import {Audio} from 'expo-av';
import { useColorScheme } from '@/hooks/useColorScheme';


export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    VT323Regular: require('../assets/fonts/VT323-Regular.ttf'),
  });

        useEffect(() => {
          (async () => {
              try {
                    await Audio.setAudioModeAsync({
                      playsInSilentModeIOS: true,
                      allowsRecordingIOS: false, // ⬅️ Mikrofon jest wyłączony!
                      staysActiveInBackground: false, // ⬅️ Nie wymuszamy odtwarzania w tle
                      interruptionModeIOS: 1,
                      interruptionModeAndroid: 1,
                      shouldDuckAndroid: true,
                      playThroughEarpieceAndroid: false,
                  });
                  console.log('[Correct] Audio Mode Set');
              } catch (e) {
                  console.error('Failed to set audio mode', e);
              }
          })();
      }, []);

    useEffect(() => {
        const configureNotifications = async () => {
            const { status } = await Notifications.getPermissionsAsync();
            if (status !== 'granted') {
                await Notifications.requestPermissionsAsync();
            }

            // Ustawienie domyślnego zachowania na Androidzie
            Notifications.setNotificationHandler({
                handleNotification: async () => ({
                    shouldShowAlert: true,
                    shouldPlaySound: true,
                    shouldSetBadge: false,
                }),
            });

            SplashScreen.preventAutoHideAsync();

            
            NavigationBar.setVisibilityAsync('hidden'); // Chowa pasek nawigacji
            NavigationBar.setBehaviorAsync('inset-swipe'); // Swipe do wyciągnięcia
        };

        configureNotifications();
    }, []);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }


  return (
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
        </Stack>
        <StatusBar style="auto" hidden />
      </ThemeProvider>
  );
}