import React from 'react';
import { Text, View } from 'react-native';
import Router from './components/Router';
import {
    Font,
    AppLoading,
} from 'expo';

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            fontsAreLoaded: false
        };
    }

    async componentWillMount() {
        await Font.loadAsync({
            Roboto: require("native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
            Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
        });
        this.setState({fontsAreLoaded: true});
    }
    render() {
        if (!this.state.fontsAreLoaded) {
            return <AppLoading />;
        }
        return (
            <Router/>
        );
    }
}
