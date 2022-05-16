import { useState, useEffect } from 'react';
import { createTimeline, getTimeline, getCategories } from 'Store/home/actions';
import { getVendorDeals } from 'Store/deal/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Routes } from 'Navigators/routes';
import { ToastMessage } from 'Components';

const useHomeHook = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [showTimelinePicker, setShowTimelinePicker] = useState(false);
  const { loading, timeline, deals, restaurant } = useSelector(state => ({
    loading: state.app.home.loading,
    timeline: state.app.home.timeline,
    deals: state.app.deal.dealData,
    restaurant: state.app.login.restaurant
      ? state.app.login.restaurant[0]
      : undefined
  }));

  const addTimeline = data => {
    const exists = timeline.find(
      value => value.weekday === data.weekday
    );
    if (exists) {
      ToastMessage(
        `You already have a timeline for ${data.weekday}`,
        'danger',
        'bottom'
      );
      return;
    }
    setShowTimelinePicker(!showTimelinePicker);
    dispatch(createTimeline(data));
  };

  useEffect(() => {
    dispatch(getTimeline());
    dispatch(getCategories());
    dispatch(getVendorDeals());
  }, []);
  const onCategorySelect = category => {
    navigation.navigate(Routes.DealsList, { category });
  };

  return {
    addTimeline,
    timeline,
    loading,
    showTimelinePicker,
    setShowTimelinePicker,
    onCategorySelect,
    deals,
    restaurant
  };
};

export default useHomeHook;
