import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import {
  Container,
  EmptyData,
  LoadingScreen,
  Space,
  Text,
} from "../../components";
import { detailOrder } from "../../services";
import { FONT_SIZE } from "../../constans";
import { numberFormat } from "../../helpers";
import moment from "moment";

const Show = ({ navigation, route: { params } }) => {
  const [item, setItem] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const getData = async () => {
    try {
      setLoading(true);
      const { data } = await detailOrder(params.id);

      if (data) {
        setItem(data);
      }
    } finally {
      setLoading(false);
    }
  };

  // React.useLayoutEffect(() => {
  //   navigation.setOptions({
  //     title: item?.name || 'Detail Pesanan',
  //   });
  // }, [item]);

  React.useEffect(() => {
    if (params?.id) {
      getData();
    }
  }, [params.id]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: item?.reldetail ? "flex-start" : "center",
        }}
      >
        {loading ? (
          <LoadingScreen visible={true} />
        ) : !item || !item.reldetail ? (
          <EmptyData onRefresh={getData} />
        ) : (
          <>
            <Container>
              <Text style={styles.name}>{item?.name}</Text>
            </Container>

            <Section title="Booking ID:">{item.invoice}</Section>

            <Container>
              <View style={styles.divider} />
            </Container>

            <Section title="Status Pesanan:">
              {item.reldetail?.order_status_formatted}
            </Section>

            <Section title="Lokasi lahan:">
              {item.reldetail?.reldestinationlocation.address}
            </Section>

            <Section title="Jadwal Semprot:">
              <Text style={styles.text}>
                {moment(item.reldetail.schedule_date).format(
                  "dddd, DD MMMM YYYY"
                )}
              </Text>
              <Text style={[styles.text, { textTransform: "capitalize" }]}>
                {item.reldetail?.time_arguably}
              </Text>
              {item.reldetail?.approved_at && (
                <Text style={styles.text}>
                  Jam {moment(item.reldetail.schedule_date).format("HH:mm")}
                </Text>
              )}
            </Section>

            <Section title="Luas Lahan:">
              <Text>{numberFormat(item.reldetail.luas_lahan)} meter2</Text>
            </Section>

            <Section title="Komoditas:">
              {item.reldetail.relkomoditas?.name ?? item.reldetail.komoditas_id}
            </Section>

            <Section title="Tipe Layanan:">
              <Text style={styles.text}>{item.reldetail.product?.name}</Text>
              <Space size={5} />
              {item.reldetail.attribute_formatted?.pestisida?.map(
                (item, index) => (
                  <Text key={index.toString()}>
                    - {item.title}: {item.value}
                  </Text>
                )
              )}
            </Section>
          </>
        )}
        <Space size={50} />
      </ScrollView>
    </SafeAreaView>
  );
};

/**
 *
 * @param {Object} param
 * @param {String} param.title
 * @param {String | } param.children
 * @returns
 */
const Section = ({ title, children }) => {
  return (
    <Container style={styles.containerSection}>
      <Text style={styles.title}>{title}</Text>
      {typeof children === "string" ? (
        <Text style={styles.text}>{children}</Text>
      ) : (
        children
      )}
    </Container>
  );
};

export default Show;

const styles = StyleSheet.create({
  containerSection: {
    marginBottom: 23,
  },
  rightPrice: {
    flex: 1,
    textAlign: "right",
  },
  title: {
    fontWeight: "bold",
    fontSize: FONT_SIZE.font16,
  },
  text: {
    fontSize: FONT_SIZE.font16,
  },
  divider: {
    height: 1,
    backgroundColor: "#eeeeee",
    marginBottom: 26,
  },
  name: {
    fontSize: FONT_SIZE.font24,
    fontWeight: "bold",
    marginBottom: 30,
  },
});
