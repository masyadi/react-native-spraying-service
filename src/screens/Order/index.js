import React from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import {
  Button,
  Container,
  Input,
  InputDateTimePicker,
  RadioSection,
  Space,
} from "../../components";
import { COLORS } from "../../constans";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import moment from "moment";
import * as Yup from "yup";
import { useFormik } from "formik";

const Order = ({ navigation, route: { params } }) => {
  const initDate = moment().add(1, "days").add(2, "hour");
  const times = [
    { title: "Pagi", value: "pagi" },
    { title: "Siang", value: "siang" },
    { title: "Malam", value: "malam" },
  ];

  const validationSchema = Yup.object().shape({
    luas_lahan: Yup.string().required(),
    destination_location: Yup.object().shape({
      address: Yup.string().required(),
    }),
  });

  const formik = useFormik({
    initialValues: {
      destination_location: {
        address: "",
        village: "",
        latitude: "",
        longitude: "",
        patokan_terdekat: "",
      },
      luas_lahan: "",
      tanggal: initDate,
      time: "",
    },
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      navigation.navigate("KomoditasScreen", { ...params, ...values });
    },
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <Space size={20} />
        <Container>
          <Input
            label="Lokasi Lahan"
            placeholder="Pilih lewat peta"
            errorMessage={formik.errors.destination_location?.address}
            value={formik.values.destination_location?.address}
            selection={{ start: 0 }}
            numberOfLines={1}
            left={
              <FontAwesome5
                name="map-marker-alt"
                size={20}
                color={COLORS.textGrey}
              />
            }
            onPress={() => {
              navigation.navigate("PinLocationScreen", {
                patokan: formik.values.destination_location?.patokan_terdekat,
                address: formik.values.destination_location?.address,
                village: formik.values.destination_location?.village,
                latitude: formik.values.destination_location?.latitude,
                longitude: formik.values.destination_location?.longitude,
                onSelected: (data) => {
                  formik.setFieldValue(
                    "destination_location[address]",
                    data.address
                  );
                  formik.setFieldValue(
                    "destination_location[latitude]",
                    data.latitude
                  );
                  formik.setFieldValue(
                    "destination_location[longitude]",
                    data.longitude
                  );
                  formik.setFieldValue(
                    "destination_location[patokan_terdekat]",
                    data.patokan
                  );
                  formik.setFieldValue(
                    "destination_location[village]",
                    data.village
                  );
                },
              });
            }}
          />
          <Input
            label="Luasan Lahan (dalam hektar)"
            placeholder="Misal: 0,5"
            keyboardType="numeric"
            errorMessage={formik.errors.luas_lahan?.replace(/\.|\_|\-/g, " ")}
            value={formik.values.luas_lahan}
            onChangeText={(val) => formik.setFieldValue("luas_lahan", val)}
            help="Isi estimasi saja. Staf Pak jarot akan melakukan survei lokasi untuk pengukuran ulang yang lebih presisi."
          />
          <InputDateTimePicker
            label="Tanggal"
            mode="date"
            errorMessage={formik.errors.tanggal}
            value={formik.values.tanggal}
            left={
              <FontAwesome5
                name="calendar-alt"
                size={20}
                color={COLORS.textGrey}
              />
            }
            minimumDate={new Date(initDate)}
            format="dddd, DD MMMM YYYY"
            onConfirm={(val) => formik.setFieldValue("tanggal", val)}
          />

          <RadioSection
            label="Waktu"
            data={times}
            errorMessage={formik.errors.time}
            onChange={(val) => formik.setFieldValue("time", val)}
          />
        </Container>
      </ScrollView>
      <View style={{ backgroundColor: COLORS.white, paddingVertical: 14 }}>
        <Container>
          <Button title="Selanjutnya" onPress={formik.handleSubmit} />
        </Container>
      </View>
    </SafeAreaView>
  );
};

export default Order;
