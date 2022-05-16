import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Image, TextInput, TouchableOpacity } from 'react-native';
import { Container, Content, Text, View, Icon } from 'native-base';

import { FoodItemList } from 'Components';
import { searchDeal } from 'Store/home/actions';
import { Images } from 'Theme';
import useLocationHook from '../../hooks/useLocation';
import { getCurrentPosition } from 'Services/geolocation';

import styles from './styles';
import { debounce } from 'lodash';
import { ACTION_TYPES } from '../../store/type';
import { Routes } from '../../navigators/routes';

const Search = ({ navigation }) => {
  const dispatch = useDispatch();
  const { searchData, recent_searched_restaurants } = useSelector(
    state => state.app.home
  );
  const { getAddress } = useLocationHook();
  const [position, setPosition] = useState({
    latitude: null,
    longitude: null
  });
  const [data, setData] = useState([]);
  const [searchKey, setSearchKey] = useState('');
  const [currentLocation, setCurrentLocation] = useState({});
  const [load, setLoad] = useState(true);
  const { getDistance } = useLocationHook();

  const searchDealData = () => {
    dispatch(searchDeal(searchKey.toLocaleLowerCase()));
  };

  const handleAddRecentSearch = restaurant => {
    if (
      recent_searched_restaurants.findIndex(
        elem => elem.restaurant.id === restaurant.restaurant.id
      ) === -1
    ) {
      dispatch({
        type: ACTION_TYPES.ADD_RECENT_SEARCHED_RESTAURANT,
        payload: restaurant
      });
    }
  };

  const RecentSearchCard = ({ title, img, onPress, address }) => {
    return (
      <TouchableOpacity onPress={onPress} style={styles.recentItem}>
        <Image source={img} style={styles.recentItemImg} />
        <View style={styles.recentNameContainer}>
          <Text style={[styles.titleText, styles.recentItemText]}>{title}</Text>
          <Text style={styles.descriptionText}>{address}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const navigateToRestaurant = vendor => {
    navigation.navigate(Routes.Vendor, { vendor });
  };

  useEffect(() => {
    if (searchKey.length > 2) {
      debounce(() => searchDealData(), 200)();
    }
  }, [searchKey]);

  useEffect(() => {
    getCurrentPosition({
      callback: v => {
        getAddress(v).then(({ formatted_address, location }) => {
          setCurrentLocation({
            position: location,
            address: formatted_address
          });
        });
        setPosition(v);
      },
      failureCallback: e => console.log(e)
    });
  }, []);

  const calculateDistance = async () => {
    let temp = [];
    let tempItem = [];
    Object.keys(searchData).map((item, index) => {
      temp.push(searchData[item]);
      tempItem.push(searchData[item][0]);
    });
    await getDistance(tempItem, position).then(dis => {
      dis.map((itm, idx) => {
        temp[idx][0] = itm;
      });
    });
    setData(temp);
    setLoad(false);
  };

  useEffect(async () => {
    if (position.latitude && position.longitude && searchKey.length) {
      await calculateDistance();
    }
  }, [searchData]);

  // useEffect(() => {}, [data]);
  return (
    <Container style={styles.background}>
      <Content style={styles.contentView}>
        <View style={[styles.logoView, styles.paddingHorizontal]}>
          <Image source={Images.logo} style={styles.logoImg} />
        </View>
        <View style={styles.paddingHorizontal}>
          <View style={styles.searchView}>
            <Icon type="AntDesign" name="search1" style={styles.searchIcon} />
            <TextInput
              style={styles.inputField}
              returnKeyType="go"
              onChangeText={text => setSearchKey(text)}
              placeholder="Search for drinks, food, stores, etc."
              onSubmitEditing={searchDealData}
            />
          </View>
          <View style={styles.searchView}>
            <Icon
              type="MaterialCommunityIcons"
              name="map-marker-outline"
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.inputField}
              returnKeyType="go"
              placeholder={
                currentLocation?.address
                  ? currentLocation?.address
                  : 'Current Location'
              }
            />
          </View>
        </View>
        {data.length > 0 && searchKey.length && !load ? (
          <View style={styles.resultView}>
            <View style={styles.paddingHorizontal}>
              <Text style={styles.sectionText}>Sponsored</Text>
            </View>
            <View style={styles.sectionView}>
              <View style={[styles.sectionTitle, styles.paddingHorizontal]}>
                <Text style={styles.titleText}>
                  {data[0][0]?.restaurant?.name}
                </Text>
                <Text style={styles.sectionText}>{data[0][0].distance}</Text>
              </View>
              <FoodItemList
                dataArray={Object.values(searchData)[0]}
                onPress={restaurant => {
                  handleAddRecentSearch(restaurant);
                }}
                position={position}
              />
            </View>
            <View style={styles.paddingHorizontal}>
              <Text style={styles.sectionText}>All</Text>
            </View>
            {data.map((item, index) => {
              return (
                <View style={styles.sectionView} key={index}>
                  <View style={[styles.sectionTitle, styles.paddingHorizontal]}>
                    <Text style={styles.titleText}>
                      {item[0]?.restaurant?.name}
                    </Text>
                    <Text style={styles.sectionText}>{item[0].distance}</Text>
                  </View>
                  <FoodItemList
                    dataArray={item}
                    onPress={restaurant => {
                      handleAddRecentSearch(restaurant);
                    }}
                    position={position}
                  />
                </View>
              );
            })}
          </View>
        ) : (
          <View style={styles.recentView}>
            <Text style={styles.sectionText}>Recent</Text>
            {recent_searched_restaurants?.map((item, index) => {
              return (
                <RecentSearchCard
                  key={index}
                  title={item?.restaurant?.name}
                  img={
                    item?.restaurant?.img_url
                      ? {
                          uri: item?.restaurant?.img_url?.split(
                            'X-Amz-Algorithm='
                          )[0]
                        }
                      : Images?.vendorProfileBG
                  }
                  onPress={() => navigateToRestaurant(item)}
                  address={item?.restaurant?.location?.properties?.address}
                />
              );
            })}
          </View>
        )}
      </Content>
    </Container>
  );
};

export default Search;
