import React, { memo, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const HeaderOverlay = ({ style, name }) => {
  const containerStyle = useMemo(() => [styles.container, style], [style]);

  return (
    <View style={containerStyle}>
      <Text style={styles.title}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  title: {
    fontSize: 24
  }
});

export default memo(HeaderOverlay);
