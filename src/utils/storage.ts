import { Storage } from "@capacitor/storage";

const blacklist = ["messages"];

export const getPersist = async () => {
  const { value } = await Storage.get({ key: "persistedState" });
  return value ? JSON.parse(value) : false;
};

export const setPersist = async (state: any) => {
  const newStates: any = {};

  for (const key in state) {
    if (!blacklist.includes(key)) {
      newStates[key] = state[key];
    }
  }

  await Storage.set({
    key: "persistedState",
    value: JSON.stringify(newStates),
  });
};
