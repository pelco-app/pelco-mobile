import { deviceTypes } from "./types";

const setDeviceName = (name?: string) => ({
  type: deviceTypes.SET_DEVICE_NAME,
  name,
});

export const deviceActions = {
  setDeviceName,
};
