import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Buyer, Home, Komoditas, Order, OrderSuccess, Pestisida, PinLocation, Summary } from "../screens";
import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import { COLORS, NavigationTheme } from "../constans";

const Stack = createNativeStackNavigator();

export const Routes = {
  ScreenHome: "HomeScreen",
};

const Navigation = () => {
  const navigationRef = useNavigationContainerRef();

  return (
    <NavigationContainer theme={NavigationTheme}>
      <Stack.Navigator
        independent={true}
        ref={navigationRef}
        screenOptions={{
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: COLORS.backgroundColor,
          },
        }}
      >
        <Stack.Screen
          name={Routes.ScreenHome}
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OrderScreen"
          component={Order}
          options={{ title: "Lokasi & Waktu" }}
        />
        <Stack.Screen
          name="PinLocationScreen"
          component={PinLocation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="KomoditasScreen"
          component={Komoditas}
          options={{ title: "Pilih Komoditas" }}
        />
        <Stack.Screen
          name="BuyerScreen"
          component={Buyer}
          options={{ title: "Data Pemesan" }}
        />
        <Stack.Screen
          name="SummaryScreen"
          component={Summary}
          options={{ title: "Review Pesanan" }}
        />
        <Stack.Screen
          name="OrderSuccessScreen"
          component={OrderSuccess}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PestisidaScreen"
          component={Pestisida}
          options={{ title: "Pilih Cairan" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
