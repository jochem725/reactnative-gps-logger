import * as React from 'react';
import {
    View,
    ScrollView,
    Text,
    Button,
    Switch,
    TextInput,
    StyleSheet
} from 'react-native';
import LocationSampler from './LocationSampler';

class LocationSamplerState {
    running: boolean
    sampler: LocationSampler
    highAccuracyEnabledSetting: boolean
    sampleRateSetting: number
}

export default class LocationSamplerComponent extends React.Component<undefined, LocationSamplerState> {
    
    constructor(props) {
        super(props)
        let sampler = new LocationSampler(1000)

        this.state = {
            running: false,
            highAccuracyEnabledSetting: false,
            sampler: sampler,
            sampleRateSetting: 1000
        }
    }
    
    public render() {
        return (
            <ScrollView style={styles.background}>
                <View style={styles.titleContainer}>
                        <Text style={styles.textstyle_title}>GeoSampler</Text>
                </View>
                <View style={styles.controlContainer}>
                    <Text style={styles.textstyle_label}>Sample Interval (ms):</Text>
                    <TextInput style={styles.textInput} editable={!this.state.running} onChangeText={(text) => this.setState({sampleRateSetting: parseInt(text.replace(',', ''))})} value={this.state.sampleRateSetting.toString()} keyboardType='numeric'/>
                </View>
                <View style={styles.controlContainer}>
                    <Text style={styles.textstyle_label}>High Accuracy Mode:</Text>
                    <Switch disabled={this.state.running} value={this.state.highAccuracyEnabledSetting} onValueChange={(val) => this.setState({highAccuracyEnabledSetting: val})}/>
                </View>
                <View style={styles.controlContainer}>
                    <Button title={this.buttonStartStopText()} onPress={() => {this.buttonStartStop()}}></Button>
                </View>
            </ScrollView>
        );
    }

    public buttonStartStopText() {
        if (this.state.running) {
            return 'Stop'
        } else {
            return 'Start'
        }
    }

    public buttonStartStop() {
        if (this.state.running) {
            this.setState({running: false}, () => {
                this.state.sampler.stop()
            })
        } else {
            this.setState({sampler: new LocationSampler(this.state.sampleRateSetting, this.state.highAccuracyEnabledSetting), running: true}, () => {
                this.state.sampler.start()
            })
        }
    }
}

let styles = StyleSheet.create({
    background: {
        backgroundColor: 'skyblue'
    } as any,
    titleContainer: {
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'powderblue'
    },
    textstyle_title: {
        fontSize: 36,
        fontWeight: 'bold'
    } as any,
    textstyle_label: {
        fontSize: 14,
        margin: 10
    } as any,
    controlContainer: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: 'skyblue',
        margin: 10
    } as any,
    textInput: {
        height: 50,
        width: 80,
        color: 'white',
        alignSelf: 'center',
        textAlign: 'center'
    }
});