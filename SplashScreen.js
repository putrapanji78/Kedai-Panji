import React, {Component} from 'react';
import {Text, TextInput, Button, View, TouchableOpacity, StatusBar} from 'react-native';
import { StackNavigator } from 'react-navigation';
// import HomePage from './src/components/HomePage';
const styles = {
    container : {
        padding : 20,
        flex : 1,
        
        justifyContent : 'center',
        alignItems : 'stretch',
        backgroundColor : '#ff80ed'
    },
    input : {
        paddingLeft : 20,
        borderRadius : 50,
        height : 50,
        fontSize : 25,
        backgroundColor : 'white',
        borderColor : '#ff5500',
        borderWidth : 1,
        marginBottom : 20,
        color : '#34495e'
    },
    buttoncontainer : {
        height : 50,
        borderRadius : 50,
        backgroundColor : '#66335e',
        paddingVertical : 10,
        justifyContent : 'center'
    },
    buttontext : {
        textAlign : 'center',
        color : '#ecf0f1',
        fontSize : 20
    },
    textregister:{
        textAlign : 'center',
        color : '#ffffff',
        fontSize : 20,
        marginTop : 10,
        marginBottom : 20
    },
    texttitle:{
        textAlign : 'center',
        color : '#ffffff',
        fontSize : 50,
        marginBottom : 20,
        fontWeight: 'bold'
    }
}
export default class SplashScreen extends Component {
  
  render() {
    
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#ff80ed' barStyle="light-content" />
            <Text style={styles.texttitle}>MAMANG KOST</Text>
            </View>
    );
  }
}


