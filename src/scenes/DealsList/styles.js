import { StyleSheet, Dimensions } from 'react-native';
import { Colors, Fonts, scaleWidth } from 'Theme';

const deviceWidth = Dimensions.get('window').width;
const scale = deviceWidth / scaleWidth;

const styles = StyleSheet.create({
  container: { flex: 1, paddingVertical: 30, paddingHorizontal: 30 },
  scrollView: { backgroundColor: Colors.white, flexGrow: 1 },
  headerText: { paddingBottom: 15, fontSize: 18 },
  recentlyEarned: {},
  allBadges: {},
  flexWrap: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    paddingBottom: 20
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
    flexBasis: '48%'
  },
  imageView: {
    height: 120 * scale,
    width: '100%',
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
    flexShrink: 1,
    flex: 1,
    width: '100%',
    maxWidth: '100%',
    marginBottom: 8 * scale
  },
  textContainer: {
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
    fontSize: 18 * scale,
    lineHeight: 24 * scale,
    width: '100%',
    color: 'black'
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
  marginRight: { marginRight: 23 * scale },
  marginLeft: { marginLeft: 23 * scale },
  empty: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  }
});

export default styles;
