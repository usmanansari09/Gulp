import React, { useMemo, useEffect, useState, useRef } from 'react';
import { View } from 'react-native';
import { getCenter } from 'geolib';
import { groupBy } from 'lodash';
import RNMapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';

import { styles } from './styles';

import { AppText } from 'Components/AppText';
import { Colors } from 'Theme';
import { Icon } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentPosition } from 'Services/geolocation';
import { useNavigation } from '@react-navigation/native';
import { Routes } from 'Navigators/routes';
import { getNearByDeals } from 'Store/home/actions';

const FAKE_LOCATION = {
  geometry: '30.6707702,76.8596769',
  id: -1,
  properties: {
    address: '0',
    type: 'Feature'
  }
};

const MapView = () => {
  const { near_by_deals } = useSelector(state => state.app.home);

  const locations = groupBy(near_by_deals.results, 'restaurant.id');
  const dispatch = useDispatch();

  const mapRef = useRef();
  const [initialRegion, setInitialRegion] = useState({
    latitude: 37.785834,
    longitude: -122.406417,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01
  });

  useEffect(() => {
    getCurrentPosition({
      callback: v => {
        setInitialRegion({
          ...getCenter([{ latitude: v.latitude, longitude: v.longitude }]),
          latitudeDelta: 0.01,
          longitudeDelta: 0.01
        });
      },
      failureCallback: e => console.log(e)
    });
  }, []);

  function getMapMakerCoordinates(vendor) {
    return {
      latitude: parseFloat(vendor.geometry.split(',')[0]),
      longitude: parseFloat(vendor.geometry.split(',')[1]),
      latitudeDelta: 0.01,
      longitudeDelta: 0.01
    };
  }
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

  function getMapMakerAddress(vendor) {
    return `${vendor.properties.address} ${vendor.properties.city}, ${vendor.properties.state}`;
  }

  const navigation = useNavigation();

  const navigateToRestaurant = vendor => {
    navigation.navigate(Routes.Vendor, { vendor });
  };

  useEffect(() => {
    handleCenter();
  }, [initialRegion]);
  const keys = Object.keys(locations);
  let latlng = [];
  keys.map(key => {
    const newArray = locations[key];
    newArray.map(dataItems => {
      if (dataItems?.restaurant?.location?.geometry === '') {
        return null;
      }
      if (dataItems?.restaurant?.location === null) {
        return null;
      }
      latlng[dataItems?.restaurant?.id] = dataItems;
    });
  });
  return (
    <View style={styles.container}>
      <RNMapView
        ref={ref => (mapRef.current = ref)}
        style={[styles.container]}
        initialRegion={initialRegion}
        pitchEnabled={true}
        showsMyLocationButton={true}
        showsUserLocation={true}
        provider={PROVIDER_GOOGLE}>
        {latlng.map((mark, index) => {
          return (
            <Marker
              key={index}
              coordinate={{
                latitude: parseFloat(
                  mark.restaurant.location?.geometry.split(',')[0]
                ),
                longitude: parseFloat(
                  mark.restaurant.location?.geometry.split(',')[1]
                )
              }}>
              <Callout
                onPress={() => {
                  navigateToRestaurant(mark);
                }}>
                <View style={styles.calloutText}>
                  <AppText style={styles.topText} ellipsizeMode="tail">
                    {'Restaurant Name'}
                  </AppText>
                  <AppText style={styles.descriptionText} ellipsizeMode="tail">
                    {mark.restaurant.name}
                  </AppText>
                </View>
              </Callout>
            </Marker>
          );
        })}
      </RNMapView>
    </View>
  );
};

export default MapView;
