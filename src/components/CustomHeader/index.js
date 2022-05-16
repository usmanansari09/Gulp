import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { AppText } from 'Components/AppText';
import styles from './styles';
import CustomBackButton from '../CustomBackButton';
export default ({
  title,
  onBackPress,
  showBackButton,
  style,
  backButtonStyle
}) => {
  const headerTitle = (
    <View style={styles.headingTitle}>
      <AppText style={styles.titleText}>{title}</AppText>
    </View>
  );
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={style ?? styles.heading}>
        {showBackButton && (
          <CustomBackButton onPress={onBackPress} style={backButtonStyle} />
        )}
        {headerTitle}
      </View>
    </SafeAreaView>
  );
};
