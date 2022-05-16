import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ImageBackground,
  RefreshControl,
  View,
  TextInput,
  Image
} from 'react-native';
import { Container, Content, Text } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import Categories from './Categories';
import FeaturedDeals from './FeaturedDeals';
import Promotions from './Promotions';
import BestValue from './BestValue';

import { ACTION_TYPES } from 'Store/type';
import Favorites from './Favorites';
import Gulps from './Gulps';

import { Routes } from 'Navigators/routes';
import {
  getBestValueDeals,
  getFavoriteDeals,
  getNearByDeals,
  getNewDeals,
  getFeaturedDeals,
  getCategories
} from 'Store/home/actions';
import { Images, Colors } from 'Theme';
import styles from './styles';
import { getCurrentPosition } from 'Services/geolocation';
import useLocationHook from '../../hooks/useLocation';

const Home = () => {
  const { getAddress } = useLocationHook();
  const [currentLocation, setCurrentLocation] = useState('');
  const {
    near_by_deals,
    new_deals,
    featured_deals,
    best_value_deals,
    favorite_deals
  } = useSelector(state => state.app.home);
  const navigation = useNavigation();
  const [refreshing, setRefresh] = useState(false);
  const dispatch = useDispatch();
  const [position, setPosition] = useState({
    latitude: null,
    longitude: null
  });
  const getNearByData = async () => {
    if (position.latitude !== null) {
      await dispatch(await getNearByDeals(position));
      return;
    }
    await getCurrentPosition({
      callback: v => {
        getAddress(v).then(({ address_components }) => {
          let temp = address_components.filter(item => {
            return (
              item.types.includes('locality') ||
              item.types.includes('administrative_area_level_1')
            );
          });
          setCurrentLocation(temp[0].long_name + ', ' + temp[1].long_name);
        });
        setPosition(v);
        dispatch(getNearByDeals(v));
      },
      failureCallback: e => console.log(e)
    });
  };
  const loadData = async () => {
    dispatch({
      type: ACTION_TYPES.HOME_LOADING,
      payload: true
    });
    return new Promise.all([
      await dispatch(await getCategories()),
      await dispatch(await getBestValueDeals()),
      await dispatch(await getFavoriteDeals()),
      await dispatch(await getFeaturedDeals()),
      await dispatch(await getNewDeals()),
      await getNearByData()
    ]).finally(() =>
      dispatch({
        type: ACTION_TYPES.HOME_LOADING,
        payload: false
      })
    );
  };
  const onRefresh = async () => {
    setRefresh(true);
    loadData().finally(() => setRefresh(false));
  };
  useEffect(() => {
    loadData();
  }, []);

  const onCategorySelect = category => {
    navigation.navigate(Routes.DealsList, { category });
  };
  return (
    <Container style={styles.background}>
      <Content
        style={styles.contentView}
        refreshing={refreshing}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Colors.orange}
            enabled={true}
            size={20}
            progressViewOffset={20}
            colors={[Colors.orange]}
            progressBackgroundColor={Colors.white}
          />
        }>
        <>
          <View style={styles.paddingHorizontal}>
            <View style={styles.logoView}>
              <Image source={Images.logo} style={styles.logoImg} />
            </View>
            <View style={styles.logoView}>
              <Image
                style={styles.locationIcon}
                source={Images.mapPinIcon}
                resizeMode="contain"
              />
              <Text style={styles.locationText}>{currentLocation}</Text>
            </View>
            <View style={styles.searchView}>
              <AntDesign name={'search1'} style={styles.searchIcon} />
              <TextInput style={styles.inputField} returnKeyType="go" />
            </View>
          </View>
          <Categories onPress={onCategorySelect} />
        </>
        <FeaturedDeals data={featured_deals} position={position} />
        <ImageBackground
          source={Images.advertisement}
          resizeMode="cover"
          style={styles.advertisement}>
          <Text style={styles.advertisementText}>Advertisement</Text>
        </ImageBackground>
        <Promotions data={near_by_deals} position={position} />
        <BestValue data={best_value_deals} position={position} />
        <ImageBackground
          source={Images.advertisement1}
          resizeMode="cover"
          style={styles.advertisement}>
          <Text style={styles.advertisementText}>Advertisement</Text>
        </ImageBackground>
        <Favorites data={favorite_deals} position={position} />
        <Gulps data={new_deals} position={position} />
        {/* <ImageBackground
          source={Images.advertisement2}
          resizeMode="cover"
          style={styles.advertisement}>
          <Text style={styles.advertisementText}>Advertisement</Text>
        </ImageBackground> */}
      </Content>
    </Container>
  );
};

export default Home;
