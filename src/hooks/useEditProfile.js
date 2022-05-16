import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useSelector, useDispatch } from 'react-redux';
import { EditCustomerProfile } from 'Store/profile/actions';
export const useEditProfile = () => {
  const navigation = useNavigation();
  const { userInfo } = useSelector(state => ({
    userInfo: state.app.login.userInfo
  }));
  const [resourcePath, setResourcePath] = useState({});
  const [userData, setUserData] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    navigation.setOptions({ title: 'Edit Profile' });
    setUserData(userInfo);
  }, []);

  const selectImage = () => {
    var options = {
      title: 'Select Image',
      customButtons: [
        {
          name: 'customOptionKey',
          title: 'Choose file from Custom OptionSSS'
        }
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };

    launchImageLibrary(options, res => {
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
        // eslint-disable-next-line no-alert
        alert(res.customButton);
      } else {
        console.log(res);
        setResourcePath(res.assets[0]);
      }
    });
  };

  const submitEditProfile = async () => {
    await dispatch(await EditCustomerProfile(userData));
  };

  return {
    navigation,
    userData,
    resourcePath,
    setUserData,
    setResourcePath,
    selectImage,
    submitEditProfile
  };
};
