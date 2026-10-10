import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Linking,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { theme } from '../theme';
import { SectionTitle } from '../components/SectionTitle';
import Card from '../components/Card';
import * as Location from 'expo-location';

type PlaceType = 'pharmacy' | 'hospital' | 'clinic' | 'emergency';

interface QuickPlace {
  type: PlaceType;
  label: string;
  icon: string;
  query: string;
}

const PLACES: QuickPlace[] = [
  { type: 'pharmacy', label: 'Pharmacies', icon: '💊', query: 'pharmacy near me' },
  { type: 'hospital', label: 'Hospitals', icon: '🏥', query: 'hospital near me' },
  { type: 'clinic', label: 'Clinics', icon: '🩺', query: 'clinic near me' },
  { type: 'emergency', label: 'Emergency Rooms', icon: '🚑', query: 'emergency room near me' },
];

export default function NearbyScreen() {
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'ready' | 'denied'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const getLocation = async () => {
    setStatus('loading');
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setStatus('denied');
        setErrorMsg('Location permission was denied. You can still search by area name.');
        return;
      }
      const loc = await Location.getCurrentPositionAsync({});
      setCoords({ lat: loc.coords.latitude, lng: loc.coords.longitude });
      setStatus('ready');
    } catch (e) {
      setStatus('denied');
      setErrorMsg('Could not get your location. You can still search by area name.');
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  const openMaps = (query: string) => {
    let url: string;
    if (coords) {
      url = `https://www.google.com/maps/search/${encodeURIComponent(query)}/@${coords.lat},${coords.lng},14z`;
    } else {
      url = `https://www.google.com/maps/search/${encodeURIComponent(query)}`;
    }
    Linking.openURL(url).catch(() => Alert.alert('Error', 'Could not open maps.'));
  };

  const callEmergency = () => Linking.openURL('tel:911').catch(() => {});

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <SectionTitle>📍 Nearby Help</SectionTitle>
        <Text style={styles.help}>
          Find the nearest pharmacies, hospitals, clinics, and emergency rooms around you.
        </Text>

        {status === 'loading' && (
          <View style={styles.statusBox}>
            <ActivityIndicator color={theme.colors.primary} size="large" />
            <Text style={styles.statusText}>Getting your location…</Text>
          </View>
        )}

        {status === 'ready' && coords && (
          <View style={[styles.statusBox, { backgroundColor: theme.colors.primaryLight }]}>
            <Text style={styles.statusText}>📍 Location ready. Results will be near you.</Text>
          </View>
        )}

        {status === 'denied' && (
          <View style={[styles.statusBox, { backgroundColor: theme.colors.dangerLight }]}>
            <Text style={[styles.statusText, { color: theme.colors.danger }]}>{errorMsg}</Text>
            <TouchableOpacity onPress={getLocation} style={{ marginTop: 8 }}>
              <Text style={styles.retry}>Try again</Text>
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity style={styles.emergencyBar} onPress={callEmergency}>
          <Text style={styles.emergencyText}>🚑 Call Emergency (911)</Text>
        </TouchableOpacity>

        {PLACES.map((p) => (
          <TouchableOpacity key={p.type} onPress={() => openMaps(p.query)} activeOpacity={0.7}>
            <Card>
              <View style={styles.placeRow}>
                <Text style={styles.placeIcon}>{p.icon}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.placeLabel}>{p.label}</Text>
                  <Text style={styles.placeHint}>Tap to open in Maps</Text>
                </View>
                <Text style={styles.arrow}>→</Text>
              </View>
            </Card>
          </TouchableOpacity>
        ))}

        <Text style={styles.note}>
          Tip: If location is off, search results will show nearby places by your area name in Google Maps.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: theme.colors.background },
  container: { padding: theme.spacing.lg, paddingBottom: 40 },
  help: { fontSize: theme.font.normal, color: theme.colors.textMuted, marginBottom: theme.spacing.md },
  statusBox: { padding: theme.spacing.md, borderRadius: theme.radius.md, alignItems: 'center', marginBottom: theme.spacing.md, backgroundColor: theme.colors.primaryLight },
  statusText: { fontSize: theme.font.medium, color: theme.colors.primaryDark, textAlign: 'center' },
  retry: { color: theme.colors.primary, fontSize: theme.font.normal, fontWeight: '700' },
  emergencyBar: { backgroundColor: theme.colors.danger, borderRadius: theme.radius.md, paddingVertical: 18, alignItems: 'center', marginBottom: theme.spacing.lg },
  emergencyText: { color: '#fff', fontSize: theme.font.large, fontWeight: '800' },
  placeRow: { flexDirection: 'row', alignItems: 'center' },
  placeIcon: { fontSize: 36, marginRight: 14 },
  placeLabel: { fontSize: theme.font.large, fontWeight: '700', color: theme.colors.text },
  placeHint: { fontSize: theme.font.normal, color: theme.colors.textMuted, marginTop: 2 },
  arrow: { fontSize: 26, color: theme.colors.primary },
  note: { fontSize: theme.font.small, color: theme.colors.textMuted, marginTop: theme.spacing.md, textAlign: 'center' },
});