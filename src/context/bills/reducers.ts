import { dateSort, markAsRead, removeDuplicateById } from "utils/helpers";
import { billTypes } from "./types";

const initialState: any = {
  all: { data: [] },
  show: {},
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case billTypes.FETCH_BILLS_REQUEST:
      return { ...state, loading: true };

    case billTypes.GET_BILL_REQUEST:
      return { ...state, loading: true, show: {} };

    case billTypes.FETCH_BILLS_FAILURE:
    case billTypes.FETCH_MORE_BILLS_FAILURE:
    case billTypes.GET_BILL_FAILURE:
      return {
        ...state,
        error: action.payload.message || "Network error. Please try again.",
        loading: false,
      };

    case billTypes.FETCH_BILLS_SUCCESS:
      return {
        ...state,
        all: {
          data: action.payload.data,
          nextPageUrl: action.payload.nextPageUrl,
        },
        loading: false,
      };

    case billTypes.FETCH_MORE_BILLS_SUCCESS:
      return {
        ...state,
        all: {
          data: dateSort(removeDuplicateById([...state.all.data, ...action.payload.data]), "billing_month"),
          nextPageUrl: action.payload.nextPageUrl,
        },
        loading: false,
      };

    case billTypes.GET_BILL_SUCCESS:
      return {
        ...state,
        all: {
          data: markAsRead(state.all.data, action.payload.id),
          nextPageUrl: state.all.nextPageUrl,
        },
        show: action.payload,
        loading: false,
      };
  }

  return state;
};

export const bills = {
  initialState,
  reducer,
};
