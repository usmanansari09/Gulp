import { StyleSheet, Dimensions } from 'react-native';
import { Colors, Fonts, scaleWidth } from 'Theme';

const deviceWidth = Dimensions.get('window').width;
const scale = deviceWidth / scaleWidth;

export default StyleSheet.create({
  background: {
    backgroundColor: 'white'
  },
  contentView: {
    paddingHorizontal: 50 * scale,
    flexGrow: 1,
    textAlign: 'center',
    paddingBottom: 50 * scale
  },
  defaultLabel: {
    fontFamily: Fonts.regular,
    fontSize: 12 * scale,
    lineHeight: 14 * scale,
    color: 'black'
  },
  logoView: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30 * scale
  },
  logoImg: {
    width: 94 * scale,
    height: 42 * scale
  },
  ownerText: {
    fontFamily: Fonts.medium,
    fontSize: 14 * scale,
    lineHeight: 16 * scale,
    color: Colors.orange,
    marginTop: 21 * scale,
    marginBottom: 11 * scale,
    textAlign: 'center'
  },
  emailView: {
    marginTop: 70 * scale
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
    paddingVertical: 5 * scale,
    color: Colors.black
  },
  showIcon: {
    position: 'absolute',
    fontSize: 20 * scale,
    marginLeft: 30 * scale,
    right: 10,
    top: 22,
    color: Colors.gray
  },
  forgotPassText: {
    marginTop: 3 * scale,
    textAlign: 'right'
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
  withText: {
    marginVertical: 25 * scale
  },
  socialBtns: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  socialBtn: {
    width: 48 * scale,
    height: 48 * scale
  },
  signUpText: {
    flexDirection: 'row',
    marginVertical: 25 * scale
  },
  underlineText: {
    textDecorationLine: 'underline'
  }
});
