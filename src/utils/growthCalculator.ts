export const growthCalculator = (totalAssetsArray: any) => {
  const currentAsset = totalAssetsArray[0][1].totalAssets;
  const initialAsset =
    totalAssetsArray[totalAssetsArray.length - 1][1].totalAssets;
  const rate = ((currentAsset - initialAsset) / initialAsset) * 100;
  return rate;
};
