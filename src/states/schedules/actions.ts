import { scheduleServices, scheduleTypes } from "states";

export const fetch = () => {
  const request = () => ({ type: scheduleTypes.FETCH_SCHEDULES_REQUEST });
  const success = (data: any) => ({ type: scheduleTypes.FETCH_SCHEDULES_SUCCESS, payload: { ...data } });
  const failure = (data: any) => ({ type: scheduleTypes.FETCH_SCHEDULES_FAILURE, payload: { ...data } });

  return (dispatch: Function) => {
    dispatch(request());

    return scheduleServices
      .fetch()
      .then((response: any) => dispatch(success(response)))
      .catch((error) => dispatch(failure(error)));
  };
};

export const fetchMore = (url?: string) => {
  const request = () => ({ type: scheduleTypes.FETCH_MORE_SCHEDULES_REQUEST });
  const success = (data: any) => ({ type: scheduleTypes.FETCH_MORE_SCHEDULES_SUCCESS, payload: { ...data } });
  const failure = (data: any) => ({ type: scheduleTypes.FETCH_MORE_SCHEDULES_FAILURE, payload: { ...data } });

  return (dispatch: Function) => {
    dispatch(request());

    return scheduleServices
      .fetch(url)
      .then((response: any) => dispatch(success(response)))
      .catch((error) => dispatch(failure(error)));
  };
};

export const get = (id: number) => {
  const request = (id: number) => ({ type: scheduleTypes.GET_SCHEDULE_REQUEST, payload: { id } });
  const success = (data: any) => ({ type: scheduleTypes.GET_SCHEDULE_SUCCESS, payload: { ...data } });
  const failure = (data: any) => ({ type: scheduleTypes.GET_SCHEDULE_FAILURE, payload: { ...data } });

  return (dispatch: Function) => {
    dispatch(request(id));

    return scheduleServices
      .get(id)
      .then((response) => dispatch(success(response)))
      .catch((error) => dispatch(failure(error)));
  };
};
