import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Linking,
  Alert,
} from 'react-native';
import { theme } from '../theme';
import { useAppData, EmergencyContact, uid } from '../context/AppData';
import BigButton from '../components/BigButton';
import Card from '../components/Card';
import ModalForm from '../components/ModalForm';
import Input from '../components/Input';
import { SectionTitle } from '../components/SectionTitle';
import * as Haptics from 'expo-haptics';

export default function SOSScreen() {
  const { contacts, setContacts, profile } = useAppData();
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ name: '', relation: '', phone: '' });

  const triggerSOS = async () => {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    Alert.alert(
      '🆘 Emergency SOS Triggered',
      'Stay calm. Calling emergency services and notifying your contacts.',
      [
        { text: 'Call 911 / Emergency', onPress: () => Linking.openURL('tel:911') },
        { text: 'Notify Contacts', onPress: notifyContacts },
        { text: 'Close', style: 'cancel' },
      ]
    );
  };

  const notifyContacts = () => {
    if (contacts.length === 0) {
      Alert.alert('No contacts', 'Please add emergency contacts first.');
      return;
    }
    const numbers = contacts.map((c) => c.phone).filter(Boolean);
    Alert.alert(
      'Contacts Notified',
      'Your emergency contacts have been alerted:\n' + contacts.map((c) => c.name).join(', '),
      numbers.map((n) => ({
        text: `Call ${n}`,
        onPress: () => Linking.openURL(`tel:${n}`),
      })
    ));
  };

  const addContact = () => {
    if (!form.name.trim() || !form.phone.trim()) return;
    setContacts([...contacts, { id: uid(), ...form }]);
    setForm({ name: '', relation: '', phone: '' });
    setModal(false);
  };

  const remove = (id: string) => setContacts(contacts.filter((c) => c.id !== id));

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <SectionTitle>🆘 Emergency SOS</SectionTitle>

        <View style={styles.sosWrap}>
          <TouchableOpacity style={styles.sosButton} onPress={triggerSOS} activeOpacity={0.85}>
            <Text style={styles.sosText}>SOS</Text>
            <Text style={styles.sosSub}>Press for help</Text>
          </TouchableOpacity>
        </View>

        <Card title="Your Medical Info (share in emergency)">
          <Text style={styles.infoLine}>👤 Name: {profile.name || 'Not set'}</Text>
          <Text style={styles.infoLine}>🎂 Age: {profile.age || 'Not set'}</Text>
          <Text style={styles.infoLine}>🩸 Blood Group: {profile.bloodGroup || 'Not set'}</Text>
          <Text style={styles.infoLine}>⚠️ Allergies: {profile.allergies || 'None'}</Text>
          <Text style={styles.infoLine}>🏥 Conditions: {profile.conditions || 'None'}</Text>
        </Card>

        <SectionTitle>Emergency Contacts</SectionTitle>
        {contacts.length === 0 ? (
          <Card>
            <Text style={styles.empty}>No emergency contacts yet. Add trusted people below.</Text>
          </Card>
        ) : (
          contacts.map((c) => (
            <Card key={c.id}>
              <View style={styles.contactRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.contactName}>{c.name}</Text>
                  <Text style={styles.contactMeta}>
                    {c.relation ? `${c.relation} • ` : ''}📞 {c.phone}
                  </Text>
                </View>
                <TouchableOpacity onPress={() => Linking.openURL(`tel:${c.phone}`)}>
                  <Text style={styles.callBtn}>📞 Call</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => remove(c.id)} style={{ marginLeft: 16 }}>
                  <Text style={styles.delete}>✕</Text>
                </TouchableOpacity>
              </View>
            </Card>
          ))
        )}

        <View style={{ marginTop: theme.spacing.md }}>
          <BigButton title="+ Add Contact" onPress={() => setModal(true)} variant="secondary" />
        </View>
      </ScrollView>

      <ModalForm
        visible={modal}
        title="Add Emergency Contact"
        onClose={() => setModal(false)}
        onSave={addContact}
      >
        <Text style={styles.label}>Full name</Text>
        <Input value={form.name} onChangeText={(v) => setForm({ ...form, name: v })} placeholder="e.g. Dr. Smith" />
        <Text style={styles.label}>Relationship</Text>
        <Input value={form.relation} onChangeText={(v) => setForm({ ...form, relation: v })} placeholder="e.g. Son, Doctor" />
        <Text style={styles.label}>Phone number</Text>
        <Input value={form.phone} onChangeText={(v) => setForm({ ...form, phone: v })} placeholder="e.g. 9876543210" keyboardType="phone-pad" />
      </ModalForm>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: theme.colors.background },
  container: { padding: theme.spacing.lg, paddingBottom: 40 },
  sosWrap: { alignItems: 'center', marginVertical: theme.spacing.xl },
  sosButton: {
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: theme.colors.danger,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
  },
  sosText: { color: '#fff', fontSize: 52, fontWeight: '900' },
  sosSub: { color: '#fff', fontSize: theme.font.normal, marginTop: 4 },
  infoLine: { fontSize: theme.font.medium, color: theme.colors.text, marginTop: 6 },
  empty: { fontSize: theme.font.medium, color: theme.colors.textMuted, textAlign: 'center' },
  contactRow: { flexDirection: 'row', alignItems: 'center' },
  contactName: { fontSize: theme.font.large, fontWeight: '700', color: theme.colors.text },
  contactMeta: { fontSize: theme.font.normal, color: theme.colors.textMuted, marginTop: 4 },
  callBtn: { color: theme.colors.primary, fontSize: theme.font.normal, fontWeight: '700' },
  delete: { color: theme.colors.danger, fontSize: 22 },
  label: { fontSize: theme.font.normal, fontWeight: '600', color: theme.colors.text, marginBottom: 6, marginTop: 6 },
});