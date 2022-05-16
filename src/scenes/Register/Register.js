import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { TextInput, TouchableOpacity } from 'react-native';
import { Container, Content, Button, Text, View, Icon } from 'native-base';

import { ToastMessage } from 'Components';
import AppLogo from 'Components/AppLogo';
import { userRegister, clear } from 'Store/register/actions';

import { Routes } from 'Navigators/routes';
import styles from './styles';

const Register = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { success, error } = useSelector(state => state.app.register);

  const [showPassIcon, setShowPassIcon] = useState(true);
  const [showCPassIcon, setShowCPassIcon] = useState(true);
  const [confirmPass, setConfirmPass] = useState('');
  const [userRole, setUserRole] = useState(true);
  const [registerData, setRegisterData] = useState({
    first_name: '',
    last_name: '',
    age: '',
    phone_number: '',
    email: '',
    password: '',
    user_role: 1
  });

  const register = () => {
    if (userRole) {
      if (registerData.first_name === '') {
        ToastMessage('Please input First Name.', 'warning', 'bottom');
        return;
      }
      if (registerData.last_name === '') {
        ToastMessage('Please input Last Name.', 'warning', 'bottom');
        return;
      }
      if (registerData.phone_number === '') {
        ToastMessage('Please input Phone Number.', 'warning', 'bottom');
        return;
      }
      if (registerData.age === '') {
        ToastMessage('Please input Age.', 'warning', 'bottom');
        return;
      }
    }
    if (registerData.email === '') {
      ToastMessage('Please input Email address.', 'warning', 'bottom');
      return;
    }
    if (registerData.password === '') {
      ToastMessage('Please input Password.', 'warning', 'bottom');
      return;
    }
    if (confirmPass === '') {
      ToastMessage('Please input Confirm Password.', 'warning', 'bottom');
      return;
    }
    if (registerData.password !== confirmPass) {
      ToastMessage("Password doesn't match", 'warning', 'bottom');
      return;
    }
    if (userRole) {
      dispatch(userRegister(registerData));
    } else {
      const data = {
        email: registerData.email,
        password: registerData.password,
        user_role: registerData.user_role
      };
      dispatch(userRegister(data));
    }
  };

  useEffect(() => {
    if (
      Object.keys(success).length > 0 &&
      success.email === registerData.email
    ) {
      ToastMessage(
        'Congratulations, your account has been successfully created.',
        'success',
        'bottom'
      );
      setTimeout(() => {
        navigation.navigate(Routes.Login);
      }, 2000);
    }
    if (error !== '') {
      ToastMessage(error, 'danger', 'bottom');
    }
    setTimeout(() => {
      dispatch(clear());
    }, 1000);
  }, [success, error]);

  const toggleUserType = () => {
    setRegisterData({ ...registerData, user_role: userRole ? 2 : 1 });
    setUserRole(!userRole);
  };

  return (
    <Container style={styles.background}>
      <Content style={styles.contentView}>
        <AppLogo imgStyle={styles.logoImg} containerStyle={styles.logoView} />
        <TouchableOpacity onPress={toggleUserType}>
          <Text style={[styles.ownerText, styles.underlineText]}>
            {userRole ? 'Business' : 'Not a business'} owner
            {userRole ? 's ' : '? '}
            click here
          </Text>
        </TouchableOpacity>
        {userRole && (
          <>
            <View style={styles.formGroup}>
              <Text style={styles.defaultLabel}>First name</Text>
              <TextInput
                style={styles.inputFiled}
                autoCompleteType="name"
                value={registerData.first_name}
                onChangeText={text =>
                  setRegisterData({ ...registerData, first_name: text })
                }
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.defaultLabel}>Last name</Text>
              <TextInput
                style={styles.inputFiled}
                autoCompleteType="name"
                value={registerData.last_name}
                onChangeText={text =>
                  setRegisterData({ ...registerData, last_name: text })
                }
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.defaultLabel}>Phone number</Text>
              <TextInput
                style={styles.inputFiled}
                autoCapitalize="none"
                value={registerData.phone_number}
                onChangeText={text =>
                  setRegisterData({ ...registerData, phone_number: text })
                }
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.defaultLabel}>Age</Text>
              <TextInput
                style={styles.inputFiled}
                autoCapitalize="none"
                autoCompleteType="cc-number"
                value={registerData.age}
                onChangeText={text =>
                  setRegisterData({ ...registerData, age: text })
                }
              />
            </View>
          </>
        )}
        <View style={styles.formGroup}>
          <Text style={styles.defaultLabel}>Email</Text>
          <TextInput
            style={styles.inputFiled}
            autoCapitalize="none"
            autoCompleteType="email"
            value={registerData.email}
            onChangeText={text =>
              setRegisterData({ ...registerData, email: text })
            }
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.defaultLabel}>Password</Text>
          <TextInput
            style={styles.inputFiled}
            autoCapitalize="none"
            autoCompleteType="email"
            secureTextEntry={showPassIcon}
            name="password"
            value={registerData.password}
            onChangeText={text =>
              setRegisterData({ ...registerData, password: text })
            }
          />
          {showPassIcon ? (
            <Icon
              type="Ionicons"
              name="eye-outline"
              style={styles.showIcon}
              onPress={() => setShowPassIcon(!showPassIcon)}
            />
          ) : (
            <Icon
              type="Ionicons"
              name="eye-off-outline"
              style={styles.showIcon}
              onPress={() => setShowPassIcon(!showPassIcon)}
            />
          )}
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.defaultLabel}>Confirm password</Text>
          <TextInput
            style={styles.inputFiled}
            autoCapitalize="none"
            autoCompleteType="password"
            secureTextEntry={showCPassIcon}
            name="password"
            value={confirmPass}
            onChangeText={text => setConfirmPass(text)}
          />
          {showCPassIcon ? (
            <Icon
              type="Ionicons"
              name="eye-outline"
              style={styles.showIcon}
              onPress={() => setShowCPassIcon(!showCPassIcon)}
            />
          ) : (
            <Icon
              type="Ionicons"
              name="eye-off-outline"
              style={styles.showIcon}
              onPress={() => setShowCPassIcon(!showCPassIcon)}
            />
          )}
        </View>
        <View style={styles.loginBtns}>
          <Button full rounded style={styles.loginBtn} onPress={register}>
            <Text style={styles.loginBtnText}>Sign Up</Text>
          </Button>

          <View style={styles.signUpText}>
            <Text style={styles.defaultLabel}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate(Routes.Login)}>
              <Text style={[styles.defaultLabel, styles.underlineText]}>
                Log In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Content>
    </Container>
  );
};

export default Register;
