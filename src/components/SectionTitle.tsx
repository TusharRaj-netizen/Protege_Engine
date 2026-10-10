import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { theme } from '../theme';

export function SectionTitle({ children, style }: { children: React.ReactNode; style?: any }) {
  return <Text style={[styles.title, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontSize: theme.font.large,
    fontWeight: '700',
    color: theme.colors.primaryDark,
    marginVertical: theme.spacing.sm,
  },
});