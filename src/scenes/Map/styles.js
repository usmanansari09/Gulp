import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  topText: {
    fontSize: 20,
    alignSelf: 'center'
  },
  descriptionText: {
    fontSize: 14,
    color: 'rgba(66,66,66,0.66)'
  },
  calloutIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    height: 40,
    width: 40,
    padding: 10,
    marginVertical: 13
  },
  calloutText: {
    flexShrink: 1,
    paddingRight: 5,
    maxWidth: 300
  },
  overlayItem: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(0,0,0,.3)'
  },
  overlayText: { color: '#fff', fontSize: 17 },
  mapViewOverlay: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    backgroundColor: 'transparent'
  },
  mapPaginationDesc: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 3,
    padding: 10
  }
});
