import { announcementServices, announcementTypes } from "states";

export const fetch = () => {
  const request = () => ({ type: announcementTypes.FETCH_ANNOUNCEMENTS_REQUEST });
  const success = (data: any) => ({
    type: announcementTypes.FETCH_ANNOUNCEMENTS_SUCCESS,
    payload: { ...data },
  });
  const failure = (data: any) => ({
    type: announcementTypes.FETCH_ANNOUNCEMENTS_FAILURE,
    payload: { ...data },
  });

  return (dispatch: Function) => {
    dispatch(request());

    return announcementServices
      .fetch()
      .then((response: any) => dispatch(success(response)))
      .catch((error) => dispatch(failure(error)));
  };
};

export const fetchMore = (url?: string) => {
  const request = () => ({ type: announcementTypes.FETCH_MORE_ANNOUNCEMENTS_REQUEST });
  const success = (data: any) => ({
    type: announcementTypes.FETCH_MORE_ANNOUNCEMENTS_SUCCESS,
    payload: { ...data },
  });
  const failure = (data: any) => ({
    type: announcementTypes.FETCH_MORE_ANNOUNCEMENTS_FAILURE,
    payload: { ...data },
  });

  return (dispatch: Function) => {
    dispatch(request());

    return announcementServices
      .fetch(url)
      .then((response: any) => dispatch(success(response)))
      .catch((error) => dispatch(failure(error)));
  };
};

export const get = (id: number) => {
  const request = (id: number) => ({ type: announcementTypes.GET_ANNOUNCEMENT_REQUEST, payload: { id } });
  const success = (data: any) => ({ type: announcementTypes.GET_ANNOUNCEMENT_SUCCESS, payload: { ...data } });
  const failure = (data: any) => ({ type: announcementTypes.GET_ANNOUNCEMENT_FAILURE, payload: { ...data } });

  return (dispatch: Function) => {
    dispatch(request(id));

    return announcementServices
      .get(id)
      .then((response) => dispatch(success(response)))
      .catch((error) => dispatch(failure(error)));
  };
};
