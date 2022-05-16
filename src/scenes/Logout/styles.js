import { StyleSheet, Dimensions } from 'react-native';
import { Colors, Fonts, scaleWidth } from 'Theme';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const scale = deviceWidth / scaleWidth;

export default StyleSheet.create({
  background: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)'
  },
  contentView: {
    paddingHorizontal: 50 * scale,
    flexGrow: 1,
    textAlign: 'center',
    paddingBottom: 50 * scale
  },
  headerLabel: {
    fontFamily: Fonts.regular,
    fontSize: 36 * scale,
    lineHeight: 42 * scale,
    color: 'white',
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  logOutText: {
    fontFamily: Fonts.regular,
    fontSize: 18 * scale,
    lineHeight: 42 * scale,
    width: '60%',
    textAlign: 'center',
    color: 'white',
    alignSelf: 'center'
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30 * scale,
    position: 'relative',
    alignItems: 'center'
  },
  logOutView: {
    position: 'relative',
    flex: 1,
    height: deviceHeight / 2,
    justifyContent: 'space-between',
    marginTop: 119 * scale
  },
  formGroup: {
    flexDirection: 'column',
    marginBottom: 18 * scale
  },
  logOutBtns: {
    marginTop: 28 * scale,
    marginHorizontal: 45 * scale,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logOutBtn: {
    backgroundColor: Colors.orange
  },
  cancelBtn: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.white
  },
  loginBtnText: {
    fontFamily: Fonts.bold,
    fontSize: 18 * scale,
    lineHeight: 21 * scale,
    color: 'white',
    textTransform: 'uppercase'
  },
  buttonsSeperator: { height: 14 }
});
