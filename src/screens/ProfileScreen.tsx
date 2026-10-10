import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { theme } from '../theme';
import { useAppData } from '../context/AppData';
import BigButton from '../components/BigButton';
import Card from '../components/Card';
import Input from '../components/Input';
import { SectionTitle } from '../components/SectionTitle';

export default function ProfileScreen() {
  const { profile, setProfile } = useAppData();
  const [form, setForm] = useState(profile);
  const [saved, setSaved] = useState(false);

  const save = () => {
    setProfile(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <SectionTitle>👤 My Profile</SectionTitle>
        <Text style={styles.help}>
          This information is shown on your SOS screen and shared during emergencies. Keep it updated.
        </Text>

        <Card>
          <Text style={styles.label}>Full name</Text>
          <Input value={form.name} onChangeText={(v) => setForm({ ...form, name: v })} placeholder="Your name" />

          <Text style={styles.label}>Age</Text>
          <Input value={form.age} onChangeText={(v) => setForm({ ...form, age: v })} placeholder="e.g. 72" keyboardType="numeric" />

          <Text style={styles.label}>Blood group</Text>
          <Input value={form.bloodGroup} onChangeText={(v) => setForm({ ...form, bloodGroup: v })} placeholder="e.g. O+" />

          <Text style={styles.label}>Allergies</Text>
          <Input value={form.allergies} onChangeText={(v) => setForm({ ...form, allergies: v })} placeholder="e.g. Penicillin, dust" multiline />

          <Text style={styles.label}>Medical conditions</Text>
          <Input value={form.conditions} onChangeText={(v) => setForm({ ...form, conditions: v })} placeholder="e.g. Diabetes, High BP" multiline />
        </Card>

        {saved && <Text style={styles.saved}>✓ Profile saved!</Text>}

        <View style={{ marginTop: theme.spacing.md }}>
          <BigButton title="Save Profile" onPress={save} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: theme.colors.background },
  container: { padding: theme.spacing.lg, paddingBottom: 40 },
  help: { fontSize: theme.font.normal, color: theme.colors.textMuted, marginBottom: theme.spacing.md },
  label: { fontSize: theme.font.normal, fontWeight: '600', color: theme.colors.text, marginBottom: 6, marginTop: 10 },
  saved: { color: theme.colors.success, fontSize: theme.font.medium, fontWeight: '700', textAlign: 'center', marginTop: 8 },
});