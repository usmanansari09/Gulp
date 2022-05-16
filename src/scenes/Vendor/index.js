/* eslint-disable radix */
import React, { useMemo, useState, useRef } from 'react';
import {
  View,
  Dimensions,
  ImageBackground,
  TouchableNativeFeedback
} from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { Images } from 'Theme';
import { AppText } from 'Components/AppText';
import useVendorPresenter from 'Hooks/useVendorPresenter';
import styles from './styles';
import { Icon } from 'native-base';
import MenuItem from 'Components/MenuItem';
import BadgePreview from 'Scenes/BadgePreview';
import { Routes } from 'Navigators/routes';
import { useSelector } from 'react-redux';
import CollapsibleToolbar from 'Components/CollapsibleToolbar';
import LoadingIndicator from 'Components/LoadingIndicator';
import { weekDays } from '../../util/constants';
import RNMapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { convert24HoursTo12Hours } from '../../util/date';

const HEADER_EXPANDED_HEIGHT = 250;

const VendorScene = () => {
  const {
    toggleHappyHours,
    happyHourVisible,
    checkIn,
    deals,
    vendor: { restaurant, price, id },
    setVendor,
    canCheckin,
    goBack,
    navigate,
    timeline,
    loading,
    setLoading,
    activeBadge,
    showBadgeModal,
    toggleBadgeModal
  } = useVendorPresenter();
  const [showMap, setshowMap] = React.useState(false);
  const deviceHeaderHeight = useHeaderHeight();
  const { userInfo } = useSelector(state => ({
    userInfo: state.app.login.userInfo
  }));
  const { width: SCREEN_WIDTH } = Dimensions.get('screen');
  const today = new Date();
  const todayTimeline = timeline.results.find(
    time => time.weekday === weekDays[today.getDay()]
  );

  const open = () => {
    if (todayTimeline) {
      const now = new Date();
      const splitTimeTo = todayTimeline.time_to.split(':');
      const time = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        parseInt(splitTimeTo[0]),
        parseInt(splitTimeTo[1]),
        parseInt(splitTimeTo[2])
      );
      return time.getTime() > now.getTime() ? 'Open' : 'Close';
    }
    return 'Open';
  };

  const headerHeight = useMemo(
    () => HEADER_EXPANDED_HEIGHT - deviceHeaderHeight
  );
  const mapRef = useRef();
  const [initialRegion, setInitialRegion] = useState({
    latitude: 25.2674,
    longitude: 55.2926,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  });

  React.useEffect(() => {
    setLoading(true);
    let api = 'AIzaSyA-dt2M9mfh_6qyZ4yBguLU1zau5UiAetU';
    let address = restaurant.location?.properties?.address;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${api}`;
    fetch(url)
      .then(res => res.json())
      .then(resJson => {
        const latLng = resJson?.results[0].geometry.location;
        setInitialRegion({
          latitude: latLng.lat,
          longitude: latLng.lng,
          latitudeDelta: 0.0022,
          longitudeDelta: 0.0021
        });
        setLoading(false);
      })
      .catch(e => {
        console.log('Error in getAddressFromCoordinates', e);
        setLoading(false);
      });
  }, []);
  const openMap = () => {
    if (restaurant.location?.properties?.address != undefined) {
      setshowMap(true);
    } else {
      // eslint-disable-next-line no-alert
      alert('Location is Missing');
    }
  };
  return (
    <View style={{ flex: 1 }}>
      {showMap ? (
        <>
          <Icon
            name="angle-left"
            type="Fontisto"
            style={styles.backIcon}
            onPress={() => {
              setshowMap(false);
            }}
          />
          <RNMapView
            ref={ref => (mapRef.current = ref)}
            style={[styles.container]}
            initialRegion={initialRegion}
            showsMyLocationButton={false}
            showsUserLocation={true}
            provider={PROVIDER_GOOGLE}>
            <Marker
              //key={index}
              coordinate={initialRegion}
              title={restaurant.location?.properties?.address}
              // description="Restaurant"
            />
          </RNMapView>
        </>
      ) : (
        <CollapsibleToolbar
          backPress={goBack}
          headerComponentHeight={headerHeight}
          scrollContainerStyle={{ paddingTop: HEADER_EXPANDED_HEIGHT - 56 }}
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
                  restaurant.img_url
                    ? { uri: restaurant.img_url.split('X-Amz-Algorithm=')[0] }
                    : Images.vendorProfileBG
                }
                style={styles.bgImage}>
                <AppText style={[styles.heroHeaderTitle]}>
                  {restaurant.name}
                </AppText>
              </ImageBackground>
            </View>
          }>
          <View style={styles.badgeContainer}>
            <View contentContainerStyle={styles.scrollContainer}>
              {canCheckin() && (
                <View style={styles.profileActions}>
                  <View>
                    <TouchableNativeFeedback
                      onPress={() =>
                        checkIn({
                          price: price,
                          user: userInfo.id ?? userInfo.pk,
                          restaurant: restaurant.id,
                          deal: id,
                          initialRegion : initialRegion
                        })
                      }>
                      <View style={styles.checkInButton}>
                        <AppText style={styles.checkInButtonLabel}>
                          Check In
                        </AppText>
                      </View>
                    </TouchableNativeFeedback>
                  </View>
                </View>
              )}
              <View style={styles.profileActions}>
                <View style={styles.vendorAddressWrap}>
                  <View style={styles.vendorAddressContainer}>
                    <View>
                      <Icon name="ios-location-outline" />
                    </View>
                    {restaurant.location && (
                      <AppText style={styles.vendorAddress}>
                        {restaurant.location?.properties?.address}{' '}
                        {restaurant.location?.properties?.city}{' '}
                        {restaurant.location?.properties?.state}
                      </AppText>
                    )}
                  </View>
                  <View>
                    <AppText onPress={openMap} style={styles.vendorStatus}>
                      {open()}
                    </AppText>
                  </View>
                </View>
              </View>
              <View style={styles.profileActions}>
                <View style={styles.vendorAddressWrap}>
                  <View
                    style={[
                      styles.vendorAddressContainer,
                      { flexDirection: 'column', width: '80%' }
                    ]}>
                    <View style={styles.paddingBottom}>
                      <AppText style={styles.happyHour}>Happy Hours</AppText>
                    </View>
                    <AppText style={styles.vendorAddress}>
                      {todayTimeline?.time_from &&
                        convert24HoursTo12Hours(
                          todayTimeline?.time_from?.split(':')[0] +
                            ':' +
                            todayTimeline?.time_from?.split(':')[1]
                        ) +
                          ' - ' +
                          convert24HoursTo12Hours(
                            todayTimeline?.time_to?.split(':')[0] +
                              ':' +
                              todayTimeline?.time_to?.split(':')[1]
                          )}{' '}
                      {open()}
                    </AppText>
                  </View>
                  <TouchableNativeFeedback onPress={toggleHappyHours}>
                    <View style={{ padding: 10 }}>
                      <Icon
                        name={`${happyHourVisible ? 'caretup' : 'caretdown'}`}
                        type="AntDesign"
                        style={styles.disclosureIcon}
                      />
                    </View>
                  </TouchableNativeFeedback>
                </View>
                {happyHourVisible && (
                  <View style={styles.happyHoursList}>
                    {timeline.results.map(timelineItem => (
                      <View
                        style={styles.happyHourItem}
                        key={timelineItem.weekday + timelineItem.id}>
                        <View style={styles.happyHourItemTextDay}>
                          <AppText style={styles.vendorAddress}>
                            {timelineItem.weekday}
                          </AppText>
                        </View>
                        <View style={styles.happyHourItemTextTime}>
                          <AppText style={styles.vendorAddress}>
                            {timelineItem?.time_from &&
                              convert24HoursTo12Hours(
                                timelineItem?.time_from?.split(':')[0] +
                                  ':' +
                                  timelineItem?.time_from?.split(':')[1]
                              ) +
                                ' - ' +
                                convert24HoursTo12Hours(
                                  timelineItem?.time_to?.split(':')[0] +
                                    ':' +
                                    timelineItem?.time_to?.split(':')[1]
                                )}
                          </AppText>
                        </View>
                      </View>
                    ))}
                  </View>
                )}
              </View>
              <View style={styles.profileActions}>
                <View style={styles.vendorAddressWrap}>
                  <View style={styles.vendorAddressContainer}>
                    <View style={styles.paddingBottom}>
                      <AppText style={styles.happyHour}>
                        Happy Hour Menu
                      </AppText>
                    </View>
                  </View>
                  <View>
                    <TouchableNativeFeedback
                      onPress={() =>
                        navigate(Routes.HappyHourMenu, {
                          dealData: deals.results
                        })
                      }>
                      <AppText style={styles.seeAll}>See All</AppText>
                    </TouchableNativeFeedback>
                  </View>
                </View>
                {deals.results.map((deal, index) => {
                  return (
                    <MenuItem
                      key={`${index}`}
                      data={deal}
                      onPress={setVendor}
                      highlighted={id === deal.id}
                    />
                  );
                })}
                {/* {deals.results
                .sort((a, _) => (a.id === id ? -1 : 0))
                .slice(0, 5)
                .map((deal, index) => {
                  return (
                    <MenuItem
                      key={`${index}`}
                      data={deal}
                      onPress={setVendor}
                      highlighted={id === deal.id}
                    />
                  );
                })} */}
              </View>
            </View>
            <LoadingIndicator size="small" visible={loading} />
          </View>
          {activeBadge && (
            <BadgePreview
              badge={activeBadge}
              isVisible={showBadgeModal}
              onCancel={toggleBadgeModal}
            />
          )}
        </CollapsibleToolbar>
      )}
    </View>
  );
};

export default VendorScene;
