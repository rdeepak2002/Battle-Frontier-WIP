import { StyleSheet,Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    position: 'absolute',
    backgroundColor: '#000',
    width, height,
    opacity: 0.9,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    flex: 0.15,
    fontSize: 30,
    width: 200,
    textAlign: 'center',
    color: '#fff'
  },
  activityIndicator: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  internettext: {
    flex: 0.3,
    fontSize: 30,
    width: 200,
    textAlign: 'center',
    color: '#fff'
  }
})
