import createSagaMiddleware from 'redux-saga';
// import someReduxMiddleware from 'some-redux-middleware';
// import someOtherReduxMiddleware from 'some-other-redux-middleware';
import rootReducer from './reducers/root.reducer';
import sagas from '../redux/sagas/';
import {applyMiddleware, compose, createStore} from 'redux';

const logger = () => (next) => (action) => {
  // console.log('action is', action);
  next(action);
};

const composeEnhancers = global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const sagaMiddleware = createSagaMiddleware();

const composedEnhancer = composeEnhancers(applyMiddleware(sagaMiddleware, logger));

export const initStore = () => {
  const store = createStore(rootReducer, {}, composedEnhancer);
  sagaMiddleware.run(sagas);
  return store;
};