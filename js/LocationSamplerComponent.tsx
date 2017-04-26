import * as React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

interface LocationSamplerProps {

}

export default class LocationSamplerComponent extends React.Component<undefined, undefined> {
    public render() {
        return (
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>GeoSampler</Text>
                </View>
                <View style={styles.controlContainer}>
                    <Text>Sample Interval (ms):</Text>
                </View>
            </View>
        );
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
    } as any,
    titleContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'powderblue'
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold'
    } as any,
    controlContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'skyblue'
    }
});