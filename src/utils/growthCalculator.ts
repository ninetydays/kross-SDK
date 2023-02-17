export const growthCalculator = (totalAssetsArray: any) => {
  let currentAsset = totalAssetsArray[0][1].totalAssets;
  let initialAsset = totalAssetsArray[totalAssetsArray.length -1][1].totalAssets;
  let rate = (currentAsset - initialAsset)/initialAsset * 100;
  return rate;
}
