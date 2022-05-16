import { StyleSheet, Dimensions } from 'react-native';
import { Colors, Fonts, scaleWidth } from 'Theme';

const deviceWidth = Dimensions.get('window').width;
const scale = deviceWidth / scaleWidth;

export default StyleSheet.create({
  background: {
    backgroundColor: 'white'
  },
  contentView: {
    flexGrow: 1,
    textAlign: 'center',
    paddingBottom: 50 * scale
  },
  paddingHorizontal: { paddingHorizontal: 30 * scale },
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
  searchView: {
    marginTop: 30 * scale,
    position: 'relative'
  },
  autoItemText: {
    fontSize: 15 * scale,
    marginVertical: 5 * scale,
    marginLeft: 15 * scale
  },
  inputField: {
    height: 40 * scale,
    borderColor: Colors.borderGrey,
    borderWidth: 1,
    borderRadius: 30 * scale,
    paddingLeft: 40 * scale,
    width: '100%',
    fontFamily: Fonts.regular,
    fontSize: 15 * scale
  },
  searchIcon: {
    position: 'absolute',
    fontSize: 20 * scale,
    top: 10 * scale,
    left: 10 * scale
  },
  titleText: {
    fontFamily: Fonts.medium,
    fontSize: 18 * scale,
    lineHeight: 21 * scale,
    color: 'black'
  },
  //-------categoryView------//
  categoryView: {
    marginTop: 30 * scale
  },
  categoryTitle: {
    textAlign: 'center'
  },
  categoryList: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30 * scale
  },
  categoryItemView: {
    alignItems: 'center',
    marginLeft: 20,
    width: scale * 58
  },
  marginRight: {
    marginRight: 20
  },
  marginLeft: {
    marginLeft: 20
  },
  categoryItem: {
    width: 46 * scale,
    justifyContent: 'center',
    alignItems: 'center'
  },
  categoryText: {
    fontFamily: Fonts.regular,
    fontSize: 11 * scale,
    lineHeight: 11 * scale,
    textAlign: 'center',
    marginTop: 5 * scale,
    color: 'black'
  },
  beerImage: {
    width: 30 * scale,
    height: 30 * scale
  },
  wineImage: {
    width: 27 * scale,
    height: 39 * scale
  },
  hardImage: {
    width: 35 * scale,
    height: 40 * scale,
    top: -5 * scale
  },
  cockImage: {
    width: 37 * scale,
    height: 44 * scale
  },
  foodImage: {
    width: 42 * scale,
    height: 40 * scale
  },
  //-----featuredView---//
  featuredView: {
    marginTop: 40 * scale
  },
  featuredViewLabel: {
    paddingHorizontal: 30 * scale
  },
  advertisement: {
    width: deviceWidth,
    height: 115 * scale,
    marginTop: 30 * scale,
    justifyContent: 'center',
    alignItems: 'center'
  },
  advertisementText: {
    fontFamily: Fonts.bold,
    fontSize: 24 * scale,
    lineHeight: 28 * scale,
    textAlign: 'center',
    color: 'white'
  },
  //-----promotionView----//
  promotionView: {
    marginTop: 35 * scale
  },
  vendorContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: { width: 3, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    height: '100%'
  },
  noTitle: { marginTop: 0, paddingBottom: 10 },
  happyHour: { fontSize: 24, fontWeight: '700' },
  checkbox: { padding: 5, flexDirection: 'row' },
  checkboxLabelContainer: { flex: 1 },
  checkboxLabel: { fontSize: 12 },
  checkboxButton: { alignSelf: 'flex-end' },
  locationText: {
    marginLeft: 5 * scale,
    fontFamily: Fonts.light,
    fontSize: 15 * scale,
    textAlign: 'center',
    color: Colors.orange
  },
  locationIcon: {
    width: 20 * scale,
    height: 20 * scale,
    tintColor: Colors.orange
  }
});
