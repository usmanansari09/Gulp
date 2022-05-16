import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Routes } from 'Navigators/routes';
import { TabNavigator } from 'Navigators/TabNavigator';
import VendorScene from 'Scenes/Vendor';
import DealsList from 'Scenes/DealsList';
import HappyHourMenu from 'Scenes/HappyHourMenu';
import NotificationDetail from 'Scenes/Notifications/NotificationDetail';

const Stack = createStackNavigator();

export const RootStackNavigator = () => (
  <Stack.Navigator
    initialRouteName={Routes.Dashboard}
    screenOptions={{ headerShown: false }}>
    <Stack.Screen
      name={Routes.Dashboard}
      component={TabNavigator}
      options={{
        gestureEnabled: true
      }}
    />
    <Stack.Screen
      name={Routes.Vendor}
      component={VendorScene}
      options={{
        gestureEnabled: true
      }}
    />
    <Stack.Screen
      name={Routes.NotificationDetails}
      component={NotificationDetail}
      options={{
        gestureEnabled: true
      }}
    />
    <Stack.Screen
      name={Routes.DealsList}
      component={DealsList}
      options={{
        gestureEnabled: true
      }}
    />
    <Stack.Screen
      name={Routes.HappyHourMenu}
      component={HappyHourMenu}
      options={{
        gestureEnabled: true
      }}
    />
  </Stack.Navigator>
);
