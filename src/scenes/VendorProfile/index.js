import React from 'react';
import { SafeAreaView, ScrollView, View, Image, Modal } from 'react-native';
import { AppText } from 'Components/AppText';
import styles from './styles';
import { Images } from 'Theme';
import { Icon, Button } from 'native-base';

import { useNavigation } from '@react-navigation/native';
import TextField from 'Components/TextField';

import { Routes } from 'Navigators/routes';
import useProfile from 'Hooks/profileHook';
import LocationSelect from '../LocationSelect';
import LoadingIndicator from '../../components/LoadingIndicator';

const VendorProfile = () => {
  const {
    name,
    email,
    location,
    photo,
    setLocation,
    setName,
    setEmail,
    selectImage,
    updateProfile,
    canUpdate,
    showMap,
    onLocationPress,
    setRestaurantLocation,
    position,
    loading
  } = useProfile();
  const navigation = useNavigation();

  const userInfoView = () => {
    return (
      <View styles={styles.userInfoView}>
        <View style={styles.flexRowContainer}>
          <View>
            <Image
              source={
                photo?.uri
                  ? { uri: photo?.uri.split('X-Amz-Algorithm=')[0] }
                  : Images.vendorProfileBG
              }
              style={styles.userAvatar}
            />
            <View style={{ position: 'absolute', bottom: -12, left: 40 }}>
              <Icon
                type="Ionicons"
                name="camera-outline"
                style={{ fontSize: 25 }}
                onPress={selectImage}
              />
            </View>
          </View>
        </View>
        <View style={styles.flexRowContainer}>
          <TextField
            style={styles.underlinedInput}
            value={name}
            onChange={setName}
            placeholder="Restaurant name"
          />
        </View>
        <View style={styles.flexRowContainer} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.heading}>
        <View style={styles.headingTitle}>
          <AppText style={styles.titleText}>My Profile</AppText>
        </View>
        <Icon
          type="Ionicons"
          name="settings-outline"
          onPress={() => navigation.navigate(Routes.Account)}
        />
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.profileActions}>{userInfoView()}</View>
        <View style={styles.flexRowContainer}>
          <TextField
            label="Location"
            style={styles.inputField}
            placeholder="Business Location"
            value={location}
            onPress={onLocationPress}
            onChange={setLocation}
          />
        </View>
        <View style={styles.flexRowContainer}>
          <TextField
            label="Email"
            keyboardType="email-address"
            value={email}
            placeholder="yourbusiness.email.com"
            onChange={setEmail}
            style={styles.inputField}
          />
        </View>
        <View style={styles.flexRowContainer}>
          <TextField
            label="Password"
            placeholder="**********"
            secureTextEntry
            style={styles.inputField}
            onPress={() => navigation.navigate(Routes.ChangePassword)}
          />
        </View>
        {canUpdate() && (
          <View style={styles.buttonsContainer}>
            <Button full rounded style={styles.button} onPress={updateProfile}>
              <AppText style={styles.buttonText}>Save</AppText>
            </Button>
          </View>
        )}
        {showMap && (
          <Modal visible={showMap} onRequestClose={onLocationPress}>
            <LocationSelect
              onDismiss={onLocationPress}
              onDone={setRestaurantLocation}
              address={location}
              location={{
                latitude: parseFloat(position.latitude),
                longitude: parseFloat(position.longitude)
              }}
            />
          </Modal>
        )}
        <LoadingIndicator size="small" visible={loading} />
      </ScrollView>
    </SafeAreaView>
  );
};
export default VendorProfile;
