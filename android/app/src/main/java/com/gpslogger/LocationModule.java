package com.gpslogger;

import android.annotation.TargetApi;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.BatteryManager;
import android.os.Bundle;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import org.json.JSONException;
import org.json.JSONObject;

public class LocationModule extends ReactContextBaseJavaModule {


    public LocationModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "NativeLocation";
    }

    /**
     * Request the GPS location from the system
     * @param position callback to return the current location
     */
    @ReactMethod
    public void getGPSLocation(final Callback position) {

        String context = Context.LOCATION_SERVICE;
        LocationManager locationManager = (LocationManager) MainApplication.getAppContext().getSystemService(context);

        locationManager.requestSingleUpdate(LocationManager.GPS_PROVIDER, new LocationListener(){

            public void onLocationChanged(Location location) {
                double time = (double) location.getTime();

                position.invoke(0, location.getLatitude(), location.getLongitude(), location.getAltitude(),
                        time, location.getAccuracy(), location.getSpeed());
            }

            public void onProviderDisabled(String provider) {}
            public void onProviderEnabled(String provider) {}
            public void onStatusChanged(String provider, int status, Bundle extras) {

            }
        }, null);
    }

    /**
     * returns the current battery level
     * @return int of the battery level
     */
    @ReactMethod
    public void getBatteryLevel(final Callback battery){
        IntentFilter ifilter = new IntentFilter(Intent.ACTION_BATTERY_CHANGED);
        Intent batteryStatus = MainApplication.getAppContext().registerReceiver(null, ifilter);
        int scale = batteryStatus.getIntExtra(BatteryManager.EXTRA_SCALE, -1);
        float batlevel = ((float)batteryStatus.getIntExtra(BatteryManager.EXTRA_LEVEL, -1) / (float)scale) * 100.0f;
        battery.invoke(0, batlevel);
    }


}
