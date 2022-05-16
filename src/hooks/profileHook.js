import { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { launchImageLibrary } from 'react-native-image-picker';
import { ToastMessage } from 'Components';
import { updateVendorProfile } from 'Store/profile/actions';

const useProfile = () => {
  const { restaurant, userInfo } = useSelector(state => ({
    userInfo: state.app.login.userInfo,
    restaurant: state.app.login.restaurant
      ? state.app.login.restaurant[0]
      : undefined
  }));
  const dispatch = useDispatch();
  const [name, setName] = useState();
  const [location, setLocation] = useState();
  const [position, setPosition] = useState({ latitude: null, longitude: null });
  const [email, setEmail] = useState();
  const [photo, setPhoto] = useState({ uri: null });
  const [showMap, setMapvisibility] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setEmail(userInfo.email);
    if (restaurant) {
      setName(restaurant.name);
      setPhoto({ uri: restaurant.img_url });
      if (restaurant.location) {
        const coords = restaurant?.location?.geometry.split(',');
        setPosition({ latitude: coords[0], longitude: coords[1] });
        setLocation(
          [
            restaurant.location.properties.address,
            restaurant.location.properties.city,
            restaurant.location.properties.state
          ].join(', ')
        );
      }
    }
  }, []);

  const onLocationPress = () => {
    setMapvisibility(!showMap);
  };

  const selectImage = () =>
    launchImageLibrary({ mediaType: 'photo' }, response => {
      if (!response.didCancel) {
        if (response.errorMessage) {
          ToastMessage(response.errorMessage, 'danger', 'bottom');
        } else {
          const asset = (response.assets && response.assets[0]) || response;
          setPhoto(asset);
        }
      }
    });
  const updateProfile = async () => {
    setLoading(true);
    const formData = new FormData();
    if (name) {
      formData.append('name', name);
    }
    if (email !== restaurant?.email) {
      formData.append('email', email);
    }
    if (position && location) {
      const addressArr = location?.split(',');
      formData.append(
        'location.point',
        `Point(${position.latitude} ${position.longitude})`
      );
      formData.append('location.state', addressArr[2]);
      formData.append('location.city', addressArr[1]);
      formData.append('location.address', addressArr[0]);
    }

    if (photo.uri !== restaurant?.img_url) {
      formData.append('img_url', {
        uri: photo.uri,
        type: photo.type,
        name: `${new Date().toISOString()}-${photo.type.split('/').join('.')}`
      });
    }
    await dispatch(await updateVendorProfile(formData));
    setLoading(false);
  };

  const canUpdate = useCallback(() => {
    return (
      restaurant?.name !== name ||
      restaurant?.img_url !== photo?.uri ||
      location !==
        [
          restaurant?.location?.properties?.address,
          restaurant?.location?.properties?.city,
          restaurant?.location?.properties?.state
        ].join(', ') ||
      userInfo.email !== email
    );
  }, [restaurant, name, email, photo, userInfo]);

  const setRestaurantLocation = data => {
    setLocation(data.address);
    setPosition(data.position);
    setMapvisibility(false);
  };

  return {
    restaurant,
    userInfo,
    email,
    photo,
    location,
    name,
    selectImage,
    updateProfile,
    setName,
    setLocation,
    setEmail,
    setPhoto,
    canUpdate,
    onLocationPress,
    showMap,
    setRestaurantLocation,
    position,
    loading
  };
};

export default useProfile;
