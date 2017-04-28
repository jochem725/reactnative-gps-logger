package com.gpslogger;

import android.content.Context;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
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
                String result = new JSONObject().toString();
                try {
                   result = createLocationJSON(location);
                } catch(Exception e){
                    position.invoke(1, result);
                }
                position.invoke(0, result);
            }

            public void onProviderDisabled(String provider) {}
            public void onProviderEnabled(String provider) {}
            public void onStatusChanged(String provider, int status, Bundle extras) {

            }
        }, null);
    }

    /**
     * Creates a json object from a location object
     * @param location object of the current position
     * @return Json object of the current location
     * @throws JSONException when the json object cannot be created
     */
    public String createLocationJSON(Location location) throws JSONException {
        JSONObject json = new JSONObject();
        json.put("longitude", location.getLongitude());
        json.put("latitude", location.getLatitude());
	json.put("altitude", location.getAltitude());
        json.put("timestamp", location.getTime());
        return json.toString();
    }


}
