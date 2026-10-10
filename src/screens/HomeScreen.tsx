import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { theme } from '../theme';
import { useAppData, todayStr } from '../context/AppData';

interface HomeProps {
  navigation: any;
}

const tiles = [
  { key: 'Medications', label: 'Medicines', icon: '💊', color: '#0E7C66' },
  { key: 'SOS', label: 'Emergency SOS', icon: '🆘', color: '#D7263D' },
  { key: 'Assistant', label: 'Health Assistant', icon: '🎙️', color: '#2D7DD2' },
  { key: 'Appointments', label: 'Appointments', icon: '📅', color: '#F4A300' },
  { key: 'Vitals', label: 'Vitals Tracking', icon: '❤️', color: '#D7263D' },
  { key: 'Nearby', label: 'Nearby Help', icon: '📍', color: '#2E8B57' },
  { key: 'Diseases', label: 'Disease Info', icon: '📖', color: '#6A4C93' },
  { key: 'Profile', label: 'My Profile', icon: '👤', color: '#5B6B66' },
];

export default function HomeScreen({ navigation }: HomeProps) {
  const { medications, appointments, vitals, profile } = useAppData();
  const today = todayStr();

  const todaysMeds = medications.filter((m) => m.time).sort((a, b) => a.time.localeCompare(b.time));
  const upcoming = appointments
    .filter((a) => a.date >= today)
    .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time))
    .slice(0, 1);
  const lastVital = vitals[vitals.length - 1];

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.hello}>
            Hello, {profile.name ? profile.name.split(' ')[0] : 'there'} 👋
          </Text>
          <Text style={styles.sub}>How can MediBot help you today?</Text>
        </View>

        {/* Quick summary */}
        <View style={styles.summaryRow}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryNum}>{todaysMeds.length}</Text>
            <Text style={styles.summaryLabel}>Medicines today</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryNum}>{upcoming.length}</Text>
            <Text style={styles.summaryLabel}>Upcoming visit</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryNum}>{lastVital ? lastVital.value : '--'}</Text>
            <Text style={styles.summaryLabel}>Last vital</Text>
          </View>
        </View>

        {/* Tiles grid */}
        <View style={styles.grid}>
          {tiles.map((t) => (
            <TouchableOpacity
              key={t.key}
              style={styles.tile}
              onPress={() => navigation.navigate(t.key)}
              activeOpacity={0.7}
            >
              <View style={[styles.tileIcon, { backgroundColor: t.color + '22' }]}>
                <Text style={styles.iconText}>{t.icon}</Text>
              </View>
              <Text style={styles.tileLabel}>{t.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.footer}>MediBot • Caring for our seniors 💚</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const COLS = 2;
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: theme.colors.background },
  container: { padding: theme.spacing.lg, paddingBottom: 40 },
  header: { marginBottom: theme.spacing.lg },
  hello: { fontSize: theme.font.xlarge, fontWeight: '800', color: theme.colors.text },
  sub: { fontSize: theme.font.medium, color: theme.colors.textMuted, marginTop: 4 },
  summaryRow: { flexDirection: 'row', gap: 10, marginBottom: theme.spacing.lg },
  summaryCard: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  summaryNum: { fontSize: theme.font.xlarge, fontWeight: '800', color: theme.colors.primary },
  summaryLabel: {
    fontSize: theme.font.small,
    color: theme.colors.textMuted,
    textAlign: 'center',
    marginTop: 2,
  },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  tile: {
    width: '48%',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
    marginBottom: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  tileIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  iconText: { fontSize: 32 },
  tileLabel: { fontSize: theme.font.medium, fontWeight: '700', color: theme.colors.text },
  footer: {
    textAlign: 'center',
    color: theme.colors.textMuted,
    marginTop: theme.spacing.lg,
    fontSize: theme.font.normal,
  },
});