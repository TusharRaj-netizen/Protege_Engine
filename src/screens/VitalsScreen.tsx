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
import { useAppData, Vital, uid, todayStr } from '../context/AppData';
import BigButton from '../components/BigButton';
import Card from '../components/Card';
import ModalForm from '../components/ModalForm';
import Input from '../components/Input';
import { SectionTitle } from '../components/SectionTitle';

const TYPES: Vital['type'][] = ['BP', 'Sugar', 'Weight', 'Heart Rate', 'Temperature'];

export default function VitalsScreen() {
  const { vitals, setVitals } = useAppData();
  const [modal, setModal] = useState(false);
  const [type, setType] = useState<Vital['type']>('BP');
  const [value, setValue] = useState('');
  const [note, setNote] = useState('');

  const open = (t: Vital['type']) => {
    setType(t);
    setValue('');
    setNote('');
    setModal(true);
  };

  const save = () => {
    if (!value.trim()) return;
    setVitals([...vitals, { id: uid(), type, value: value.trim(), date: todayStr(), note }]);
    setModal(false);
  };

  const remove = (id: string) => setVitals(vitals.filter((v) => v.id !== id));

  const byType = (t: Vital['type']) =>
    vitals.filter((v) => v.type === t).sort((a, b) => b.date.localeCompare(a.date));

  const hint = (t: Vital['type']) => {
    switch (t) {
      case 'BP': return 'e.g. 120/80';
      case 'Sugar': return 'e.g. 110 mg/dL';
      case 'Weight': return 'e.g. 68 kg';
      case 'Heart Rate': return 'e.g. 72 bpm';
      case 'Temperature': return 'e.g. 98.6 F';
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <SectionTitle>❤️ Vitals Tracking</SectionTitle>
        <Text style={styles.help}>Record and review your health numbers over time.</Text>

        {/* Add buttons */}
        <View style={styles.typeRow}>
          {TYPES.map((t) => (
            <TouchableOpacity key={t} style={styles.typeChip} onPress={() => open(t)}>
              <Text style={styles.typeText}>{t}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {vitals.length === 0 ? (
          <Card><Text style={styles.empty}>No vitals recorded yet. Tap a type above to add one.</Text></Card>
        ) : (
          TYPES.map((t) => {
            const list = byType(t);
            if (list.length === 0) return null;
            return (
              <View key={t}>
                <Text style={styles.typeLabel}>{t}</Text>
                {list.slice(0, 5).map((v) => (
                  <Card key={v.id}>
                    <View style={styles.row}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.value}>{v.value}</Text>
                        <Text style={styles.date}>📅 {v.date}</Text>
                        {v.note ? <Text style={styles.note}>{v.note}</Text> : null}
                      </View>
                      <TouchableOpacity onPress={() => remove(v.id)}>
                        <Text style={styles.delete}>✕</Text>
                      </TouchableOpacity>
                    </View>
                  </Card>
                ))}
              </View>
            );
          })
        )}
      </ScrollView>

      <ModalForm
        visible={modal}
        title={`Add ${type}`}
        onClose={() => setModal(false)}
        onSave={save}
      >
        <Text style={styles.label}>Value</Text>
        <Input value={value} onChangeText={setValue} placeholder={hint(type)} />
        <Text style={styles.label}>Note (optional)</Text>
        <Input value={note} onChangeText={setNote} placeholder="e.g. after morning walk" multiline />
      </ModalForm>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: theme.colors.background },
  container: { padding: theme.spacing.lg, paddingBottom: 40 },
  help: { fontSize: theme.font.normal, color: theme.colors.textMuted, marginBottom: theme.spacing.md },
  typeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: theme.spacing.lg },
  typeChip: { backgroundColor: theme.colors.primaryLight, borderRadius: 20, paddingVertical: 12, paddingHorizontal: 16 },
  typeText: { color: theme.colors.primaryDark, fontSize: theme.font.normal, fontWeight: '700' },
  empty: { fontSize: theme.font.medium, color: theme.colors.textMuted, textAlign: 'center' },
  typeLabel: { fontSize: theme.font.large, fontWeight: '700', color: theme.colors.primaryDark, marginVertical: theme.spacing.sm },
  row: { flexDirection: 'row', alignItems: 'center' },
  value: { fontSize: theme.font.xlarge, fontWeight: '800', color: theme.colors.text },
  date: { fontSize: theme.font.normal, color: theme.colors.textMuted, marginTop: 4 },
  note: { fontSize: theme.font.small, color: theme.colors.textMuted, marginTop: 4 },
  delete: { color: theme.colors.danger, fontSize: 22 },
  label: { fontSize: theme.font.normal, fontWeight: '600', color: theme.colors.text, marginBottom: 6, marginTop: 6 },
});