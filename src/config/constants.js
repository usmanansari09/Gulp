import DeviceInfo from 'react-native-device-info';
import { Platform } from 'react-native';

export const isTablet = DeviceInfo.isTablet();
export const isIos = Platform.OS === 'ios';
