import Navigation, { Routes } from './navigation';
import 'moment/locale/id';

/**
 *
 * @param {Object} param
 * @param {import('@react-navigation/native-stack')} param.Stack
 * @returns
 */
export function registerSprayingServiceRoutes({ Stack }) {
  return (
    <>
      <Stack.Screen
        name={Routes.ScreenHome}
        component={Navigation}
        options={{ headerShown: false }}
      />
    </>
  );
}

export { Routes };
