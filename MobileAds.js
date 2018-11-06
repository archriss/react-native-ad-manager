/**
 * @flow
 */

import { NativeModules } from 'react-native'

const MobileAds = NativeModules.RNAdManagerMobileAds

export function openDebugMenu(adUnitId: string) {
  MobileAds.openDebugMenu(adUnitId)
}

export function setAppMuted(muted: boolean) {
  MobileAds.setAppMuted(muted)
}

export function setAppVolume(volume: number) {
  MobileAds.setAppVolume(volume)
}
