import React, { Component } from "react";
import LoginComponent from './login/LoginComponent';
import SplashComponent from './splash/SplashComponent';
import MainComponent from './main/MainComponent';
import { StackNavigator } from "react-navigation";
import { Root } from "native-base";

const Router = StackNavigator({
    Splash: {
		screen: SplashComponent,
		navigationOptions: {
			header: null
		},
	},
    Login: {
		screen: LoginComponent,
		navigationOptions: {
        	header: null
		},
	},
    Main: {
		screen: MainComponent,
		navigationOptions: {
			header: null
		},
	},
});
export default () =>
<Root>
	<Router />
</Root>;
