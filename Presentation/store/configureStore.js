import { createStore, applyMiddleware, compose } from "redux";
import appReducer from "../reducers/app.reducer";
import thunk from "redux-thunk";
import appState from "../reducers/app.state";

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

export default function configureStore(initialState = appState) {
  return createStore(
    appReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk))
  );
}
