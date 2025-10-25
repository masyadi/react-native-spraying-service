import React from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Container, Row, Space, Text } from "../../components";
import assets from "../../assets";
import { COLORS, FONT_SIZE } from "../../constans";

const Home = ({ navigation }) => {
  const renderItem = (item, index) => {
    return (
      <Container key={index}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate("OrderScreen")}
        >
          <Row style={styles.item}>
            <View>
              <Image source={assets.icDroneSpraying} />
            </View>
            <Space size={29} />
            <View style={{ flex: 1 }}>
              <Text bold>Drone Spraying</Text>
              <Text size={FONT_SIZE.font10}>
                Pesan jasa semprot hanya unit drone saja. Cairan dari Anda.
              </Text>
            </View>
          </Row>
        </TouchableOpacity>
      </Container>
    );
  };

  return (
    <SafeAreaView>
      <StatusBar backgroundColor={COLORS.transparent} barStyle="dark-content" />
      <ScrollView>
        <Image source={assets.ilustrasi} style={styles.image} />
        <View style={styles.sectionItem}>{[1, 2].map(renderItem)}</View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 245,
  },
  sectionItem: {
    marginTop: -55,
  },
  item: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    paddingVertical: 19,
    paddingHorizontal: 30,
    minHeight: 100,
    borderWidth: 1,
    borderColor: "#F4F4F4",
    alignItems: "center",
    marginBottom: 14,
  },
});
