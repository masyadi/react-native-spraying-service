import React from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Button,
  Container,
  Maps,
  Row,
  Space,
  Text,
  Textarea,
} from "../../components";
import { COLORS, FONT_SIZE } from "../../constans";
import { useFormik } from "formik";
import { geocoding } from "../../services";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const PinLocation = ({ navigation, route: { params } }) => {
  const [loading, setLoading] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      patokan: params?.patokan,
      address: params?.address,
      village: params?.village,
      latitude: params?.latitude || -7.1632318, // Surabaya
      longitude: params?.longitude || 112.237264,
    },
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      if (params?.onSelected) {
        let address = values.address;
        let village = values.village;

        if (
          params?.latitude != values.latitude ||
          params?.longitude != values.longitude
        ) {
          const rest = await getAddressName(values.latitude, values.longitude);

          if (rest) {
            address = rest.display_name;
            village =
              rest.address?.village || rest.address?.town || rest.address?.city;
          }
        }
        if (address) {
          params.onSelected({ ...values, ...{ address, village } });
          navigation.goBack();
        }
      } else {
        navigation.goBack();
      }
    },
  });

  const getAddressName = async (latitude, longitude) => {
    try {
      setLoading(true);
      return await geocoding({ latitude, longitude });
    } catch (error) {
      console.log("Error:", error?.message || error);
      Alert.alert("Error", "Terjadi kesalahan saat format alamat");
    } finally {
      setLoading(false);
    }
  };

  const renderBackButton = () => {
    return (
      <TouchableOpacity
        style={styles.btnRounded}
        onPress={() => navigation.goBack()}
      >
        <FontAwesome5 name="arrow-left" size={16} color={COLORS.white} />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {renderBackButton()}
      <ScrollView>
        <View style={styles.containerMap}>
          <Maps
            region={{
              latitude: formik.values.latitude,
              longitude: formik.values.longitude,
            }}
            pinCenterMarker={true}
            initViewSatellite={true}
            // markers={[{latitude: formik.values.latitude, longitude: formik.values.longitude}]}
            onRegionChangeComplete={(region) => {
              console.log(
                "change region===============================",
                region
              );
              formik.setFieldValue("latitude", region.latitude);
              formik.setFieldValue("longitude", region.longitude);
            }}
          />
        </View>
        <View style={styles.containerForm}>
          <Container>
            <Space size={30} />
            {formik.values.address ? (
              <>
                {/* <Text style={styles.title}>Lokasi Lahan</Text> */}
                {/* <Space height={15} /> */}
                <Row alignStart>
                  <View style={{ marginTop: 3, marginRight: 15 }}>
                    <FontAwesome5
                      name="map-marker-alt"
                      size={20}
                      color={COLORS.red}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.title}>{formik.values.village}</Text>
                    <Space height={15} />
                    <Text style={styles.subtitle}>{formik.values.address}</Text>
                  </View>
                </Row>

                <Space size={35} />
              </>
            ) : (
              <></>
            )}
            <Textarea
              label="Info tambahan untuk staf Pak Jarot"
              placeholder="Misal: di sebelah kios warna hijau"
              errorMessage={formik.errors.patokan}
              value={formik.values.patokan}
              onChangeText={formik.handleChange("patokan")}
            />
            <Space size={50} />
          </Container>
        </View>
      </ScrollView>
      <View style={{ backgroundColor: COLORS.white, paddingVertical: 14 }}>
        <Container>
          <Button
            title="Selanjutnya"
            loading={loading}
            onPress={formik.handleSubmit}
          />
        </Container>
      </View>
    </SafeAreaView>
  );
};

export default PinLocation;

const styles = StyleSheet.create({
  containerMap: {
    flex: 1,
    height: 400,
  },
  containerForm: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 5,
    borderTopEndRadius: 5,
  },
  title: {
    fontSize: FONT_SIZE.font18,
    fontWeight: "bold",
  },
  subtitle: {
    flex: 1,
    fontSize: FONT_SIZE.font18,
  },
  info: {
    fontSize: FONT_SIZE.font12,
    color: COLORS.textGrey,
  },
  btnRounded: {
    position: "absolute",
    top: 24,
    zIndex: 1,
    left: 24,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: 35,
    height: 35,
    borderRadius: 35 / 2,
    alignItems: "center",
    justifyContent: "center",
  },
});
