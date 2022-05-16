import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid, Platform } from 'react-native';

const requestOrUseLocationPermissionsIOS = async () => {
  const status = await Geolocation.requestAuthorization('whenInUse');

  return status === 'granted';
};

const requestOrUseLocationPermissionsAndroid = async () => {
  const permissionString = PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION;
  const hasPermission = await PermissionsAndroid.check(permissionString);

  if (hasPermission) {
    return hasPermission;
  } else {
    const status = await PermissionsAndroid.request(permissionString);

    return status === PermissionsAndroid.RESULTS.GRANTED;
  }
};

const requestOrUseLocationPermissions = async () => {
  if (Platform.OS === 'ios') {
    return requestOrUseLocationPermissionsIOS();
  } else if (Platform.OS === 'android') {
    return requestOrUseLocationPermissionsAndroid();
  }
};

export const getCurrentPosition = async ({ callback, failureCallback }) => {
  const permissionsGranted = requestOrUseLocationPermissions();

  if (permissionsGranted) {
    Geolocation.getCurrentPosition(
      ({ coords }) => callback(coords),
      e => console.log(e),
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 3600000
      }
    );
  } else if (failureCallback) {
    failureCallback();
  }
};
