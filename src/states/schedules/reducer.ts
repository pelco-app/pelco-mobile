import { dateSort, markAsRead, removeDuplicateById } from "utils/helpers";
import { authTypes, scheduleTypes } from "states";

const initialState: any = {
  all: { data: [] },
  item: {},
};

export const schedulesReducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    case scheduleTypes.FETCH_SCHEDULES_REQUEST:
      return { ...state, loading: true };

    case scheduleTypes.GET_SCHEDULE_REQUEST:
      return { ...state, loading: true, item: {} };

    case scheduleTypes.FETCH_SCHEDULES_FAILURE:
    case scheduleTypes.FETCH_MORE_SCHEDULES_FAILURE:
    case scheduleTypes.GET_SCHEDULE_FAILURE:
      return { ...state, loading: false };

    case scheduleTypes.FETCH_SCHEDULES_SUCCESS:
      return {
        ...state,
        all: {
          data: action.payload.data,
          nextPageUrl: action.payload.nextPageUrl,
        },
        loading: false,
      };

    case scheduleTypes.FETCH_MORE_SCHEDULES_SUCCESS:
      return {
        ...state,
        all: {
          data: dateSort(removeDuplicateById([...state.all.data, ...action.payload.data]), "startDate"),
          nextPageUrl: action.payload.nextPageUrl,
        },
        loading: false,
      };

    case scheduleTypes.GET_SCHEDULE_SUCCESS:
      return {
        ...state,
        all: {
          data: markAsRead(state.all.data, action.payload.id),
          nextPageUrl: state.all.nextPageUrl,
        },
        item: action.payload,
        loading: false,
      };

    case authTypes.LOGOUT_SUCCESS:
      return { ...initialState };
  }

  return state;
};
