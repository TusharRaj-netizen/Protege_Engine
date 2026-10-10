# MediBot 🩺💚

A **senior-citizen friendly health companion app** built with React Native + Expo. MediBot is designed with large text, high contrast, big tap targets, and simple navigation so older adults can use it with confidence.

## Features

| Feature | Description |
|---|---|
| 💊 **Medicine Reminders** | Add medicines with dosage & time, mark them "taken" each day. All reminders are saved on the device. |
| 🆘 **Emergency SOS** | One big button to trigger help — calls emergency services and notifies saved contacts. Shows your medical info (blood group, allergies, conditions) to share with responders. |
| 🎙️ **Voice Health Assistant** | An offline chatbot that answers common health questions (fever, BP, diabetes, chest pain, sleep, falls, medicines, etc.) and **reads answers aloud** with text-to-speech. Works fully offline — no API key needed. |
| 📅 **Doctor Appointments** | Track upcoming & past visits with date, time, location (tap for directions) and notes. |
| ❤️ **Vitals Tracking** | Log blood pressure, sugar, weight, heart rate and temperature, and review history over time. |
| 📍 **Nearby Help** | Find the nearest pharmacies, hospitals, clinics and emergency rooms using your GPS location, opening results in Google Maps. |
| 📖 **Disease Info** | A built-in library of common senior conditions with symptoms, causes, prevention and treatment. |
| 👤 **My Profile** | Store your medical profile used by the SOS screen. |

## Senior-friendly design

- **Extra-large fonts & high-contrast colors** for easier reading.
- **Big, clearly-labeled buttons** that are easy to tap.
- **Simple home dashboard** with quick-glance summary cards.
- **Offline-first** — most features work without internet.

## Getting started

```bash
# Install dependencies
npm install

# Start the Expo dev server
npm start
```

Then scan the QR code with the **Expo Go** app on your phone, or press `a` for Android / `i` for iOS (with a simulator installed).

> To run on web: `npm run web`

## Tech stack

- **React Native** (Expo SDK 51)
- **TypeScript**
- **React Navigation** (native stack)
- **AsyncStorage** for offline persistence
- **expo-location** for nearby help
- **expo-speech** for text-to-speech answers
- **expo-haptics** for SOS feedback

## Project structure

```
App.tsx                      # App entry + providers
src/
  theme.ts                   # Colors, fonts, spacing
  context/AppData.tsx        # Global persisted state
  data/diseases.ts           # Disease knowledge base
  utils/
    storage.ts               # AsyncStorage helpers
    healthEngine.ts          # Offline Q&A engine for the assistant
  components/                # Reusable UI (BigButton, Card, ModalForm, Input)
  screens/                   # Home, Medications, SOS, Assistant, Appointments, Vitals, Nearby, Diseases, Profile
  navigation/                # AppNavigator + types
```

## Notes & limitations

- The voice assistant uses an **offline keyword-based knowledge engine** (no API key, no internet needed). For production you could swap in a medical LLM API — but always include a disclaimer, as this app does.
- Voice input uses the device keyboard's dictation; `expo-speech` handles the spoken answers.
- This is **not a medical device** and does not replace professional advice. Always consult a doctor.

## Disclaimer

MediBot provides general health information for awareness only. It is not a substitute for professional medical advice, diagnosis, or treatment. In an emergency, always call your local emergency number.