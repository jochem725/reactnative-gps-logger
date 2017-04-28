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
    highAccuracyEnabledSetting: boolean;
    sampleRateSetting: number;
    measurementNameSetting: string;
}

export default class LocationSamplerComponent extends React.Component<undefined, ILocationSamplerState> {

    constructor(props) {
        super(props);
        const locationSampler = new LocationSampler(1000, false, "Name");

        this.state = {
            highAccuracyEnabledSetting: false,
            measurementNameSetting: locationSampler.measurementName,
            sampleRateSetting: locationSampler.interval,
            sampler: locationSampler,
        };
    }

    public render() {
        return (
            <ScrollView style={styles.background}>
                <View style={styles.titleContainer}>
                    <Text style={styles.textstyle_title}>GeoSampler</Text>
                </View>
                <View style={styles.controlContainer}>
                    <Text style={styles.textstyle_label}>Name your measurement:</Text>
                    <TextInput style={styles.textInput} editable={!this.state.sampler.running} onChangeText={(text) => this.setState({ measurementNameSetting: text })} value={this.state.measurementNameSetting} keyboardType="default" />
                </View>
                <View style={styles.controlContainer}>
                    <Text style={styles.textstyle_label}>Sample Interval (ms):</Text>
                    <TextInput style={styles.textInput} editable={!this.state.sampler.running} onChangeText={(text) => this.setState({ sampleRateSetting: parseInt(text.replace(",", "")) })} value={this.state.sampleRateSetting.toString()} keyboardType="numeric" />
                </View>
                <View style={styles.controlContainer}>
                    <Text style={styles.textstyle_label}>High Accuracy Mode:</Text>
                    <Switch disabled={this.state.running} value={this.state.highAccuracyEnabledSetting} onValueChange={(val) => this.setState({ highAccuracyEnabledSetting: val })} />
                </View>
                <View style={styles.controlContainer}>
                    <Button title={this.buttonStartStopText()} onPress={() => { this.buttonStartStop(); }}></Button>
                </View>
            </ScrollView>
        );
    }

    public buttonStartStopText() {
        if (this.state.sampler.running) {
            return "Stop";
        } else {
            return "Start";
        }
    }

    public buttonStartStop() {
        if (this.state.sampler.running) {
            this.state.sampler.stop();
        } else {
            const locationSampler = new LocationSampler(this.state.sampleRateSetting, this.state.highAccuracyEnabledSetting, this.state.measurementNameSetting);
            this.setState({ sampler: locationSampler}, () => {
                this.state.sampler.start();
            });
        }
        this.forceUpdate();
    }
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: "skyblue",
    } as any,
    controlContainer: {
        alignItems: "center",
        backgroundColor: "skyblue",
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        margin: 10,
    } as any,
    textInput: {
        alignSelf: "center",
        color: "white",
        height: 50,
        textAlign: "center",
        width: 80,
    } as any,
    textstyle_label: {
        fontSize: 14,
        margin: 10,
    } as any,
    textstyle_title: {
        fontSize: 36,
        fontWeight: "bold",
    } as any,
    titleContainer: {
        alignItems: "center",
        backgroundColor: "powderblue",
        height: 100,
        justifyContent: "center",
    } as any,
});
