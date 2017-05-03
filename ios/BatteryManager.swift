//  BatteryManager.swift

import Foundation
import UIKit

class BatteryManager: NSObject {

  var batteryLevel: Float
  
  override init() {
    UIDevice.current.isBatteryMonitoringEnabled = true
    batteryLevel = UIDevice.current.batteryLevel * 100
    
    super.init()    
    NotificationCenter.default.addObserver(self, selector: #selector(updateBatteryLevel), name: NSNotification.Name.UIDeviceBatteryLevelDidChange, object: nil)
  }
  
  func updateBatteryLevel() {
    batteryLevel = UIDevice.current.batteryLevel * 100
  }
}
