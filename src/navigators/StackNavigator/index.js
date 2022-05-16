import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthStackNavigator } from './auth';
import { RootStackNavigator } from './root';

export const Navigator = () => {
  const { userInfo } = useSelector(state => state.app.login);
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {userInfo?.pk || userInfo?.id ? (
          <RootStackNavigator />
        ) : (
          <AuthStackNavigator />
        )}
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
