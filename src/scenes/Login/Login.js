import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import {
  Image,
  TextInput,
  TouchableOpacity,
  Platform,
  Alert
} from 'react-native';
import { Container, Content, Button, Text, View, Icon } from 'native-base';
import messaging from '@react-native-firebase/messaging';
import { ToastMessage } from 'Components';
import LoadingIndicator from 'Components/LoadingIndicator';
import AppLogo from 'Components/AppLogo';
import { Routes } from 'Navigators/routes';
import { userLogin, userLogout, userLoginSocial } from 'Store/login/actions';
import { Images } from 'Theme';

import styles from './styles';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {
  Settings,
  LoginManager,
  AccessToken,
  Profile,
  AuthenticationToken
} from 'react-native-fbsdk-next';
import { appleAuth } from '@invertase/react-native-apple-authentication';

GoogleSignin.configure({
  scopes: ['email'],
  iosClientId:
    '364979889616-19a89dso9eob18fc28tcaappvuku6gle.apps.googleusercontent.com'
});

Settings.initializeSDK();
const TOPIC = 'Gulp';
const Login = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { userInfo, errMessage, loading } = useSelector(
    state => state.app.login
  );
  const [showIcon, setShowIcon] = useState(true);
  const [authData, setAuthData] = useState({
    username: '',
    password: ''
  });
  const displayNotification = (title, body) => {
    console.log({ title, body });
    Alert.alert(
      title,
      body,
      [{ text: 'Ok', onPress: () => console.log('ok pressed') }],
      { cancelable: false }
    );
  };
  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    console.log('Authorization status(authStatus):', authStatus);
    return (
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL
    );
  };
  const login = () => {
    if (authData.username === '') {
      ToastMessage('Please input Email.', 'warning', 'bottom');
      return;
    }
    if (authData.password === '') {
      ToastMessage('Please input Password.', 'warning', 'bottom');
      return;
    }
    dispatch(userLogin(authData));
  };

  const signinWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      GoogleSignin.signIn().then(user => {
        GoogleSignin.getTokens().then(data => {
          dispatch(
            userLoginSocial({
              type: 'google',
              payload: {
                access_token: data.accessToken,
                id_token: data.idToken
              },
              user: user.user
            })
          );
        });
      });
    } catch (error) {}
  };

  const signinWithFB = async () => {
    LoginManager.logInWithPermissions(['email', 'public_profile']).then(
      async result => {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          const user = await Profile.getCurrentProfile();
          const loginPyaload = {
            type: 'facebook',
            payload: { access_token: null },
            user
          };

          if (Platform.OS === 'ios') {
            AuthenticationToken.getAuthenticationTokenIOS().then(data => {
              loginPyaload.payload.access_token = data.accessToken;
              dispatch(userLoginSocial(loginPyaload));
            });
          } else {
            AccessToken.getCurrentAccessToken().then(data => {
              loginPyaload.payload.access_token = data.accessToken;
              dispatch(userLoginSocial(loginPyaload));
            });
          }
        }
      },
      error => {
        console.log('Login fail with error: ' + error);
      }
    );
  };

  async function onAppleButtonPress() {
    // performs login request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME]
    });

    // get current authentication state for user
    // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
    const credentialState = await appleAuth.getCredentialStateForUser(
      appleAuthRequestResponse.user
    );

    // use credentialState response to ensure the user is authenticated
    if (credentialState === appleAuth.State.AUTHORIZED) {
      // user is authenticated
      const loginPyaload = {
        type: 'apple',
        payload: {
          id_token: appleAuthRequestResponse.identityToken,
          code: appleAuthRequestResponse.authorizationCode
        },
        user: {
          email: appleAuthRequestResponse.email,
          fullName: appleAuthRequestResponse.fullName
        }
      };
      dispatch(userLoginSocial(loginPyaload));
    }
  }

  useEffect(() => {
    if (requestUserPermission()) {
      messaging()
        .getToken()
        .then(fcmToken => {
          console.log('FCM Token -> ', fcmToken);
          setAuthData({
            ...authData,
            device_token: fcmToken,
            type: Platform.OS
          });
        })
        .catch(err => console.log(err));
    } else {
      console.log('Not Authorization status:', 'authStatus');
    }
    messaging()
      .getInitialNotification()
      .then(async remoteMessage => {
        if (remoteMessage) {
          console.log('app open from quit state');
          console.log(remoteMessage);
          const body = remoteMessage.notification?.body;
          const title = remoteMessage.notification?.title;
          displayNotification(title, body);
        }
      });
    messaging().onNotificationOpenedApp(async remoteMessage => {
      if (remoteMessage) {
        console.log('app open from background state');
        console.log(remoteMessage);
        const body = remoteMessage.notification?.body;
        const title = remoteMessage.notification?.title;
        displayNotification(title, body);
      }
    });
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      const body = remoteMessage.notification?.body;
      const title = remoteMessage.notification?.title;
      displayNotification(title, body);
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
    messaging()
      .subscribeToTopic(TOPIC)
      .then(() => {
        console.log(`Topic: ${TOPIC} Suscribed`);
      });

    return () => {
      unsubscribe;
    };
  }, []);
  useEffect(() => {
    (async () => {
      if (errMessage !== '') {
        ToastMessage(errMessage, 'danger', 'bottom');
      }
    })();
  }, [userInfo, errMessage]);

  useEffect(() => {
    dispatch(userLogout());
  }, []);

  return (
    <Container style={styles.background}>
      <Content style={styles.contentView}>
        <AppLogo />
        <View style={styles.emailView}>
          <View style={styles.formGroup}>
            <Text style={styles.defaultLabel}>Email</Text>
            <TextInput
              style={styles.inputFiled}
              autoCapitalize="none"
              autoCompleteType="email"
              value={authData.username}
              onChangeText={text =>
                setAuthData({ ...authData, username: text })
              }
            />
          </View>
        </View>
        <View style={styles.passView}>
          <View style={styles.formGroup}>
            <Text style={styles.defaultLabel}>Password</Text>
            <TextInput
              style={styles.inputFiled}
              autoCapitalize="none"
              secureTextEntry={showIcon}
              name="password"
              value={authData.password}
              onChangeText={text =>
                setAuthData({ ...authData, password: text })
              }
            />
            {showIcon ? (
              <Icon
                type="Ionicons"
                name="eye-outline"
                style={styles.showIcon}
                onPress={() => setShowIcon(!showIcon)}
              />
            ) : (
              <Icon
                type="Ionicons"
                name="eye-off-outline"
                style={styles.showIcon}
                onPress={() => setShowIcon(!showIcon)}
              />
            )}
            <TouchableOpacity
              onPress={() => navigation.navigate(Routes.ForgotPass)}>
              <Text style={[styles.defaultLabel, styles.forgotPassText]}>
                Forgot password
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.loginBtns}>
          <Button full rounded style={styles.loginBtn} onPress={login}>
            <Text style={styles.loginBtnText}>Log In</Text>
          </Button>
          <Text style={[styles.defaultLabel, styles.withText]}>
            or log in with
          </Text>
          <View style={styles.socialBtns}>
            <TouchableOpacity onPress={signinWithGoogle}>
              <Image source={Images.google} style={styles.socialBtn} />
            </TouchableOpacity>
            <TouchableOpacity onPress={onAppleButtonPress}>
              <Image source={Images.apple} style={styles.socialBtn} />
            </TouchableOpacity>
            <TouchableOpacity onPress={signinWithFB}>
              <Image source={Images.facebook} style={styles.socialBtn} />
            </TouchableOpacity>
          </View>
          <View style={styles.signUpText}>
            <Text style={styles.defaultLabel}>Don't you have account? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate(Routes.Register)}>
              <Text style={[styles.defaultLabel, styles.underlineText]}>
                Sign up now
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <LoadingIndicator size="small" visible={loading} />
      </Content>
    </Container>
  );
};

export default Login;
