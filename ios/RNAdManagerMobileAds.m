#import <React/RCTBridgeModule.h>
#import <React/RCTEventDispatcher.h>
#import <React/RCTBridge.h>

@implementation RNAdManagerMobileAds
@synthesize bridge = _bridge;

RCT_EXPORT_MODULE();

+ (BOOL)requiresMainQueueSetup
{
    return YES;
}

RCT_EXPORT_METHOD(openDebugMenu:(nonnull NSString *)adUnitId) {
    GADDebugOptionsViewController *debugOptionsViewController = [GADDebugOptionsViewController debugOptionsViewControllerWithAdUnitID:adUnitId];
    [self presentViewController:debugOptionsViewController animated:YES completion:nil];
}

RCT_EXPORT_METHOD(setAppMuted:(bool *)muted) {
    // TODO: implement
}

RCT_EXPORT_METHOD(setAppVolume:(nonnull NSNumber *)volume) {
    // TODO: implement
}

@end
