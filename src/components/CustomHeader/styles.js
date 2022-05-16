import { StyleSheet, Dimensions } from 'react-native';
import { Colors, scaleWidth, Fonts } from 'Theme';

const deviceWidth = Dimensions.get('window').width;
const scale = deviceWidth / scaleWidth;

const styles = StyleSheet.create({
  heading: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    paddingVertical: 20,
    borderBottomColor: Colors.orange,
    alignItems: 'center',
    borderBottomWidth: 2,
    justifyContent: 'center',
    marginHorizontal: 20
  },
  safeArea: {
    backgroundColor: Colors.white
  },
  headingTitle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleText: { fontSize: 20 * scale }
});

export default styles;
