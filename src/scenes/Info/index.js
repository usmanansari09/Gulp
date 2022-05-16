import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import CustomHeader from 'Components/CustomHeader';

const InfoScene = () => {
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <CustomHeader
          title={route.params.title}
          showBackButton={true}
          onBackPress={navigation.goBack}
        />
      ),
      headerStyle: { backgroundColor: 'transparent' }
    });
  }, []);

  return (
    <SafeAreaView>
      <ScrollView />
    </SafeAreaView>
  );
};

export default InfoScene;
