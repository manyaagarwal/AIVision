import React , { PureComponent } from 'react';
import {StyleSheet, Text} from 'react-native';
import {Content, Footer, FooterTab, Button, Container} from "native-base";
import Tts from 'react-native-tts';
import Voice from 'react-native-voice';
import {View} from "react-native";

class Destination extends PureComponent {
    state = {
        pitch: '',
        error: '',
        end: '',
        started: '',
        results: [],
        partialResults: [],
        speechRate: 0.5,
        speechPitch: 1,
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
        Voice.onSpeechStart = this.onSpeechStart;
        Voice.onSpeechEnd = this.onSpeechEnd;
        Voice.onSpeechError = this.onSpeechError;
        Voice.onSpeechResults = this.onSpeechResults;
        Voice.onSpeechPartialResults = this.onSpeechPartialResults;
        Voice.onSpeechVolumeChanged = this.onSpeechVolumeChanged;
    }


    componentWillUnmount() {
        //destroy the process after switching the screen
        Voice.destroy().then(Voice.removeAllListeners);
    }

    onSpeechStart = e => {
        //Invoked when .start() is called without error
        console.log('onSpeechStart: ', e);
        this.setState({
            started: '√',
        });
    };

    onSpeechEnd = e => {
        //Invoked when SpeechRecognizer stops recognition
        console.log('onSpeechEnd: ', e);
        this.setState({
            end: '√',
        });
    };

    onSpeechError = e => {
        //Invoked when an error occurs.
        console.log('onSpeechError: ', e);
        this.setState({
            error: JSON.stringify(e.error),
        });
    };

    onSpeechResults = e => {
        //Invoked when SpeechRecognizer is finished recognizing
        console.log('onSpeechResults: ', e);
        this.setState({
            results: e.value,
        });
    };

    onSpeechPartialResults = e => {
        //Invoked when any results are computed
        console.log('onSpeechPartialResults: ', e);
        this.setState({
            partialResults: e.value,
        });
    };

    onSpeechVolumeChanged = e => {
        //Invoked when pitch that is recognized changed
        console.log('onSpeechVolumeChanged: ', e);
        this.setState({
            pitch: e.value,
        });
    };

    _startRecognizing = async () => {
        //Starts listening for speech for a specific locale
        this.setState({
            pitch: '',
            error: '',
            started: '',
            results: [],
            partialResults: [],
            end: '',
        });

        try {
            await Voice.start('en-US');
        } catch (e) {
            //eslint-disable-next-line
            console.error(e);
        }
    };

    _stopRecognizing = async () => {
        //Stops listening for speech
        try {
            await Voice.stop();
        } catch (e) {
            //eslint-disable-next-line
            console.error(e);
        }
    };

    _cancelRecognizing = async () => {
        //Cancels the speech recognition
        try {
            await Voice.cancel();
        } catch (e) {
            //eslint-disable-next-line
            console.error(e);
        }
    };

    _destroyRecognizer = async () => {
        //Destroys the current SpeechRecognizer instance
        try {
            await Voice.destroy();
        } catch (e) {
            //eslint-disable-next-line
            console.error(e);
        }
        this.setState({
            pitch: '',
            error: '',
            started: '',
            results: [],
            partialResults: [],
            end: '',
        });
    };

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

    readText = async () => {
        Tts.stop();
        Tts.speak(this.state.text);
    };

    componentDidMount() {
        Tts.speak("What is your destination?");
        this._startRecognizing();
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        if(prevState.end !== this.state.end && this.state.end == "√"){
            Tts.speak("Tap at the bottom of the screen to start navigation.");
        }
    }

    render(){
        const { navigation } = this.props;
        return(
            <Container>
          <Content>
              <Text>Enter Your Desired Destination:</Text>
              {this.state.partialResults.map((result, index) => {
                  return (
                      <Text
                          key={`partial-result-${index}`}
                          style={{
                              textAlign: 'center',
                              color: '#B0171F',
                              marginBottom: 1,
                              fontWeight: '700',
                          }}>
                          {result}
                      </Text>
                  );
              })
              }
          </Content>
                <Footer>
                    <FooterTab>
                        <Button full onPress={()=> navigation.navigate('Camera')}>
                            <Text> Go </Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
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
        height:'100vh',
        justifyContent:'center',
    },
    countContainer: {
        alignItems: 'center',
        padding: 10
    },
    countText: {
        color: '#FF00FF'
    }
});
export default Destination;