import React, {Component} from 'react';
import Routes from './Routes/index';
import {initStore} from './redux/store';

import {Provider} from 'react-redux';

const store = initStore();

class NoteTaker extends Component {
  render () {
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    );
  }
}

export default NoteTaker;