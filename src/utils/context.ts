import { useReducer } from "react";
import { Storage } from "@capacitor/storage";

interface IStateReducer {
  initialState: any;
  reducer: any;
}

interface IStateReducers {
  [key: string]: IStateReducer;
}

type TReducer = (action: any, state: any) => any;

const getInitialStates = (stateReducers: IStateReducers) => {
  const newInitialStates: any = {};

  for (let key in stateReducers) {
    newInitialStates[key] = stateReducers[key].initialState;
  }

  return newInitialStates;
};

export const getPersist = async (stateReducers: IStateReducers) => {
  const { value } = await Storage.get({ key: "persistedState" });
  const initialStates = getInitialStates(stateReducers);

  return value ? JSON.parse(value) : initialStates;
};

export const setPersist = async (
  state: any,
  persistentReducers: string[] = []
) => {
  const newStates: any = {};
  persistentReducers.forEach((key) => (newStates[key] = state[key]));

  await Storage.set({
    key: "persistedState",
    value: JSON.stringify(newStates),
  });
};

export const combineStateReducers = (stateReducers: IStateReducers) => {
  const initialStates = getInitialStates(stateReducers);
  const reducers = (state: any = {}, action: any) => {
    let newState: any = {};
    if (action.type !== "PERSIST") {
      for (const key in stateReducers) {
        newState[key] = stateReducers[key].reducer(state[key], action);
      }
    } else {
      for (const key in action.states) {
        if ("loading" in action.states[key]) {
          action.states[key].loading = false;
        }
      }
      newState = { ...action.states };
    }
    return newState;
  };

  return { initialStates, reducers };
};

export const logger = (reducer: any) => {
  const reducerWithLogger = (state: any, action: any) => {
    console.log(
      "%cPrevious State:",
      "color: #9E9E9E; font-weight: 700;",
      state
    );
    console.log("%cAction:", "color: #00A7F7; font-weight: 700;", action);
    console.log(
      "%cNext State:",
      "color: #47B04B; font-weight: 700;",
      reducer(state, action)
    );
    return reducer(state, action);
  };

  return reducerWithLogger;
};

export const useReducerThunk = (reducers: TReducer, initialState: any) => {
  const [state, dispatch] = useReducer(reducers, initialState);
  const customDispatch = (action: any) => {
    if (typeof action === "function") {
      action(customDispatch);
    } else {
      dispatch(action);
    }
  };
  return [state, customDispatch];
};
