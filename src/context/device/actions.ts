import { deviceService } from "./services";
import { deviceTypes } from "./types";

const setDeviceName = (name?: string) => ({
  type: deviceTypes.SET_DEVICE_NAME,
  payload: { name },
});

const setDeviceToken = (deviceToken: string) => {
  deviceService.setDeviceToken(deviceToken);

  return {
    type: deviceTypes.SET_DEVICE_TOKEN,
    payload: { deviceToken },
  };
};

export const deviceActions = {
  setDeviceName,
  setDeviceToken,
};
