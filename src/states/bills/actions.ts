import { billServices, billTypes } from "states";

export const fetch = () => {
  const request = () => ({ type: billTypes.FETCH_BILLS_REQUEST });
  const success = (data: any) => ({ type: billTypes.FETCH_BILLS_SUCCESS, payload: { ...data } });
  const failure = (data: any) => ({ type: billTypes.FETCH_BILLS_FAILURE, payload: { ...data } });

  return (dispatch: Function) => {
    dispatch(request());

    return billServices
      .fetch()
      .then((response: any) => dispatch(success(response)))
      .catch((error) => dispatch(failure(error)));
  };
};

export const fetchMore = (url?: string) => {
  const request = () => ({ type: billTypes.FETCH_MORE_BILLS_REQUEST });
  const success = (data: any) => ({ type: billTypes.FETCH_MORE_BILLS_SUCCESS, payload: { ...data } });
  const failure = (data: any) => ({ type: billTypes.FETCH_MORE_BILLS_FAILURE, payload: { ...data } });

  return (dispatch: Function) => {
    dispatch(request());

    return billServices
      .fetch(url)
      .then((response: any) => dispatch(success(response)))
      .catch((error) => dispatch(failure(error)));
  };
};

export const get = (id: number, ionRefresher?: any) => {
  const request = (id: number) => ({ type: billTypes.GET_BILL_REQUEST, payload: { id } });
  const success = (data: any) => ({ type: billTypes.GET_BILL_SUCCESS, payload: { ...data } });
  const failure = (data: any) => ({ type: billTypes.GET_BILL_FAILURE, payload: { ...data } });

  return (dispatch: Function) => {
    dispatch(request(id));

    return billServices
      .get(id)
      .then((response) => {
        dispatch(success(response));

        if (ionRefresher) {
          ionRefresher.complete();
        }
      })
      .catch((error) => dispatch(failure(error)));
  };
};
