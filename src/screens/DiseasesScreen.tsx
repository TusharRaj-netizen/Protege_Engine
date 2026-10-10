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
import { SectionTitle } from '../components/SectionTitle';
import Card from '../components/Card';
import { DISEASES, Disease } from '../data/diseases';

export default function DiseasesScreen() {
  const [selected, setSelected] = useState<Disease | null>(null);

  const severityColor = (s: Disease['severity']) =>
    s === 'High' ? theme.colors.danger : s === 'Moderate' ? theme.colors.accent : theme.colors.success;

  if (selected) {
    return (
      <SafeAreaView style={styles.safe}>
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
          <TouchableOpacity onPress={() => setSelected(null)} style={styles.backBtn}>
            <Text style={styles.backText}>← Back to list</Text>
          </TouchableOpacity>

          <View style={styles.titleRow}>
            <Text style={styles.title}>{selected.name}</Text>
            <View style={[styles.sevBadge, { backgroundColor: severityColor(selected.severity) + '22' }]}>
              <Text style={[styles.sevText, { color: severityColor(selected.severity) }]}>
                {selected.severity} risk
              </Text>
            </View>
          </View>
          <Text style={styles.category}>{selected.category}</Text>

          <Card title="Symptoms">
            {selected.symptoms.map((s, i) => (
              <Text key={i} style={styles.listItem}>• {s}</Text>
            ))}
          </Card>

          <Card title="Causes">
            <Text style={styles.body}>{selected.causes}</Text>
          </Card>

          <Card title="Prevention">
            {selected.prevention.map((s, i) => (
              <Text key={i} style={styles.listItem}>• {s}</Text>
            ))}
          </Card>

          <Card title="Treatment">
            <Text style={styles.body}>{selected.treatment}</Text>
          </Card>

          <Text style={styles.disclaimer}>
            ⚠️ This information is for general awareness only. Always consult your doctor for diagnosis and treatment.
          </Text>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <SectionTitle>📖 Disease Info</SectionTitle>
        <Text style={styles.help}>
          Learn about common conditions affecting seniors. Tap a topic to see symptoms, causes, prevention, and treatment.
        </Text>

        {DISEASES.map((d) => (
          <TouchableOpacity key={d.id} onPress={() => setSelected(d)} activeOpacity={0.7}>
            <Card>
              <View style={styles.listRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.diseaseName}>{d.name}</Text>
                  <Text style={styles.diseaseCat}>{d.category}</Text>
                </View>
                <View style={[styles.sevBadge, { backgroundColor: severityColor(d.severity) + '22' }]}>
                  <Text style={[styles.sevText, { color: severityColor(d.severity) }]}>
                    {d.severity}
                  </Text>
                </View>
                <Text style={styles.arrow}>→</Text>
              </View>
            </Card>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: theme.colors.background },
  container: { padding: theme.spacing.lg, paddingBottom: 40 },
  help: { fontSize: theme.font.normal, color: theme.colors.textMuted, marginBottom: theme.spacing.md },
  backBtn: { marginBottom: theme.spacing.md },
  backText: { color: theme.colors.primary, fontSize: theme.font.normal, fontWeight: '700' },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8 },
  title: { fontSize: theme.font.xlarge, fontWeight: '800', color: theme.colors.text, flex: 1 },
  category: { fontSize: theme.font.normal, color: theme.colors.info, fontWeight: '600', marginVertical: 8 },
  listItem: { fontSize: theme.font.medium, color: theme.colors.text, marginTop: 6, lineHeight: 26 },
  body: { fontSize: theme.font.medium, color: theme.colors.text, lineHeight: 26 },
  listRow: { flexDirection: 'row', alignItems: 'center' },
  diseaseName: { fontSize: theme.font.large, fontWeight: '700', color: theme.colors.text },
  diseaseCat: { fontSize: theme.font.normal, color: theme.colors.textMuted, marginTop: 2 },
  sevBadge: { borderRadius: 20, paddingVertical: 6, paddingHorizontal: 12, marginHorizontal: 8 },
  sevText: { fontSize: theme.font.small, fontWeight: '700' },
  arrow: { fontSize: 24, color: theme.colors.primary, marginLeft: 8 },
  disclaimer: {
    fontSize: theme.font.normal,
    color: theme.colors.textMuted,
    marginTop: theme.spacing.lg,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});