# 🌾 @pakjarot/spraying-services

![npm version](https://img.shields.io/npm/v/@pakjarot/spraying-services.svg)
![npm downloads](https://img.shields.io/npm/dw/@pakjarot/spraying-services.svg)
![license](https://img.shields.io/npm/l/@pakjarot/spraying-services.svg)
![platform](https://img.shields.io/badge/platform-react--native-blue)

Library React Native untuk layanan penyemprotan pertanian, mencakup proses pemesanan, pemilihan lokasi, komoditas, dan review pesanan.
Didesain agar mudah diintegrasikan ke dalam aplikasi utama menggunakan React Navigation.

---

## Instalasi

Pastikan Anda sudah memiliki proyek **React Native** dengan **React Navigation v6+**.

```bash
npm install https://github.com/masyadi/react-native-spraying-service.git
```

## Instal Peer Dependencies

Library ini membutuhkan beberapa package tambahan. Jalankan perintah berikut untuk menginstalnya:

```bash
npm install \
  @react-native-community/datetimepicker \
  @react-navigation/native \
  @react-navigation/native-stack \
  axios \
  formik \
  moment \
  react-native-geolocation-service \
  react-native-maps \
  react-native-modal-datetime-picker \
  react-native-safe-area-context \
  react-native-screens \
  react-native-vector-icons \
  yup
```

## Setup Awal

Pastikan project Anda sudah dikonfigurasi dengan React Navigation dan Google Maps API
Tambahkan konfigurasi dasar berikut di App.js atau file utama navigasi Anda:

```js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SprayingServiceNavigator, setConfig } from "@pakjarot/spraying-services";

const Stack = createNativeStackNavigator();

export default function App() {
  React.useEffect(() => {
    setConfig({
      baseUrl: "https://example.com/api",
      appToken: "YOUR_APP_TOKEN",
      coin: 100,
      externalUser: {
        id: 1,
        name: "Jhon",
      },
      onOrderSuccess: (response) => console.log("Order success", response),
      onError: e => console.log("Error", e?.message | e),
      onTokenExpired: () => console.log("Access token expired"),
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={YourHomeScreen}
        />
        <Stack.Screen
          name="SprayingService"
          component={SprayingServiceNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

## Penggunaan

- Gunakan `navigation.navigate()` untuk membuka layanan penyemprotan dari aplikasi utama Anda.

Contoh:

```js
<Button
  title="Jasa Semprot"
  onPress={() => navigation.navigate("SprayingService")}
/>
```

## API Reference

Konfigurasi global untuk library.

`setConfig(options)`

| Parameter        | Tipe                 | Deskripsi                                |
| ---------------- | -------------------- | ---------------------------------------- |
| `baseUrl`        | `string`             | URL backend API                          |
| `appToken`       | `string`             | Token backend API                        |
| `coin`           | `number`             | Coin akan ditampilkan dihalaman sukses   |
| `externalUser`   | `object`             | Data user aplikasi                       |
| `onOrderSuccess` | `(response) => void` | Callback saat sukses melakukan traksaksi |
| `onError`        | `(error) => void`    | Callback saat error                      |
| `onTokenExpired` | `() => void`         | Callback jika token expired              |


## Penanganan Error

- Error Google Play Services
Jika muncul error berikut saat build atau runtime:

```kotlin
java.lang.IncompatibleClassChangeError: Found interface com.google.android.gms.location.FusedLocationProvider
```

Solusinya:

1. Buka file `android/build.gradle`
2. Tambahkan kode berikut di bagian bawah:

```gradle
subprojects {
    project.configurations.all {
        resolutionStrategy {
            force 'com.google.android.gms:play-services-location:21.0.1'
        }
    }
}
```

Ini akan memaksa semua subproject untuk menggunakan versi play-services-location 21.0.1

## License

MIT
