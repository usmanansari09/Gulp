import { StyleSheet, Dimensions } from 'react-native';
import { Colors, Fonts } from 'Theme';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const scale = deviceWidth / 414;

export default StyleSheet.create({
  background: {
    backgroundColor: 'white'
  },
  contentView: {
    flexGrow: 1,
    textAlign: 'center',
    paddingBottom: 50 * scale
  },
  cententContainer: {
    paddingHorizontal: 50 * scale
  },
  defaultLabel: {
    fontFamily: Fonts.regular,
    fontSize: 12 * scale,
    lineHeight: 14 * scale,
    color: 'black'
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30 * scale,
    position: 'relative',
    alignItems: 'center'
  },
  backBtnView: {
    position: 'absolute',
    left: 20 * scale
  },
  backBtn: {
    color: Colors.orange,
    fontSize: 28 * scale
  },
  logoImg: {
    width: 94 * scale,
    height: 42 * scale
  },
  titleText: {
    fontFamily: Fonts.bold,
    fontSize: 24 * scale,
    lineHeight: 28 * scale,
    color: 'black',
    textAlign: 'center',
    marginTop: 28 * scale
  },
  descText: {
    fontFamily: Fonts.light,
    fontSize: 10 * scale,
    lineHeight: 12 * scale,
    color: 'black',
    textAlign: 'center',
    marginTop: 28 * scale
  },
  forgotView: {
    position: 'relative',
    flex: 1,
    height: deviceHeight / 2,
    justifyContent: 'space-between',
    marginTop: 66 * scale
  },
  formGroup: {
    flexDirection: 'column',
    marginBottom: 18 * scale
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

  loginBtns: {
    marginTop: 28 * scale,
    marginHorizontal: 45 * scale,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loginBtn: {
    backgroundColor: Colors.orange
  },
  loginBtnText: {
    fontFamily: Fonts.bold,
    fontSize: 18 * scale,
    lineHeight: 21 * scale,
    color: 'white'
  },
  errorText: {
    fontFamily: Fonts.regular,
    fontSize: 14 * scale,
    color: 'crimson'
  },
  errorView: {
    paddingVertical: 5 * scale
  }
});
