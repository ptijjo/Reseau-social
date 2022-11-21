import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import rootRecuder from '../reducers/reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";
import logger from "redux-logger";



export const store = createStore(
    rootRecuder,
    composeWithDevTools(applyMiddleware(thunk, logger))
)