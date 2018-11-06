/**
 * @flow
 */

module.exports = {
  get PublisherBanner() {
    return require('./RNPublisherBanner').default;
  },
  get MobileAds() {
    return require('./MobileAds');
  }
};
