import { messagesTypes } from "states";

export const setSuccess = (success: string) => ({ type: messagesTypes.SET_SUCCESS, success });
export const hideSuccess = () => ({ type: messagesTypes.HIDE_SUCCESS });

export const setError = (error: string) => ({ type: messagesTypes.SET_ERROR, error });
export const hideError = () => ({ type: messagesTypes.HIDE_ERROR });
