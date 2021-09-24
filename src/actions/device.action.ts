export const deviceTypes = {
  SET_DEVICE_NAME: "SET_DEVICE_NAME",
};

const setDeviceName = (name?: string) => ({
  type: deviceTypes.SET_DEVICE_NAME,
  name,
});

export const deviceActions = {
  setDeviceName,
};
