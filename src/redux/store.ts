

import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers/index';
import rootSaga from './saga/index';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();
const store = compose(
    applyMiddleware(sagaMiddleware as any),
)(createStore)(rootReducer);

sagaMiddleware.run(rootSaga);

export default store;