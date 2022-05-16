import { StyleSheet } from 'react-native';
import { Colors } from 'Theme';

const styles = StyleSheet.create({
  container: { flex: 1 },
  flexRowItem: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5
  },
  disclosureButton: {
    height: 34,
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  disclosureIcon: { color: Colors.orange, fontSize: 15 },
  disclosureButtonContainer: { marginVertical: 20, paddingHorizontal: 20 },
  actions: { paddingHorizontal: 20, paddingVertical: 15, flex: 1 },
  avatarContainer: { marginRight: 10 },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: Colors.orangeDark,
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: { width: 3, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 3
  },
  title: { fontSize: 16, fontWeight: '500' },
  created_at: { fontSize: 12, fontWeight: '300' }
});

export default styles;
