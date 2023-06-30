// frontend/src/store/index.js
import {combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { legacy_createStore as createStore } from 'redux';







// frontend/src/store/index.js
// ...
const rootReducer = combineReducers({});

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

// frontend/src/store/index.js
// ...

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
  };
  
  export default configureStore;
