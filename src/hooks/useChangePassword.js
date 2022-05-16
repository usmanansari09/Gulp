import { useEffect, useState, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastMessage } from 'Components';
import getRequestErrorMessage from '../util/index';
import { API_AUTH_REST } from '@env';

export const useChangePassword = () => {
  const navigation = useNavigation();
  const [showPassIcon, setShowPassIcon] = useState(true);
  const [showNewPassIcon, setShowNewPassIcon] = useState(true);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [passMismatch, setPassMismatch] = useState(false);
  const [showConfirmNewPassIcon, setShowConfirmNewPassIcon] = useState(true);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const minPassLen = 8;
  useEffect(() => {
    navigation.setOptions({ title: 'Change Password' });
  }, []);
  useEffect(() => {
    if (
      (oldPassword.length || newPassword.length || confirmNewPassword.length) &&
      (oldPassword.length < minPassLen ||
        newPassword.length < minPassLen ||
        confirmNewPassword.length < minPassLen)
    ) {
      setHasError(true);
    } else {
      setHasError(false);
    }
  }, [oldPassword, newPassword, confirmNewPassword]);
  useEffect(() => {
    if (
      (newPassword.length >= minPassLen ||
        confirmNewPassword.length >= minPassLen) &&
      newPassword !== confirmNewPassword
    ) {
      setPassMismatch(true);
    } else {
      setPassMismatch(false);
    }
  }, [newPassword, confirmNewPassword]);

  const changePassword = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');
      axios.defaults.headers = {
        'Content-Type': 'application/json',
        Authorization: 'Token ' + token
      };
      const data = {
        old_password: oldPassword,
        new_password1: newPassword,
        new_password2: confirmNewPassword
      };

      const results = await axios.post(
        `${API_AUTH_REST}password/change/`,
        data
      );
      if (results.status === 200) {
        ToastMessage('Password Changed successfully', 'success', 'bottom');
        setOldPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      ToastMessage(
        getRequestErrorMessage(err.response ? err.response.data : err.message),
        'danger',
        'bottom'
      );
    }
  };

  const passwordDidMatch = useCallback(() => {
    return newPassword === confirmNewPassword;
  }, [newPassword, confirmNewPassword]);

  return {
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
    passwordDidMatch,
    changePassword,
    loading,
    setLoading,
    hasError,
    passMismatch,
    minPassLen
  };
};
