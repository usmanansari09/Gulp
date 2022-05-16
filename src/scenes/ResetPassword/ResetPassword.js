import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Image, TextInput, TouchableOpacity } from 'react-native';
import { Container, Content, Button, Text, View, Icon } from 'native-base';
import { Routes } from 'Navigators/routes';
import { Images } from 'Theme';

import styles from './styles';

const ResetPassword = () => {
  const navigation = useNavigation();
  const [showPassIcon, setShowPassIcon] = useState(true);
  const [showCPassIcon, setShowCPassIcon] = useState(true);
  return (
    <Container style={styles.background}>
      <Content style={styles.contentView}>
        <View style={styles.headerView}>
          <TouchableOpacity
            style={styles.backBtnView}
            onPress={() => navigation.navigate(Routes.ForgotPass)}>
            <Icon
              type="SimpleLineIcons"
              name="arrow-left"
              style={styles.backBtn}
            />
          </TouchableOpacity>
          <Image source={Images.logo} style={styles.logoImg} />
        </View>
        <Text style={styles.titleText}>Reset Password</Text>
        <View style={styles.forgotView}>
          <View>
            <View style={styles.formGroup}>
              <Text style={styles.defaultLabel}>New Password</Text>
              <TextInput
                style={styles.inputFiled}
                autoCapitalize="none"
                autoCompleteType="email"
                secureTextEntry={showPassIcon}
                name="password"
              />

              <Icon
                type="Ionicons"
                name={showPassIcon ? 'eye-outline' : 'eye-off-outline'}
                style={styles.showIcon}
                onPress={() => setShowPassIcon(!showPassIcon)}
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.defaultLabel}>Confirm password</Text>
              <TextInput
                style={styles.inputFiled}
                autoCapitalize="none"
                autoCompleteType="password"
                secureTextEntry={showCPassIcon}
                name="password"
              />
              {showCPassIcon ? (
                <Icon
                  type="Feather"
                  name="eye"
                  style={styles.showIcon}
                  onPress={() => setShowCPassIcon(!showCPassIcon)}
                />
              ) : (
                <Icon
                  type="Feather"
                  name="eye-off"
                  style={styles.showIcon}
                  onPress={() => setShowCPassIcon(!showCPassIcon)}
                />
              )}
            </View>
          </View>
          <View style={styles.loginBtns}>
            <Button full rounded style={styles.loginBtn}>
              <Text style={styles.loginBtnText}>Confirm</Text>
            </Button>
          </View>
        </View>
      </Content>
    </Container>
  );
};

export default ResetPassword;
