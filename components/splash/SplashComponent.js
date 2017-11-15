import React, { Component } from 'react';
import { Image, View, AsyncStorage, NetInfo } from 'react-native';

export default class SplashComponent extends Component {
    componentDidMount() {
        const { navigate } = this.props.navigation;
        AsyncStorage.getItem('userInfo', (err, result) => {
            if (result != null) {
                navigate('Main');
            } else {
                navigate('Login');
            }
        });
        // NetInfo.isConnected.fetch().then(isConnected => {
        //     if (isConnected) {
        //         const { navigate } = this.props.navigation;
        //         AsyncStorage.getItem('userInfo', (err, result) => {
        //             if (result != null) {
        //                 navigate('Main');
        //             } else {
        //                 navigate('Login');
        //             }
        //         });
        //     } else {
        //         console.log('nono');
        //     }
        // });
    }
    render() {
        return (
            <View style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent:'center', backgroundColor: '#fff'}}>
                <Image style={{height: 70, width: 70}} source={require('./../../assets/icon.png')}/>
            </View>
        );
    }
}
