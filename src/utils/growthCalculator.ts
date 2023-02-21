export const growthCalculator = (totalAssetsArray: any) => {
  if (totalAssetsArray.length === 0){
    return 0;
  }
  const initialAsset = totalAssetsArray[0][1].totalAssets;
  const currentAsset =
    totalAssetsArray[totalAssetsArray.length - 1][1].totalAssets;
  const rate = ((currentAsset - initialAsset) / initialAsset) * 100;
  return rate;
};
