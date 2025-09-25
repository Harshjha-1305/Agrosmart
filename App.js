import React, { useState, useEffect, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Alert } from 'react-native';

// Import screens
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import SoilAnalysisScreen from './src/screens/SoilAnalysisScreen';
import PestDetectorScreen from './src/screens/PestDetectorScreen';
import CropAdvisoryScreen from './src/screens/CropAdvisoryScreen';
import CropTimelineScreen from './src/screens/CropTimelineScreen';
import MarketScreen from './src/screens/MarketScreen';
import SchemesScreen from './src/screens/SchemesScreen';
import WeatherScreen from './src/screens/WeatherScreen';
import FeedbackScreen from './src/screens/FeedbackScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import ComparisonScreen from './src/screens/ComparisonScreen';

// Import utilities
import { getCurrentLocation } from './src/utils/location';
import { initVoiceRecognition } from './src/utils/voiceCommands';

const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [lang, setLang] = useState('en');
  const [location, setLocation] = useState('');
  const [isOffline, setAppIsOffline] = useState(false);

  // Get location on app start
  useEffect(() => {
    getCurrentLocation()
      .then(locationString => {
        setLocation(locationString);
      })
      .catch(error => {
        console.error('Error getting location:', error);
        setLocation('Thane, Maharashtra (Default)');
      });
  }, []);

  // Initialize voice commands
  const handleVoiceCommand = useCallback((command, navigation) => {
    command = command.toLowerCase();
    console.log('Heard command:', command);
    
    if (command.includes('home')) {
      navigation.navigate('Home');
    } else if (command.includes('soil')) {
      navigation.navigate('SoilAnalysis');
    } else if (command.includes('pest') || command.includes('disease')) {
      navigation.navigate('PestDetector');
    } else if (command.includes('crop advisory')) {
      navigation.navigate('CropAdvisory');
    } else if (command.includes('timeline') || command.includes('schedule')) {
      navigation.navigate('CropTimeline');
    } else if (command.includes('market') || command.includes('price')) {
      navigation.navigate('Market');
    } else if (command.includes('scheme')) {
      navigation.navigate('Schemes');
    } else if (command.includes('weather')) {
      navigation.navigate('Weather');
    } else if (command.includes('feedback')) {
      navigation.navigate('Feedback');
    } else if (command.includes('profile')) {
      navigation.navigate('Profile');
    } else if (command.includes('comparison') || command.includes('analysis')) {
      navigation.navigate('Comparison');
    } else {
      Alert.alert('Voice Command', 'Sorry, I did not understand that command.');
    }
  }, []);

  if (!user) {
    return <LoginScreen onLogin={setUser} />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#10b981',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ title: 'AgroSmart' }}
          initialParams={{
            user,
            setUser,
            lang,
            setLang,
            location,
            isOffline,
            setAppIsOffline,
            handleVoiceCommand
          }}
        />
        <Stack.Screen 
          name="SoilAnalysis" 
          component={SoilAnalysisScreen}
          options={{ title: 'Soil Analysis' }}
        />
        <Stack.Screen 
          name="PestDetector" 
          component={PestDetectorScreen}
          options={{ title: 'Pest Detection' }}
        />
        <Stack.Screen 
          name="CropAdvisory" 
          component={CropAdvisoryScreen}
          options={{ title: 'Crop Advisory' }}
        />
        <Stack.Screen 
          name="CropTimeline" 
          component={CropTimelineScreen}
          options={{ title: 'Crop Timeline' }}
        />
        <Stack.Screen 
          name="Market" 
          component={MarketScreen}
          options={{ title: 'Market Tracking' }}
        />
        <Stack.Screen 
          name="Schemes" 
          component={SchemesScreen}
          options={{ title: 'Government Schemes' }}
        />
        <Stack.Screen 
          name="Weather" 
          component={WeatherScreen}
          options={{ title: 'Weather Alerts' }}
        />
        <Stack.Screen 
          name="Feedback" 
          component={FeedbackScreen}
          options={{ title: 'Feedback' }}
        />
        <Stack.Screen 
          name="Profile" 
          component={ProfileScreen}
          options={{ title: 'My Profile' }}
        />
        <Stack.Screen 
          name="Comparison" 
          component={ComparisonScreen}
          options={{ title: 'App Comparison' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}