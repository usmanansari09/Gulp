import { StyleSheet, Dimensions } from 'react-native';
import { Colors, Fonts } from 'Theme';

const deviceWidth = Dimensions.get('window').width;
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
  paddingHorizontal: {
    paddingHorizontal: 30 * scale
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
    marginVertical: 30 * scale
  },
  logoImg: {
    width: 94 * scale,
    height: 42 * scale
  },
  searchView: {
    marginTop: 15 * scale,
    position: 'relative'
  },
  inputField: {
    height: 40 * scale,
    borderColor: Colors.borderGrey,
    borderWidth: 1,
    borderRadius: 30 * scale,
    paddingLeft: 40 * scale,
    width: '100%',
    fontFamily: Fonts.regular,
    fontSize: 14 * scale,
    paddingVertical: 5 * scale
  },
  searchIcon: {
    position: 'absolute',
    fontSize: 20 * scale,
    top: 10 * scale,
    left: 10 * scale,
    color: Colors.gray
  },
  sectionText: {
    fontFamily: Fonts.medium,
    fontSize: 14 * scale,
    lineHeight: 16 * scale,
    color: Colors.orange
  },
  recentView: {
    marginVertical: 13 * scale,
    paddingHorizontal: 20 * scale
  },
  recentItem: {
    marginTop: 13 * scale,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: 'rgba(210,210,210,0.66)',
    borderBottomWidth: 0.5,
    paddingBottom: 10 * scale
  },
  recentItemImg: {
    width: 43 * scale,
    height: 43 * scale,
    borderRadius: 7
  },
  recentItemText: {
    fontSize: 16 * scale
  },
  titleText: {
    fontFamily: Fonts.medium,
    fontSize: 18 * scale,
    lineHeight: 21 * scale,
    color: 'black'
  },
  resultView: {
    marginTop: 20 * scale
  },
  sectionView: {
    marginTop: 19 * scale,
    marginBottom: 30 * scale
  },
  sectionTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  descriptionText: {
    fontSize: 12,
    color: 'rgba(66,66,66,0.66)'
  },
  recentNameContainer: {
    marginLeft: 8 * scale
  }
});
