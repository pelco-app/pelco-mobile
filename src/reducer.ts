import { AnyAction } from "redux";
import { authReducer, billsReducer, deviceReducer } from "states";

const rootReducer = (state: any = {}, action: AnyAction) => {
  if (action.type === "PERSIST") {
    for (const key in action.states) {
      if ("loading" in action.states[key]) {
        action.states[key].loading = false;
      }
    }

    return { ...action.states };
  }

  return {
    auth: authReducer(state.auth, action),
    bills: billsReducer(state.bills, action),
    device: deviceReducer(state.device, action),
  };
};

export default rootReducer;
