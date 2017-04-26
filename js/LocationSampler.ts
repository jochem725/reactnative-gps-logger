export default class LocationSampler {

    private readonly DEFAULT_INTERVAL = 1000;
    public running: boolean;
    public interval: number;
    public highAccuracy: boolean;
    private timerId: number;
    private samples: Position[];

    /**
     * LocationSampler handles sampling of a location with a fixed interval.
     */
    constructor(interval: number, highAccuracy: boolean) {
        this.running = false;
        this.timerId = -1;
        this.highAccuracy = highAccuracy;

        this.interval = interval < 0 ? interval : this.DEFAULT_INTERVAL
        this.samples = [];
    }

    /**
     * Start sampling, taking a geolocation at the frequency of the interval.
     */
    public start(): void {
        if (this.timerId === -1) {
            this.timerId = setInterval(() => {this.getGeoLocation()}, this.interval);
            this.running = true;
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
        navigator.geolocation.getCurrentPosition(
            (position) => {console.log(position.coords.latitude); this.samples.push(position)},
            (error) => {console.log(error);},
            {enableHighAccuracy: this.highAccuracy}
        );
    }
}
