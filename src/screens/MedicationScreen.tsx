import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { theme } from '../theme';
import { useAppData, Medication, uid, todayStr } from '../context/AppData';
import BigButton from '../components/BigButton';
import Card from '../components/Card';
import ModalForm from '../components/ModalForm';
import Input from '../components/Input';
import { SectionTitle } from '../components/SectionTitle';

export default function MedicationScreen() {
  const { medications, setMedications } = useAppData();
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<Medication | null>(null);
  const [form, setForm] = useState({ name: '', dosage: '', time: '', notes: '' });
  const today = todayStr();

  const openAdd = () => {
    setEditing(null);
    setForm({ name: '', dosage: '', time: '08:00', notes: '' });
    setModal(true);
  };

  const openEdit = (m: Medication) => {
    setEditing(m);
    setForm({ name: m.name, dosage: m.dosage, time: m.time, notes: m.notes || '' });
    setModal(true);
  };

  const save = () => {
    if (!form.name.trim()) return;
    if (editing) {
      setMedications(
        medications.map((m) => (m.id === editing.id ? { ...editing, ...form } : m))
      );
    } else {
      setMedications([...medications, { id: uid(), ...form, taken: {} }]);
    }
    setModal(false);
  };

  const remove = (id: string) => {
    setMedications(medications.filter((m) => m.id !== id));
  };

  const toggleTaken = (m: Medication) => {
    setMedications(
      medications.map((x) =>
        x.id === m.id ? { ...x, taken: { ...x.taken, [today]: !x.taken?.[today] } } : x
      )
    );
  };

  const sorted = [...medications].sort((a, b) => a.time.localeCompare(b.time));

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <SectionTitle>💊 Your Medicines</SectionTitle>
        <Text style={styles.help}>
          Tap a medicine to mark it taken for today. Add reminders with the button below.
        </Text>

        {sorted.length === 0 ? (
          <Card>
            <Text style={styles.empty}>No medicines added yet. Tap "Add Medicine" to start.</Text>
          </Card>
        ) : (
          sorted.map((m) => {
            const isTaken = !!m.taken?.[today];
            return (
              <Card key={m.id}>
                <View style={styles.medRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.medName}>{m.name}</Text>
                    <Text style={styles.medMeta}>
                      {m.dosage ? `${m.dosage} • ` : ''}⏰ {m.time}
                    </Text>
                    {m.notes ? <Text style={styles.medNotes}>{m.notes}</Text> : null}
                  </View>
                  <TouchableOpacity
                    style={[styles.checkBtn, isTaken && styles.checkBtnDone]}
                    onPress={() => toggleTaken(m)}
                  >
                    <Text style={styles.checkText}>{isTaken ? '✓ Taken' : 'Mark'}</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.actions}>
                  <TouchableOpacity onPress={() => openEdit(m)}>
                    <Text style={styles.edit}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => remove(m.id)}>
                    <Text style={styles.delete}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </Card>
            );
          })
        )}

        <View style={{ marginTop: theme.spacing.md }}>
          <BigButton title="+ Add Medicine" onPress={openAdd} />
        </View>
      </ScrollView>

      <ModalForm
        visible={modal}
        title={editing ? 'Edit Medicine' : 'Add Medicine'}
        onClose={() => setModal(false)}
        onSave={save}
        saveLabel={editing ? 'Update' : 'Add'}
      >
        <Text style={styles.label}>Medicine name</Text>
        <Input value={form.name} onChangeText={(v) => setForm({ ...form, name: v })} placeholder="e.g. Metformin" />
        <Text style={styles.label}>Dosage</Text>
        <Input value={form.dosage} onChangeText={(v) => setForm({ ...form, dosage: v })} placeholder="e.g. 1 tablet" />
        <Text style={styles.label}>Time (24h HH:MM)</Text>
        <Input value={form.time} onChangeText={(v) => setForm({ ...form, time: v })} placeholder="08:00" keyboardType="numeric" />
        <Text style={styles.label}>Notes (optional)</Text>
        <Input value={form.notes} onChangeText={(v) => setForm({ ...form, notes: v })} placeholder="e.g. after food" multiline />
      </ModalForm>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: theme.colors.background },
  container: { padding: theme.spacing.lg, paddingBottom: 40 },
  help: { fontSize: theme.font.normal, color: theme.colors.textMuted, marginBottom: theme.spacing.md },
  empty: { fontSize: theme.font.medium, color: theme.colors.textMuted, textAlign: 'center', padding: 10 },
  medRow: { flexDirection: 'row', alignItems: 'center' },
  medName: { fontSize: theme.font.large, fontWeight: '700', color: theme.colors.text },
  medMeta: { fontSize: theme.font.normal, color: theme.colors.textMuted, marginTop: 4 },
  medNotes: { fontSize: theme.font.small, color: theme.colors.textMuted, marginTop: 4 },
  checkBtn: {
    backgroundColor: theme.colors.primaryLight,
    borderRadius: theme.radius.pill,
    paddingVertical: 12,
    paddingHorizontal: 18,
  },
  checkBtnDone: { backgroundColor: theme.colors.success },
  checkText: { color: theme.colors.primaryDark, fontWeight: '700', fontSize: theme.font.normal },
  actions: { flexDirection: 'row', gap: 24, marginTop: 12 },
  edit: { color: theme.colors.info, fontSize: theme.font.normal, fontWeight: '600' },
  delete: { color: theme.colors.danger, fontSize: theme.font.normal, fontWeight: '600' },
  label: { fontSize: theme.font.normal, fontWeight: '600', color: theme.colors.text, marginBottom: 6, marginTop: 6 },
});