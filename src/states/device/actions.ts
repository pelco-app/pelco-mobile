import { deviceServices, deviceTypes } from "states";

export const setDeviceName = (name?: string) => ({
  type: deviceTypes.SET_DEVICE_NAME,
  payload: { name },
});

export const setDeviceToken = (deviceToken: string) => {
  deviceServices.setDeviceToken(deviceToken);

  return {
    type: deviceTypes.SET_DEVICE_TOKEN,
    payload: { deviceToken },
  };
};
