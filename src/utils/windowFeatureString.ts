import { WindowFeatures } from "./../types";
export const prepareWindowFeatureString = (
  windowFeatures: WindowFeatures
): string => {
  let stringOfFeatures = [];
  for (const [key, value] of Object.entries(windowFeatures)) {
    stringOfFeatures.push(`${key}=${value}`);
  }
  return stringOfFeatures.join().toString();
};
