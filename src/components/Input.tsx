import React from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';
import { theme } from '../theme';

interface InputProps extends TextInputProps {
  label?: string;
}

export default function Input({ style, ...props }: InputProps) {
  return <TextInput style={[styles.input, style]} placeholderTextColor="#9AA8A3" {...props} />;
}

const styles = StyleSheet.create({
  input: {
    fontSize: theme.font.medium,
    color: theme.colors.text,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: theme.colors.surface,
    minHeight: 56,
    marginBottom: theme.spacing.sm,
  },
});