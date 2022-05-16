import React from 'react';
import { TextInput, TouchableOpacity } from 'react-native';
import { Container, Content, Button, Text, View, Icon } from 'native-base';
import FastImage from 'react-native-fast-image';

import { useEditProfile } from 'Hooks/useEditProfile';
import AppLogo from 'Components/AppLogo';
import styles from './styles';

const EditProfile = () => {
  const {
    userData,
    setUserData,
    selectImage,
    submitEditProfile,
    resourcePath
  } = useEditProfile();

  return (
    <Container style={styles.background}>
      <Content style={styles.contentView}>
        <AppLogo imgStyle={styles.logoImg} containerStyle={styles.logoView} />

        <View style={styles.imageBackDesign}>
          <View>
            <FastImage
              style={styles.fastImageStyle}
              //source={{ uri: profilePic }}
              source={{
                uri: resourcePath?.uri || 'https://unsplash.it/400/400?image=1'
              }}
            />
            <TouchableOpacity
              style={styles.imagePickerWrapper}
              activeOpacity={0.8}
              onPress={() => {
                selectImage();
              }}>
              <Icon
                name="account-edit-outline"
                type="MaterialCommunityIcons"
                style={styles.disclosureIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.defaultLabel}>First name</Text>
          <TextInput
            style={styles.inputFiled}
            autoCompleteType="name"
            value={userData.first_name}
            onChangeText={text =>
              setUserData({ ...userData, first_name: text })
            }
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.defaultLabel}>Last name</Text>
          <TextInput
            style={styles.inputFiled}
            autoCompleteType="name"
            value={userData.last_name}
            onChangeText={text => setUserData({ ...userData, last_name: text })}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.defaultLabel}>Phone number</Text>
          <TextInput
            style={styles.inputFiled}
            autoCapitalize="none"
            value={userData.phone_number}
            onChangeText={text =>
              setUserData({ ...userData, phone_number: text })
            }
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.defaultLabel}>Email</Text>
          <TextInput
            style={styles.inputFiled}
            autoCapitalize="none"
            autoCompleteType="email"
            value={userData.email}
            onChangeText={text => setUserData({ ...userData, email: text })}
          />
        </View>
        <View style={styles.loginBtns}>
          <Button
            full
            rounded
            style={styles.loginBtn}
            onPress={submitEditProfile}>
            <Text style={styles.loginBtnText}>Update</Text>
          </Button>
        </View>
      </Content>
    </Container>
  );
};

export default EditProfile;
