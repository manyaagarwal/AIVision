import React , { PureComponent } from 'react';
import * as mobilenet from '@tensorflow-models/mobilenet';
import { fetch, decodeJpeg } from '@tensorflow/tfjs-react-native';
import {Container, Footer, FooterTab, Button, Text, Content} from "native-base";
import { StyleSheet, TouchableOpacity, View } from 'react-native';


class Home extends PureComponent {
    render(){
        const { navigation } = this.props;
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    accessible={true}
                    accessibilityLabel="Start"
                    onPress={() => navigation.navigate('Camera')}>
                    {/*<Button full>*/}
                    <Text> Start! </Text>
                    {/*</Button>*/}
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

export default Home


