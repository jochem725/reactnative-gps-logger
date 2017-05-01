import 'react-native';
import { NativeModules } from "react-native";
import React from 'react';
import renderer from 'react-test-renderer';

import LocationSamplerComponent from '../built/LocationSamplerComponent.js';

let component;

beforeAll(() => {
  component = renderer.create(
    <LocationSamplerComponent />
  ).getInstance();

  NativeModules.NativeLocation = { 
        getGPSLocation: jest.fn((callback) => {
            return callback(null, 1, 2, 3, 4, 5, 6);
        }),
        getBatteryLevel: jest.fn((callback) => {
            return callback(null, 20);
        })
    } 
})

test('renders correctly', () => {
  const tree = renderer.create(
    <LocationSamplerComponent />
  );
});

describe('the buttonStartStop() method', () => {
  test('starts the measurement if running is false', () => {
    component.state.sampler.running = false
    component.buttonStartStop()
    expect(component.state.sampler.running).toBeTruthy()

  });
  test('stops the measurement if running is true', () => {
    component.state.sampler.running = true
    component.buttonStartStop()
    expect(component.state.sampler.running).toBeFalsy()
  });
});

describe('the startMeasurement() method', () => {
  test('starts the measurement', () => {
    component.startMeasurement()
    expect(component.state.sampler.running).toBeTruthy()
    component.state.sampler.stop()
  });

  test('creates a new sampler', () => {
    const oldSampler = component.state.sampler

    component.startMeasurement()
    expect(component.state.sampler).not.toEqual(oldSampler)
    component.state.sampler.stop()
  });
});

describe('the stopMeasurement() method', () => {
  test('stops the measurement', () => {
    component.state.sampler.start()
    component.stopMeasurement()
    expect(component.state.sampler.running).toBeFalsy()
  });
});

describe('the onMeasurementNameChangeText() method', () => {
  test('changes the measurement name setting', () => {
    const oldName = component.state.settings.measurementName
    component.onMeasurementNameChangeText('New Name')
    expect(component.state.settings.measurementName).not.toEqual(oldName)
  });
  test('changes the measurement name setting to the correct value', () => {
    const oldName = component.state.settings.measurementName
    component.onMeasurementNameChangeText('New Name')
    expect(component.state.settings.measurementName).toEqual('New Name')
  });
});

describe('the onSampleRateChangeText() method', () => {
  test('changes the sample rate setting', () => {
    const oldRate = component.state.settings.sampleRate
    component.onSampleRateChangeText('12345678')
    expect(component.state.settings.sampleRate).not.toEqual(oldRate)
  });
  test('changes the sample rate setting to the correct value', () => {
    const oldRate = component.state.settings.sampleRate
    component.onSampleRateChangeText('12345678')
    expect(component.state.settings.sampleRate).toEqual(12345678)
  });
  test('changes the sample rate setting to 0 on empty input', () => {
    const oldRate = component.state.settings.sampleRate
    component.onSampleRateChangeText('')
    expect(component.state.settings.sampleRate).toEqual(0)
  });
});

describe('the onAccuracyChangeVal() method', () => {
  test('changes the accuracy setting', () => {
    const oldAcc = component.state.settings.enableHighAccuracy
    component.onAccuracyChangeVal(true)
    expect(component.state.settings.enableHighAccuracy).not.toEqual(oldAcc)
  });
  test('changes the accuracy setting to the correct value', () => {
    const oldAcc = component.state.settings.enableHighAccuracy
    component.onAccuracyChangeVal(true)
    expect(component.state.settings.enableHighAccuracy).toBeTruthy()
  });
});