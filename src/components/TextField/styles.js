import { StyleSheet, Dimensions } from 'react-native';
import { Colors, Fonts, scaleWidth } from 'Theme';

const deviceWidth = Dimensions.get('window').width;
const scale = deviceWidth / scaleWidth;

export default StyleSheet.create({
  defaultLabel: {
    fontFamily: Fonts.regular,
    fontSize: 12 * scale,
    // lineHeight: 14 * scale,
    color: 'black'
  },
  formGroup: {
    flexDirection: 'column'
  },
  inputFiled: {
    height: 35 * scale,
    borderColor: Colors.borderGrey,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10 * scale,
    marginTop: 2 * scale,
    fontFamily: Fonts.regular,
    fontSize: 15 * scale,
    paddingVertical: 5 * scale
  },
  inputFiledContaienr: {
    width: '100%'
  },
  iconsRight: {
    position: 'absolute',
    fontSize: 20 * scale,
    marginLeft: 30 * scale,
    left: 10,
    top: 22,
    color: Colors.gray
  },
  iconsLeft: {
    position: 'absolute',
    fontSize: 20 * scale,
    marginLeft: 30 * scale,
    right: 10,
    top: 22,
    color: Colors.gray
  }
});
