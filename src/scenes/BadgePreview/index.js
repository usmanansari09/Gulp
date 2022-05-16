import React from 'react';

import { Container, Content, Button, Text, View } from 'native-base';
import styles from './styles';
import { Modal, Image } from 'react-native';

const BadgePreview = ({ isVisible, onCancel, badge }) => {
  const { img_url, name, description, acquired_on } = badge;
  return (
    <Modal visible={isVisible} transparent={true}>
      <Container style={styles.background}>
        <Content style={styles.contentView}>
          <View style={styles.badgeView}>
            <View>
              <View style={styles.formGroup}>
                <Image
                  source={{ uri: img_url.split('X-Amz-Algorithm=')[0] }}
                  style={styles.badgeImage}
                />
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.headerLabel}>{name}</Text>
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.badgeDescription}>{description}</Text>
              </View>
            </View>
            <View style={styles.buttonsContainer}>
              {acquired_on && (
                <View style={styles.buttonsSeperator}>
                  <Text style={styles.acquiredText}>
                    Acquired:
                    {acquired_on &&
                      new Date(acquired_on).toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true
                      })}
                  </Text>
                </View>
              )}
              <Button full rounded style={styles.cancelBtn} onPress={onCancel}>
                <Text style={styles.cancelBtnText}>Back</Text>
              </Button>
            </View>
          </View>
        </Content>
      </Container>
    </Modal>
  );
};

export default BadgePreview;
