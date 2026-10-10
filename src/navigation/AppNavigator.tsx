import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

import HomeScreen from '../screens/HomeScreen';
import MedicationScreen from '../screens/MedicationScreen';
import SOSScreen from '../screens/SOSScreen';
import AssistantScreen from '../screens/AssistantScreen';
import AppointmentsScreen from '../screens/AppointmentsScreen';
import VitalsScreen from '../screens/VitalsScreen';
import NearbyScreen from '../screens/NearbyScreen';
import DiseasesScreen from '../screens/DiseasesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { theme } from '../theme';

const Stack = createNativeStackNavigator<RootStackParamList>();

const screenOptions = {
  headerStyle: { backgroundColor: theme.colors.primary },
  headerTintColor: '#fff',
  headerTitleStyle: { fontSize: theme.font.large, fontWeight: '700' as const },
};

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={screenOptions}>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'MediBot' }} />
        <Stack.Screen name="Medications" component={MedicationScreen} options={{ title: 'Medicines' }} />
        <Stack.Screen name="SOS" component={SOSScreen} options={{ title: 'Emergency SOS' }} />
        <Stack.Screen name="Assistant" component={AssistantScreen} options={{ title: 'Health Assistant' }} />
        <Stack.Screen name="Appointments" component={AppointmentsScreen} options={{ title: 'Appointments' }} />
        <Stack.Screen name="Vitals" component={VitalsScreen} options={{ title: 'Vitals' }} />
        <Stack.Screen name="Nearby" component={NearbyScreen} options={{ title: 'Nearby Help' }} />
        <Stack.Screen name="Diseases" component={DiseasesScreen} options={{ title: 'Disease Info' }} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'My Profile' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}