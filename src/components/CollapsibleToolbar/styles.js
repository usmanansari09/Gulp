import { StyleSheet } from 'react-native';
import { Colors } from 'Theme';
import { HEADER_EXPANDED_HEIGHT, SCREEN_WIDTH } from './constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  scrollContainer: {
    paddingTop: HEADER_EXPANDED_HEIGHT - 35
  },
  header: {
    position: 'absolute',
    width: SCREEN_WIDTH,
    top: 0,
    left: 0
  },
  title: {
    marginVertical: 16,
    fontWeight: 'bold',
    fontSize: 24
  },
  headerTitle: {
    letterSpacing: 0,
    textAlign: 'center',
    position: 'absolute',
    bottom: 16,
    zIndex: 99
  },
  maxHeader: {
    fontSize: 24,
    left: 16,
    lineHeight: 38
  },
  minHeader: {
    fontSize: 16,
    paddingLeft: 16,
    paddingTop: 4,
    color: Colors.black
  },
  backIcon: {
    zIndex: 99,
    height: 20,
    width: 20
  },
  image: {
    resizeMode: 'contain',
    position: 'absolute',
    right: 0,
    bottom: 0
  },
  headerView: {
    position: 'absolute',
    flex: 1,
    left: 0,
    right: 0,
    bottom: 0,
    width: SCREEN_WIDTH
  },
  appBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    paddingTop: 16,
    backgroundColor: Colors.white,
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: { width: 3, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 3
  }
});
