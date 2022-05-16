import { StyleSheet } from 'react-native';
import { Colors } from 'Theme';

const styles = StyleSheet.create({
  container: { flex: 1, paddingVertical: 30, paddingHorizontal: 20 },
  scrollView: { backgroundColor: Colors.white, flexGrow: 1 },
  headerText: { paddingBottom: 15, fontSize: 18 },
  recentlyEarned: {},
  allBadges: {},
  flexWrap: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    paddingBottom: 20
  }
});

export default styles;
