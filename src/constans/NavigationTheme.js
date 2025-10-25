import { DefaultTheme } from '@react-navigation/native';
import { COLORS } from './Theme';

export const NavigationTheme = {
  ...DefaultTheme,
  colors: {
    background: COLORS.backgroundColor,
  },
};
