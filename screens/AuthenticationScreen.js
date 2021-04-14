import React from 'react';
import { Text, View, TouchableOpacity, TextInput, Image, StyleSheet, KeyboardAvoidingView, ToastAndroid } from 'react-native';
import firebase from 'firebase';
import db from '../config';
import ReadStoryScreen from './ReadStoryScreen';
import { createTabNavigator } from 'react-navigation-tabs';

export default class AuthenticationScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            Email: '',
            Password: '',
        }
    }

    login = async (email, password) => {

        if (email && password) {
            try {
                const response = await firebase.auth().signInWithEmailAndPassword(email, password)

                if (response) { 

                    this.props.navigation.navigate('TabNavigator')

                }
            }
            catch (error) {
                alert(error.code);
                switch (error.code) {
                    case "auth/user-not-found":
                        alert("User does not exist.");
                        break;
                    case "auth/invailid-email":
                        alert("Incorrect email or password")
                        break;

                }
            }
        }

    }



    render() {
        return (
            <View>
                <Text style={styles.title} > Login Screen</Text>
                <TextInput style={styles.Input} keyboardType='email-address' placeholder='Email' value={this.state.Email} onChangeText={(text) => { this.setState({ Email: text }) }}></TextInput>
                <TextInput style={styles.Input} secureTextEntry={true} placeholder='Password' value={this.state.Password} onChangeText={(text) => { this.setState({ Password: text }) }}></TextInput>
                <View>
                    <TouchableOpacity style={styles.button} onPress={() => { this.login(this.state.Email, this.state.Password) }} ><Text>Enter</Text></TouchableOpacity>
                </View>
            </View>
        )

    }


}
const styles = StyleSheet.create({
    Input: {
        width: 200,
        borderWidth: 2,
        backgroundColor: 'lightblue',
        marginTop: 16,
        alignSelf: 'center',
        alignContent: 'center',
        alignItems: "center",

    },
    story: {
        width: 500,
        height: 300,
        borderWidth: 2,
        backgroundColor: 'lightblue'
    },
    title: {
        marginBottom: 86,
        marginTop: 46,
        paddingVertical: 8,
        backgroundColor: "#69dafb",
        color: "#20232a",
        textAlign: "center",
        fontSize: 30,
        fontWeight: "bold"
    },
    button: {
        width: 200,
        borderWidth: 2,
        backgroundColor: 'lightblue',
        marginTop: 16,
        alignSelf: 'center',
        alignContent: 'center',
        alignItems: "center",

    }

});
