/**
 * @flow
 */

if (__DEV__) {
  global.console.disableYellowBox = true;
}

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableHighlight,
  Button,
  ScrollView
} from 'react-native';

import {
  PublisherBanner,
  MobileAds,
} from '@drivetribe/react-native-ad-manager';

import type { ViewStyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';

type BannerExampleProps = {
  style?: ViewStyleProp,
  title: string,
  children?: any
};

const BannerExample = ({ style, title, children }: BannerExampleProps) => (
  <View style={[styles.example, style]}>
    <Text style={styles.title}>{title}</Text>
    <View>{children}</View>
  </View>
);

const bannerWidths = [200, 250, 320];

type State = {
  fluidSizeIndex: number,
  appEventsExampleStyle: ?ViewStyleProp,
  fluidAdSizeExampleStyle: ?ViewStyleProp
};

export default class Example extends Component<*, State> {
  state = {
    fluidSizeIndex: 0,
    appEventsExampleStyle: null,
    fluidAdSizeExampleStyle: null
  };

  _adSizesExample: PublisherBanner;
  _appEventsExample: PublisherBanner;
  _appFluidAdSizeExample: PublisherBanner;

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <BannerExample title="DFP - Multiple Ad Sizes">
            <PublisherBanner
              style={{ height: 250 }}
              adSize="banner"
              validAdSizes={['mediumRectangle']}
              adUnitID="/6499/example/APIDemo/AdSizes"
              customTargeting={{
                testing: 'test',
                arrayTest: ['test', 'test2']
              }}
              ref={el => (this._adSizesExample = el)}
            />
            <Button
              title="Reload"
              onPress={() => this._adSizesExample.loadBanner()}
            />
            <Button
              title="Open debug"
              onPress={() =>
                MobileAds.openDebugMenu('/6499/example/APIDemo/AdSizes')
              }
            />
            <Button
              title="setAppMuted"
              onPress={() =>
                MobileAds.setAppMuted(true)
              }
            />
            <Button
              title="setAppVolume"
              onPress={() =>
                MobileAds.setAppVolume(0.5)
              }
            />
          </BannerExample>
          <BannerExample
            title="DFP - App Events"
            style={this.state.appEventsExampleStyle}
          >
            <PublisherBanner
              style={{ height: 50 }}
              adUnitID="/6499/example/APIDemo/AppEvents"
              onAdFailedToLoad={error => console.warn(error)}
              onAppEvent={event => {
                if (event.name === 'color') {
                  this.setState({
                    appEventsExampleStyle: { backgroundColor: event.info }
                  });
                }
              }}
              ref={el => (this._appEventsExample = el)}
            />
            <Button
              title="Reload"
              onPress={() => this._appEventsExample.loadBanner()}
              style={styles.button}
            />
          </BannerExample>
          <BannerExample title="DFP - Fluid Ad Size">
            <View
              style={[
                { backgroundColor: '#f3f', paddingVertical: 10 },
                this.state.fluidAdSizeExampleStyle
              ]}
            >
              <PublisherBanner
                adSize="fluid"
                adUnitID="/6499/example/APIDemo/Fluid"
                ref={el => (this._appFluidAdSizeExample = el)}
                style={{ flex: 1 }}
              />
            </View>
            <Button
              title="Change Banner Width"
              onPress={() =>
                this.setState(prevState => ({
                  fluidSizeIndex: prevState.fluidSizeIndex + 1,
                  fluidAdSizeExampleStyle: {
                    width:
                      bannerWidths[
                        prevState.fluidSizeIndex % bannerWidths.length
                      ]
                  }
                }))
              }
              style={styles.button}
            />
            <Button
              title="Reload"
              onPress={() => this._appFluidAdSizeExample.loadBanner()}
              style={styles.button}
            />
          </BannerExample>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'ios' ? 30 : 10
  },
  example: {
    paddingVertical: 10
  },
  title: {
    margin: 10,
    fontSize: 20
  },
  button: {}
});

AppRegistry.registerComponent('Example', () => Example);
