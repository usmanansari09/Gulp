import React, { useState, useLayoutEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  TouchableNativeFeedback
} from 'react-native';
import { AppText } from 'Components/AppText';
import { useNavigation } from '@react-navigation/native';
import { Routes } from 'Navigators/routes';
import styles from './styles';
import Logout from 'Scenes/Logout';
import CustomHeader from 'Components/CustomHeader';

const AccountSettings = () => {
  const navigation = useNavigation();

  const [showLogOutModal, setShowLogOutModal] = useState(false);
  const toggleLogOutModal = () => {
    setShowLogOutModal(!showLogOutModal);
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <CustomHeader
          title={'Account Settings'}
          showBackButton={true}
          onBackPress={navigation.goBack}
        />
      ),
      headerStyle: { backgroundColor: 'transparent' }
    });
  }, [navigation]);
  const disclosureAction = (label, action) => (
    <View style={styles.disclosureButtonContainer}>
      <TouchableNativeFeedback onPress={action}>
        <View style={styles.disclosureButton}>
          <AppText>{label}</AppText>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
  return (
    <>
      <SafeAreaView>
        <ScrollView>
          <View style={styles.actions}>
            {disclosureAction('Change Password', () =>
              navigation.navigate(Routes.ChangePassword)
            )}
            <View style={styles.divider} />
            {disclosureAction('Edit Profile', () =>
              navigation.navigate(Routes.EditProfile)
            )}
            <View style={styles.divider} />
            {disclosureAction('About', () =>
              navigation.navigate(Routes.About, { title: 'About' })
            )}
            <View style={styles.divider} />
            {disclosureAction('Terms and Conditions', () =>
              navigation.navigate(Routes.TermsAndConditions, {
                title: 'Terms and Conditions'
              })
            )}
            <View style={styles.divider} />
            {disclosureAction('Privacy Policy', () =>
              navigation.navigate(Routes.PrivacyPolicy, {
                title: 'Privacy Policy'
              })
            )}
            <View style={styles.divider} />
            {disclosureAction('Log Out', toggleLogOutModal)}
          </View>
        </ScrollView>
      </SafeAreaView>
      <Logout isVisible={showLogOutModal} onCancel={toggleLogOutModal} />
    </>
  );
};

export default AccountSettings;
