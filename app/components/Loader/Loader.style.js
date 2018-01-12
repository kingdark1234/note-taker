import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  text: {
    fontSize: 15
  },
  textBold: {
    fontWeight: 'bold',
    fontSize: 15
  },
  container: {
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },
  containerModal: {
    backgroundColor: 'rgba(37, 8, 10, 0.78)'
  },
  childrenModal: {
    backgroundColor: 'transparent'
  }
});