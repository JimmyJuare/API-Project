// frontend/src/store/index.js
import {combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { legacy_createStore as createStore } from 'redux';
import { restoreCSRF, csrfFetch } from './csrf';
// frontend/src/index.js
// ... other imports
import * as sessionActions from "./session";

// ...
import sessionReducer from "./session";
import spotsReducer from './spots';

const rootReducer = combineReducers({
    session: sessionReducer,
    spots:spotsReducer
});
// ...

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
const store = configureStore();

if (process.env.NODE_ENV !== "production") {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
}

if (process.env.NODE_ENV !== 'production') {
    restoreCSRF();
    
    window.csrfFetch = csrfFetch;
    window.store = store;
}

export default configureStore;
