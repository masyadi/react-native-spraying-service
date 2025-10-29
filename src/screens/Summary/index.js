import React from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Button, Container, Space, Text } from "../../components";
import { COLORS, FONT_SIZE } from "../../constans";
import moment from "moment";
import { storeOrder } from "../../services";
import { numberFormat } from "../../helpers";
import { getConfig, triggerOrderSuccess } from "../../config";

const Summary = ({ navigation, route: { params } }) => {
  const [loading, setLoading] = React.useState(false);

  const { externalUser } = getConfig();

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const { data } = await storeOrder({
        luasLahan: numberFormat(params.luas_lahan, ""),
        komodtiasId: params.komoditas?.id,
        scheduleDate: moment(params.tanggal).format("YYYY-MM-DD"),
        alamat: params.destination_location?.address,
        latitude: params.destination_location?.latitude,
        longitude: params.destination_location?.longitude,
        patokanTerdekat: params.destination_location?.patokan_terdekat,
        serviceType: params?.service_type,
        timeArguably: params?.time?.value,
        externalUser: externalUser,
        buyer: params.buyer,
        pestisida: params?.pestisida?.map((item) => ({
          title: item.title,
          value: item.value,
        })),
      });

      if (data) {
        triggerOrderSuccess(data);

        navigation.popToTop();
        navigation.navigate("OrderSuccessScreen", data);
      }
    } catch (e) {
      if (e.message) {
        Alert.alert("Error", e.message);
      }

      if (e.errorField) {
        for (const first in e.errorField) {
          Alert.alert("Error", e.errorField[first]);
          break;
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <Space size={20} />
        <Container>
          <Text style={styles.title}>Pastikan data pesanan sudah sesuai.</Text>
          <Space size={25} />
          <SectionText title="Nama Pemesan" subtitle={params.buyer.name} />
          <SectionText
            title="Nomor HP / Whatsapp"
            subtitle={params.buyer.phone}
          />
          <SectionText
            title="Lokasi Lahan"
            subtitle={params.destination_location.address}
          />
          <SectionText
            title="Luas Lahan"
            subtitle={params.luas_lahan + " hektar"}
          />
          <SectionText
            title="Jadwal Semprot"
            subtitle={
              moment(params.tanggal).format("dddd, DD MMMM YYYY") +
              " - " +
              params.time?.title
            }
          />
          <SectionText title="Komoditas" subtitle={params.komoditas?.name} />
          <SectionText title="Tipe Layanan" subtitle={params.name}>
            {params?.pestisida && (
              <View style={{ marginLeft: 10, marginTop: 5 }}>
                {params.pestisida?.map((item, index) => (
                  <Text key={index}>
                    {"•"} {item.title}: {item.value}
                  </Text>
                ))}
              </View>
            )}
          </SectionText>
        </Container>
      </ScrollView>
      <View style={{ backgroundColor: COLORS.white, paddingVertical: 14 }}>
        <Container>
          <Button title="Kirim" loading={loading} onPress={handleSubmit} />
        </Container>
      </View>
    </SafeAreaView>
  );
};

/**
 *
 * @param {Object} param
 * @param {string} param.title
 * @param {string} param.subtitle
 * @returns
 */
const SectionText = ({ title, subtitle, children }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      {children}
    </View>
  );
};

export default Summary;

const styles = StyleSheet.create({
  section: {
    marginBottom: 22,
  },
  title: {
    fontSize: FONT_SIZE.font16,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: FONT_SIZE.font16,
  },
});
