import React, { useMemo, useEffect } from 'react';
import {
  View,
  Dimensions,
  ImageBackground,
  TouchableNativeFeedback,
  TextInput
} from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';

import { AppText } from 'Components/AppText';
import otherStyles from './styles';
import { CheckBox, Icon } from 'native-base';
import MenuItem from 'Components/MenuItem';
import AddTimeline from 'Components/TimelinePicker';

import LoadingIndicator from 'Components/LoadingIndicator';
import Categories from './Categories';
import styles from 'Scenes/Vendor/styles';
import useHomeHook from 'Hooks/homeHooks';
import { Colors, Images } from 'Theme';
import CollapsibleToolbar from 'Components/CollapsibleToolbar';
import { weekDays } from '../../util/constants';
import { convert24HoursTo12Hours } from '../../util/date';

const HEADER_EXPANDED_HEIGHT = 250;

const VendorHome = () => {
  const {
    timeline,
    addTimeline,
    loading,
    showTimelinePicker,
    setShowTimelinePicker,
    onCategorySelect,
    deals,
    restaurant
  } = useHomeHook();

  const deviceHeaderHeight = useHeaderHeight();
  const { width: SCREEN_WIDTH } = Dimensions.get('screen');

  const headerHeight = useMemo(
    () => HEADER_EXPANDED_HEIGHT - deviceHeaderHeight
  );

  return (
    <View style={styles.container}>
      <CollapsibleToolbar
        headerComponentHeight={headerHeight}
        scrollContainerStyle={{ paddingTop: headerHeight - 35 }}
        title={restaurant?.name}
        header={
          <View
            style={[
              styles.header,
              {
                height: headerHeight,
                width: SCREEN_WIDTH
              }
            ]}>
            <ImageBackground
              source={
                restaurant?.img_url
                  ? { uri: restaurant.img_url.split('X-Amz-Algorithm=')[0] }
                  : Images.vendorProfileBG
              }
              style={styles.bgImage}>
              <AppText style={[styles.heroHeaderTitle]}>
                {restaurant?.name}
              </AppText>
            </ImageBackground>
          </View>
        }>
        <View style={otherStyles.vendorContainer}>
          <View contentContainerStyle={styles.scrollContainer}>
            <View style={styles.profileActions}>
              <View>
                <TouchableNativeFeedback
                  onPress={() => setShowTimelinePicker(!showTimelinePicker)}>
                  <View style={styles.checkInButton}>
                    <AppText style={styles.checkInButtonLabel}>
                      Add Happy Hours
                    </AppText>
                  </View>
                </TouchableNativeFeedback>
              </View>
            </View>
            <View style={styles.profileActions}>
              <View style={styles.vendorAddressWrap}>
                <View style={styles.vendorAddressContainer}>
                  <View style={styles.paddingBottom}>
                    <AppText style={otherStyles.happyHour}>Happy Hours</AppText>
                  </View>
                </View>
                <View>
                  <View style={otherStyles.checkbox}>
                    <AppText style={otherStyles.checkboxLabel}>
                      Same for every week
                    </AppText>
                    <CheckBox
                      checked
                      color={Colors.orange}
                      style={otherStyles.checkboxButton}
                    />
                  </View>
                  <View style={otherStyles.checkbox}>
                    <View style={otherStyles.checkboxLabelContainer}>
                      <AppText style={otherStyles.checkboxLabel}>
                        Same for every day
                      </AppText>
                    </View>
                    <CheckBox
                      color={Colors.orange}
                      style={otherStyles.checkboxButton}
                    />
                  </View>
                </View>
              </View>
              <View>
                {timeline.results === undefined ? (
                  <View style={styles.happyHoursList}>
                    {timeline
                      .sort(
                        (a, b) =>
                          weekDays.indexOf(a.weekday) >
                          weekDays.indexOf(b.weekday)
                      )
                      .map((time, index) => {
                        return (
                          <View
                            key={index.toString()}
                            style={styles.happyHourItem}>
                            <View style={styles.happyHourItemTextDay}>
                              <AppText style={styles.vendorAddress}>
                                {time.weekday}
                              </AppText>
                            </View>
                            <View style={styles.happyHourItemTextTime}>
                              <AppText style={styles.vendorAddress}>
                                {convert24HoursTo12Hours(
                                  time.time_from.split(':')[0] +
                                    ':' +
                                    time.time_from.split(':')[1]
                                ) +
                                  ' - ' +
                                  convert24HoursTo12Hours(
                                    time.time_to.split(':')[0] +
                                      ':' +
                                      time.time_to.split(':')[1]
                                  )}
                              </AppText>
                            </View>
                          </View>
                        );
                      })}
                  </View>
                ) : (
                  <></>
                )}
              </View>
            </View>
            <View style={styles.paddingVertical}>
              <View
                style={[styles.vendorAddressWrap, styles.paddingHorizontal]}>
                <View style={styles.vendorAddressContainer}>
                  <View>
                    <AppText style={otherStyles.happyHour}>
                      Happy Hour Menu
                    </AppText>
                  </View>
                </View>
              </View>
              <View style={styles.paddingBottom}>
                <View style={styles.paddingHorizontal}>
                  <View style={otherStyles.searchView}>
                    <Icon
                      type="AntDesign"
                      name="search1"
                      style={otherStyles.searchIcon}
                    />
                    <TextInput
                      style={otherStyles.inputField}
                      returnKeyType="go"
                    />
                  </View>
                </View>
                <View style={styles.paddingBottom} />
                <View style={styles.paddingBottom} />
                <Categories showTitle={false} onPress={onCategorySelect} />
              </View>
              <View style={styles.paddingHorizontal}>
                {deals.map((deal, index) => {
                  return <MenuItem data={deal} key={`${index}`} showActions />;
                })}
              </View>
            </View>
          </View>
        </View>
        {loading && <LoadingIndicator size="small" />}
        <AddTimeline
          isVisible={showTimelinePicker}
          buttonLabel="Add Happy Hours"
          onSubmit={data => addTimeline(data)}
          onDismiss={() => setShowTimelinePicker(!showTimelinePicker)}
        />
      </CollapsibleToolbar>
    </View>
  );
};

export default VendorHome;
