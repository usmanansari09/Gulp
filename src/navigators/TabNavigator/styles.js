import { StyleSheet, Dimensions, Platform } from 'react-native';
import { scaleWidth, Colors } from 'Theme';

const deviceWidth = Dimensions.get('window').width;
const scale = deviceWidth / scaleWidth;

export default StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderWidth: 0,
    borderTopWidth: 1,
    borderTopColor: Colors.orange,
    height: 72 * scale,
    zIndex: 1
  },
  tabStyle: {
    justifyContent: 'flex-start',
    height: 65 * scale
  },
  tabIcon: {
    width: 32 * scale,
    height: 32 * scale
  },
  tabBarView: {
    position: 'relative',
    justifyContent: 'center'
  }
});
