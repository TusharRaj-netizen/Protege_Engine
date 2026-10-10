import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Linking,
} from 'react-native';
import { theme } from '../theme';
import { useAppData, Appointment, uid, todayStr } from '../context/AppData';
import BigButton from '../components/BigButton';
import Card from '../components/Card';
import ModalForm from '../components/ModalForm';
import Input from '../components/Input';
import { SectionTitle } from '../components/SectionTitle';

export default function AppointmentsScreen() {
  const { appointments, setAppointments } = useAppData();
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<Appointment | null>(null);
  const [form, setForm] = useState({ doctor: '', specialty: '', date: '', time: '', location: '', notes: '' });
  const today = todayStr();

  const openAdd = () => {
    setEditing(null);
    setForm({ doctor: '', specialty: '', date: today, time: '10:00', location: '', notes: '' });
    setModal(true);
  };

  const openEdit = (a: Appointment) => {
    setEditing(a);
    setForm({ doctor: a.doctor, specialty: a.specialty, date: a.date, time: a.time, location: a.location || '', notes: a.notes || '' });
    setModal(true);
  };

  const save = () => {
    if (!form.doctor.trim() || !form.date.trim()) return;
    if (editing) {
      setAppointments(appointments.map((a) => (a.id === editing.id ? { ...editing, ...form } : a)));
    } else {
      setAppointments([...appointments, { id: uid(), ...form }]);
    }
    setModal(false);
  };

  const remove = (id: string) => setAppointments(appointments.filter((a) => a.id !== id));

  const callLocation = (loc: string) => {
    if (!loc) return;
    Linking.openURL(`https://maps.google.com/?q=${encodeURIComponent(loc)}`).catch(() => {});
  };

  const sorted = [...appointments].sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
  const upcoming = sorted.filter((a) => a.date >= today);
  const past = sorted.filter((a) => a.date < today);

  const renderAppt = (a: Appointment) => (
    <Card key={a.id}>
      <Text style={styles.doctor}>{a.doctor}</Text>
      {a.specialty ? <Text style={styles.specialty}>{a.specialty}</Text> : null}
      <Text style={styles.datetime}>📅 {a.date}  ⏰ {a.time}</Text>
      {a.location ? (
        <TouchableOpacity onPress={() => callLocation(a.location!)}>
          <Text style={styles.location}>📍 {a.location} (tap for directions)</Text>
        </TouchableOpacity>
      ) : null}
      {a.notes ? <Text style={styles.notes}>{a.notes}</Text> : null}
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => openEdit(a)}>
          <Text style={styles.edit}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => remove(a.id)}>
          <Text style={styles.delete}>Delete</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <SectionTitle>📅 Appointments</SectionTitle>
        <Text style={styles.sectionLabel}>Upcoming</Text>
        {upcoming.length === 0 ? (
          <Card><Text style={styles.empty}>No upcoming appointments.</Text></Card>
        ) : (
          upcoming.map(renderAppt)
        )}
        {past.length > 0 && (
          <>
            <Text style={[styles.sectionLabel, { marginTop: theme.spacing.lg }]}>Past</Text>
            {past.map(renderAppt)}
          </>
        )}
        <View style={{ marginTop: theme.spacing.md }}>
          <BigButton title="+ Add Appointment" onPress={openAdd} />
        </View>
      </ScrollView>

      <ModalForm
        visible={modal}
        title={editing ? 'Edit Appointment' : 'Add Appointment'}
        onClose={() => setModal(false)}
        onSave={save}
        saveLabel={editing ? 'Update' : 'Add'}
      >
        <Text style={styles.label}>Doctor name</Text>
        <Input value={form.doctor} onChangeText={(v) => setForm({ ...form, doctor: v })} placeholder="e.g. Dr. Patel" />
        <Text style={styles.label}>Specialty</Text>
        <Input value={form.specialty} onChangeText={(v) => setForm({ ...form, specialty: v })} placeholder="e.g. Cardiologist" />
        <Text style={styles.label}>Date (YYYY-MM-DD)</Text>
        <Input value={form.date} onChangeText={(v) => setForm({ ...form, date: v })} placeholder="2025-01-15" />
        <Text style={styles.label}>Time (HH:MM)</Text>
        <Input value={form.time} onChangeText={(v) => setForm({ ...form, time: v })} placeholder="10:00" keyboardType="numeric" />
        <Text style={styles.label}>Location / Address</Text>
        <Input value={form.location} onChangeText={(v) => setForm({ ...form, location: v })} placeholder="e.g. City Hospital" />
        <Text style={styles.label}>Notes (optional)</Text>
        <Input value={form.notes} onChangeText={(v) => setForm({ ...form, notes: v })} placeholder="Reason for visit" multiline />
      </ModalForm>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: theme.colors.background },
  container: { padding: theme.spacing.lg, paddingBottom: 40 },
  sectionLabel: { fontSize: theme.font.large, fontWeight: '700', color: theme.colors.primaryDark, marginVertical: theme.spacing.sm },
  empty: { fontSize: theme.font.medium, color: theme.colors.textMuted, textAlign: 'center' },
  doctor: { fontSize: theme.font.large, fontWeight: '700', color: theme.colors.text },
  specialty: { fontSize: theme.font.normal, color: theme.colors.info, marginTop: 2, fontWeight: '600' },
  datetime: { fontSize: theme.font.medium, color: theme.colors.text, marginTop: 8 },
  location: { fontSize: theme.font.normal, color: theme.colors.primary, marginTop: 6, textDecorationLine: 'underline' },
  notes: { fontSize: theme.font.normal, color: theme.colors.textMuted, marginTop: 6 },
  actions: { flexDirection: 'row', gap: 24, marginTop: 12 },
  edit: { color: theme.colors.info, fontSize: theme.font.normal, fontWeight: '600' },
  delete: { color: theme.colors.danger, fontSize: theme.font.normal, fontWeight: '600' },
  label: { fontSize: theme.font.normal, fontWeight: '600', color: theme.colors.text, marginBottom: 6, marginTop: 6 },
});