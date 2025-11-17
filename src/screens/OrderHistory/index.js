import React from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Container, EmptyData, LoadingScreen, Text } from "../../components";
import { FONT_SIZE } from "../../constans";
import { usePagination } from "../../helpers";
import { getOrder } from "../../services";
import moment from "moment";

const OrderHistory = ({ navigation, route: { params } }) => {
  const getData = async () => {
    try {
      const {
        data: { data },
      } = await getOrder({ type: params.type, page: pagination.currentPage });

      pagination.addItems(data);
    } catch (e) {
      pagination.onError(e);
    }
  };

  const pagination = usePagination({
    onReseted: () => {
      getData();
    },
    onRefreshing: () => {
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
    return <EmptyData />;
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("OrderHistoryShow", item)}
      >
        <Container>
          <Text style={styles.title}>{item.name}</Text>
          {item.reldetail != null && (
            <>
              <Text>
                {moment(item.reldetail.schedule_date).format(
                  "dddd, DD MMMM YYYY"
                )}{" "}
                -{" "}
                <Text style={{ textTransform: "capitalize" }}>
                  {item.reldetail?.time_arguably}
                </Text>
              </Text>
              {item.reldetail.approved_at != null && (
                <Text>
                  Jam {moment(item.reldetail?.schedule_date).format("HH:mm")}
                </Text>
              )}
              <Text>{item.reldetail?.product?.name}</Text>
            </>
          )}
          <View style={styles.divider} />
        </Container>
      </TouchableOpacity>
    );
  };

  React.useEffect(() => {
    if (params?.type) {
      getData();
    }
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        keyExtractor={(_, index) => index.toString()}
        data={pagination.items}
        ListEmptyComponent={renderEmpty}
        renderItem={renderItem}
        refreshing={pagination.refreshing}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: pagination.items.length ? "flex-start" : "center",
        }}
        onRefresh={pagination.onRefresh}
        onEndReachedThreshold={0.1}
        onEndReached={({ distanceFromEnd }) => {
          if (distanceFromEnd > 0 && pagination.hasMoreData) {
            pagination.onLoadMore();
          }
        }}
      />
    </SafeAreaView>
  );
};

export default OrderHistory;

const styles = StyleSheet.create({
  title: {
    fontSize: FONT_SIZE.font16,
    fontWeight: "bold",
  },
  divider: {
    height: 1,
    backgroundColor: "#eeeeee",
    marginTop: 14,
    marginBottom: 19,
  },
});
