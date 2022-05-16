import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { Image } from 'react-native';
import { Container, Content, Button, Text, View } from 'native-base';

import { Routes } from 'Navigators/routes';
import { Images, Colors } from 'Theme';

import styles from './styles';

const Splash = () => {
  const navigation = useNavigation();

  return (
    <Container style={styles.background}>
      <Content style={styles.contentView}>
        <View style={styles.logoView}>
          <Image source={Images.logo} style={styles.logoImg} />
        </View>

        <View style={styles.btnView}>
          <Button onPress={() => navigation.navigate(Routes.Register)}>
            <Text>Create an account</Text>
          </Button>
          <Button onPress={() => navigation.navigate(Routes.Login)}>
            <Text>Sign in</Text>
          </Button>
        </View>
      </Content>
    </Container>
  );
};

export default Splash;
