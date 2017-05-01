import * as React from "react";
import {
    Button,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    View,
} from "react-native";
import LocationSampler from "./LocationSampler";

interface ILocationSamplerState {
    sampler: LocationSampler;
    settings: {
        enableHighAccuracy: boolean;
        measurementName: string;
        sampleRate: number;
    };
}

export default class LocationSamplerComponent extends React.Component<undefined, ILocationSamplerState> {

    constructor(props) {
        super(props);
        const locationSampler = new LocationSampler(1000, false, "Name");

        this.state = {
            sampler: locationSampler,
            settings: {
                enableHighAccuracy: false,
                measurementName: locationSampler.measurementName,
                sampleRate: locationSampler.interval,
            },
        };
    }

    public render() {
        const sampler = this.state.sampler;
        const settings = this.state.settings;

        return (
            <ScrollView style={styles.background}>
                <View style={styles.titleContainer}>
                    <Text style={styles.textTitle}>GeoSampler</Text>
                </View>
                <View style={styles.controlContainer}>
                    <Text style={styles.textLabel}>Name your measurement:</Text>
                    <TextInput
                        style={styles.textInput}
                        editable={!sampler.running}
                        onChangeText={this.onMeasurementNameChangeText}
                        value={settings.measurementName}
                        keyboardType="default"
                    />
                </View>
                <View style={styles.controlContainer}>
                    <Text style={styles.textLabel}>Sample Interval (ms):</Text>
                    <TextInput
                        style={styles.textInput}
                        editable={!sampler.running}
                        onChangeText={this.onSampleRateChangeText}
                        value={settings.sampleRate.toString()}
                        keyboardType="numeric"
                    />
                </View>
                <View style={styles.controlContainer}>
                    <Text style={styles.textLabel}>High Accuracy Mode:</Text>
                    <Switch
                        disabled={sampler.running}
                        value={settings.enableHighAccuracy}
                        onValueChange={this.onAccuracyChangeVal}
                    />
                </View>
                <View style={styles.controlContainer}>
                    <Button title={this.state.sampler.running ? "Stop" : "Start"} onPress={this.buttonStartStop} />
                </View>
            </ScrollView>
        );
    }

    private buttonStartStop = () => {
        (this.state.sampler.running) ? this.stopMeasurement() : this.startMeasurement();
    }

    private startMeasurement() {
        const settings = this.state.settings;
        const sampleRate = settings.sampleRate;
        const enableHighAccuracy = settings.enableHighAccuracy;
        const measurementName = settings.measurementName;
        const locationSampler = new LocationSampler(sampleRate, enableHighAccuracy, measurementName);

        locationSampler.start();
        this.setState({ sampler: locationSampler }, () => {
            this.forceUpdate();
        });
    }

    private stopMeasurement() {
        this.state.sampler.stop();
        this.forceUpdate();
    }

    private onMeasurementNameChangeText = (text) => {
        this.setState({
            settings: {
                ...this.state.settings,
                measurementName: text,
            },
        });
    }

    private onSampleRateChangeText = (text) => {
        const sampleRateInt = text.length > 0 ? parseInt(text.replace(",", ""), 10) : 0;

        this.setState({
            settings: {
                ...this.state.settings,
                sampleRate: sampleRateInt,
            },
        });
    }

    private onAccuracyChangeVal = (val) => {
        this.setState({
            settings: {
                ...this.state.settings,
                enableHighAccuracy: val,
            },
        });
    }
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: "skyblue",
    },
    controlContainer: {
        alignItems: "center",
        backgroundColor: "skyblue",
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        margin: 10,
    },
    textInput: {
        alignSelf: "center",
        color: "white",
        height: 50,
        textAlign: "center",
        width: 80,
    },
    textLabel: {
        fontSize: 14,
        margin: 10,
    },
    textTitle: {
        fontSize: 36,
        fontWeight: "bold",
    },
    titleContainer: {
        alignItems: "center",
        backgroundColor: "powderblue",
        height: 100,
        justifyContent: "center",
    },
});
