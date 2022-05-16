import React from 'react';
import { Image, TextInput } from 'react-native';
import { Container, Content, Button, Text, View } from 'native-base';
import { Images } from 'Theme';
import CustomBackButton from 'Components/CustomBackButton';
import styles from './styles';
import LoadingIndicator from 'Components/LoadingIndicator';
import { useForgotPassword } from 'Hooks/useForgotPassword';

const ForgotPassword = () => {
  const { loading, hasError, submitEmail, email, setEmail, goBack } =
    useForgotPassword();
  return (
    <Container style={styles.background}>
      <Content style={styles.contentView}>
        <View style={styles.headerView}>
          <CustomBackButton style={styles.backBtnView} onPress={goBack} />
          <Image source={Images.logo} style={styles.logoImg} />
        </View>
        <View style={styles.cententContainer}>
          <Text style={styles.titleText}>Forgot password?</Text>
          <Text style={styles.descText}>
            Enter the email associated with your account and we will send you an
            email with instructions to reset your password
          </Text>
          <View style={styles.forgotView}>
            <View style={styles.formGroup}>
              <Text style={styles.defaultLabel}>Email</Text>
              <TextInput
                style={styles.inputFiled}
                autoCapitalize="none"
                autoCompleteType="email"
                value={email}
                onChangeText={setEmail}
              />
              {hasError && (
                <View style={styles.errorView}>
                  <Text style={styles.errorText}>
                    Provide a valid email address
                  </Text>
                </View>
              )}
            </View>
            <View style={styles.loginBtns}>
              <Button
                full
                rounded
                disabled={hasError || !email.length}
                style={styles.loginBtn}
                onPress={submitEmail}>
                <Text style={styles.loginBtnText}>Send</Text>
              </Button>
            </View>
          </View>
        </View>
        <LoadingIndicator size="small" visible={loading} />
      </Content>
    </Container>
  );
};

export default ForgotPassword;
