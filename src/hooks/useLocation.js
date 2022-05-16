import axios from 'axios';
import { GOOGLE_API_KEY } from '@env';
import { distance } from '../util/helpers';

const useLocationHook = () => {
  const getAddress = async coordinates => {
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
            address_components,
            geometry: { location },
            formatted_address
          } = results[0];
          const { lat, lng } = location;
          return {
            address_components: address_components,
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
  const getDistance = async (arr = [], position) => {
    const temp = JSON.parse(JSON.stringify(arr));
    let promises = [];
    if (temp.length > 0) {
      temp.map(async (deal, index) => {
        if (deal?.restaurant?.location?.geometry && position) {
          try {
            promises.push(
              distance(position, {
                latitude: deal.restaurant?.location?.geometry?.split(',')[1],
                longitude: deal.restaurant?.location?.geometry?.split(',')[0]
              })
            );
            // distanceInMiles && (distanceInMiles = Math.floor(distanceInMiles * 0.000621371) + ' mi.');
          } catch (e) {
            console.log(e);
          }
        }
      });

      await Promise.all(promises);

      await promises.map((item, index) => {
        item.then(dis => {
          temp[index].distance = dis ? dis.toFixed(2) + ' mi.' : '__';
        });
      });

      return temp;
    }
  };
  return {
    getAddress,
    getDistance
  };
};

export default useLocationHook;
