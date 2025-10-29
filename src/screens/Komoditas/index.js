import React from "react";
import { Alert, FlatList, SafeAreaView, View } from "react-native";
import { COLORS } from "../../constans";
import {
  Button,
  Container,
  EmptyData,
  LoadingScreen,
  RadioSectionItem,
  Space,
  Text,
  Textarea,
} from "../../components";
import { usePagination } from "../../helpers";
import { getKomoditas } from "../../services";

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
      navigation.navigate("PestisidaScreen", { ...params, ...values });
      return;
    }
    navigation.navigate("BuyerScreen", { ...params, ...values });
  };

  const pagination = usePagination({
    onReseted: () => {
      getData();
    },
    onLoadMored: () => {
      getData();
    },
  });

  const renderEmpty = () => {
    if (pagination.loading) {
      return <LoadingScreen visible={true} />;
    }

    if (pagination.error?.message) {
      return (
        <EmptyData
          title={pagination.error.message}
          buttonText="Kembali"
          onPress={() => navigation.goBack()}
        />
      );
    }
    return <EmptyData onRefresh={pagination.onReset} />;
  };

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

  React.useEffect(() => {
    getData();
  }, []);

  React.useEffect(() => {
    if (!checked?.id) {
      setChecked(pagination.items[0]);
    }
  }, [pagination.items]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={pagination.items.concat(item)}
        keyExtractor={(_, index) => index.toString()}
        removeClippedSubviews={false}
        renderItem={renderItem}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={{
          flexGrow: 1,
          ...(!pagination.items.length ? { justifyContent: "center" } : null),
        }}
        onEndReachedThreshold={0.1}
        onEndReached={({ distanceFromEnd }) => {
          if (distanceFromEnd > 0 && pagination.hasMoreData) {
            pagination.onLoadMore();
          }
        }}
      />
      {pagination.items.length > 0 && (
        <View style={{ backgroundColor: COLORS.white, paddingVertical: 14 }}>
          <Container>
            <Button title="Selanjutnya" onPress={handleSubmit} />
          </Container>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Komoditas;
