import { accountTypes, authTypes } from "states";

const initialState: any = {
  user: {},
  unreadNotificationCount: {
    announcements: 0,
    bills: 0,
    schedules: 0,
  },
};

export const accountReducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    case accountTypes.GET_UNREAD_NOTIFICATION_COUNT_REQUEST:
      return { ...state, loading: true };

    case accountTypes.GET_UNREAD_NOTIFICATION_COUNT_FAILURE:
      return { ...state, loading: false };

    case accountTypes.GET_UNREAD_NOTIFICATION_COUNT_SUCCESS:
      return { ...state, unreadNotificationCount: action.payload, loading: false };

    case authTypes.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
      };

    case authTypes.UPDATE_VERIFY_SUCCESS:
      return {
        ...state,
        user: { ...state.user, mobileNumber: action.payload.mobileNumber },
      };

    case authTypes.LOGOUT_SUCCESS:
      return { ...initialState };
  }

  return state;
};
