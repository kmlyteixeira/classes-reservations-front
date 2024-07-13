export function filterProperties<T>(obj: Record<string, any>, type: object): T {
    const filteredObj: Partial<T> = {};
    Object.keys(type).forEach((key) => {
      if (obj.hasOwnProperty(key)) {
        filteredObj[key as keyof T] = obj[key];
      }
    });
    return filteredObj as T;
  }