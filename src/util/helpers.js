import axios from 'axios';
import { GOOGLE_API_KEY, API_URI } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const distance = async (origin, destination) => {
  const token = await AsyncStorage.getItem('token');
  axios.defaults.headers = {
    'Content-Type': 'application/json',
    Authorization: 'Token ' + token
  };

  if (
    origin.latitude &&
    origin.longitude &&
    destination.latitude &&
    destination.longitude
  ) {
    return await axios
      .post(`${API_URI}restaurant_distance/`, {
        lat_a: origin.latitude,
        long_a: origin.longitude,
        lat_b: destination.latitude,
        long_b: destination.longitude
      })
      .then(response => response.data)
      .then(response => {
        return response.distance;
      });
  }
  return 0;
  // const result = await axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=31.482588%2C74.324958&destinations=31.425381%2C74.274888&key=${GOOGLE_API_KEY}`);
};
