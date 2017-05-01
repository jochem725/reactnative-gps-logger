// NativeLocation.swift

import CoreLocation
import UIKit

@objc(NativeLocation)
class NativeLocation: NSObject, CLLocationManagerDelegate {
  
  let locationManager: CLLocationManager
  var locationRequests: [RCTResponseSenderBlock]
  var batteryLevel: Float
  
  override init() {
    locationManager = CLLocationManager()
    locationManager.requestAlwaysAuthorization()
    
    locationRequests = [RCTResponseSenderBlock]()
    batteryLevel = -100
    
    UIDevice.current.isBatteryMonitoringEnabled = true
  }
  
  @objc(getGPSLocation:)
  func getGPSLocation(callback: @escaping RCTResponseSenderBlock) -> Void {
    locationManager.delegate = self
    locationRequests.append(callback)
    locationManager.startUpdatingLocation()
  }
  
  func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
    if !locationRequests.isEmpty {
      let location = locations.last!
      let positionCallback = locationRequests.remove(at: 0)
      let lat = location.coordinate.latitude
      let lon = location.coordinate.longitude
      let alt = location.altitude
      let time = location.timestamp.description
      let acc = location.horizontalAccuracy
      let speed = location.speed
      
      positionCallback([NSNull(), lat, lon, alt, time, acc, speed])
    } else {
      locationManager.stopUpdatingLocation()
    }
  }
  
  func locationManager(_ manager: CLLocationManager, didFailWithError error: Error) {
    if !locationRequests.isEmpty {
      let positionCallback = locationRequests.remove(at: 0)
      positionCallback([true])
    } else {
      locationManager.stopUpdatingLocation()
    }
  }
}
