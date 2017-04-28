import {
    NativeModules
} from 'react-native';
var RNFS = require('react-native-fs');

export default class LocationSampler {

    private readonly DEFAULT_INTERVAL = 1000;
    public running: boolean;
    public interval: number;
    public highAccuracy: boolean;
    public measurementName: string;
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
        this.measurementName = measurementName
        this.interval = interval > 0 ? interval : this.DEFAULT_INTERVAL
        this.samples = [];
    }

    /**
     * Start sampling, taking a geolocation at the frequency of the interval.
     */
    public start(): void {
        if (this.timerId === -1) {
            this.timerId = setInterval(() => {this.getGeoLocation()}, this.interval);
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
        console.log(RNFS.ExternalDirectoryPath);
        var path = RNFS.ExternalDirectoryPath + '/' + this.measurementName + '.json';
	
		NativeModules.NativeLocation.getBatteryLevel(
			(err, level) => {
		    	if (!err) {
	                console.log("batlevel:" + level);
					var data = JSON.stringify({samples: this.samples, battery_before: this.batteryLevelStart, battery_after: level}); 			
					RNFS.writeFile(path, data, 'utf8')
						.then((succes)=> {
						console.log('File written');
					}).catch((err) => {
						console.log(err.message);
					});
	            } else {
	                console.log("Error in battery info");
	            }
				
		});
        

       
    }

    /**
     * Returns the array of collected samples.
     */
    public getCollectedSamples(): Position[] {
        return this.samples;
    }

    /**
     * Adds a geolocation sample to the list of collected samples.
     */
    private getGeoLocation(): void {
        NativeModules.NativeLocation.getGPSLocation(
            (err, position) => {
                if (!err) {
                    var data = JSON.parse(position);
                    this.samples.push(data);
                    console.log(data.longitude);
                } else {
                    console.log("Error in retrieving location");
                }
            }
        );
    }
}
