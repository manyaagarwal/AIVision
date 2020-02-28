import React , { Component } from 'react';
import {Container, Footer, FooterTab, Button, Content} from "native-base";
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import Tts from 'react-native-tts';

export default class Home extends Component {
    state = {
        voices: [],
        ttsStatus: 'initiliazing',
        selectedVoice: null,
        speechRate: 0.5,
        speechPitch: 1,
        text: 'Enter Text like Hello About React',
    };

    constructor(props) {
        super(props);
        Tts.addEventListener('tts-start', event =>
            this.setState({ ttsStatus: 'started' })
        );
        Tts.addEventListener('tts-finish', event =>
            this.setState({ ttsStatus: 'finished' })
        );
        Tts.addEventListener('tts-cancel', event =>
            this.setState({ ttsStatus: 'cancelled' })
        );
        Tts.setDefaultRate(this.state.speechRate);
        Tts.setDefaultPitch(this.state.speechPitch);
        Tts.getInitStatus().then(this.initTts);
    }

    initTts = async () => {
        const voices = await Tts.voices();
        const availableVoices = voices
            .filter(v => !v.networkConnectionRequired && !v.notInstalled)
            .map(v => {
                return { id: v.id, name: v.name, language: v.language };
            });
        let selectedVoice = null;
        if (voices && voices.length > 0) {
            selectedVoice = voices[0].id;
            try {
                await Tts.setDefaultLanguage(voices[0].language);
            } catch (err) {
                //Samsung S9 has always this error: "Language is not supported"
                console.log(`setDefaultLanguage error `, err);
            }
            await Tts.setDefaultVoice(voices[0].id);
            this.setState({
                voices: availableVoices,
                selectedVoice,
                ttsStatus: 'initialized',
            });
        } else {
            this.setState({ ttsStatus: 'initialized' });
        }
    };

    componentDidMount(): void {
        Tts.speak("Tap on the screen to start!");
    }

    render(){
        const { navigation } = this.props;
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    accessible={true}
                    accessibilityLabel="Start"
                    // style={styles.button}
                    onPress={() => navigation.navigate('Destination')}>
                    <Text> Start! </Text>
                </TouchableOpacity>
            </View>
            // <Container padder={true} style={styles.container}>

            // </Container>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 10
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
        height:"100vh",
        justifyContent:'center'
    },
    countContainer: {
        alignItems: 'center',
        padding: 10
    },
    countText: {
        color: '#FF00FF'
    }
});


