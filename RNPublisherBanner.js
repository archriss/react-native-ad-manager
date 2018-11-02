/**
 * @flow
 */

import React, { Component } from 'react';
import {
  requireNativeComponent,
  UIManager,
  findNodeHandle,
  ViewPropTypes
} from 'react-native';

import { createErrorFromErrorData } from './utils';

import type { ViewStyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';

export type AdSizes = 'banner' | 'largeBanner' | 'mediumRectangle' | 'fullBanner' | 'leaderboard' | 'smartBannerPortrait' | 'smartBannerLandscape'

type Props = {
  /**
   * DFP iOS library banner size constants
   * (https://developers.google.com/admob/ios/banner)
   * banner (320x50, Standard Banner for Phones and Tablets)
   * largeBanner (320x100, Large Banner for Phones and Tablets)
   * mediumRectangle (300x250, IAB Medium Rectangle for Phones and Tablets)
   * fullBanner (468x60, IAB Full-Size Banner for Tablets)
   * leaderboard (728x90, IAB Leaderboard for Tablets)
   * smartBannerPortrait (Screen width x 32|50|90, Smart Banner for Phones and Tablets)
   * smartBannerLandscape (Screen width x 32|50|90, Smart Banner for Phones and Tablets)
   *
   * banner is default
   */
  adSize?: AdSizes,

  /**
   * Optional array specifying all valid sizes that are appropriate for this slot.
   */
  validAdSizes?: Array<AdSizes>,

  /**
   * DFP ad unit ID
   */
  adUnitID: string,

  /**
   * Array of test devices. Use PublisherBanner.simulatorId for the simulator
   */
  testDevices?: Array<string>,

  /**
   * Object of key value pairs that give additional targeting info
   */
  customTargeting?: { [key: string]: string | Array<string> },

  onSizeChange?: (size: { width: number, height: number }) => void,

  /**
   * DFP library events
   */
  onAdLoaded?: () => void,
  onAdFailedToLoad?: (error: Error) => void,
  onAdOpened?: () => void,
  onAdClosed?: () => void,
  onAdLeftApplication?: () => void,
  onAppEvent?: (event: { name: ?string, info: ?string }) => void,
  style?: ViewStyleProp,
};

type State = {
  style: ?ViewStyleProp
};

const RNDFPBannerView = requireNativeComponent('RNDFPBannerView');

export default class PublisherBanner extends Component<Props, State> {
  static simulatorId: string = 'SIMULATOR'
  state = {
    style: null
  };

  _bannerView: typeof RNDFPBannerView;

  componentDidMount() {
    this.loadBanner();
  }

  loadBanner() {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this._bannerView),
      UIManager.RNDFPBannerView.Commands.loadBanner,
      null
    );
  }

  handleSizeChange = (event: *) => {
    const { height, width } = event.nativeEvent;
    this.setState({ style: { width, height } });
    if (this.props.onSizeChange) {
      this.props.onSizeChange({ width, height });
    }
  };

  handleAppEvent = (event: *) => {
    if (this.props.onAppEvent) {
      const { name, info } = event.nativeEvent;
      this.props.onAppEvent({ name, info });
    }
  };

  handleAdFailedToLoad = (event: { error: { message: string }}) => {
    const { onAdFailedToLoad } = this.props
    if (onAdFailedToLoad) {
      onAdFailedToLoad(
        createErrorFromErrorData(event.nativeEvent.error)
      );
    }
  };

  setRef = (el: *) => {
    this._bannerView = ((el: any): typeof RNDFPBannerView)
  }

  render(): React$Element<*> {
    return (
      <RNDFPBannerView
        {...this.props}
        style={[this.props.style, this.state.style]}
        onSizeChange={this.handleSizeChange}
        onAdFailedToLoad={this.handleAdFailedToLoad}
        onAppEvent={this.handleAppEvent}
        ref={this.setRef}
      />
    );
  }
}
