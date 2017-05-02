// NativeLocationBridge.m
#import "React/RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(NativeLocation, NSObject)

RCT_EXTERN_METHOD(getGPSLocation:(RCTResponseSenderBlock)callback)
RCT_EXTERN_METHOD(getBatteryLevel:(RCTResponseSenderBlock)callback)

@end
