import React from 'react';

import { TextInput } from 'react-native';
import { Container, Content, Button, Text, View, Icon } from 'native-base';

import { useChangePassword } from 'Hooks/useChangePassword';
import LoadingIndicator from 'Components/LoadingIndicator';
import styles from './styles';

const ResetPassword = () => {
  const {
    showPassIcon,
    showConfirmNewPassIcon,
    showNewPassIcon,
    setShowPassIcon,
    setShowNewPassIcon,
    setShowConfirmNewPassIcon,
    oldPassword,
    setOldPassword,
    newPassword,
    setNewPassword,
    confirmNewPassword,
    setConfirmNewPassword,
    changePassword,
    passMismatch,
    hasError,
    loading,
    minPassLen
  } = useChangePassword();
  const errorText = (
    <View style={styles.errorView}>
      <Text style={styles.errorText}>
        Password must be minimum of {minPassLen} characters
      </Text>
    </View>
  );
  return (
    <Container style={styles.background}>
      <Content style={styles.contentView}>
        <View style={styles.forgotView}>
          <View>
            <View style={styles.formGroup}>
              <Text style={styles.defaultLabel}>Confirm Password</Text>
              <TextInput
                style={styles.inputFiled}
                autoCapitalize="none"
                secureTextEntry={showPassIcon}
                name="oldpassword"
                onChangeText={setOldPassword}
                value={oldPassword}
              />
              <Icon
                type="Feather"
                name={showPassIcon ? 'eye' : 'eye-off'}
                style={styles.showIcon}
                onPress={() => setShowPassIcon(!showPassIcon)}
              />
              {hasError &&
                oldPassword.length > 0 &&
                oldPassword.length < minPassLen &&
                errorText}
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.defaultLabel}>New Password</Text>
              <TextInput
                style={styles.inputFiled}
                autoCapitalize="none"
                secureTextEntry={showNewPassIcon}
                name="password"
                onChangeText={setNewPassword}
                value={newPassword}
              />
              <Icon
                type="Ionicons"
                name={showNewPassIcon ? 'eye-outline' : 'eye-off-outline'}
                style={styles.showIcon}
                onPress={() => setShowNewPassIcon(!showNewPassIcon)}
              />
              {hasError &&
                newPassword.length > 0 &&
                newPassword.length < minPassLen &&
                errorText}
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.defaultLabel}>Confirm new password</Text>
              <TextInput
                style={styles.inputFiled}
                autoCapitalize="none"
                secureTextEntry={showConfirmNewPassIcon}
                name="password"
                onChangeText={setConfirmNewPassword}
                value={confirmNewPassword}
              />

              <Icon
                type="Ionicons"
                name={
                  showConfirmNewPassIcon ? 'eye-outline' : 'eye-off-outline'
                }
                style={styles.showIcon}
                onPress={() =>
                  setShowConfirmNewPassIcon(!showConfirmNewPassIcon)
                }
              />
              {hasError &&
                !passMismatch &&
                confirmNewPassword.length > 0 &&
                confirmNewPassword.length < minPassLen &&
                errorText}
              {passMismatch && (
                <View style={styles.errorView}>
                  <Text style={styles.errorText}>
                    The password did not match
                  </Text>
                </View>
              )}
            </View>
          </View>
          <View style={styles.loginBtns}>
            <Button
              full
              rounded
              disabled={
                hasError ||
                passMismatch ||
                newPassword.length < minPassLen ||
                oldPassword.length < minPassLen ||
                confirmNewPassword.length < minPassLen
              }
              style={styles.loginBtn}
              onPress={!passMismatch && !hasError ? changePassword : null}>
              <Text style={styles.loginBtnText}>Confirm</Text>
            </Button>
          </View>
        </View>
        <LoadingIndicator size="small" visible={loading} />
      </Content>
    </Container>
  );
};

export default ResetPassword;
