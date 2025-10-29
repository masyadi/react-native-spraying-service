import React from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { Button, Container, Input, Space } from "../../components";
import { COLORS } from "../../constans";
import { useFormik } from "formik";
import * as Yup from "yup";

const Buyer = ({ navigation, route: { params } }) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required(),
    phone: Yup.string().required(),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
    },
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      navigation.navigate("SummaryScreen", { ...params, buyer: values });
    },
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <Space size={20} />
        <Container>
          <Input
            label="Nama Pemesan"
            value={formik.values.name}
            errorMessage={formik.errors.name}
            onChangeText={(val) => formik.setFieldValue("name", val)}
          />
          <Input
            label="Nomor HP / Whatsapp"
            value={formik.values.phone}
            errorMessage={formik.errors.phone}
            keyboardType="number-pad"
            onChangeText={(val) => formik.setFieldValue("phone", val)}
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

export default Buyer;
