import React from "react";
import {
  BackHandler,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Container, Space, Text } from "../../components";
import { COLORS, FONT_SIZE } from "../../constans";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useFocusEffect } from "@react-navigation/native";
import { getConfig } from "../../config";
import { numberFormat } from "../../helpers";

const Success = ({ navigation, route: { params } }) => {
  const parentNav = navigation.getParent();
  const { coin } = getConfig();

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (parentNav) {
          const rootApp = parentNav.getState()?.routeNames?.[0];
          parentNav.reset({
            index: 0,
            routes: [{ name: rootApp }],
          });
        }
        return true;
      };

      const handler = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );

      return () => handler.remove();
    }, [navigation])
  );

  return (
    <SafeAreaView>
      <ScrollView>
        <Container>
          <View style={{ alignItems: "center", marginTop: 45 }}>
            <FontAwesome5 name="check-circle" size={100} color="#13c453" />
            <Space size={39} />
            <Text style={[styles.title, { color: COLORS.black }]}>
              Pesanan Berhasil
            </Text>
            <Space size={28} />
            {coin > 0 && (
              <>
                <Text style={styles.title}>Anda memperoleh:</Text>
                <Text style={styles.poin}>+{numberFormat(coin)} poin</Text>
                <Space size={43} />
              </>
            )}
            {params?.message?.map((item, index) => (
              <Text
                key={index.toString()}
                style={[
                  styles.body,
                  item.bold ? { fontWeight: "bold" } : null,
                  item.center ? { textAlign: "center" } : null,
                  { marginBottom: 15 },
                ]}
              >
                {item.text}
              </Text>
            ))}
          </View>
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Success;

const styles = StyleSheet.create({
  title: {
    fontSize: FONT_SIZE.font24,
    fontWeight: "bold",
    color: COLORS.textSecondary,
  },
  body: {
    fontSize: FONT_SIZE.font16,
    color: COLORS.textSecondary,
  },
  poin: {
    fontSize: FONT_SIZE.font24,
    color: "#72b14b",
    fontWeight: "bold",
  },
});
