import React, { Component } from 'react';
import { StyleSheet, Alert, Image, Dimensions, ActivityIndicator, View, AsyncStorage } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Content, Card, CardItem, Text, List, ListItem, Toast } from 'native-base';
export default class MainComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
        AsyncStorage.getItem('userInfo', (err, result) => {
            let userInfo = JSON.parse(result);
            this.state = {
                userId: userInfo.id,
                userName: userInfo.username,
                authToken: userInfo.auth_key,
            }
        });
    }
    componentDidMount() {
        fetch('http://107.170.26.5/api/v1/actions')
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({actions: responseJson});
            this.setState({isLoading: false});
        })
        .catch((error) => {
            console.error(error);
        });
    }
    render() {
        const { navigate } = this.props.navigation;
        if (this.state.isLoading) {
            return (
                <Container>
                    <Header style={{paddingTop:30, paddingBottom:10, height: 70}}>
                        <Body >
                        <Title>Actions</Title>
                        </Body>
                    </Header>
                    <Content style={{paddingTop:30, paddingBottom: 20}}>
                        <ActivityIndicator />
                    </Content>
                </Container>
            );
        }
        return (
            <Container>
                <Header style={{paddingLeft: 5, paddingRight: 5, paddingTop:30, paddingBottom:10, height: 70}}>
                    <Body>
                    <Title>Actions</Title>
                    </Body>
                    <Right >
                        <Button transparent onPress={() => {
                          AsyncStorage.setItem('userInfo', '', () => navigate('Login'));
                        }}>
                            <Icon name='log-out' />
                        </Button>
                    </Right>
                </Header>
                <Content>
                    <List dataArray={this.state.actions}
                    renderRow={(action) =>
                        <ListItem onPress={() => {
                            fetch('http://107.170.26.5/api/v1/tasks?access-token='+this.state.authToken, {
                                method: 'POST',
                                headers: {
                                'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    action_id: action.id,
                                    user_id: this.state.userId,
                                    team_id: 1,
                                    comments: ' '
                                })
                            })
                            .then((response) => response.json())
                            .then((responseJson) => {
                                Toast.show({
                                    text: 'Action Saved Successfully.',
                                    position: 'bottom',
                                    type: 'success',
                                    duration: 1000
                                });
                            })
                            .catch((error) => {
                                console.error(error);
                            });
                        }} style={{ marginLeft: 0, borderBottomWidth: 0, paddingBottom: 5, paddingTop: 5, paddingRight: 5, paddingLeft: 5}}>
                        <Card style={{marginTop: 0, marginBottom: 0, marginRight: 0, marginLeft: 0}}>
                            <CardItem>
                            <Body>
                                <Text>{action.name}</Text>
                            </Body>
                            <Right>
                                <Button small primary onPress={() => {
                                fetch('http://107.170.26.5/api/v1/tasks?access-token='+this.state.authToken, {
                                    method: 'POST',
                                    headers: {
                                    'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({
                                        action_id: action.id,
                                        user_id: this.state.userId,
                                        team_id: 1,
                                        comments: ' '
                                    })
                                })
                                .then((response) => response.json())
                                .then((responseJson) => {
                                    Toast.show({
                                        text: 'Action Saved Successfully.',
                                        position: 'bottom',
                                        type: 'success',
                                        duration: 1000
                                    });
                                })
                                .catch((error) => {
                                    console.error(error);
                                });
                                }} style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                                <Text>Done</Text>
                                </Button>
                            </Right>
                            </CardItem>
                            </Card>
                        </ListItem>
                    }>
                    </List>
                </Content>
            </Container>
        );
    }
}
