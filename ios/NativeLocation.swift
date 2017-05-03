// NativeLocation.swift

import CoreLocation
import UIKit

@objc(NativeLocation)
class NativeLocation: NSObject, CLLocationManagerDelegate {
  
  var locationManager: CLLocationManager?
  var locationRequests: [RCTResponseSenderBlock]
  let batteryManager: BatteryManager
  
  override init() {
    locationRequests = [RCTResponseSenderBlock]()
    batteryManager = BatteryManager()
    locationManager = nil
    
    if (CLLocationManager.authorizationStatus() != CLAuthorizationStatus.denied || CLLocationManager.authorizationStatus() != CLAuthorizationStatus.restricted) {
      locationManager = CLLocationManager()
      
      if (CLLocationManager.authorizationStatus() == CLAuthorizationStatus.notDetermined) {
        locationManager?.requestAlwaysAuthorization()
      }
    }
    
    super.init()
    locationManager?.delegate = self
  }
  
  @objc(getGPSLocation:)
  func getGPSLocation(callback: @escaping RCTResponseSenderBlock) -> Void {
    locationRequests.append(callback)
    locationManager?.startUpdatingLocation()
  }
  
  @objc(getBatteryLevel:)
  func getBatteryLevel(callback: @escaping RCTResponseSenderBlock) -> Void {
    callback([NSNull(), batteryManager.batteryLevel])
  }
  
  func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
    if !locationRequests.isEmpty {
      let location = locations.last!
      let positionCallback = locationRequests.remove(at: 0)
      let lat = location.coordinate.latitude
      let lon = location.coordinate.longitude
      let alt = location.altitude
      let time = location.timestamp.timeIntervalSince1970
      let acc = location.horizontalAccuracy
      let speed = location.speed
      
      positionCallback([NSNull(), lat, lon, alt, time, acc, speed])
    } else {
      locationManager?.stopUpdatingLocation()
    }
  }
  
  func locationManager(_ manager: CLLocationManager, didFailWithError error: Error) {
    if !locationRequests.isEmpty {
      let positionCallback = locationRequests.remove(at: 0)
      positionCallback([true])
    } else {
      locationManager?.stopUpdatingLocation()
    }
  }
}
