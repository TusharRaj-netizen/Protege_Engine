import { Platform } from 'react-native';

// MediBot color palette — high contrast, senior-friendly
export const theme = {
  colors: {
    primary: '#0E7C66',
    primaryDark: '#0A5C4B',
    primaryLight: '#D4F1EA',
    accent: '#F4A300',
    danger: '#D7263D',
    dangerLight: '#FBE3E6',
    success: '#2E8B57',
    info: '#2D7DD2',
    background: '#F5F7F6',
    surface: '#FFFFFF',
    text: '#1A2A26',
    textMuted: '#5B6B66',
    border: '#E2E8E5',
    divider: '#EDF1EF',
  },
  // Large text sizes — designed for senior eyes
  font: {
    xlarge: 26,
    large: 22,
    medium: 18,
    normal: 16,
    small: 14,
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  radius: {
    sm: 8,
    md: 14,
    lg: 20,
    pill: 999,
  },
  isAndroid: Platform.OS === 'android',
};

export type Theme = typeof theme;