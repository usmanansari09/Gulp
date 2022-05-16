import { StyleSheet } from 'react-native';
import { Colors } from 'Theme';

const styles = StyleSheet.create({
  container: { flex: 1 },
  userNameText: { fontWeight: '700', color: Colors.white, fontSize: 22 },
  numberText: { fontWeight: '700', color: Colors.white, fontSize: 24 },
  textLabel: { fontSize: 12, color: Colors.white, opacity: 0.7 },
  flexRowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    flexShrink: 1
  },
  flexRowItem: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5
  },
  userAvatar: {
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
  divider: {
    borderBottomColor: Colors.orange,
    borderBottomWidth: 1,
    marginHorizontal: 20
  },
  userInfoView: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  badgeContainer: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    height: '100%'
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
  disclosureButton: {
    height: 34,
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  disclosureIcon: { color: Colors.orange, fontSize: 15 },
  disclosureButtonContainer: { marginVertical: 10, paddingHorizontal: 20 },
  checkInButtonLabel: { color: Colors.white },
  profileActions: { paddingHorizontal: 20, paddingVertical: 15, flex: 1 }
});

export default styles;
