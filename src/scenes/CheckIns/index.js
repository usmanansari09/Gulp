import React, { useState, useEffect } from 'react';
import {
  RefreshControl,
  View,
  TouchableNativeFeedback,
  FlatList,
  Image
} from 'react-native';
import { AppText } from 'Components/AppText';
import { formattedDateTime } from '../../util/date';
import { useSelector, useDispatch } from 'react-redux';
import { getCheckins } from 'Store/profile/actions';
import styles from './styles';
import { Colors } from 'Theme';
import { useNavigation } from '@react-navigation/native';
import CustomHeader from 'Components/CustomHeader';

const CheckIns = () => {
  const { checkins, deal_collection } = useSelector(state => ({
    checkins: state.app.profile.checkins,
    deal_collection: state.app.home.best_value_deals.results
  }));
  const [refreshing, setRefresh] = useState(false);
  const dispatch = useDispatch();
  const refreshContent = async () => {
    setRefresh(true);
    await dispatch(await getCheckins());
    setRefresh(false);
  };
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <CustomHeader
          title={'Previous Check-ins'}
          showBackButton={true}
          onBackPress={navigation.goBack}
        />
      ),
      headerStyle: { backgroundColor: 'transparent' }
    });
  }, [navigation]);

  const checkInItem = (checkin, action) => (
    <TouchableNativeFeedback onPress={action}>
      <View style={styles.disclosureButtonContainer}>
        <View style={styles.disclosureButton}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              {checkin.deal.img_url && (
                <Image
                  source={{
                    uri: deal_collection
                      .filter(deal_item => {
                        return deal_item.id === checkin.deal;
                      })[0]
                      .img_url.split('X-Amz-Algorithm=')[0]
                  }}
                />
              )}
            </View>
          </View>
          <View>
            <AppText style={styles.title}>
              {
                deal_collection.filter(deal_item => {
                  return deal_item.id === checkin.deal;
                })[0]?.name
              }
            </AppText>

            <AppText style={styles.created_at}>
              {formattedDateTime(new Date(checkin.created_at))}
            </AppText>
          </View>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
  return (
    <FlatList
      data={checkins.results.results.sort((a, b) => b > a)}
      contentContainerStyle={styles.actions}
      renderItem={({ item }) => checkInItem(item)}
      keyExtractor={item => item.deal.toString()}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={refreshContent}
          tintColor={Colors.orange}
          enabled={true}
          size={20}
          progressViewOffset={20}
          colors={[Colors.orange]}
          progressBackgroundColor={Colors.white}
        />
      }
    />
  );
};

export default CheckIns;
