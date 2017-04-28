import 'react-native';
import { NativeModules } from "react-native";
import React from 'react';
import LocationSampler from '../built/LocationSampler.js';
const ReactNativeFS = require("react-native-fs");

import renderer from 'react-test-renderer';

describe('the constructor', () => {
    test('does not set negative sampling intervals', () => {
        let locationSampler = new LocationSampler(-1000, false, "Test");
        expect(locationSampler.interval).toEqual(locationSampler.DEFAULT_INTERVAL)
    });
    test('does set positive sampling intervals', () => {
        let locationSampler = new LocationSampler(1234, false, "Test");
        expect(locationSampler.interval).toEqual(1234)
    });
});

describe('the start() method', () => {
    let locationSampler

    beforeEach(() => {
        locationSampler = new LocationSampler(1000, false, "Test");
    });

    afterEach(() => {
        locationSampler.stop()
    })

    test('sets a timer', () => {
        locationSampler.start();
        expect(locationSampler.timerId).not.toEqual(-1)
    });
    test('sets the sampler to running', () => {
        locationSampler.start();
        expect(locationSampler.running).toEqual(true)
    });
});

describe('the stop() method', () => {
    let locationSampler

    beforeEach(() => {
        locationSampler = new LocationSampler(1000, false, "Test");
    });

    test('stops a timer', () => {
        locationSampler.start();
        locationSampler.stop();
        expect(locationSampler.timerId).toEqual(-1)
    });
    test('sets the sampler to not running', () => {
        locationSampler.start();
        locationSampler.stop();
        expect(locationSampler.running).toEqual(false)
    });
    test('writes to file with the correct parameters', () => {
        const path = "PATH/" + locationSampler.measurementName + ".json";
        locationSampler.start();
        locationSampler.samples = [1, 2, 3]
        locationSampler.stop();
        expect(ReactNativeFS.writeFile).toHaveBeenCalledWith(path, JSON.stringify({ samples: [1, 2, 3] }), "utf8");
    });
});

describe('the getGeoLocation() method', () => {
    beforeAll(() => {
        NativeModules.NativeLocation = { getGPSLocation: jest.fn((callback) => {
            return callback(null, "{\"latitude\": 1, \"longitude\": 2 }");
        }) } 
    })

    test('calls method geoLocation method', () => {
        locationSampler = new LocationSampler(1000, false, "Test");
        locationSampler.getGeoLocation()
        expect(NativeModules.NativeLocation.getGPSLocation).toHaveBeenCalled()
    });

    test('pushes a location object to the list of samples', () => {
        locationSampler = new LocationSampler(1000, false, "Test");
        locationSampler.getGeoLocation()
        expect(locationSampler.samples).toContainEqual({"latitude": 1, "longitude": 2})
    });
});