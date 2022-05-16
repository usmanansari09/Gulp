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
  header: {},
  headerTitle: {
    textAlign: 'center',
    marginTop: 28
  },
  heroHeaderTitle: {
    position: 'absolute',
    bottom: 65,
    left: 16,
    color: Colors.white,
    fontSize: 24,
    fontWeight: '700'
  },
  bgImage: { width: '100%', height: '100%', paddingTop: 20 },
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
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40
  },
  checkInButtonLabel: { color: Colors.white },
  profileActions: { paddingHorizontal: 20, paddingVertical: 15, flex: 1 },
  paddingHorizontal: { paddingHorizontal: 20, flex: 1 },
  paddingVertical: { paddingVertical: 15, flex: 1 },
  vendorAddressWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  vendorAddressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%'
  },
  vendorAddress: {
    paddingLeft: 5,
    fontSize: 13
  },
  vendorStatus: { color: Colors.orange, fontSize: 18, fontWeight: '700' },
  disclosureIcon: { color: Colors.orange, fontSize: 15, width: 14 },
  backIcon: { color: Colors.orange, fontSize: 25, width: 50, alignSelf: 'center',
  position: 'absolute',
  top: 10,
  left:10,
  zIndex: 15,
  elevation: (Platform.OS === 'android') ? 50 : 0},
  happyHour: { fontSize: 18, fontWeight: '700' },
  paddingBottom: { paddingBottom: 10 },
  seeAll: { fontSize: 12, fontWeight: '700' },
  happyHoursList: { paddingVertical: 20 },
  happyHourItem: { flexDirection: 'row', paddingVertical: 10 },
  happyHourItemTextDay: { flex: 1, flexShrink: 1 },
  happyHourItemTextTime: {
    flex: 3,
    paddingLeft: 20,
    flexDirection: 'row',
    flexShrink: 1
  }
});
export default styles;
