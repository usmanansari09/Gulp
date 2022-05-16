import { useNavigation, useRoute } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { ToastMessage } from 'Components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getCurrentPosition} from '../services/geolocation';

import { API_URI, MAX_DISTANCE_TO_CHECKIN } from '@env';
import { useSelector } from 'react-redux';
import { weekDays } from '../util/constants';
import { getDistance } from 'geolib';

const useVendorPresenter = () => {
  const navigation = useNavigation();
  const goBack = navigation.goBack;
  const route = useRoute();
  const { vendor: deal } = route.params;
  const [happyHourVisible, setHappyHourVisible] = useState(false);
  const { userInfo } = useSelector(state => state.app.login);
  const [deals, setDeals] = useState({ results: [] });
  const [timeline, setTimeline] = useState({ results: [] });
  const [vendor, setVendor] = useState(deal);
  const [loading, setLoading] = useState(false);
  const [activeBadge, setActiveBadge] = useState();
  const [showBadgeModal, setShowBadgeModal] = useState(false);
  let checkInData = {};

  const toggleBadgeModal = () => {
    setShowBadgeModal(!showBadgeModal);
  };
  const checkIn = async data => {
    try {
      setLoading(true);
      checkInData = data;

      getCurrentPosition({callback:checkInCallApi,
        failureCallback:()=>{
          ToastMessage('Failed to fetch location data', 'danger', 'bottom');
          setLoading(false);
        }}
      );

    } catch (err) {
      setLoading(false);
      ToastMessage(err.message, 'danger', 'bottom');
    }
  };

  const checkInCallApi = async ({latitude, longitude}) => {
    
    let data = checkInData;

    let distanceInMt = getDistance(data.initialRegion, {
      latitude: latitude,
      longitude: longitude
    });
    
    let distanceInFt=distanceInMt&&distanceInMt*3.2808;

    if(distanceInFt>MAX_DISTANCE_TO_CHECKIN){
      ToastMessage('You are too far from the restaurant to check-in', 'danger', 'bottom');
    }else{
      const token = await AsyncStorage.getItem('token');
      axios.defaults.headers = {
        'Content-Type': 'application/json',
        Authorization: 'Token ' + token
      };
      const result = await axios.post(`${API_URI}checkin/`, data);
      if (result.status === 200) {
        if (result.data.error) {
          ToastMessage(JSON.stringify(result.data.error), 'danger', 'bottom');
        } else if (result.data.new_added_badge?.name) {
          toggleBadgeModal();
          setActiveBadge(result.data.new_added_badge);
        } else {
          ToastMessage('Check-in successful', 'success', 'bottom');
        }
      } else {
        ToastMessage(JSON.stringify(result.data), 'danger', 'bottom');
      }
    }
    setLoading(false);
  }

  const getDeals = async data => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');
      axios.defaults.headers = {
        'Content-Type': 'application/json',
        Authorization: 'Token ' + token
      };
      const result = await axios.get(
        `${API_URI}deal-get/?restaurant__id=${vendor.restaurant.id}`,
        data
      );

      if (result.status === 200 && typeof result.data !== 'string') {
        setDeals(result.data);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };
  const getTimeline = async data => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');
      axios.defaults.headers = {
        'Content-Type': 'application/json',
        Authorization: 'Token ' + token
      };
      const result = await axios.get(
        `${API_URI}timeline_restaurant/${vendor.restaurant.id}/`,
        data
      );

      if (result.status === 200 && typeof result.data !== 'string') {
        setTimeline({
          ...result.data,
          results: result.data.results.sort(
            (a, b) => weekDays.indexOf(a.weekday) > weekDays.indexOf(b.weekday)
          )
        });
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };
  useEffect(() => {
    navigation.setOptions({
      headerStyle: { backgroundColor: 'transparent' }
    });
    getTimeline().then(() => getDeals().then());
  }, []);
  const toggleHappyHours = () => {
    setHappyHourVisible(!happyHourVisible);
  };

  const canCheckin = useCallback(() => {
    return userInfo.user_role !== 2;
  }, [userInfo]);
  return {
    happyHourVisible,
    toggleHappyHours,
    checkIn,
    goBack,
    vendor,
    deals,
    navigate: navigation.navigate,
    loading,
    setLoading,
    setVendor,
    canCheckin,
    timeline,
    activeBadge,
    setActiveBadge,
    showBadgeModal,
    setShowBadgeModal,
    toggleBadgeModal
  };
};
export default useVendorPresenter;
