import { NativeModules } from "react-native";
const ReactNativeFS = require("react-native-fs");

export default class LocationSampler {

    public running: boolean;
    public interval: number;
    public highAccuracy: boolean;
    public measurementName: string;
    private readonly DEFAULT_INTERVAL = 1000;
    private timerId: number;
    private samples: Position[];
    private batteryLevelStart : number;

    /**
     * LocationSampler handles sampling of a location with a fixed interval.
     */
    constructor(interval: number, highAccuracy: boolean, measurementName: string) {
        this.running = false;
        this.timerId = -1;
        this.highAccuracy = highAccuracy;
        this.measurementName = measurementName;
        this.interval = interval > 0 ? interval : this.DEFAULT_INTERVAL;
        this.samples = [];
    }

    /**
     * Start sampling, taking a geolocation at the frequency of the interval.
     */
    public start(): void {
        if (this.timerId === -1) {
            this.timerId = setInterval(() => {this.getGeoLocation(); }, this.interval);
            this.running = true;
            NativeModules.NativeLocation.getBatteryLevel(
            (err, level) => {
                if (!err) {
                    console.log("batlevel:" + level);
                    this.batteryLevelStart = level;
                } else {
                    console.log("Error in battery info");
                }
            });
        }
    }

    /**
     * Stop sampling, clearing the timer interval.
     */
    public stop(): void {
        if (this.timerId !== -1) {
            clearInterval(this.timerId);
            this.timerId = -1;
            this.running = false;
        }

        var path = ReactNativeFS.ExternalDirectoryPath + '/' + this.measurementName + '.json';
        NativeModules.NativeLocation.getBatteryLevel(
            (err, level) => {
                if (!err) {
                    const data = JSON.stringify({ battery_after: level,
                                                battery_before: this.batteryLevelStart,
                                                measurementname: this.measurementName,
                                                samplerate: this.interval,
                                                samples: this.samples});
                    ReactNativeFS.writeFile(path, data, "utf8");
                }
            },
        );
    }

    /**
     * Adds a geolocation sample to the list of collected samples.
     */
    private getGeoLocation(): void {
        NativeModules.NativeLocation.getGPSLocation(
            (err, lat, lon, alt, time, acc, speed) => {
                console.log(time);
                if (!err) {
                    const data = {
                        "coords": {
                            "longitude": lon,
                            "latitude": lat,
                            "altitude": alt,
                            "accuracy": acc,
                            "altitudeAccuracy": null,
                            "heading": null,
                            "speed": speed
                        },
                        "timestamp": time
                    };
                    this.samples.push(data);
                }
            },
        );
    }
}
