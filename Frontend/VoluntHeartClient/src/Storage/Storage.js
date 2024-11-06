import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";

import { authenticationReducer } from "./Auth/Reducer";
import { postReducer } from "./Posts/Reducer";

const rootReducers = combineReducers({
  auth: authenticationReducer,
  post: postReducer,
});

export const store = legacy_createStore(rootReducers, applyMiddleware(thunk));
