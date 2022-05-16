import React from 'react';
import { Image, TouchableNativeFeedback, View, Alert } from 'react-native';
import { AppText } from 'Components/AppText';
import { Images } from 'Theme';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { Routes } from 'Navigators/routes';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger
} from 'react-native-popup-menu';
import { Icon } from 'native-base';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URI } from '@env';
import { getVendorDeals } from 'Store/deal/actions';
import { useDispatch } from 'react-redux';
import { ToastMessage } from 'Components';
import getRequestErrorMessage from '../../util/index';

const MenuItem = ({
  data,
  showActions,
  horizontalLayout = true,
  highlighted,
  onPress
}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const showAlert = () => {
    Alert.alert(
      'Delete Action',
      `Are you sure you want to delete ${data.name}? this action is not reversible!`,
      [
        {
          text: 'Cancel',
          onPress: () => null
        },
        {
          text: 'OK',
          onPress: removeItem
        }
      ],
      ''
    );
  };
  const removeItem = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      axios.defaults.headers = {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Token ' + token
      };
      const result = await axios.delete(`${API_URI}deal/${data.id}/`);
      if (result.status === 204) {
        ToastMessage(
          `${data.name} was successfully deleted`,
          'success',
          'bottom'
        );
        dispatch(getVendorDeals());
      }
    } catch (err) {
      ToastMessage(
        getRequestErrorMessage(err.response.data),
        'danger',
        'bottom'
      );
    }
  };

  return (
    <TouchableNativeFeedback
      onPress={() => onPress && typeof onPress === 'function' && onPress(data)}>
      <View
        style={[
          styles.menuItemContainer,
          horizontalLayout && styles.flex,
          highlighted !== undefined && { opacity: highlighted ? 1 : 0.6 }
        ]}>
        <View style={styles.menuItemDetail}>          
          <Image
            style={styles.menuItemImage}
            source={data.img_url ? { uri: data.img_url } : Images.foodItem}
          />
          <View style={styles.menuTitle}>
            <AppText style={styles.menuItemName}>{data.name}</AppText>
            {!horizontalLayout && (
              <AppText
                style={[
                  styles.menuItemPrice.alignContent,
                  { paddingHorizontal: 10 }
                ]}>
                ${data.reduced_price}
              </AppText>
            )}
          </View>
        </View>
        <View style={styles.menuItemPriceContainer}>
          {horizontalLayout && (
            <AppText style={styles.menuItemPrice}>
              ${data.reduced_price}
            </AppText>
          )}
          {showActions && (
            <Menu>
              <MenuTrigger>
                <Icon
                  type="Ionicons"
                  name="ellipsis-vertical"
                  style={styles.moreButton}
                />
              </MenuTrigger>
              <MenuOptions optionsContainerStyle={styles.menuOptionsConatiner}>
                <MenuOption
                  onSelect={() =>
                    navigation.navigate(Routes.NewDeal, { deal: data })
                  }
                  customStyles={{ optionWrapper: styles.menuOptions }}>
                  <AppText style={styles.menuOptionText}>Edit</AppText>
                </MenuOption>
                <MenuOption
                  onSelect={showAlert}
                  customStyles={{ optionWrapper: styles.menuOptions }}>
                  <AppText style={styles.menuOptionText}>Delete</AppText>
                </MenuOption>
              </MenuOptions>
            </Menu>
          )}
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

export default MenuItem;
