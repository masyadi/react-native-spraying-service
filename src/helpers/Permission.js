import { Alert, PermissionsAndroid } from 'react-native';

export const hasAndroidStoragePermission = async props => {
  const hasWritePermission = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  );
  const hasReadPermission = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
  );

  if (hasWritePermission && hasReadPermission) {
    return true;
  }
  return false;
};

export const androidStoragePermissionRequest = async () => {
  const status = await PermissionsAndroid.requestMultiple(
    [
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    ],
    {
      title: 'Storage Permission Required',
      message: 'Application needs access to your storage',
    },
  );

  if (
    status['android.permission.WRITE_EXTERNAL_STORAGE'] === 'granted' &&
    status['android.permission.READ_EXTERNAL_STORAGE'] === 'granted'
  ) {
    return true;
  } else {
    if (!props.hideAlert)
      Alert.alert('Error', 'Storage Permission Not Granted');
    return false;
  }
}

export const androidLocationPermissionRequest = async () => {
  const status = await PermissionsAndroid.requestMultiple(
    [
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
    ],
    {
      title: 'Location Permission Required',
      message: 'Application needs access to your location',
    },
  );

  if (
    status['android.permission.ACCESS_FINE_LOCATION'] === 'granted' &&
    status['android.permission.ACCESS_COARSE_LOCATION'] === 'granted'
  ) {
    return true;
  } else {
    if (!props.hideAlert)
      Alert.alert('Error', 'Location Permission Not Granted');
    return false;
  }
}