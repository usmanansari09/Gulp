import React, { useMemo } from 'react';
import { ScrollView, View, Dimensions, ImageBackground } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { Images } from 'Theme';
import { useSelector } from 'react-redux';
import { AppText } from 'Components/AppText';
import styles from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import MenuItem from 'Components/MenuItem';
import CustomBackButton from 'Components/CustomBackButton';

const HEADER_EXPANDED_HEIGHT = 250;

const HappyHourMenu = () => {
  const deviceHeaderHeight = useHeaderHeight();
  const navigation = useNavigation();
  const route = useRoute();
  const { dealData } = route.params;
  const { width: SCREEN_WIDTH } = Dimensions.get('screen');
  const { deals } = useSelector(state => ({
    deals: state.app.deal.dealData
  }));
  const headerHeight = useMemo(
    () => HEADER_EXPANDED_HEIGHT - deviceHeaderHeight
  );

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.header,
          {
            height: headerHeight,
            width: SCREEN_WIDTH
          }
        ]}>
        <ImageBackground source={Images.happyHourBG} style={styles.bgImage}>
          <CustomBackButton onPress={navigation.goBack} />
        </ImageBackground>
      </View>
      <View
        style={[styles.badgeContainer, { top: HEADER_EXPANDED_HEIGHT - 70 }]}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.profileActions}>
            <View style={styles.flex}>
              <View style={styles.heading}>
                <AppText style={styles.happyHour}>Happy Hour Menu</AppText>
              </View>
              <View style={styles.borderLine} />
            </View>
            {(dealData || deals).map((deal, index) => {
              return <MenuItem key={`${index}`} data={deal} />;
            })}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default HappyHourMenu;
