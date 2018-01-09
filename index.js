// import App from './app/index';
import App from './app/index';
// import Router from './app/Routes/index';
import {AppRegistry} from 'react-native';

if (__DEV__) {
  global.XMLHttpRequest = global.originalXMLHttpRequest ?
    global.originalXMLHttpRequest :
    global.XMLHttpRequest;
  global.FormData = global.originalFormData ?
    global.originalFormData :
    global.FormData;
}
AppRegistry.registerComponent('NoteTaker', () => App);
