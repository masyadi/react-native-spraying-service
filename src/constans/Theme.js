import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export const COLORS = {
  primary: '#2f80ed',
  secondary: '#B4B4B4',
  textPrimary: '#444444',
  textSecondary: '#7B7B7B',
  textGrey: '#999999',
  divider: '#D4D4D4',
  border: '#cccccc',
  backgroundColor: '#f9f9f9',
  ratingColor: '#ebc307',
  progressGrey: '#C1C1C1',
  white: '#FFFFFF',
  black: '#000000',
  gray: '#F9F9F9',
  red: '#FF0000',
  green: '#72B14B',
  transparentWhite: 'rgba(255, 255, 255, 0.2)',
  transparentBlack: 'rgba(0, 0, 0, 0.5)',
  transparent: 'transparent',
};

export const FONT_SIZE = {
  font6: width * (6 / 365),
  font8: width * (8 / 365),
  font10: width * (10 / 365),
  font12: width * (12 / 365),
  font14: width * (14 / 365),
  font16: width * (16 / 365),
  font18: width * (18 / 365),
  font20: width * (20 / 365),
  font22: width * (22 / 365),
  font24: width * (24 / 365),
};

export const FONT_WEIGHT = {
  full: '900',
  semi: '700',
  low: '400',
  bold: 'bold',
  normal: 'normal',
};

export const FONT_TYPE = {
  robotoMedium: 'Roboto-Medium',
  robotoRegular: 'Roboto-Regular',
  robotoBold: 'Roboto-Bold',
  // montserratMedium: '',
  // montserratRegular: '',
  // montserratBold: '',
};

export const SCREEN = {
  width,
  height,
};
