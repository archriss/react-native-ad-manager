# react-native-ad-manager (Fork of react-native-admob - only supports ad manager)

A react-native module for Google DFP Banners.

## Installation

You can use npm or Yarn to install the latest beta version:

**Yarn:**

    yarn add react-native-admob@next

In order to use this library, you have to link it to your project first. There's excellent documentation on how to do this in the [React Native Docs](https://facebook.github.io/react-native/docs/linking-libraries-ios.html#content).

### iOS

For iOS you will have to add the [Google Mobile Ads SDK](https://developers.google.com/admob/ios/quick-start#import_the_mobile_ads_sdk) to your Xcode project.

### Android

On Android the AdMob library code is part of Play Services, which is automatically added when this library is linked.

## Usage

```jsx
import { PublisherBanner } from 'react-native-ad-manager'

// Display a DFP Publisher banner
<PublisherBanner
  adSize="fullBanner"
  adUnitID="your-admob-unit-id"
  testDevices={[PublisherBanner.simulatorId]}
  onAdFailedToLoad={error => console.error(error)}
  onAppEvent={event => console.log(event.name, event.info)}
/>

```

For a full example reference to the [example project](Example).

## Reference

### AdMobBanner

#### Properties

##### `adSize`

*Corresponding to [iOS framework banner size constants](https://developers.google.com/admob/ios/banner)*

<table>
  <thead>
    <tr>
      <th>Value</th>
      <th>Description</th>
      <th>Availability</th>
      <th>Size (WxH)</th>
    </t>
  </thead>
  <tbody>
    <tr>
      <td><code>banner</code></td>
      <td>Standard Banner</td>
      <td>Phones and Tablets</td>
      <td>320x50</td>
    </tr>
    <tr>
      <td><code>largeBanner</code></td>
      <td>Large Banner</td>
      <td>Phones and Tablets</td>
      <td>320x100</td>
    </tr>
    <tr>
      <td><code>mediumRectangle</code></td>
      <td>IAB Medium Rectangle</td>
      <td>Phones and Tablets</td>
      <td>300x250</td>
    </tr>
    <tr>
      <td><code>fullBanner</code></td>
      <td>IAB Full-Size Banner</td>
      <td>Tablets</td>
      <td>468x60</td>
    </tr>
    <tr>
      <td><code>leaderboard</code></td>
      <td>IAB Leaderboard</td>
      <td>Tablets</td>
      <td>728x90</td>
    </tr>
    <tr>
      <td>
        <code>smartBannerPortrait</code><br/>
        <code>smartBannerLandscape</code>
      </td>
      <td>Smart Banner</td>
      <td>Phones and Tablets</td>
      <td>Screen width x 32|50|90</td>
    </tr>
  </tbody>
</table>

*Note: There is no `smartBannerPortrait` and `smartBannerLandscape` on Android. Both prop values will map to `smartBanner`*

##### `onAdLoaded`

Accepts a function. Called when an ad is received.

##### `onAdFailedToLoad`

Accepts a function. Called when an ad request failed.

##### `onAdOpened`

Accepts a function. Called when an ad opens an overlay that covers the screen.

##### `onAdClosed`

Accepts a function. Called when the user is about to return to the application after clicking on an ad.

##### `onAdLeftApplication`

Accepts a function. Called when a user click will open another app (such as the App Store), backgrounding the current app.

##### `onSizeChange`

Accepts a function. Called when the size of the banner changes. The function is called with an object containing the width and the height.


*Above names correspond to the [Ad lifecycle event callbacks](https://developers.google.com/admob/android/banner#ad_events)*

### PublisherBanner

#### Properties

Same as `AdMobBanner`, with the addition of 2 extra properties:

##### `onAppEvent`

Accepts a function. Called when DFP sends an event back to the app.

These events may occur at any time during the ad's lifecycle, even before `onAdLoaded` is called. The function is called with an object, containing the name of the event and an info property, containing additional information.

More info here: https://developers.google.com/mobile-ads-sdk/docs/dfp/ios/banner#app_events

##### `validAdSizes`

An array of ad sizes which may be eligible to be served.
