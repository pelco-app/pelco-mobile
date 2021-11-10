import { dateSort, markAsRead, removeDuplicateById } from "utils/helpers";
import { authTypes, announcementTypes } from "states";

const initialState: any = {
  all: { data: [] },
  item: {},
};

export const announcementsReducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    case announcementTypes.FETCH_ANNOUNCEMENTS_REQUEST:
      return { ...state, loading: true };

    case announcementTypes.GET_ANNOUNCEMENT_REQUEST:
      return { ...state, loading: true, item: {} };

    case announcementTypes.FETCH_ANNOUNCEMENTS_FAILURE:
    case announcementTypes.FETCH_MORE_ANNOUNCEMENTS_FAILURE:
    case announcementTypes.GET_ANNOUNCEMENT_FAILURE:
      return { ...state, loading: false };

    case announcementTypes.FETCH_ANNOUNCEMENTS_SUCCESS:
      return {
        ...state,
        all: {
          data: action.payload.data,
          nextPageUrl: action.payload.nextPageUrl,
        },
        loading: false,
      };

    case announcementTypes.FETCH_MORE_ANNOUNCEMENTS_SUCCESS:
      return {
        ...state,
        all: {
          data: dateSort(removeDuplicateById([...state.all.data, ...action.payload.data]), "createdAt"),
          nextPageUrl: action.payload.nextPageUrl,
        },
        loading: false,
      };

    case announcementTypes.GET_ANNOUNCEMENT_SUCCESS:
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
