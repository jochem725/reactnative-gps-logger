export default class LocationSampler {

    private readonly DEFAULT_INTERVAL = 1000;
    private running: boolean;
    private timerId: number;
    private interval: number;
    private samples: Position[];

    /**
     * LocationSampler handles sampling of a location with a fixed interval.
     */
    constructor(interval: number) {
        this.running = false;
        this.timerId = -1;

        this.interval = interval < 0 ? interval : this.DEFAULT_INTERVAL
        this.samples = [];
    }

    public start(): void {
        if (this.timerId === -1) {
            this.timerId = setInterval(this.getGeoLocation, this.interval);
        }
    }

    public stop(): void {
        if (this.timerId !== -1) {
            clearInterval(this.timerId);
        }
    }

    public getCollectedSamples(): Position[] {
        return this.samples;
    }

    private getGeoLocation(): void {
        navigator.geolocation.getCurrentPosition(
            (position) => { this.samples.push(position); },
            (error) => { console.log(error); },
            {}
        );
    }
}
