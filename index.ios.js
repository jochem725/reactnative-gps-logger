/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import LocationSampler from 'built/LocationSamplerComponent'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class GPSLogger extends Component {
  render() {
    return (
      <View>
        <LocationSampler />
      </View>
    );
  }
}

AppRegistry.registerComponent('GPSLogger', () => GPSLogger);
