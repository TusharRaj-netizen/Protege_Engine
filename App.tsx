import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { AppDataProvider } from './src/context/AppData';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <AppDataProvider>
      <StatusBar style="light" />
      <AppNavigator />
    </AppDataProvider>
  );
}