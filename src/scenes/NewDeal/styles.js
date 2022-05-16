import { StyleSheet, Dimensions } from 'react-native';
import { Colors, scaleWidth, Fonts } from 'Theme';

const deviceWidth = Dimensions.get('window').width;
const scale = deviceWidth / scaleWidth;

const styles = StyleSheet.create({
  background: { backgroundColor: Colors.white },
  container: { flexGrow: 1, paddingBottom: 50 * scale },
  userNameText: { fontWeight: '700', color: Colors.white, fontSize: 22 },
  numberText: { fontWeight: '700', color: Colors.white, fontSize: 24 },
  textLabel: { fontSize: 18, fontWeight: '700' },
  flexRowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10
  },
  flexRowItem: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5
  },
  userAvatar: {
    position: 'relative',
    width: 110,
    height: 110,
    borderRadius: 110,
    borderWidth: 2,
    borderColor: Colors.orangeDark,
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: { width: 3, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 3
  },
  userInfoView: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: 30
  },
  profileActions: { paddingHorizontal: 20, paddingVertical: 15, flex: 1 },
  heading: {
    flexDirection: 'row',
    backgroundColor: Colors.white
  },
  headingTitle: {
    flex: 1,
    paddingVertical: 20,
    flexDirection: 'row',
    borderBottomColor: Colors.orange,
    alignItems: 'center',
    borderBottomWidth: 2,
    justifyContent: 'center',
    marginHorizontal: 20
  },
  titleText: { fontSize: 24 },
  marginHorizontal: { marginHorizontal: 20 },
  inputField: {
    borderWidth: 1,
    borderColor: Colors.orange,
    borderBottomWidth: 1,
    width: '100%',
    alignSelf: 'center',
    borderRadius: 20
  },
  underlinedInput: {
    borderColor: 'transparent',
    borderWidth: 0,
    borderBottomColor: Colors.orange,
    borderBottomWidth: 1,
    width: '100%',
    alignSelf: 'center',
    borderRadius: 0
  },
  flexSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%'
  },
  buttonsContainer: {
    marginVertical: 28 * scale,
    marginHorizontal: 45 * scale,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    backgroundColor: Colors.orange,
    height: 58,
    width: '60%',
    alignSelf: 'center'
  },
  buttonText: {
    fontFamily: Fonts.bold,
    fontSize: 18 * scale,
    lineHeight: 21 * scale,
    color: 'white'
  },
  column80: { flexDirection: 'column', width: '80%' },
  paddingBottom: { paddingBottom: 20 },
  disclosureIcon: { color: Colors.orange, fontSize: 15, width: 14 },
  recentDealsLabel: { paddingTop: 20, paddingBottom: 5 },
  recentDealsText: { color: Colors.orange, fontWeight: '700', fontSize: 14 },
  horizontalScrollView: { paddingHorizontal: 20 },
  menuItemImage: {
    width: 78,
    height: 78,
    borderRadius: 4
  },
  dealDateContainer: { flexDirection: 'row' },
  dealDate: { color: Colors.orange, paddingLeft: 5 }
});

export default styles;
