import { StyleSheet } from 'react-native';
import { Colors } from 'Theme';

const styles = StyleSheet.create({
  menuItemContainer: {
    paddingVertical: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  menuItemDetail: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  menuItemImage: {
    width: 55,
    height: 55,
    borderRadius: 4
  },
  menuItemName: {
    paddingHorizontal: 10,
    paddingBottom: 10,
    fontWeight: '600',
    fontSize: 18
  },
  menuItemPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  menuItemPrice: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  moreButton: { marginLeft: 15, fontSize: 20, color: Colors.orange },
  menuOptionsConatiner: {
    backgroundColor: Colors.orange,
    borderRadius: 5
  },
  menuOptions: {
    paddingVertical: 10
  },
  menuOptionText: { color: Colors.white, textAlign: 'center' },
  menuTitle: { justifyContent: 'space-between', alignItems: 'flex-start' },
  flex: 1
});

export default styles;
