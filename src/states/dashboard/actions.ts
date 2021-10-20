import { dashboardServices, dashboardTypes } from "states";

export const fetch = (data: any) => {
  const request = (data: any) => ({ type: dashboardTypes.DASHBOARD_DATA_REQUEST, payload: { ...data } });
  const success = (data: any) => ({ type: dashboardTypes.DASHBOARD_DATA_SUCCESS, payload: { ...data } });
  const failure = (data: any) => ({ type: dashboardTypes.DASHBOARD_DATA_FAILURE, payload: { ...data } });

  return (dispatch: Function) => {
    dispatch(request(data));

    return dashboardServices
      .fetch(data.year)
      .then((response: any) => dispatch(success(response)))
      .catch((error) => dispatch(failure(error)));
  };
};
