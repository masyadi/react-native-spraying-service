import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { Container, Space, Text } from "../../components";
import { COLORS, FONT_SIZE } from "../../constans";

const Success = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <Container>
          <View style={{ alignItems: "center" }}>
            {/* <FontAwesome5 name="check-circle" size={47} color="#11B722" /> */}
            <Space size={39} />
            <Text style={[styles.title, { color: COLORS.black }]}>
              Pesanan Berhasil
            </Text>
            <Space size={28} />
            <Text style={styles.title}>Anda memperoleh:</Text>
            <Text style={styles.poin}>+100 poin</Text>
            <Space size={43} />
            <Text style={styles.body}>
              {`Terima kasih sudah memesan jasa semprot lahan pertanian menggunakan drone. \n\nStaf / Petugas Pak Jarot akan segera menghubungi pemesan untuk memproses pesanan ini. \n\nUntuk perubahan jadwal dan pembatalan, silakan menghubungi sales Alishan. \n\nPoin akan masuk ke saldo Anda setelah proses semprot selesai.`}
            </Text>
          </View>
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Success;

const styles = StyleSheet.create({
  title: {
    fontSize: FONT_SIZE.font24,
    fontWeight: "bold",
    color: COLORS.textSecondary,
  },
  body: {
    fontSize: FONT_SIZE.font16,
    color: COLORS.textSecondary,
  },
  poin: {
    fontSize: FONT_SIZE.font24,
    color: "#72b14b",
    fontWeight: "bold",
  },
});
