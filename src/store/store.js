import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import rootSaga from './sagas';
import reducer from './reducers';

export default function configureStore(initialState) {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
        reducer,
        initialState,
        applyMiddleware(
            sagaMiddleware, createLogger()
        )
    );
    sagaMiddleware.run(rootSaga);
    return store;
};