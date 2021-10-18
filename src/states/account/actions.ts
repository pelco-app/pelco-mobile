import { accountServices, accountTypes } from "states";

export const unreadNotificationCount = () => {
  const request = () => ({ type: accountTypes.GET_UNREAD_NOTIFICATION_COUNT_REQUEST });
  const success = (data: any) => ({
    type: accountTypes.GET_UNREAD_NOTIFICATION_COUNT_SUCCESS,
    payload: { ...data },
  });
  const failure = (data: any) => ({
    type: accountTypes.GET_UNREAD_NOTIFICATION_COUNT_FAILURE,
    payload: { ...data },
  });

  return (dispatch: Function) => {
    dispatch(request());

    return accountServices
      .getUnreadNotificationCounts()
      .then((response) => dispatch(success(response)))
      .catch((error) => dispatch(failure(error)));
  };
};
