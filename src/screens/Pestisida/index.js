import React from "react";
import { Alert, FlatList, SafeAreaView, StyleSheet, View } from "react-native";
import {
  Button,
  CheckBox,
  Column,
  Container,
  Row,
  Space,
  Text,
  Textarea,
} from "../../components";
import { COLORS, FONT_SIZE } from "../../constans";

const Pestisida = ({ navigation }) => {
  const [data, setData] = React.useState([
    { title: "Herbisida", value: null, checked: false },
    { title: "Fungsida", value: null, checked: false },
    { title: "Insektisida", value: null, checked: false },
    { title: "Pupuk", value: null, checked: false },
    { title: "Lainnya", value: null, checked: false },
  ]);

  const [errors, setErrors] = React.useState();

  const handleSubmit = () => {
    const values = data.filter((item) => item.checked);
    const _errors = Object.assign(
      ...values
        .filter((item) => !item.value)
        .map((item) => ({ [item.title]: item.title + " harus diisi" })),
      {}
    );

    if (!values.length) {
      Alert.alert('Error', 'Pestisida harus dipilih')
      return;
    }

    setErrors(_errors);

    if (Object.keys(_errors).length) {
      return;
    }

    navigation.navigate("OrderSummary", { ...params, pestisida: values });
  };

  const renderHeader = () => {
    return (
      <Container style={{ marginBottom: 28 }}>
        <Text>Bisa pilih lebih dari 1</Text>
      </Container>
    );
  };

  React.useEffect(() => {
    console.log("data", data);
  }, [data]);

  const renderItem = ({ item }) => {
    return (
      <Container>
        <Row>
          <View>
            <CheckBox
              checked={item.checked}
              onPress={() => {
                setData(
                  data.map((temp) =>
                    temp.title == item.title
                      ? { ...temp, checked: !item.checked }
                      : temp
                  )
                );
              }}
            />
          </View>
          <Space size={10} />
          <Column style={{ flex: 1 }}>
            <Space size={5} />
            <Text style={styles.title}>{item.title}</Text>
            <Space size={10} />
            {/* <View style={{height: 10}}></View> */}
            {item.checked && (
              <Textarea
                placeholder={
                  item.title?.toLowerCase() == "lainnya"
                    ? "Isi disini"
                    : `Isi nama ${item.title?.toLowerCase()} dan dosis`
                }
                errorMessage={errors?.[item.title] || null}
                onChangeText={(val) => {
                  setData(
                    data.map((temp) =>
                      temp.title == item.title ? { ...temp, value: val } : temp
                    )
                  );
                }}
              />
            )}
          </Column>
        </Row>
      </Container>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={data}
        keyExtractor={(_, index) => index.toString()}
        ListHeaderComponent={renderHeader}
        renderItem={renderItem}
        removeClippedSubviews={false}
      />
      <View style={{ backgroundColor: COLORS.white, paddingVertical: 14 }}>
        <Container>
          <Button title="Selanjutnya" onPress={handleSubmit} />
        </Container>
      </View>
    </SafeAreaView>
  );
};

export default Pestisida;

const styles = StyleSheet.create({
  title: {
    fontSize: FONT_SIZE.font16,
  },
  checkbox: {
    marginTop: 0,
    marginRight: 0,
    paddingTop: 0,
  },
});
