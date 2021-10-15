import { AnyAction } from "@reduxjs/toolkit";
import { accountReducer, authReducer, billsReducer, deviceReducer, messagesReducer } from "states";
import { arrayDiff } from "utils/helpers";

const rootReducer = (state: any = {}, action: AnyAction) => {
  if (action.type === "PERSIST") {
    const blacklist = arrayDiff(Object.keys(state), Object.keys(action.states));

    for (const key in action.states) {
      if ("loading" in action.states[key]) {
        action.states[key].loading = false;
      }
    }

    for (const key in blacklist) {
      action.states[blacklist[key]] = state[blacklist[key]];
    }

    return { ...action.states };
  }

  return {
    account: accountReducer(state.account, action),
    auth: authReducer(state.auth, action),
    bills: billsReducer(state.bills, action),
    device: deviceReducer(state.device, action),
    messages: messagesReducer(state.messages, action),
  };
};

export default rootReducer;
