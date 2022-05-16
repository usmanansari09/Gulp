import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';

import HomeScene from 'Scenes/Home';
import VendorHomeScene from 'Scenes/Home/Vendor';
import MapView from 'Scenes/Map';
import NewDeal from 'Scenes/NewDeal';
import { ProfileStackNavigator } from '../StackNavigator/profile';
import SearchScene from 'Scenes/Search';
import { Routes } from 'Navigators/routes';
import { Colors, Images } from 'Theme';
import { useSelector } from 'react-redux';
import styles from './styles';
import NotificationsScene from 'Scenes/Notifications';

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  const { userInfo } = useSelector(state => state.app.login);
  return (
    <Tab.Navigator
      initialRouteName={Routes.Home}
      screenOptions={{
        headerShown: false,
        tabStyle: styles.tabStyle,
        tabBarActiveTintColor: Colors.orange,
        tabBarInactiveTintColor: 'black',
        tabBarShowLabel: false,
        tabBarStyle: styles.container
      }}>
      <Tab.Screen
        name={Routes.Home}
        component={userInfo.user_role === 2 ? VendorHomeScene : HomeScene}
        options={() => ({
          tabBarIcon: ({ color }) => (
            <Image
              style={[styles.tabIcon, { tintColor: color }]}
              source={Images.homeIcon}
              resizeMode="contain"
            />
          )
        })}
      />
      <Tab.Screen
        name={Routes[userInfo.user_role === 2 ? 'NewDeal' : 'MapPin']}
        component={userInfo.user_role === 2 ? NewDeal : MapView}
        options={() => ({
          tabBarIcon: ({ color }) => (
            <Image
              style={[styles.tabIcon, { tintColor: color }]}
              source={
                userInfo.user_role === 2 ? Images.dealIcon : Images.mapPinIcon
              }
              resizeMode="contain"
            />
          )
        })}
      />
      <Tab.Screen
        name={Routes[userInfo.user_role === 2 ? 'Notification' : 'Search']}
        component={userInfo.user_role === 2 ? NotificationsScene : SearchScene}
        options={() => ({
          tabBarIcon: ({ color }) => (
            <Image
              style={[styles.tabIcon, { tintColor: color }]}
              source={
                userInfo.user_role === 2
                  ? Images.notificationIcon
                  : Images.searchIcon
              }
              resizeMode="contain"
            />
          )
        })}
      />
      <Tab.Screen
        name={Routes.User}
        component={ProfileStackNavigator}
        options={() => ({
          tabBarIcon: ({ color }) => (
            <Image
              style={[styles.tabIcon, { tintColor: color }]}
              source={Images.userIcon}
              resizeMode="contain"
            />
          )
        })}
      />
    </Tab.Navigator>
  );
};
