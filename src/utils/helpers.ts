export const isBoolean = (val: any) => "boolean" === typeof val;

export const removeDuplicateById = (array: any[]): any[] => {
  return array
    .slice()
    .reverse()
    .filter((v, i, a) => a.findIndex((t) => t.id === v.id) === i)
    .reverse();
};

export const dateSort = (array: any[], prop: string = "date"): any[] => {
  return array.sort((a, b) => new Date(b[prop]).valueOf() - new Date(a[prop]).valueOf());
};

export const markAsRead = (array: any[], id: number): any[] => {
  return array.map((obj) => {
    if (obj.id === id) {
      const updated = { ...obj };
      updated.unread = false;
      return updated;
    }

    return obj;
  });
};

export const arrayDiff = (firstArray: any[], secondArray: any[]): any[] => {
  return firstArray.filter((x) => !secondArray.includes(x));
};

export const groupByArray = (xs: any, key: any): any[] => {
  return xs.reduce(function (rv: any, x: any) {
    const v = key instanceof Function ? key(x) : x[key];
    const el = rv.find((r: any) => r && r.key === v);
    el ? el.values.push(x) : rv.push({ key: v, values: [x] });
    return rv;
  }, []);
};

export const peso = (amount: number | string): string => {
  const number = parseFloat(amount as string);
  if (number >= 0) {
    return `₱${numberWithCommas(number.toFixed(2))}`;
  }

  return `−₱${numberWithCommas((number * -1).toFixed(2))}`;
};

export const percentageChange = (initialValue: number, finalValue: number): string | boolean => {
  if (initialValue === 0) {
    return false;
  }

  const change = ((finalValue - initialValue) / initialValue) * 100;
  if (change >= 0) {
    return `${numberWithCommas(change.toFixed(2))}%`;
  }

  return `−${numberWithCommas((change * -1).toFixed(2))}%`;
};

const numberWithCommas = (number: string): string => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export const truncate = (input: string, length: number) =>
  input.length > length ? `${input.substring(0, length)}...` : input;
