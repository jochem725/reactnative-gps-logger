import 'react-native';
import React from 'react';
import LocationSampler from '../built/LocationSampler.js';

import renderer from 'react-test-renderer';
    
jest.unmock('ScrollView')

describe('the constructor', () => {
    test('does not set negative sampling intervals', () => {
        let locationSampler = new LocationSampler(-1000, false, "Test");
        expect(locationSampler.interval).toEqual(locationSampler.DEFAULT_INTERVAL)
    });
    test('does set positive sampling intervals', () => {
        let locationSampler = new LocationSampler(1233, false, "Test");
        expect(locationSampler.interval).toEqual(1234)
    });
});