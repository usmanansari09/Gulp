import { StyleSheet } from 'react-native';
import { Colors } from 'Theme';

const styles = StyleSheet.create({
  notificationContainer: {
    width: '25%',
    height: 70,
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: { flex: 1, backgroundColor: Colors.white },
  heading: {
    flexDirection: 'row',
    paddingVertical: 20,
    borderBottomColor: Colors.orange,
    borderBottomWidth: 2,
    marginHorizontal: 20,
    marginBottom: 20
  },
  headingTitle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleText: { fontSize: 24 },
  time: { alignSelf: 'flex-end', paddingTop: 5 },
  timeLabel: { fontSize: 10, color: Colors.gray },
  notificationIcon: { width: 60, height: 60 },
  textContainer: { padding: 10 },
  notificationText: { fontSize: 13, padding: 5 },
  notificationTitle: { fontSize: 17, padding: 5, fontWeight: '600' },
  separator: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: Colors.orange
  },
  listView: { marginHorizontal: 20 },
  notificationContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  noteFullText: {
    margin: 10
  },
  dotSeparator: {
    backgroundColor: Colors.gray,
    width: 5,
    height: 5,
    borderRadius: 5,
    margin: 5,
    alignSelf: 'center'
  }
});

export default styles;
