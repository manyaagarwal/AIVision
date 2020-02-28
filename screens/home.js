import React , { PureComponent } from 'react';
import {Container, Footer, FooterTab, Button, Text, Content} from "native-base";

class Home extends PureComponent {
    render(){
        const { navigation } = this.props;
        return (
            <Content padder={true}>
                <Button full onPress={() => navigation.navigate('Camera')}>
                    {/*<Button full>*/}
                    <Text> Start </Text>
                    {/*</Button>*/}
                </Button>
            </Content>        );
    }
}

export default Home