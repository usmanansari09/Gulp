import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import CustomHeader from 'Components/CustomHeader';
import styles from './styles';

const About = () => {
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
      <ScrollView>
        <Text style={styles.baseText}>
          {'\n'}Gulp’s purpose is to provide a solution, to helping people find
          the best available deals, while empowering businesses to gain more
          customers and to work towards zero waste. Gulp helps businesses
          connect with existing and potential customers and enables them to
          directly communicate promotions based upon their needs and convenience
          such as surplus ingredients and slower hours. While doing so, our aim
          is to help people enjoy the best deals their city has to offer, from
          familiar places that feel like home to new gems hidden in plain sight.
          Gulp not only intends to allow people and businesses to access and
          manage ever-changing deals or daily specials that are hard to keep
          track of, but to also promote a drinking and dining culture of
          modesty, quality, and frugality: To help everyone find their happiest
          hour
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default About;
