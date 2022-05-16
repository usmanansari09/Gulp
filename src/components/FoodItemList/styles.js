import { StyleSheet, Dimensions } from 'react-native';
import { Colors, Fonts, scaleWidth } from 'Theme';

const deviceWidth = Dimensions.get('window').width;
const scale = deviceWidth / scaleWidth;

export default StyleSheet.create({
  list: {
    marginTop: 13 * scale
  },
  listContainer: {
    paddingHorizontal: 30 * scale,
    paddingBottom: 15 * scale
  },
  content: {
    borderRadius: 13 * scale,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.3,
    shadowRadius: 6.27,
    elevation: 7,
    width: 254 * scale
  },
  imageView: {
    width: 254 * scale,
    height: 162 * scale,
    borderTopLeftRadius: 13 * scale,
    borderTopRightRadius: 13 * scale
  },
  titleView: {
    paddingHorizontal: 12 * scale,
    paddingVertical: 6 * scale
  },
  descView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8 * scale
  },
  textMid: {
    fontFamily: Fonts.regular,
    fontSize: 18 * scale,
    lineHeight: 21 * scale,
    color: 'black'
  },
  textBig: {
    fontFamily: Fonts.regular,
    fontSize: 20 * scale,
    lineHeight: 24 * scale,
    color: 'black',
    width: 180 * scale
  },
  textExtra: {
    fontFamily: Fonts.regular,
    fontSize: 24 * scale,
    lineHeight: 28 * scale,
    color: 'black'
  },
  textSmall: {
    fontFamily: Fonts.regular,
    fontSize: 14 * scale,
    lineHeight: 17 * scale,
    color: 'black'
  },
  sizeText: {
    color: Colors.orange,
    fontFamily: Fonts.medium
  },
  marginRightLastChild: { marginRight: 60 * scale },
  marginRight: { marginRight: 23 * scale }
});
