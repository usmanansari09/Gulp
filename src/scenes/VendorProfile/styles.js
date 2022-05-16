import { StyleSheet, Dimensions } from 'react-native';
import { Colors, scaleWidth, Fonts } from 'Theme';

const deviceWidth = Dimensions.get('window').width;
const scale = deviceWidth / scaleWidth;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  userNameText: { fontWeight: '700', color: Colors.white, fontSize: 22 },
  numberText: { fontWeight: '700', color: Colors.white, fontSize: 24 },
  textLabel: { fontSize: 12, color: Colors.white, opacity: 0.7 },
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
    paddingVertical: 20,
    borderBottomColor: Colors.orange,
    borderBottomWidth: 2,
    marginHorizontal: 20
  },
  headingTitle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleText: { fontSize: 24 },
  scrollView: { marginHorizontal: 20 },
  inputField: {
    borderWidth: 1,
    borderColor: Colors.orange,
    borderBottomWidth: 1,
    width: '100%',
    height: 40,
    alignSelf: 'center',
    borderRadius: 20
  },
  underlinedInput: {
    borderColor: 'transparent',
    borderWidth: 0,
    borderBottomColor: Colors.orange,
    borderBottomWidth: 1,
    width: '50%',
    alignSelf: 'center',
    textAlign: 'center',
    borderRadius: 0
  },
  buttonsContainer: {
    marginVertical: 28 * scale,
    marginHorizontal: 45 * scale,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    backgroundColor: Colors.orange,
    height: 45,
    width: '60%',
    alignSelf: 'center'
  },
  buttonText: {
    fontFamily: Fonts.bold,
    fontSize: 18 * scale,
    lineHeight: 21 * scale,
    color: 'white'
  }
});

export default styles;
