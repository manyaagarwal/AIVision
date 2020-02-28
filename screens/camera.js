import React , { Component } from 'react';
import { RNCamera } from 'react-native-camera';
// import * as tf from '@tensorflow/tfjs';
// import '@tensorflow/tfjs-react-native';
import {Content} from "native-base";
import {Text, View, TouchableOpacity, StyleSheet} from "react-native";

const PendingView = () => (
    <View
        style={{
            flex: 1,
            backgroundColor: 'lightgreen',
            justifyContent: 'center',
            alignItems: 'center',
        }}
    >
        <Text>Waiting</Text>
    </View>
);


class Camera extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isTfReady: false,
        };
    }


    async componentDidMount() {
        // Wait for tf to be ready.
        await tf.ready();
        // Signal to the app that tensorflow.js can now be used.
        this.setState({
            isTfReady: true,
        });
        // const model = await mobilenet.load();
        console.log(this.state);
    }
    // componentDidMount() {
    //     if(navigator.mediaDevices){
    //         const mobileCamPromise = navigator.mediaDevices.getUserMedia({
    //             audio: false,
    //             video: {
    //                 facingMode:"user"
    //             }
    //         })
    //             .then( stream => {
    //                 window.stream = stream;
    //                 this.videoRef.current.srcObject = stream;
    //                 return new Promise((resolve, reject) => {
    //                     this.videoRef.current.onloadedmetadata = () => {
    //                         resolve();
    //                     };
    //                 });
    //             })
    //         const modelPromise = cocoSsd.load();
    //         Promise.all([modelPromise, mobileCamPromise])
    //             .then(values => {
    //                 this.detectFrame(this.videoRef.current, values[0]);
    //             })
    //             .catch(error => {
    //                 console.error(error);
    //             });
    //     }
    // }
    //
    // detectFrame = (video, model) => {
    //     model.detect(video).then(predictions => {
    //         this.renderPredictions(predictions);
    //         requestAnimationFrame(() => {
    //             this.detectFrame(video, model);
    //         });
    //     });
    // };
    //
    // renderPredictions = predictions => {
    //     const ctx = this.canvasRef.current.getContext("2d");
    //     ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    //     // Font options.
    //     const font = "16px sans-serif";
    //     ctx.font = font;
    //     ctx.textBaseline = "top";
    //     predictions.forEach(prediction => {
    //         const x = prediction.bbox[0];
    //         const y = prediction.bbox[1];
    //         const width = prediction.bbox[2];
    //         const height = prediction.bbox[3];
    //         // Draw the bounding box.
    //         ctx.strokeStyle = "#00FFFF";
    //         ctx.lineWidth = 4;
    //         ctx.strokeRect(x, y, width, height);
    //         // Draw the label background.
    //         ctx.fillStyle = "#00FFFF";
    //         const textWidth = ctx.measureText(prediction.class).width;
    //         const textHeight = parseInt(font, 10); // base 10
    //         ctx.fillRect(x, y, textWidth + 4, textHeight + 4);
    //     });
    //
    //     predictions.forEach(prediction => {
    //         const x = prediction.bbox[0];
    //         const y = prediction.bbox[1];
    //         // Draw the text last to ensure it's on top.
    //         ctx.fillStyle = "#000000";
    //         ctx.fillText(prediction.class, x, y);
    //     });
    // };


    render(){
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <RNCamera
                    style={styles.preview}
                    type={RNCamera.Constants.Type.back}
                    flashMode={RNCamera.Constants.FlashMode.on}
                    androidCameraPermissionOptions={{
                        title: 'Permission to use camera',
                        message: 'We need your permission to use your camera',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                    captureAudio = {false}
                >
                    {({ camera, status, x}) => {
                        if (status !== 'READY') return <PendingView />;
                        return (
                            <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                                <TouchableOpacity onPress={() => this.takePicture(camera)} style={styles.capture}>
                                    <Text style={{ fontSize: 14 }}> SNAP </Text>
                                </TouchableOpacity>
                            </View>
                        );
                    }}
                </RNCamera>
            </View>
        );
    }

    // takePicture = async function(camera) {
    //     const options = { quality: 0.5, base64: true };
    //     const data = await camera.takePictureAsync(options);
    //     //  eslint-disable-next-line
    //     console.log(data.uri);
    // };
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
    },
});

export default Camera;