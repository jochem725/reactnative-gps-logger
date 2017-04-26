import * as React from 'react';
import {
    View,
    ScrollView,
    Text,
    Button,
    TextInput,
    StyleSheet
} from 'react-native';
import LocationSampler from './LocationSampler';

class LocationSamplerState {
    running: boolean
    sampler: LocationSampler
    sampleRateSetting: number
}

export default class LocationSamplerComponent extends React.Component<undefined, LocationSamplerState> {
    
    constructor(props) {
        super(props)
        let sampler = new LocationSampler(1000)

        this.state = {
            running: false,
            sampler: sampler,
            sampleRateSetting: 1000
        }
    }
    
    public render() {
        return (
            <View style={{flex: 1}}>
                <View style={styles.titleContainer}>
                        <Text style={styles.textstyle_title}>GeoSampler</Text>
                </View>
                <View style={styles.container}>
                    <View style={styles.controlContainer}>
                        <Text style={styles.textstyle_label}>Sample Interval (ms):</Text>
                        <TextInput style={styles.textInput} onChangeText={(text) => this.setState({sampleRateSetting: parseInt(text.replace(',', ''))})} value={this.state.sampleRateSetting.toString()} keyboardType='numeric'/>
                    </View>
                    <View style={styles.controlContainer}>
                        <Button title={this.buttonStartStopText()} onPress={() => {this.buttonStartStop()}}></Button>
                    </View>
                </View>
            </View>
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
            this.setState({sampler: new LocationSampler(this.state.sampleRateSetting), running: true}, () => {
                this.state.sampler.start()
            })
        }
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
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
        backgroundColor: 'skyblue'
    } as any,
    textInput: {
        height: 50,
        width: 80,
        color: 'white',
        alignSelf: 'center',
        textAlign: 'center'
    }
});