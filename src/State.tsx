import { createContext, useContext, useEffect } from "react";
import {
  combineStateReducers,
  getPersist,
  logger,
  setPersist,
  useReducerThunk,
} from "utils/context";
import { useIsMounted } from "utils/useIsMounted";
import { auth, device } from "reducers";

export interface IStateDispatch {
  state: any;
  dispatch: Function;
}

const AppContext = createContext({} as IStateDispatch);
const reducersList = { auth, device };
const { initialStates, reducers } = combineStateReducers(reducersList);
const loggerReducer =
  process.env.REACT_APP_ENV !== "development" ? reducers : logger(reducers);

const AppContextProvider = (props: any) => {
  const isMounted = useIsMounted();
  const [state, dispatch] = useReducerThunk(loggerReducer, initialStates);
  const value = { state, dispatch };

  useEffect(() => {
    if (isMounted) {
      getPersist(reducersList).then((states) =>
        dispatch({ type: "PERSIST", states })
      );
    } else {
      setPersist(state, Object.keys(reducersList));
    }
  }, [state]);

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export { AppContext, AppContextProvider, useContext };
