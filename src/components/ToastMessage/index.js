import { Toast } from 'native-base';

const ToastMessage = (msg, type, position) => {
  return Toast.show({
    text: msg,
    buttonText: 'Okay',
    type: type,
    position: position,
    duration: 3000
  });
};

export default ToastMessage;
