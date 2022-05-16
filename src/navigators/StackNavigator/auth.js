import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators
} from '@react-navigation/stack';

import { Routes } from 'Navigators/routes';
import LoginScene from 'Scenes/Login';
import ForgotPasswordScene from 'Scenes/ForgotPassword';
import ResetPasswordScene from 'Scenes/ResetPassword';
import RegisterScene from 'Scenes/Register';

const Stack = createStackNavigator();

export const AuthStackNavigator = () => (
  <Stack.Navigator
    initialRouteName={Routes.Login}
    screenOptions={{ headerShown: false }}>
    <Stack.Screen
      name={Routes.Login}
      component={LoginScene}
      options={{
        gestureEnabled: true,
        cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid
      }}
    />
    <Stack.Screen
      name={Routes.ForgotPass}
      component={ForgotPasswordScene}
      options={{
        gestureEnabled: true,
        cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid
      }}
    />
    <Stack.Screen
      name={Routes.ResetPass}
      component={ResetPasswordScene}
      options={{
        gestureEnabled: true,
        cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid
      }}
    />
    <Stack.Screen
      name={Routes.Register}
      component={RegisterScene}
      options={{
        gestureEnabled: true,
        cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid
      }}
    />
  </Stack.Navigator>
);
