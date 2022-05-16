import { Dimensions, StyleSheet } from 'react-native';
import { scaleWidth } from 'Theme';

const deviceWidth = Dimensions.get('window').width;
const scale = deviceWidth / scaleWidth;
export default StyleSheet.create({
  logoView: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  logoImg: {
    width: 245 * scale,
    height: 110 * scale,
    marginTop: 67 * scale
  }
});
