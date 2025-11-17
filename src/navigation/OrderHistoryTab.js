import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { COLORS, FONT_SIZE } from "../constans";
import { OrderHistory } from "../screens";

const Tab = createMaterialTopTabNavigator();

const OrderHistoryTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#064232FF",
        tabBarInactiveTintColor: COLORS.textGrey,
        tabBarPressColor: COLORS.transparent,
        tabBarLabelStyle: {
          textTransform: "none",
          fontSize: FONT_SIZE.font16,
        },
        tabBarStyle: {
          borderBottomWidth: 2,
          borderBottomColor: "#eeeeee",
          elevation: 0,
          shadowOpacity: 0,
          marginBottom: 22,
        },
        tabBarIndicatorStyle: {
          backgroundColor: "#064232FF",
          bottom: -2,
        },
      }}
    >
      <Tab.Screen
        name="Ongoing"
        component={OrderHistory}
        options={{ title: "Sedang Berjalan" }}
        initialParams={{ type: "ongoing" }}
      />
      <Tab.Screen
        name="History"
        component={OrderHistory}
        options={{ title: "Riwayat" }}
        initialParams={{ type: "history" }}
      />
    </Tab.Navigator>
  );
};

export default OrderHistoryTab;
