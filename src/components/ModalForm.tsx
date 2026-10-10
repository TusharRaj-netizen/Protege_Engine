import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { theme } from '../theme';
import BigButton from './BigButton';

interface ModalFormProps {
  visible: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  onSave?: () => void;
  saveLabel?: string;
}

export default function ModalForm({
  visible,
  title,
  onClose,
  children,
  onSave,
  saveLabel = 'Save',
}: ModalFormProps) {
  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity onPress={onClose} hitSlop={{ top: 16, bottom: 16, left: 16, right: 16 }}>
              <Text style={styles.close}>✕</Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
            {children}
          </ScrollView>
          {onSave && (
            <View style={styles.footer}>
              <BigButton title={saveLabel} onPress={onSave} />
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: theme.colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '92%',
    paddingBottom: 28,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.divider,
  },
  title: {
    fontSize: theme.font.large,
    fontWeight: '700',
    color: theme.colors.text,
  },
  close: {
    fontSize: 26,
    color: theme.colors.textMuted,
  },
  body: {
    padding: theme.spacing.lg,
  },
  footer: {
    padding: theme.spacing.lg,
  },
});