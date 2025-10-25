import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { Button, Container, Space, Text } from "../../components";
import { COLORS, FONT_SIZE } from "../../constans";

const Summary = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <Space size={20} />
        <Container>
          <Text style={styles.title}>Pastikan data pesanan sudah sesuai.</Text>
          <Space size={25} />
          <SectionText title="Nama Pemesan" subtitle="Yadi" />
          <SectionText title="Nomor HP / Whatsapp" subtitle="08923782733" />
          <SectionText title="Lokasi Lahan" subtitle="Kp Randuh Rt 03 / Rw 01, kec. Besuki, Kab Situbondo, jawa timur" />
          <SectionText title="Luas Lahan" subtitle="1 hektar" />
          <SectionText
            title="Jadwal Semprot"
            subtitle="Selasa, 18 Agustus 20225 - Pagi"
          />
          <SectionText title="Komoditas" subtitle="Lainnya (Sawit)" />
          <SectionText title="Tipe Layanan" subtitle="Drone Spraying" />
        </Container>
      </ScrollView>
      <View style={{ backgroundColor: COLORS.white, paddingVertical: 14 }}>
        <Container>
          <Button
            title="Selanjutnya"
            onPress={() => {
              navigation.navigate("OrderSuccessScreen");
            }}
          />
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
const SectionText = ({ title, subtitle }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
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
