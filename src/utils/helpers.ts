export const isBoolean = (val: any) => "boolean" === typeof val;

export const removeDuplicateById = (array: any[]): any[] => {
  return array
    .slice()
    .reverse()
    .filter((v, i, a) => a.findIndex((t) => t.id === v.id) === i)
    .reverse();
};

export const dateSort = (array: any[], prop: string = "date") => {
  return array.sort((a, b) => new Date(b[prop]).valueOf() - new Date(a[prop]).valueOf());
};

export const markAsRead = (array: any[], id: number) => {
  return array.map((obj: any) => {
    if (obj.id === id) {
      const updated = { ...obj };
      updated.unread = false;
      return updated;
    }

    return obj;
  });
};
