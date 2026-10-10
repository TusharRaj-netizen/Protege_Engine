import React, { createContext, useContext, useEffect, useState } from 'react';
import { loadJSON, saveJSON, STORAGE_KEYS } from '../utils/storage';

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  time: string; // HH:MM
  notes?: string;
  taken?: Record<string, boolean>; // date -> taken
}

export interface Appointment {
  id: string;
  doctor: string;
  specialty: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  location?: string;
  notes?: string;
}

export interface Vital {
  id: string;
  type: 'BP' | 'Sugar' | 'Weight' | 'Heart Rate' | 'Temperature';
  value: string;
  date: string; // YYYY-MM-DD
  note?: string;
}

export interface EmergencyContact {
  id: string;
  name: string;
  relation: string;
  phone: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'bot';
  text: string;
  time: number;
}

export interface Profile {
  name: string;
  age: string;
  bloodGroup: string;
  allergies: string;
  conditions: string;
}

interface AppData {
  medications: Medication[];
  appointments: Appointment[];
  vitals: Vital[];
  contacts: EmergencyContact[];
  profile: Profile;
  chat: ChatMessage[];
  setMedications: (m: Medication[]) => void;
  setAppointments: (a: Appointment[]) => void;
  setVitals: (v: Vital[]) => void;
  setContacts: (c: EmergencyContact[]) => void;
  setProfile: (p: Profile) => void;
  setChat: (c: ChatMessage[]) => void;
}

const defaultProfile: Profile = {
  name: '',
  age: '',
  bloodGroup: '',
  allergies: '',
  conditions: '',
};

const AppDataContext = createContext<AppData | null>(null);

export function AppDataProvider({ children }: { children: React.ReactNode }) {
  const [medications, setMedicationsState] = useState<Medication[]>([]);
  const [appointments, setAppointmentsState] = useState<Appointment[]>([]);
  const [vitals, setVitalsState] = useState<Vital[]>([]);
  const [contacts, setContactsState] = useState<EmergencyContact[]>([]);
  const [profile, setProfileState] = useState<Profile>(defaultProfile);
  const [chat, setChatState] = useState<ChatMessage[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      const [m, a, v, c, p, ch] = await Promise.all([
        loadJSON(STORAGE_KEYS.medications, [] as Medication[]),
        loadJSON(STORAGE_KEYS.appointments, [] as Appointment[]),
        loadJSON(STORAGE_KEYS.vitals, [] as Vital[]),
        loadJSON(STORAGE_KEYS.emergencyContacts, [] as EmergencyContact[]),
        loadJSON(STORAGE_KEYS.profile, defaultProfile),
        loadJSON(STORAGE_KEYS.chatHistory, [] as ChatMessage[]),
      ]);
      setMedicationsState(m);
      setAppointmentsState(a);
      setVitalsState(v);
      setContactsState(c);
      setProfileState(p);
      setChatState(ch);
      setReady(true);
    })();
  }, []);

  const setMedications = (val: Medication[]) => {
    setMedicationsState(val);
    saveJSON(STORAGE_KEYS.medications, val);
  };
  const setAppointments = (val: Appointment[]) => {
    setAppointmentsState(val);
    saveJSON(STORAGE_KEYS.appointments, val);
  };
  const setVitals = (val: Vital[]) => {
    setVitalsState(val);
    saveJSON(STORAGE_KEYS.vitals, val);
  };
  const setContacts = (val: EmergencyContact[]) => {
    setContactsState(val);
    saveJSON(STORAGE_KEYS.emergencyContacts, val);
  };
  const setProfile = (val: Profile) => {
    setProfileState(val);
    saveJSON(STORAGE_KEYS.profile, val);
  };
  const setChat = (val: ChatMessage[]) => {
    setChatState(val);
    saveJSON(STORAGE_KEYS.chatHistory, val);
  };

  if (!ready) return null;

  return (
    <AppDataContext.Provider
      value={{
        medications,
        appointments,
        vitals,
        contacts,
        profile,
        chat,
        setMedications,
        setAppointments,
        setVitals,
        setContacts,
        setProfile,
        setChat,
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
}

export function useAppData() {
  const ctx = useContext(AppDataContext);
  if (!ctx) throw new Error('useAppData must be used within AppDataProvider');
  return ctx;
}

export function uid(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

export function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}