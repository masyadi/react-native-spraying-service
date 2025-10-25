import React from "react";
import { Alert, FlatList, SafeAreaView, View } from "react-native";
// import {
//   Container,
//   EmptyData,
//   Loading,
//   RadioSectionItem,
//   Space,
// } from "../../../components";
// import { getKomoditas } from '../../../services';
// import { Button, Input, Text } from 'react-native-elements';
import { COLORS } from "../../constans";
import {
  Button,
  Container,
  RadioSectionItem,
  Space,
  Text,
  Textarea,
} from "../../components";

const Komoditas = ({ navigation, route: { params } }) => {
  const [item, setItem] = React.useState([]);
  const [checked, setChecked] = React.useState();
  const [other, setOther] = React.useState();

  const getData = async () => {
    try {
      const { data } = await getKomoditas({ page: pagination.currentPage });

      pagination.addItems(data.data);

      if (data.total == data.to) {
        setItem([{ id: "other", name: "Lainnya" }]);
      }
    } catch (e) {
      pagination.onError(e);
    }
  };

  const handleSubmit = () => {
    const values = {
      komoditas:
        checked?.id == "other"
          ? { id: other, name: "Lainnya (" + other + ")" }
          : checked,
    };

    if (!checked?.id) {
      Alert.alert("Error", "Komoditas belum dipilih");
      return;
    }

    if (params?.pestisida) {
      navigation.navigate("PestisidaOption", { ...params, ...values });
      return;
    }
    // navigation.navigate("OrderSummary", { ...params, ...values });
    navigation.navigate("BuyerScreen", { ...params, ...values });
  };

  //   const pagination = usePagination({
  //     onReseted: () => {
  //       getData();
  //     },
  //     onLoadMored: () => {
  //       getData();
  //     },
  //   });

  //   const renderEmpty = () => {
  //     if (pagination.loading) {
  //       return <Loading />;
  //     }
  //     return <EmptyData onRefresh={pagination.onReset} absoluteCenter={false} />;
  //   };

  const renderItem = ({ item }) => {
    return (
      <Container>
        <RadioSectionItem
          active={item.id == checked?.id}
          onPress={() => {
            setChecked(item);
          }}
        >
          <View>
            <Text>{item.name}</Text>
            {item.id == "other" && checked?.id == "other" && (
              <>
                <Space size={15} />
                <Textarea
                  placeholder="Isi nama komoditas"
                  onChangeText={setOther}
                />
                {/* <Input
                  placeholder="Isi nama komoditas"
                  textAlignVertical="top"
                  value={other}
                  onChangeText={val => setOther(val)}
                  inputContainerStyle={{ borderWidth: 1, margin: 0 }}
                  inputStyle={{
                    minHeight: 75,
                    paddingHorizontal: 13,
                    paddingVertical: 9,
                    backgroundColor: COLORS.backgroundColor,
                  }}
                /> */}
              </>
            )}
          </View>
        </RadioSectionItem>
      </Container>
    );
  };

  //   React.useEffect(() => {
  //     getData();
  //   }, []);

  //   React.useEffect(() => {
  //     if (!checked?.id) {
  //       setChecked(pagination.items[0]);
  //     }
  //   }, [pagination.items]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={[
          { id: 1, name: "Padi" },
          { id: 2, name: "Tembakau" },
          { id: "other", name: "Lainnya" },
        ]}
        // data={pagination.items.concat(item)}
        keyExtractor={(_, index) => index.toString()}
        removeClippedSubviews={false}
        renderItem={renderItem}
      // ListEmptyComponent={renderEmpty}
      // contentContainerStyle={{
      //   flexGrow: 1,
      //   ...(!pagination.items.length ? { justifyContent: 'center' } : null),
      // }}
      // onEndReachedThreshold={0.1}
      // onEndReached={({ distanceFromEnd }) => {
      //   if (distanceFromEnd > 0 && pagination.hasMoreData) {
      //     pagination.onLoadMore();
      //   }
      // }}
      />
      <View style={{ backgroundColor: COLORS.white, paddingVertical: 14 }}>
        <Container>
          <Button title="Selanjutnya" onPress={handleSubmit} />
        </Container>
      </View>
    </SafeAreaView>
  );
};

export default Komoditas;
