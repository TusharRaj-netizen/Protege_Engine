import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { theme } from '../theme';

interface BigButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'danger' | 'secondary' | 'success';
  icon?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
}

export default function BigButton({
  title,
  onPress,
  variant = 'primary',
  icon,
  loading,
  disabled,
  style,
}: BigButtonProps) {
  const bg =
    variant === 'danger'
      ? theme.colors.danger
      : variant === 'success'
      ? theme.colors.success
      : variant === 'secondary'
      ? theme.colors.primaryLight
      : theme.colors.primary;

  const fg =
    variant === 'secondary' ? theme.colors.primaryDark : '#FFFFFF';

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: bg }, disabled && styles.disabled, style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={fg} />
      ) : (
        <>
          {icon}
          <Text style={[styles.text, { color: fg }]}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: theme.radius.md,
    minHeight: 64,
    gap: 10,
  },
  text: {
    fontSize: theme.font.large,
    fontWeight: '700',
  },
  disabled: {
    opacity: 0.5,
  },
});