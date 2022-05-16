import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { ToastMessage } from 'Components';
import getRequestErrorMessage from '../util/index';
import { API_AUTH_REST } from '@env';
import { Routes } from 'Navigators/routes';

export const useForgotPassword = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const matchEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const submitEmail = async () => {
    try {
      setLoading(true);
      const data = {
        email: email
      };

      const results = await axios.post(`${API_AUTH_REST}password/reset/`, data);
      if (results.status === 200) {
        ToastMessage(results.data.detail, 'success', 'bottom');
        setEmail('');
        setLoading(false);
        goBack();
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

  const goBack = () => navigation.navigate(Routes.Login);

  useEffect(() => {
    if (email.length && !matchEmail.test(email)) {
      setHasError(true);
    } else {
      setHasError(false);
    }
  }, [email]);

  return {
    submitEmail,
    email,
    setEmail,
    loading,
    hasError,
    goBack
  };
};
