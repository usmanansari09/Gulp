import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from 'Theme';

const deviceWidth = Dimensions.get('window').width;
const scale = deviceWidth / 414;

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  backBtn: {
    color: Colors.orange,
    fontSize: 28 * scale
  }
});

export default styles;
