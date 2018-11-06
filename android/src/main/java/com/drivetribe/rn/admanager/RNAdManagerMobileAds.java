package com.drivetribe.rn.admanager;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;
import com.google.android.gms.ads.MobileAds;

@ReactModule(name = "RNAdManagerMobileAds")
public class RNAdManagerMobileAds extends ReactContextBaseJavaModule {

    private boolean mIsInitialized;

    public RNAdManagerMobileAds(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override public String getName() {
        return "RNAdManagerMobileAds";
    }

    private void initializeMobileAds() {
        if (!mIsInitialized && getCurrentActivity() != null) {
            mIsInitialized = true;
            MobileAds.initialize(getCurrentActivity());
        }
    }

    @ReactMethod
    public void openDebugMenu(String adUnitId) {
        initializeMobileAds();
        MobileAds.openDebugMenu(getCurrentActivity(), adUnitId);
    }

    @ReactMethod
    public void setAppMuted(boolean muted) {
        initializeMobileAds();
        MobileAds.setAppMuted(muted);
    }

    @ReactMethod
    public void setAppVolume(float volume) {
        initializeMobileAds();
        MobileAds.setAppVolume(volume);
    }
}
