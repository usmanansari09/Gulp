import React, { useEffect, useState, useCallback } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { ToastMessage } from 'Components';
import { createNewDeal, getVendorDeals, editDeal } from 'Store/deal/actions';
import CustomHeader from '../components/CustomHeader';

const useNewDealPresenter = () => {
  const navigation = useNavigation();
  const { dealData, loading, categories } = useSelector(state => ({
    categories: state.app.home.categories,
    dealData: state.app.deal.dealData,
    loading: state.app.deal.loading
  }));
  const dispatch = useDispatch();
  const [categoryVisible, setCategoryVisibility] = useState(false);
  const [showTimelinePicker, setShowTimelinePicker] = useState(false);
  const [dealName, setDealName] = useState('');
  const route = useRoute();
  const { deal: dealParam } = route?.params ?? {};
  const [deal, setDeal] = useState(dealParam);
  const [price, setPrice] = useState('');
  const [specialOffer, setSpecialOffer] = useState('');
  const [reducedPrice, setReducedPrice] = useState('');
  const [dealCategory, setDealCategory] = useState();
  const [dealDate, setDealDate] = useState({
    weekday: null,
    time_from: null,
    time_to: null
  });
  const [dealImage, setDealImage] = useState();

  useEffect(() => {
    dispatch(getVendorDeals());
  }, []);

  useEffect(() => {
    if (dealParam || deal) {
      const newDeal = dealParam || deal;
      setDeal(newDeal);
      setDealName(newDeal.name);
      setPrice(newDeal.price.toString());
      setSpecialOffer(newDeal.special_offer);
      setReducedPrice(newDeal.reduced_price.toString());
      setDealCategory(newDeal.category);
      newDeal.img_url && setDealImage({ uri: newDeal.img_url ?? undefined });
    }
  }, [deal, dealParam, navigation]);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <CustomHeader
          title={dealParam || deal ? 'Edit Deal' : 'New Deal'}
          showBackButton={dealParam !== undefined || deal !== undefined}
          onBackPress={resetData}
        />
      ),
      headerStyle: { backgroundColor: 'transparent' }
    });
  }, [deal, dealParam, navigation]);

  const toggleCategoryVisibility = () => {
    setCategoryVisibility(!categoryVisible);
  };

  const selectRecentDeal = selectedDeal => {
    navigation.setParams({ deal: selectedDeal });
  };

  const resetData = () => {
    setSpecialOffer('');
    setReducedPrice('');
    setPrice('');
    setDealName('');
    setDealImage(undefined);
    setDealCategory(undefined);
    setDeal(undefined);
    navigation.setParams({ deal: undefined });
    setDealDate({
      weekday: null,
      time_from: null,
      time_to: null
    });
  };

  const selectImage = () =>
    launchImageLibrary({ mediaType: 'photo' }, response => {
      if (!response.didCancel) {
        if (response.errorMessage) {
          ToastMessage(response.errorMessage, 'danger', 'bottom');
        } else {
          const asset = (response.assets && response.assets[0]) || response;
          setDealImage(asset);
        }
      }
    });
  const createDeal = useCallback(() => {
    if (dealCategory && reducedPrice && dealName && price) {
      const formData = new FormData();
      formData.append('category', dealCategory.id);
      formData.append('name', dealName);
      formData.append('price', Math.round(price));
      formData.append('special_offer', specialOffer);
      formData.append('reduced_price', Math.round(reducedPrice));
      formData.append('weekday', dealDate.weekday);
      formData.append('time_from', dealDate.time_from);
      formData.append('time_to', dealDate.time_to);
      if (dealImage && dealImage.uri !== deal?.img_url) {
        formData.append('img_url', {
          uri: dealImage.uri,
          type: dealImage.type,
          name: `${new Date().toISOString()}-${dealImage.type
            .split('/')
            .join('.')}`
        });
      }
      if (deal) {
        dispatch(editDeal(formData, deal.id, resetData));
        navigation.setParams({ deal: undefined });
      } else {
        dispatch(createNewDeal(formData, resetData));
        dispatch(getVendorDeals());
      }
    } else {
      ToastMessage('Please fill required fields', 'danger', 'bottom');
    }
  }, [
    dealImage,
    dealCategory,
    price,
    dealName,
    reducedPrice,
    deal,
    dealDate,
    specialOffer
  ]);

  return {
    categoryVisible,
    toggleCategoryVisibility,
    dealName,
    price,
    specialOffer,
    dealCategory,
    dealDate,
    setDealName,
    setPrice,
    setSpecialOffer,
    setDealCategory,
    setDealDate,
    dealImage,
    setDealImage,
    selectImage,
    showTimelinePicker,
    reducedPrice,
    setReducedPrice,
    setShowTimelinePicker,
    createDeal,
    categories,
    loading,
    dealData,
    selectRecentDeal
  };
};
export default useNewDealPresenter;
