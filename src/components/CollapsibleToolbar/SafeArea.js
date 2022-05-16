import React from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from 'Theme';

const styles = StyleSheet.create({
  safeAreaTop: {
    flex: 0,
    backgroundColor: Colors.white
  },
  safeAreaBottom: {
    flex: 1,
    backgroundColor: Colors.gray
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white
  }
});

const SafeArea = ({
  bottomBarColor,
  statusBarStyle,
  statusBarColor,
  children
}) => {
  return (
    <>
      <StatusBar backgroundColor={statusBarColor} barStyle={statusBarStyle} />
      <SafeAreaView
        edges={['bottom', 'left', 'right']}
        style={[
          styles.safeAreaBottom,
          {
            backgroundColor: bottomBarColor ? bottomBarColor : Colors.white
          }
        ]}>
        <View style={styles.container}>{children}</View>
      </SafeAreaView>
    </>
  );
};
export default SafeArea;
