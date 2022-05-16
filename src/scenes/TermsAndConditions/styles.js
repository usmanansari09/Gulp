import { StyleSheet, StatusBar } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: StatusBar.currentHeight,
    },
    baseText: {
        fontFamily: "Cochin",
        marginHorizontal:20
    },
    titleText: {
        fontSize: 20,
        fontWeight: "bold"
    }
  });
export default styles;