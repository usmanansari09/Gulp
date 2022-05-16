import { StyleSheet, Dimensions } from 'react-native';
import { Colors, Fonts, scaleWidth } from 'Theme';

const deviceWidth = Dimensions.get('window').width;
const scale = deviceWidth / scaleWidth;

export default StyleSheet.create({
  background: {
    backgroundColor: 'rgba(0,0,0,0.46)'
  },
  contentView: {
    paddingHorizontal: 50 * scale,
    flexGrow: 1,
    alignSelf: 'center',
    paddingBottom: 50 * scale
  },
  pickerContainer: {
    borderRadius: 40,
    width: 273,
    height: 350,
    backgroundColor: Colors.orange
  },
  picker: { width: 213, height: 254, flex: 1, padding: 0 },
  dayPicker: {
    borderRadius: 40,
    backgroundColor: Colors.orange,
    flexShrink: 1,
    maxHeight: '70%',
    paddingHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  buttonsContainer: {
    marginTop: 28 * scale,
    marginHorizontal: 45 * scale,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cancelBtn: {
    backgroundColor: Colors.orange,
    height: 58
  },
  cancelBtnText: {
    fontFamily: Fonts.bold,
    fontSize: 18 * scale,
    lineHeight: 21 * scale,
    color: 'white'
  },
  timeRow: {
    paddingBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  timeRowText: { fontSize: 18, color: Colors.white },
  inputField: {
    borderWidth: 0,
    borderColor: 'transparent',
    alignSelf: 'flex-end',
    position: 'relative',
    color: Colors.white,
    fontSize: 18
  },
  containerStyle: { width: 'auto' }
});
