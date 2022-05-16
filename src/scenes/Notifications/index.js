import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, FlatList, RefreshControl } from 'react-native';
import { AppText } from 'Components/AppText';
import { useSelector, useDispatch } from 'react-redux';
import styles from './styles';

import { useNavigation } from '@react-navigation/native';
import { getNotifications } from 'Store/home/actions';
import NotificationItem from './NotificationsListItem';
import { Routes } from 'Navigators/routes';
import { Colors } from 'Theme';

const Notifications = props => {
  const dispatch = useDispatch();
  const notifications = useSelector(state => state.app.home.notification);
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    await dispatch(await getNotifications());
    setRefreshing(false);
  };
  useEffect(() => {
    dispatch(getNotifications());
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.heading}>
        <View style={styles.headingTitle}>
          <AppText style={styles.titleText}>Notifications</AppText>
        </View>
      </View>
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Colors.orange}
            enabled={true}
            size={20}
            progressViewOffset={20}
            colors={[Colors.orange]}
            progressBackgroundColor={Colors.white}
          />
        }
        contentContainerStyle={styles.listView}
        data={notifications}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => (
          <NotificationItem
            {...item}
            onPress={() =>
              navigation.navigate(Routes.NotificationDetail, {
                notification: item
              })
            }
          />
        )}
        keyExtractor={item => item.id.toString()}
      />
    </SafeAreaView>
  );
};
export default Notifications;
