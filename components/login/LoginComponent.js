import React, { Component } from 'react';
import { StyleSheet, Alert, Image, Dimensions, AsyncStorage } from 'react-native';
import { Container, Header, View, Left, Body, Right, Button, Icon, Title, Content, Card, CardItem, Text, Form, Label, Item, Input, Toast } from 'native-base';
export default class LoginComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: null,
			password: null,
		}
	}
	render() {
		const { navigate } = this.props.navigation;
		return (
			<Container>
				<Header style={{paddingTop:30, paddingBottom:10, height: 70}}>
					<Body >
						<Title>Star City Motor Sports</Title>
					</Body>
				</Header>
				<Content>
					<Card style={{marginLeft:10, marginRight:10}}>
						<CardItem style={{justifyContent: 'center'}}>
							<Text style={{fontWeight: 'bold', fontSize:25}}>Login Here</Text>
						</CardItem>
						<CardItem>
							<Item floatingLabel>
								<Label style={{paddingLeft:5}}>Username</Label>
								<Input onChangeText={(username) => this.setState({username})}/>
							</Item>
						</CardItem>
						<CardItem>
							<Item floatingLabel>
								<Label style={{paddingLeft:5}}>Password</Label>
								<Input onChangeText={(password) => this.setState({password})} secureTextEntry={true}/>
							</Item>
						</CardItem>
						<View style={{marginTop: 35, marginLeft: 15, marginRight: 15, marginBottom: 15}}>
							<Button block onPress={() => {
								if (this.state.username === null) {
									Toast.show({
										text: 'Please enter your username',
										position: 'bottom',
										type: 'danger',
										duration: 1000
									});
									return;
								}
								if (this.state.password === null) {
									Toast.show({
										text: 'Please enter your password',
										position: 'bottom',
										type: 'danger',
										duration: 1000
									});
									return;
								}
								fetch('http://107.170.26.5/api/v1/auth/login', {
                                    method: 'POST',
                                    headers: {
                                    'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({
                                        username: this.state.username,
                                        password: this.state.password
                                    })
                                })
								.then((response) => response.json())
								.then((responseJson) => {
									if (responseJson == false) {
										Toast.show({
											text: 'Username and password mismatch',
											position: 'bottom',
											type: 'danger',
											duration: 1000
										});
									} else {
										Toast.show({
											text: 'Logged In Successfully',
											position: 'bottom',
											type: 'success',
											duration: 1000
										});
										AsyncStorage.setItem('userInfo', JSON.stringify(responseJson), () => navigate('Main'));
									}
								})
								.catch((error) => {
									console.error(error);
								});
							}}><Text> Login </Text></Button>
						</View>
					</Card>
				</Content>
			</Container>
		);
	}
}
