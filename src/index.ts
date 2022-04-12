import { WindowPopUpParams } from './types'
import { WindowDefaultParams } from './constants/index'
import { prepareWindowFeatureString } from './utils/windowFeatureString'

export * from './types'

export function windowPopUp(
    popUpParams: WindowPopUpParams = WindowDefaultParams
) {
    let windowRef: any = null
    const { url, windowFeatures } = popUpParams
    if (windowRef === null || windowRef.closed) {
        windowRef = window.open(
            url,
            'Sign SDK',
            prepareWindowFeatureString(windowFeatures)
        )
    } else {
        windowRef.focus()
    }
}
