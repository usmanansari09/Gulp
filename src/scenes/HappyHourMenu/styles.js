import { StyleSheet } from 'react-native';
import { Colors } from 'Theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  tabBarContainer: {
    top: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    zIndex: 1
  },
  overlayName: {
    fontSize: 24
  },
  collapsedOvarlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    justifyContent: 'center',
    zIndex: 2
  },
  headerContainer: {
    top: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    zIndex: 1
  },
  scrollContainer: {
    backgroundColor: 'transparent',
    paddingBottom: 200
  },
  title: {
    fontSize: 24,
    marginVertical: 16
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0
  },
  headerTitle: {
    textAlign: 'center',
    marginTop: 28
  },
  heroHeaderTitle: {
    position: 'absolute',
    bottom: 50,
    left: 16,
    color: Colors.white,
    fontSize: 24,
    fontWeight: '700'
  },
  bgImage: { width: '100%', height: '100%' },
  checkInButton: {
    backgroundColor: Colors.orange,
    borderRadius: 40,
    height: 34,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  badgeContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal: 33
  },
  checkInButtonLabel: { color: Colors.white },
  profileActions: { paddingHorizontal: 20, paddingVertical: 15, flex: 1 },

  happyHour: { fontSize: 18, fontWeight: '700' },
  paddingBottom: {
    paddingBottom: 10
  },
  borderLine: {
    paddingBottom: 10,
    borderBottomWidth: 2,
    width: 63,
    borderBottomColor: Colors.orange,
    alignSelf: 'center'
  },
  happyHoursList: { paddingVertical: 20 },
  happyHourItem: { flexDirection: 'row', paddingVertical: 10 },
  happyHourItemTextDay: { flex: 1 },
  happyHourItemTextTime: { flex: 3, paddingLeft: 20, flexDirection: 'row' },
  flex: { flex: 1, marginBottom: 10 },
  heading: { flexDirection: 'row', justifyContent: 'center' }
});
export default styles;
