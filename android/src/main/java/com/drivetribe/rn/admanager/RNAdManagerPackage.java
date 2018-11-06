package com.drivetribe.rn.admanager;

import com.facebook.react.LazyReactPackage;
import com.facebook.react.bridge.ModuleSpec;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.module.model.ReactModuleInfoProvider;
import com.facebook.react.uimanager.ViewManager;

import java.util.Collections;
import java.util.List;

import javax.inject.Provider;

public class RNAdManagerPackage extends LazyReactPackage {

    @Override
    public List<ModuleSpec> getNativeModules(final ReactApplicationContext reactContext) {
        return Collections.singletonList(
                ModuleSpec.nativeModuleSpec(
                        RNAdManagerMobileAds.class,
                        new Provider<NativeModule>() {
                            @Override
                            public NativeModule get() {
                                return new RNAdManagerMobileAds(reactContext);
                            }
                        })
        );
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.<ViewManager>singletonList(new RNPublisherBannerViewManager());
    }

    @Override
    public ReactModuleInfoProvider getReactModuleInfoProvider() {
        // This has to be done via reflection or we break open source.
        return LazyReactPackage.getReactModuleInfoProviderViaReflection(this);
    }
}
