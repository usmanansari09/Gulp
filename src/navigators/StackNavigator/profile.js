import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import UserProfile from 'Scenes/Profile';
import VendorProfile from 'Scenes/VendorProfile';
import { Routes } from 'Navigators/routes';
import { Colors } from 'Theme';
import BadgeCollection from 'Scenes/BadgeCollection';
import AccountSettings from 'Scenes/AccountSettings';
import CheckIns from 'Scenes/CheckIns';
import InfoScene from 'Scenes/Info';
import ChangePasswordScene from 'Scenes/ChangePassword';
import EditProfileScene from 'Scenes/EditProfile';
import TermsAndConditionsScene from 'Scenes/TermsAndConditions';
import PrivacyPolicyScene from 'Scenes/PrivacyPolicy';
import AboutScene from 'Scenes/About';

const Stack = createStackNavigator();

export const ProfileStackNavigator = () => {
  const { userInfo } = useSelector(state => state.app.login);
  return (
    <Stack.Navigator
      initialRouteName={Routes.Profile}
      screenOptions={{
        headerShown: false,
        headerTintColor: Colors.orange,
        headerTitleStyle: { color: Colors.black },
        headerStyle: { borderBottomWidth: 1, borderBottomColor: Colors.orange }
      }}>
      <Stack.Screen
        name={Routes.Profile}
        component={userInfo.user_role === 2 ? VendorProfile : UserProfile}
      />
      <Stack.Screen
        name={Routes.BadgeCollection}
        component={BadgeCollection}
        options={{
          gestureEnabled: true,
          headerShown: true,
          headerBackTitleVisible: false,
          title: 'Badge Collection',
          cardStyle: { backgroundColor: Colors.white }
        }}
      />
      <Stack.Screen
        name={Routes.Account}
        component={AccountSettings}
        options={{
          gestureEnabled: true,
          headerShown: true,
          headerBackTitleVisible: false,
          title: 'Account Settings',
          cardStyle: { backgroundColor: Colors.white }
        }}
      />
      <Stack.Screen
        name={Routes.CheckIns}
        component={CheckIns}
        options={{
          gestureEnabled: true,
          headerShown: true,
          headerBackTitleVisible: false,
          title: 'Previous Check-Ins',
          cardStyle: { backgroundColor: Colors.white }
        }}
      />
      <Stack.Screen
        name={Routes.Info}
        component={InfoScene}
        options={{
          gestureEnabled: true,
          headerShown: true,
          headerBackTitleVisible: false,
          cardStyle: { backgroundColor: Colors.white }
        }}
      />
      <Stack.Screen
        name={Routes.ChangePassword}
        component={ChangePasswordScene}
        options={{
          gestureEnabled: true,
          headerShown: true,
          headerBackTitleVisible: false,
          cardStyle: { backgroundColor: Colors.white }
        }}
      />
      <Stack.Screen
        name={Routes.EditProfile}
        component={EditProfileScene}
        options={{
          gestureEnabled: true,
          headerShown: true,
          headerBackTitleVisible: false,
          cardStyle: { backgroundColor: Colors.white }
        }}
      />

      <Stack.Screen
        name={Routes.TermsAndConditions}
        component={TermsAndConditionsScene}
        options={{
          gestureEnabled: true,
          headerShown: true,
          headerBackTitleVisible: false,
          cardStyle: { backgroundColor: Colors.white }
        }}
      />

      <Stack.Screen
        name={Routes.PrivacyPolicy}
        component={PrivacyPolicyScene}
        options={{
          gestureEnabled: true,
          headerShown: true,
          headerBackTitleVisible: false,
          cardStyle: { backgroundColor: Colors.white }
        }}
      />

      <Stack.Screen
        name={Routes.About}
        component={AboutScene}
        options={{
          gestureEnabled: true,
          headerShown: true,
          headerBackTitleVisible: false,
          cardStyle: { backgroundColor: Colors.white }
        }}
      />
    </Stack.Navigator>
  );
};
