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

const Order = ({ navigation }) => {
  const initDate = moment().add(1, "days").add(2, "hour");
  const times = [
    { title: "Pagi", value: "pagi" },
    { title: "Sore", value: "sore" },
    { title: "Malam", value: "malam" },
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <Space size={20} />
        <Container>
          <Input
            label="Lokasi Lahan"
            placeholder="Pilih lewat peta"
            left={
              <FontAwesome5
                name="map-marker-alt"
                size={20}
                color={COLORS.textGrey}
              />
            }
            onPress={() => alert("ok")}
          />
          <Input
            label="Luasan Lahan (dalam hektar)"
            placeholder="Misal: 0,5"
            help="Isi estimasi saja. Staf Pak jarot akan melakukan survei lokasi untuk pengukuran ulang yang lebih presisi."
          />
          <InputDateTimePicker
            label="Tanggal"
            mode="date"
            // errorMessage={formik.errors.tanggal}
            // value={formik.values.tanggal}
            value={initDate}
            left={
              <FontAwesome5
                name="calendar-alt"
                size={20}
                color={COLORS.textGrey}
              />
            }
            minimumDate={new Date(initDate)}
            format="dddd, DD MMMM YYYY"
          // onConfirm={(val) => formik.setFieldValue("tanggal", val)}
          />

          <RadioSection
            label="Waktu"
            data={times}
            onChange={(val) => console.log(val)}
          />
        </Container>
      </ScrollView>
      <View style={{ backgroundColor: COLORS.white, paddingVertical: 14 }}>
        <Container>
          <Button
            title="Selanjutnya"
            onPress={() => {
              navigation.navigate("PestisidaScreen");
            }}
          />
        </Container>
      </View>
    </SafeAreaView>
  );
};

export default Order;
