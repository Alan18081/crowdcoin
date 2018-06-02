import {createStore,applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import * as sagas from './sagas';
import {composeWithDevTools} from 'redux-devtools-extension';
import reducer from './reducers';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer,composeWithDevTools(
  applyMiddleware(sagaMiddleware)
));

Object.values(sagas).forEach(sagaMiddleware.run.bind(sagaMiddleware));

export default store;