import React from "react";
import {
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

const PinLocation = ({ navigation }) => {
  const [formik, tes] = React.useState({
    values: {
      latitude: -7.779807,
      longitude: 113.711873,
    }
  });
  
  const renderBackButton = () => {
    return (
      <TouchableOpacity
        style={styles.btnRounded}
        onPress={() => navigation.goBack()}
      >
        {/* <FontAwesome5 name="arrow-left" size={16} color={COLORS.white} /> */}
        <Text>Back</Text>
      </TouchableOpacity>
    );
  };

  React.useEffect(() => {
    console.log(formik);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* {renderBackButton()} */}
      <ScrollView>
        <View style={styles.containerMap}>
          <Maps
            region={{
              latitude: -7.779807,
              longitude: 113.711873,
            }}
            pinCenterMarker={true}
            initViewSatellite={true}
            // markers={[{latitude: formik.values.latitude, longitude: formik.values.longitude}]}
            onRegionChangeComplete={(region) => {
              console.log("change region===============================", region);
              // formik.setFieldValue("latitude", region.latitude);
              // formik.setFieldValue("longitude", region.longitude);
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
                  <View style={{ marginTop: 3 }}>
                    {/* <FontAwesome5
                      name="map-marker-alt"
                      size={20}
                      color={COLORS.red}
                    /> */}
                  </View>
                  <Space size={15} />
                  <View>
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
            {/* <Text>Info tambahan untuk staf Pak Jarot</Text> */}
            <Textarea
              label="Info tambahan untuk staf Pak Jarot"
              placeholder="Misal: di sebelah kios warna hijau"
            />
            {/* <Input
              multiline
              textAlignVertical="top"
              placeholder="Misal: di sebelah kios warna hijau"
              label={'Info tambahan untuk staf ' + CONFIG.name}
              errorMessage={formik.errors.patokan}
              value={formik.values.patokan}
              onChangeText={formik.handleChange('patokan')}
              inputContainerStyle={{ borderWidth: 1, marginTop: 16 }}
              inputStyle={{
                minHeight: 75,
                paddingHorizontal: 13,
                paddingVertical: 9,
              }}
            /> */}
            {/* <Text style={styles.info}>
              Tambahkan informasi lokasi sejelas mungkin, agar mitra semprot
              dapat menemukan lokasi dengan mudah.
            </Text> */}
            <Space size={50} />
          </Container>
        </View>
      </ScrollView>
      <View style={{ backgroundColor: COLORS.white, paddingVertical: 14 }}>
        <Container>
          <Button
            title="Selanjutnya"
            // loading={loading}
          // onPress={formik.handleSubmit}
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
