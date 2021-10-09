import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { Storage } from "@capacitor/storage";

import rootReducer from "./reducer";

const middlewares: any[] = [thunkMiddleware];

if (process.env.NODE_ENV === "development") {
  const logger = createLogger();

  middlewares.push(logger);
}

const configureStore = () => {
  const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)));

  return store;
};

export const store = configureStore();
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
