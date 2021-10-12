import { messagesTypes } from "states";

const initialState: any = {
  success: null,
  error: null,
};

export const messagesReducer = (state: any = initialState, action: any) => {
  const { success, error } = action;

  switch (action.type) {
    case messagesTypes.SET_SUCCESS:
      return { ...state, success };
    case messagesTypes.HIDE_SUCCESS:
      return { ...state, success: null };

    case messagesTypes.SET_ERROR:
      return { ...state, error };
    case messagesTypes.HIDE_ERROR:
      return { ...state, error: null };
  }

  return state;
};
