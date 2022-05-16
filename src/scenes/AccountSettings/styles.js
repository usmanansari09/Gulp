import { StyleSheet } from 'react-native';
import { Colors } from 'Theme';

const styles = StyleSheet.create({
  container: { flex: 1 },
  flexRowItem: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5
  },
  divider: {
    borderBottomColor: Colors.orange,
    borderBottomWidth: 1,
    marginHorizontal: 20
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
  actions: { paddingHorizontal: 20, paddingVertical: 15, flex: 1 }
});

export default styles;
