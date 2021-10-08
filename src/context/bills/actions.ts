import { billService } from "./services";
import { billTypes } from "./types";

const fetch = (ionRefresher?: any) => {
  const request = () => ({ type: billTypes.FETCH_BILLS_REQUEST });
  const success = (data: any) => ({ type: billTypes.FETCH_BILLS_SUCCESS, payload: { ...data } });
  const failure = (data: any) => ({ type: billTypes.FETCH_BILLS_FAILURE, payload: { ...data } });

  return (dispatch: Function) => {
    dispatch(request());

    return billService
      .fetch()
      .then((response: any) => {
        dispatch(success(response));

        if (ionRefresher) {
          ionRefresher.complete();
        }
      })
      .catch((error) => dispatch(failure(error)));
  };
};

const fetchMore = (ionScroll?: any, url?: string) => {
  const request = () => ({ type: billTypes.FETCH_MORE_BILLS_REQUEST });
  const success = (data: any) => ({ type: billTypes.FETCH_MORE_BILLS_SUCCESS, payload: { ...data } });
  const failure = (data: any) => ({ type: billTypes.FETCH_MORE_BILLS_FAILURE, payload: { ...data } });

  return (dispatch: Function) => {
    dispatch(request());

    return billService
      .fetch(url)
      .then((response: any) => {
        dispatch(success(response));

        if (ionScroll) {
          ionScroll.complete();

          if (!response?.nextPageUrl) {
            ionScroll.disabled = true;
          }
        }
      })
      .catch((error) => dispatch(failure(error)));
  };
};

const get = (id: number, ionRefresher?: any) => {
  const request = (id: number) => ({ type: billTypes.GET_BILL_REQUEST, payload: { id } });
  const success = (data: any) => ({ type: billTypes.GET_BILL_SUCCESS, payload: { ...data } });
  const failure = (data: any) => ({ type: billTypes.GET_BILL_FAILURE, payload: { ...data } });

  return (dispatch: Function) => {
    dispatch(request(id));

    return billService
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

export const billActions = {
  fetch,
  fetchMore,
  get,
};
