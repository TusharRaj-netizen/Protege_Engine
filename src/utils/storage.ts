import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Simple typed wrapper around AsyncStorage for persisting MediBot data.
 */

export async function loadJSON<T>(key: string, fallback: T): Promise<T> {
  try {
    const raw = await AsyncStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch (e) {
    console.warn('loadJSON failed for', key, e);
    return fallback;
  }
}

export async function saveJSON<T>(key: string, value: T): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn('saveJSON failed for', key, e);
  }
}

export const STORAGE_KEYS = {
  medications: 'medibot.medications',
  appointments: 'medibot.appointments',
  vitals: 'medibot.vitals',
  emergencyContacts: 'medibot.emergencyContacts',
  profile: 'medibot.profile',
  chatHistory: 'medibot.chatHistory',
} as const;