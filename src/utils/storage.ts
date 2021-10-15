import { Storage } from "@capacitor/storage";

const blacklist = ["messages"];

export const getPersist = async () => {
  const states: any = {};
  const { keys } = await Storage.keys();

  for (const key in keys) {
    if (keys[key].startsWith("persisted-")) {
      const { value } = await Storage.get({ key: keys[key] });
      states[keys[key].replace("persisted-", "")] = value ? JSON.parse(value) : "";
    }
  }

  return states;
};

export const setPersist = async (state: any) => {
  for (const key in state) {
    if (!blacklist.includes(key)) {
      await Storage.set({
        key: `persisted-${key}`,
        value: JSON.stringify(state[key]),
      });
    }
  }
};
