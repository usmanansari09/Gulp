import React, { useCallback, useEffect, useState } from 'react';

import { Container, Content, Button, Text, View } from 'native-base';
import styles from './styles';
import {
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native';
import Picker from '@gregfrench/react-native-wheel-picker';
import { AppText } from 'Components/AppText';
import { ToastMessage } from 'Components';
import { weekDays } from '../../util/constants';
import { TimePickerModal } from 'react-native-paper-dates';
import { convert24HoursTo12Hours } from '../../util/date';

const PickerItem = Picker.Item;

const AddTimeline = ({
  isVisible,
  onSubmit,
  onDismiss,
  weekday,
  from = '00:00',
  to = '00:00',
  buttonLabel
}) => {
  const itemList = weekDays;
  const [showFrom, setShowFrom] = useState(false);
  const [showTo, setShowTo] = useState(false);
  const [selectedItem, setSelectedItem] = useState(
    itemList.indexOf(weekday ?? 0)
  );
  const [timeTo, setTimeTo] = useState(to ? to : '00:00');
  const [timeFrom, setTimeFrom] = useState(from ? from : '00:00');

  const validateTime = useCallback(() => {
    const test = /\d{2}:\d{2}/;

    if (test.test(timeFrom) && test.test(timeTo)) {
      const now = new Date();
      const splitTimeFrom = timeFrom.split(':');
      const splitTimeTo = timeTo.split(':');
      const time_from = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        parseInt(splitTimeFrom[0]),
        parseInt(splitTimeFrom[1])
      );
      const time_to = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        parseInt(splitTimeTo[0]),
        parseInt(splitTimeTo[1])
      );
      return time_to.getTime() > time_from.getTime();
    }
    return false;
  }, [timeTo, timeFrom]);

  const dismissModal = () => {
    setTimeFrom('00:00');
    setTimeTo('00:00');
    setSelectedItem(undefined);
    onDismiss();
  };
  const submitData = () => {
    onSubmit({
      weekday: itemList[selectedItem],
      time_from: timeFrom,
      time_to: timeTo
    });
    setTimeFrom('00:00');
    setTimeTo('00:00');
    setSelectedItem(undefined);
  };

  const insertZeros = num => {
    return num.toString().length === 1 ? 0 + num.toString() : num;
  };

  const TimeRow = ({
    rowTitle,
    onPressTime,
    displayTime,
    onClose,
    visible,
    onConfirm,
    hours,
    minutes
  }) => {
    return (
      <View style={styles.timeRow}>
        <AppText style={styles.timeRowText}>{rowTitle}</AppText>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.containerStyle}
          onPress={onPressTime}>
          <AppText style={styles.timeRowText}>{displayTime}</AppText>
        </TouchableOpacity>
        <TimePickerModal
          visible={visible}
          onDismiss={onClose}
          onConfirm={onConfirm}
          hours={hours} // default: current hours
          minutes={minutes} // default: current minutes
          label="Select time" // optional, default 'Select time'
          uppercase={false} // optional, default is true
          cancelLabel="Cancel" // optional, default: 'Cancel'
          confirmLabel="Ok" // optional, default: 'Ok'
          animationType="fade" // optional, default is 'none'
          locale="en" // optional, default is automically detected by your system
        />
      </View>
    );
  };

  return (
    <Modal visible={isVisible} transparent={true} onRequestClose={dismissModal}>
      <TouchableWithoutFeedback onPressOut={dismissModal}>
        <Container style={styles.background}>
          <Content
            style={styles.contentView}
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
            <TouchableWithoutFeedback>
              <View>
                <View style={styles.pickerContainer}>
                  <View style={styles.dayPicker}>
                    <Text>
                      <Picker
                        style={styles.picker}
                        lineColor="#FFFFFF" //to set top and bottom line color (Without gradients)
                        lineGradientColorFrom="#FFFFFF" //to set top and bottom starting gradient line color
                        lineGradientColorTo="#FFFFFF" //to set top and bottom ending gradient
                        selectedValue={selectedItem}
                        itemStyle={{ color: 'white', fontSize: 22 }}
                        onValueChange={index => setSelectedItem(index)}>
                        {itemList.map((value, i) => (
                          <PickerItem label={value} value={i} key={i} />
                        ))}
                      </Picker>
                    </Text>
                  </View>
                  <View style={{ flex: 1, padding: 20 }}>
                    <TimeRow
                      rowTitle={'From:'}
                      displayTime={convert24HoursTo12Hours(timeFrom)}
                      hours={timeFrom.split(':')[0]}
                      minutes={timeFrom.split(':')[1]}
                      onClose={() => setShowFrom(false)}
                      onConfirm={selectedTime => {
                        setTimeFrom(
                          insertZeros(selectedTime.hours) +
                            ':' +
                            insertZeros(selectedTime.minutes)
                        );
                        setShowFrom(false);
                      }}
                      onPressTime={() => setShowFrom(true)}
                      visible={showFrom}
                    />
                    <TimeRow
                      rowTitle={'To:'}
                      hours={timeTo.split(':')[0]}
                      minutes={timeTo.split(':')[1]}
                      displayTime={convert24HoursTo12Hours(timeTo)}
                      onClose={() => setShowTo(false)}
                      onConfirm={selectedTime => {
                        setTimeTo(
                          insertZeros(selectedTime.hours) +
                            ':' +
                            insertZeros(selectedTime.minutes)
                        );
                        setShowTo(false);
                      }}
                      onPressTime={() => setShowTo(true)}
                      visible={showTo}
                    />
                  </View>
                </View>
                <View style={styles.buttonsContainer}>
                  <Button
                    full
                    rounded
                    style={styles.cancelBtn}
                    onPress={
                      selectedItem !== undefined
                        ? () => {
                            const pass = validateTime();
                            if (pass) {
                              submitData();
                            } else {
                              ToastMessage('Invalid time', 'danger', 'bottom');
                            }
                          }
                        : undefined
                    }>
                    <AppText style={styles.cancelBtnText}>
                      {buttonLabel}
                    </AppText>
                  </Button>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Content>
        </Container>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default AddTimeline;
