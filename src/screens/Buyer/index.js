import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { Button, Container, Input, Space } from "../../components";
import { COLORS } from "../../constans";

const Buyer = ({ navigation }) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <Space size={20} />
        <Container>
          <Input label="Nama Pemesan" />
          <Input label="Nomor HP / Whatsapp" />
        </Container>
      </ScrollView>
      <View style={{ backgroundColor: COLORS.white, paddingVertical: 14 }}>
        <Container>
          <Button
            title="Selanjutnya"
            onPress={() => {
              navigation.navigate("SummaryScreen");
            }}
          />
        </Container>
      </View>
    </SafeAreaView>
  );
};

export default Buyer;

const styles = StyleSheet.create({});
