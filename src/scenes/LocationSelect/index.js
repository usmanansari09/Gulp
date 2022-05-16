import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Image,
  SafeAreaView,
  Platform,
  Keyboard
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { getCenter } from 'geolib';
import { getCurrentPosition } from 'Services/geolocation';
import { GOOGLE_API_KEY } from '@env';
import SearchBarWithAutocomplete from 'Components/LocationSearchBar';
import { AppText } from 'Components/AppText';
import axios from 'axios';
import { useDebounce } from 'Hooks/useDebounce';
import { Button } from 'native-base';
import { Colors } from 'Theme';
import CustomBackButton from '../../components/CustomBackButton';

const GOOGLE_PACES_API_BASE_URL = 'https://maps.googleapis.com/maps/api/place';

export default ({ onDone, onDismiss, address, location }) => {
  const mapRef = useRef();
  const [initialRegion, setInitialRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  });
  const [position, setPosition] = useState(location);
  const [userPosition, setUserPosition] = useState({
    latitude: null,
    longitude: null
  });
  const [search, setSearch] = useState({
    term: address ?? '',
    fetchPredictions: false
  });
  const [showPredictions, setShowPredictions] = useState(false);
  const [predictions, setPredictions] = useState([]);
  const onChangeText = async () => {
    if (search.term.trim() === '') {
      return;
    }
    if (!search.fetchPredictions) {
      return;
    }

    const apiUrl = `${GOOGLE_PACES_API_BASE_URL}/autocomplete/json?key=${GOOGLE_API_KEY}&input=${search.term}`;
    try {
      const result = await axios.request({
        method: 'post',
        url: apiUrl
      });
      if (result) {
        const { data } = result;
        setPredictions(data.predictions);
        predictions.length && setShowPredictions(true);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useDebounce(onChangeText, 1000, [search.term]);
  const onPredictionTapped = async (placeId, description) => {
    const apiUrl = `${GOOGLE_PACES_API_BASE_URL}/details/json?key=${GOOGLE_API_KEY}&place_id=${placeId}`;
    try {
      const result = await axios.request({
        method: 'post',
        url: apiUrl
      });
      if (result) {
        const {
          data: {
            result: {
              geometry: { location }
            }
          }
        } = result;
        const { lat, lng } = location ?? {};
        setPosition({ latitude: lat, longitude: lng });
        setShowPredictions(false);
        setSearch({ term: description, fetchPredictions: false });
        const center = getCenter([{ latitude: lat, longitude: lng }]);
        setInitialRegion({
          ...(center ? center : userPosition),
          latitudeDelta: 0.01,
          longitudeDelta: 0.01
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
  const onMapPress = async coordinates => {
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?key=${GOOGLE_API_KEY}&address=${coordinates.latitude},${coordinates.longitude}`;
    try {
      const result = await axios.request({
        method: 'post',
        url: apiUrl
      });
      if (result) {
        const {
          data: { results }
        } = result;
        if (results.length) {
          const {
            geometry: { location },
            formatted_address
          } = results[0];
          const { lat, lng } = location;
          setPosition({ latitude: lat, longitude: lng });
          setShowPredictions(false);
          setSearch({ term: formatted_address, fetchPredictions: false });
          const center = getCenter([{ latitude: lat, longitude: lng }]);
          setInitialRegion({
            ...(center ? center : { latitude: 37.78825, longitude: -122.4324 }),
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
          });
          return {
            formatted_address,
            location: { latitude: lat, longitude: lng }
          };
        }
        return {};
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getCurrentPosition({
      callback: v => {
        setUserPosition(v);
        const center = getCenter([
          { latitude: v.latitude, longitude: v.longitude }
        ]);
        setInitialRegion({
          ...(center ? center : { latitude: 37.78825, longitude: -122.4324 }),
          latitudeDelta: 0.01,
          longitudeDelta: 0.01
        });
      },
      failureCallback: e => console.log(e)
    });
  }, []);
  const useCurrentLocation = () => {
    getCurrentPosition({
      callback: v => {
        onMapPress(v).then(({ formatted_address, location }) => {
          onDone({ position: location, address: formatted_address });
        });
      },
      failureCallback: e => console.log(e)
    });
  };

  const handleCenter = () => {
    const { latitude, longitude, latitudeDelta, longitudeDelta } =
      initialRegion;
    mapRef.current.animateToRegion({
      latitude,
      longitude,
      latitudeDelta,
      longitudeDelta
    });
  };

  useEffect(() => {
    handleCenter();
  }, [initialRegion]);
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={{ flex: 1, backgroundColor: 'silver' }}>
        <MapView
          ref={ref => (mapRef.current = ref)}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={initialRegion}
          showsUserLocation
          onPress={e => {
            if (e.nativeEvent.action !== 'marker-press') {
              onMapPress(e.nativeEvent.coordinate);
            } else {
              Keyboard.dismiss();

              // pressed the map
            }
          }}
          // onRegionChange={this.onRegionChange}
        >
          {search.term.length > 0 && (
            <Marker
              coordinate={{
                latitude: position.latitude,
                longitude: position.longitude
              }}
              title={'Current location'}
              description={'description'}
              // pinColor={redColor}
            >
              <Callout onPress={e => console.log(e)}>
                <View style={styles.calloutInner}>
                  <View style={styles.calloutText}>
                    <AppText style={styles.bottomText}>{search.term}</AppText>
                  </View>
                </View>
              </Callout>
            </Marker>
          )}
        </MapView>
        <View style={styles.searchBar}>
          <CustomBackButton onPress={onDismiss} style={styles.backButton} />
          <SearchBarWithAutocomplete
            value={search.term}
            onChangeText={text => {
              setSearch({ term: text, fetchPredictions: text.length > 0 });
              text.length < 1 &&
                setPosition({ latitude: null, longitude: null });
            }}
            showPredictions={showPredictions}
            predictions={predictions}
            onPredictionTapped={onPredictionTapped}
          />
        </View>
        {search.term.length && position.latitude !== null ? (
          <Button
            full
            rounded
            style={styles.button}
            onPress={() => onDone({ position, address: search.term })}>
            <AppText style={styles.buttonText}>Use selected location</AppText>
          </Button>
        ) : null}
        <Button
          full
          rounded
          style={styles.buttonCurrentLocation}
          onPress={useCurrentLocation}>
          <AppText style={styles.buttonText}>Use my location</AppText>
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject
  },
  mainViewStyle: {
    flex: 1,
    backgroundColor: 'silver',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  aboutMetextinputStyle: {
    fontSize: 16,
    flex: 1,
    marginLeft: 10,
    color: '#9B9B9B',
    fontFamily: 'SFDLight',
    marginRight: 40,
    textAlign: 'center'
  },
  fixBackground: {
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    height: 100,
    zIndex: -1000
  },
  safeArea: {
    flex: 1
  },
  button: {
    alignSelf: 'flex-end',
    paddingHorizontal: 10,
    backgroundColor: Colors.orange,
    position: 'absolute',
    bottom: 50,
    right: 20
  },
  buttonCurrentLocation: {
    alignSelf: 'flex-end',
    paddingHorizontal: 10,
    backgroundColor: Colors.orange,
    position: 'absolute',
    bottom: 50,
    left: 20
  },
  buttonText: {
    color: Colors.white
  },
  topText: {
    fontSize: 20,
    alignSelf: 'center'
  },

  calloutInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  calloutIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    height: 40,
    width: 40,
    padding: 10,
    marginVertical: 13
  },
  calloutText: {
    flexShrink: 1,
    paddingRight: 5,
    maxWidth: 300
  },
  searchBar: { flexDirection: 'row' },
  bottomText: {
    alignSelf: 'center',
    textAlign: 'center'
  },
  backButton: {
    paddingLeft: 20,
    marginTop: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  }
});
