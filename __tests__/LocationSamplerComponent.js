import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import LocationSamplerComponent from '../built/LocationSamplerComponent.js';

test('renders correctly', () => {
  const tree = renderer.create(
    <LocationSamplerComponent />
  );
});