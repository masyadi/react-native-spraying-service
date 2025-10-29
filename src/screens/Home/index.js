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
import {
  Container,
  EmptyData,
  LoadingScreen,
  Row,
  Space,
  Text,
} from "../../components";
import assets from "../../assets";
import { COLORS, FONT_SIZE } from "../../constans";
import { getProduct } from "../../services";

const Home = ({ navigation }) => {
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const getData = async () => {
    try {
      setLoading(true);
      const { data } = await getProduct();

      console.log(data);
      setItems(data);
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = (item, index) => {
    return (
      <Container key={index}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate("OrderScreen", item)}
        >
          <Row style={styles.item}>
            <View>
              <Image source={{ uri: item.image }} style={styles.icon} />
            </View>
            <Space size={29} />
            <View style={{ flex: 1 }}>
              <Text bold>{item.name}</Text>
              <Text size={FONT_SIZE.font10}>{item.description}</Text>
            </View>
          </Row>
        </TouchableOpacity>
      </Container>
    );
  };

  React.useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return <LoadingScreen visible={true} />;
  }

  if (error) {
    return <EmptyData title={error} onRefresh={() => getData()} />;
  }

  return (
    <SafeAreaView>
      <StatusBar backgroundColor={COLORS.transparent} barStyle="dark-content" />
      <ScrollView>
        <Image source={assets.ilustrasi} style={styles.image} />
        <View style={styles.sectionItem}>{items?.map(renderItem)}</View>
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
  icon: {
    width: 65,
    height: 65,
    resizeMode: "contain",
  },
});
