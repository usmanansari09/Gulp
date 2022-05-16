import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, View, RefreshControl } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { AppText } from 'Components/AppText';
import { useNavigation } from '@react-navigation/native';
import Badge from 'Components/BadgeItem';
import styles from './styles';
import BadgePreview from 'Scenes/BadgePreview';
import { getBadges } from 'Store/profile/actions';
import { Colors } from 'Theme';
import CustomHeader from 'Components/CustomHeader';

const BadgeCollection = props => {
  const { badges = badges.results.sort((a, b) => (a.id > b.id ? 1 : -1)) } =
    useSelector(state => state.app.profile);
  const navigation = useNavigation();
  const [showBadgeModal, setShowBadgeModal] = useState(false);
  const [refreshing, setRefresh] = useState(false);
  const [activeBadge, setActiveBadge] = useState();
  const dispatch = useDispatch();
  const toggleBadgeModal = () => {
    setShowBadgeModal(!showBadgeModal);
  };

  const refreshContent = async () => {
    setRefresh(true);
    await dispatch(await getBadges());
    setRefresh(false);
  };
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <CustomHeader
          title={'Badges Collection'}
          showBackButton={true}
          onBackPress={navigation.goBack}
        />
      ),
      headerStyle: { backgroundColor: 'transparent' }
    });
  }, [navigation]);

  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={styles.scrollView}
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
        }>
        <View style={styles.container}>
          <View style={styles.recentlyEarned}>
            <AppText style={styles.headerText}>Recently Earned</AppText>
            <View style={styles.flexWrap}>
              {badges.results.slice(0, 4).map(badge => (
                <Badge
                  key={badge.id}
                  {...badge}
                  onPress={() => {
                    setActiveBadge(badge);
                    toggleBadgeModal();
                  }}
                />
              ))}
            </View>
          </View>
          <View style={styles.allBadges}>
            <AppText style={styles.headerText}>All Badges</AppText>
            <View style={styles.flexWrap}>
              {badges.results.map(badge => (
                <Badge
                  key={badge.id}
                  {...badge}
                  onPress={() => {
                    setActiveBadge(badge);
                    toggleBadgeModal();
                  }}
                />
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
      {activeBadge && (
        <BadgePreview
          badge={activeBadge}
          isVisible={showBadgeModal}
          onCancel={toggleBadgeModal}
        />
      )}
    </SafeAreaView>
  );
};

export default BadgeCollection;
