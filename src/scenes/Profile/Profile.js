import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  View,
  ImageBackground,
  TouchableNativeFeedback
} from 'react-native';
import { AppText } from 'Components/AppText';
import { useSelector, useDispatch } from 'react-redux';
import styles from './styles';
import { Images } from 'Theme';

import { Icon } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import Badge from 'Components/BadgeItem';

import { getBadges, getCheckins } from 'Store/profile/actions';
import BadgePreview from 'Scenes/BadgePreview';
import { Routes } from 'Navigators/routes';
import CollapsibleToolbar from 'Components/CollapsibleToolbar';

const UserProfile = props => {
  const dispatch = useDispatch();
  const { userInfo, badges, checkins } = useSelector(state => ({
    userInfo: state.app.login.userInfo,
    badges: state.app.profile.badges,
    checkins: state.app.profile.checkins.results?.results?.length
  }));
  const [showBadgeModal, setShowBadgeModal] = useState(false);
  const [activeBadge, setActiveBadge] = useState();
  const toggleBadgeModal = () => {
    setShowBadgeModal(!showBadgeModal);
  };
  const loadData = async () => {
    return Promise.all([
      await dispatch(await getBadges()),
      await dispatch(await getCheckins())
    ]);
  };
  const navigation = useNavigation();
  useEffect(() => {
    loadData();
  }, []);

  const textWithLabel = (text, label) => (
    <View style={styles.flexRowItem}>
      <AppText style={styles.numberText}>{text}</AppText>
      <AppText style={styles.textLabel}>{label}</AppText>
    </View>
  );
  const userInfoView = () => {
    return (
      <ImageBackground
        source={Images.userProfileBG}
        resizeMode="cover"
        style={styles.bgImage}>
        <View styles={styles.userInfoView}>
          <View style={[styles.flexRowContainer, { marginTop: 30 }]}>
            <View style={styles.userAvatar} />
          </View>
          <View style={[styles.flexRowContainer, { paddingVertical: 5 }]}>
            <AppText style={styles.userNameText}>
              {userInfo.first_name} {userInfo.last_name}
            </AppText>
          </View>
          <View style={[styles.flexRowContainer, { marginBottom: 30 }]}>
            {textWithLabel(badges?.results?.length, 'Badges')}
            {textWithLabel(checkins, 'Check-ins')}
          </View>
        </View>
      </ImageBackground>
    );
  };

  const disclosureAction = (label, action) => (
    <TouchableNativeFeedback onPress={action}>
      <View style={styles.disclosureButtonContainer}>
        <View style={styles.disclosureButton}>
          <AppText>{label}</AppText>
          <Icon
            name="caretright"
            type="AntDesign"
            style={styles.disclosureIcon}
          />
        </View>
      </View>
    </TouchableNativeFeedback>
  );

  const badgesView = () => (
    <View style={{ flex: 1, padding: 10 }}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          {badges?.results?.slice(0, 4).map(badge => (
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
      </ScrollView>
    </View>
  );
  return (
    <View style={styles.container}>
      <CollapsibleToolbar
        header={userInfoView()}
        title="Profile"
        onRefresh={loadData}>
        <View style={styles.badgeContainer}>
          {disclosureAction('Badges', () =>
            navigation.navigate(Routes.BadgeCollection)
          )}
          <View style={styles.divider} />
          {badgesView()}
          <View style={styles.divider} />
          {disclosureAction('Previous Check-Ins', () =>
            navigation.navigate(Routes.CheckIns)
          )}
          <View style={styles.divider} />
          {disclosureAction('Account Settings', () =>
            navigation.navigate(Routes.Account)
          )}
        </View>
        {activeBadge && (
          <BadgePreview
            badge={activeBadge}
            isVisible={showBadgeModal}
            onCancel={toggleBadgeModal}
          />
        )}
      </CollapsibleToolbar>
    </View>
  );
};
export default UserProfile;
