import { WindowFeatures } from './../src/types'
import { prepareWindowFeatureString } from './../src/utils/windowFeatureString'

describe('first', () => {
  it('prepareWindowFeatureString returns valid string', async () => {
    const windowFeatures: WindowFeatures = {
      width: 100,
      height: 100,
      top: 0,
      left: 0,
    }
    const preparedWindowFeatureString: string =
      prepareWindowFeatureString(windowFeatures)
    expect(preparedWindowFeatureString).toBe(
      'width=100,height=100,top=0,left=0'
    )
  })
})
