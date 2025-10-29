import React from "react";
import { Alert, Image, StyleSheet, TouchableOpacity } from "react-native";
import { View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { COLORS } from "../constans";
import { androidLocationPermissionRequest } from "../helpers";
import Geolocation from "react-native-geolocation-service";
import Text from "./Text";
import assets from "../assets";
import Space from "./Space";
import LoadingScreen from "./LoadingScreen";

/**
 *
 * @param {Object} param
 * @param {Object} param.region
 * @param {Number} param.region.latitude
 * @param {Number} param.region.latitudeDelta
 * @param {Number} param.region.longitude
 * @param {Number} param.region.longitudeDelta
 * @param {Function} param.onRegionChange
 * @param {Function} param.onRegionChangeComplete
 * @param {Boolean} param.pinCenterMarker
 * @param {Array.<{latitude: Number, longitude: Number, title: String}>} param.markers
 * @param {Boolean} param.initViewSatellite
 * @returns {JSX.Element}
 */
const Maps = ({
  region,
  onRegionChange,
  onRegionChangeComplete,
  markers,
  children,
  pinCenterMarker = false,
  initViewSatellite = false,
}) => {
  const [isStandard, setIsStandard] = React.useState(!initViewSatellite);
  const [latitudeDelta, setLatitudeDelta] = React.useState(0.00922);
  const [longitudeDelta, setLongitudeDelta] = React.useState(0.00421);
  const [currentLocation, setCurrentLocation] = React.useState(region);
  const [isLoading, setIsLoading] = React.useState(true);
  const [currentLocationActive, setCurrentLocationActive] =
    React.useState(false);

  const mapRef = React.useRef(null);

  const isFloat = (num) => {
    return typeof num === "number" && !Number.isInteger(num);
  };

  const onChangeMapType = () => {
    setIsStandard(!isStandard);
  };

  const mapToRegion = (latitude, longitude) => {
    mapRef.current?.animateToRegion(
      {
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: latitudeDelta,
        longitudeDelta: longitudeDelta,
      },
      350 // duration
    );
  };

  const getCurrentLocation = async () => {
    const granted = await androidLocationPermissionRequest();

    console.log("granted", granted);

    if (!granted) {
      Alert.alert("Error", "Izin lokasi diperlukan");
      return;
    }

    Geolocation.getCurrentPosition(
      (position) => {
        setIsLoading(false);
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ latitude, longitude });

        setTimeout(() => {
          mapToRegion(latitude, longitude);
          setCurrentLocationActive(true);
        }, 1000);
      },
      (error) => {
        setIsLoading(false);
        // See error code charts below.
        console.log("error: ", error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  // const watchCurrentLocation = async () => {
  //   const granted = await androidLocationPermissionRequest();

  //   if (!granted) {
  //     FlashMessage.error('Izin lokasi diperlukan');
  //     return;
  //   }

  //   Geolocation.watchPosition(
  //     position => {
  //       const { latitude, longitude } = position.coords;

  //       setCurrentLocation({ latitude, longitude });
  //     },
  //     e => {
  //       FlashMessage.error('Watch Location: ' + e.message);
  //     },
  //     {
  //       enableHighAccuracy: true,
  //       distanceFilter: 0,
  //       interval: 5000,
  //       fastestInterval: 2000,
  //     },
  //   );
  // };

  React.useEffect(() => {
    if (region?.latitudeDelta) {
      setLatitudeDelta(region.latitudeDelta);
    }

    if (region?.longitudeDelta) {
      setLongitudeDelta(region.longitudeDelta);
    }

    getCurrentLocation();
  }, []);

  // React.useEffect(() => {
  //   let _watchId = null;

  //   watchCurrentLocation().then(watchId => {
  //     _watchId = watchId;
  //   });

  //   return () => {
  //     if (_watchId) {
  //       Geolocation.clearWatch(_watchId);
  //     }
  //   };
  // }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1 }}>
        <LoadingScreen visible={isLoading} title="Mohon tunggu sebentar." />
      </View>
    );
  }

  if (
    !currentLocation?.latitude ||
    !isFloat(currentLocation?.latitude) ||
    !currentLocation?.longitude ||
    !isFloat(currentLocation?.longitude)
  ) {
    return (
      <View style={styles.containerCenter}>
        <Text>Wilayah tidak valid.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        provider={PROVIDER_GOOGLE}
        mapType={isStandard ? "standard" : "satellite"}
        showsUserLocation={true}
        showsMyLocationButton={false}
        followsUserLocation={true}
        showsCompass={true}
        // mapPadding={{
        //   top: 60,
        // }}
        onRegionChange={onRegionChange}
        // onRegionChangeComplete={onRegionChangeComplete}
        onRegionChangeComplete={(position, detail) => {
          setLatitudeDelta(position.latitudeDelta);
          setLongitudeDelta(position.longitudeDelta);
          onRegionChangeComplete && onRegionChangeComplete(position, detail);
        }}
        // pointerEvents='none'
        // region={{
        //   latitude: latitude,
        //   longitude: longitude,
        //   latitudeDelta: latitudeDelta,
        //   longitudeDelta: longitudeDelta,
        // }}
        initialRegion={{
          latitudeDelta: latitudeDelta,
          longitudeDelta: longitudeDelta,
          ...currentLocation,
        }}
      >
        {markers && markers.length
          ? markers.map((item, index) => (
            <Marker
              key={index}
              title={item?.title}
              coordinate={{
                latitude: item.latitude,
                longitude: item.longitude,
              }}
            />
          ))
          : null}
      </MapView>
      {children}
      {pinCenterMarker ? (
        <View style={styles.markerFixed}>
          <Image source={assets.icMarker} style={styles.marker} />
        </View>
      ) : null}
      <View style={{ position: "absolute", bottom: 10, right: 10 }}>
        <>
          <TouchableOpacity onPress={getCurrentLocation}>
            <View style={styles.btnCurrentLocation}>
              <Image
                source={
                  currentLocationActive
                    ? assets.icLocationCrosshairsActive
                    : assets.icLocationCrosshairs
                }
                style={styles.currentLocation}
              />
            </View>
          </TouchableOpacity>
          <Space size={10} />
        </>
        <TouchableOpacity onPress={onChangeMapType}>
          <View style={styles.btnViewMap}>
            <Text style={{ color: COLORS.white, fontSize: 14 }}>
              {!isStandard ? "Peta" : "Satelit"}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Maps;

const styles = StyleSheet.create({
  containerCenter: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  markerFixed: {
    left: "50%",
    marginLeft: -24,
    marginTop: -48,
    position: "absolute",
    top: "50%",
  },
  marker: {
    height: 48,
    width: 48,
  },
  currentLocation: {
    height: 25,
    width: 25,
  },
  btnViewMap: {
    backgroundColor: "#00000080",
    borderRadius: 4,
    paddingHorizontal: 13,
    paddingVertical: 8,
  },
  btnCurrentLocation: {
    backgroundColor: COLORS.white,
    borderRadius: 4,
    padding: 8,
    alignSelf: "flex-end",
  },
});
