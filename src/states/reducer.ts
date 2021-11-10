import { AnyAction } from "@reduxjs/toolkit";
import {
  accountReducer,
  announcementsReducer,
  authReducer,
  billsReducer,
  dashboardReducer,
  deviceReducer,
  messagesReducer,
  schedulesReducer,
} from "states";
import { arrayDiff } from "utils/helpers";

interface RootStates {
  account: any;
  announcements: any;
  auth: any;
  bills: any;
  dashboard: any;
  device: any;
  messages: any;
  schedules: any;
}

const rootReducer = (state: any = {}, action: AnyAction): RootStates => {
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
    announcements: announcementsReducer(state.announcements, action),
    auth: authReducer(state.auth, action),
    bills: billsReducer(state.bills, action),
    dashboard: dashboardReducer(state.dashboard, action),
    device: deviceReducer(state.device, action),
    messages: messagesReducer(state.messages, action),
    schedules: schedulesReducer(state.schedules, action),
  };
};

export default rootReducer;
