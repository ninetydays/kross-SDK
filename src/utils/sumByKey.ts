export const sumByKey = (array: object[], key: string): number => {
  if (array)
    return array.reduce(
      (
        sum,
        obj: {
          [key: string]: any;
        }
      ) => sum + obj[key],
      0
    );
  return 0;
};
