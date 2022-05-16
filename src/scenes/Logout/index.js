import React from 'react';

import { Container, Content, Button, Text, View } from 'native-base';
import styles from './styles';
import { Modal } from 'react-native';
import { useDispatch } from 'react-redux';
import { userLogout } from 'Store/login/actions';

const Logout = ({ isVisible, onCancel }) => {
  const dispatch = useDispatch();

  const distroySession = () => {
    setTimeout(() => {
      dispatch(userLogout());
    }, 500);
  };
  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <Container style={styles.background}>
        <Content style={styles.contentView}>
          <View style={styles.logOutView}>
            <View>
              <View style={styles.formGroup}>
                <Text style={styles.headerLabel}>log out</Text>
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.logOutText}>
                  Are you sure you want to log out?
                </Text>
              </View>
            </View>
            <View style={styles.logOutBtns}>
              <Button
                full
                rounded
                style={styles.logOutBtn}
                onPress={distroySession}>
                <Text style={styles.loginBtnText}>Log Out</Text>
              </Button>
              <View style={styles.buttonsSeperator} />
              <Button full rounded style={styles.cancelBtn} onPress={onCancel}>
                <Text style={styles.loginBtnText}>Cancel</Text>
              </Button>
            </View>
          </View>
        </Content>
      </Container>
    </Modal>
  );
};

export default Logout;
