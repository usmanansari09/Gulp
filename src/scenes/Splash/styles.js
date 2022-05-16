import { StyleSheet, Dimensions, Platform } from 'react-native';
import { Colors, Fonts } from 'Theme';

const deviceWidth = Dimensions.get('window').width;
const scale = deviceWidth / 414;

export default StyleSheet.create({
  background: {
    backgroundColor: 'white'
  },
  contentView: {
    marginHorizontal: 50 * scale,
    flexGrow: 1,
    textAlign: 'center'
  },
  logoView: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  logoImg: {
    width: 250 * scale,
    height: 120 * scale,
    marginTop: 70 * scale
  },
  btnView: {
    marginTop: 50 * scale
  }
});
