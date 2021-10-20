import { authTypes, dashboardTypes } from "states";

const initialState: any = {
  billYearPairs: {},
  comparableYears: [],
  totalBillsPerYear: [],
};

export const dashboardReducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    case dashboardTypes.DASHBOARD_DATA_REQUEST:
      return { ...state, loading: true };

    case dashboardTypes.DASHBOARD_DATA_FAILURE:
      return { ...state, loading: false };

    case dashboardTypes.DASHBOARD_DATA_SUCCESS:
      return { ...state, loading: false, ...action.payload };

    case authTypes.LOGOUT_SUCCESS:
      return { ...initialState };
  }

  return state;
};
