import { Storage } from "@capacitor/storage";

export const getPersist = async () => {
  const { value } = await Storage.get({ key: "persistedState" });
  return value ? JSON.parse(value) : false;
};

export const setPersist = async (state: any) => {
  const newStates: any = {};
  Object.keys(state).forEach((key) => (newStates[key] = state[key]));

  await Storage.set({
    key: "persistedState",
    value: JSON.stringify(newStates),
  });
};
