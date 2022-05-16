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
    flexGrow: 1,
    textAlign: 'center'
  },
  badgeImage: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    resizeMode: 'contain'
  },
  headerLabel: {
    fontFamily: Fonts.regular,
    fontSize: 24 * scale,
    lineHeight: 28 * scale,
    color: 'white',
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  badgeDescription: {
    fontFamily: Fonts.regular,
    fontSize: 18 * scale,
    lineHeight: 21 * scale,
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
  badgeView: {
    position: 'relative',
    flex: 1,
    height: deviceHeight / 2,
    marginTop: 119 * scale
  },
  formGroup: {
    flexDirection: 'column'
  },
  buttonsContainer: {
    marginTop: 28 * scale,
    marginHorizontal: 45 * scale,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cancelBtn: {
    backgroundColor: Colors.orange
  },
  cancelBtnText: {
    fontFamily: Fonts.bold,
    fontSize: 18 * scale,
    lineHeight: 21 * scale,
    color: 'white',
    textTransform: 'uppercase'
  },
  buttonsSeperator: { padding: 10 },
  acquiredText: {
    color: Colors.white,
    fontSize: 14 * scale,
    lineHeight: 16 * scale
  }
});
