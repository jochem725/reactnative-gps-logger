var RNFS = require('react-native-fs');

export default class LocationSampler {

    private readonly DEFAULT_INTERVAL = 1000;
    public running: boolean;
    private _timerId: number;
    public interval: number;
    private samples: Position[];

    /**
     * LocationSampler handles sampling of a location with a fixed interval.
     */
    constructor(interval: number) {
        this.running = false;
        this._timerId = -1;
        console.log("hello world!");
        this.interval = interval < 0 ? interval : this.DEFAULT_INTERVAL
        this.samples = [];
    }

    get timerId() {
        return this._timerId;
    }

    set timerId(value: number) {
        this._timerId = value;
    }

    public start(): void {
        if (this.timerId === -1) {
            this.timerId = setInterval(() => {this.getGeoLocation()}, this.interval);
            this.running = true;
        }
    }

    public stop(): void {
        if (this.timerId !== -1) {
            clearInterval(this.timerId);
            this.timerId = -1;
            this.running = false;
        }
        var path = RNFS.DocumentDirectoryPath + '/test.txt';
        RNFS.writeFile(path, 'Hello world!', 'utf8')
            .then((succes)=> {
                console.log('File written');
            }).catch((err) => {
            console.log(err.message);
        });
    }

    public getCollectedSamples(): Position[] {
        return this.samples;
    }

    private getGeoLocation(): void {
        navigator.geolocation.getCurrentPosition(
            (position) => {console.log(this.samples); this.samples.push(position); },
            (error) => {console.log(error);},
            {}
        );
    }
}
