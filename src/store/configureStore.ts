// /**
//  * Create the store with dynamic reducers
//  */

// import {
//   configureStore,
//   getDefaultMiddleware,
//   StoreEnhancer,
// } from '@reduxjs/toolkit';
// import { createInjectorsEnhancer } from 'redux-injectors';
// import createSagaMiddleware from 'redux-saga';

// import { createReducer } from './reducers';

// export function configureAppStore() {
//   const reduxSagaMonitorOptions = {};
//   const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);
//   const { run: runSaga } = sagaMiddleware;

//   // Create the store with saga middleware
//   const middlewares = [sagaMiddleware];

//   const enhancers = [
//     createInjectorsEnhancer({
//       createReducer,
//       runSaga,
//     }),
//   ] as StoreEnhancer[];

//   const store = configureStore({
//     reducer: createReducer(),
//     middleware: [...getDefaultMiddleware(), ...middlewares],
//     devTools: process.env.NODE_ENV !== 'production',
//     enhancers,
//   });

//   return store;
// }

/*Create the store with dynamic reducers */
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { forceReducerReload } from 'redux-injectors';
import { createReducer } from './reducers';
export function configureAppStore() {
  const store = configureStore({
    /*reducer is required. middleware, devTools, and the rest are optional */
    reducer: createReducer(),
    middleware: [
      ...getDefaultMiddleware({
        serializableCheck: false,
      }),
    ],
    devTools: process.env.NODE_ENV !== 'production',
  });
  /* Make reducers hot reloadable, see http://mxs.is/googmo istanbul ignore
next */
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      forceReducerReload(store);
    });
  }
  return store;
}
