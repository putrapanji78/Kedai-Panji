import React, { Component } from 'react';
import { Container,
   Header,
   Grid,
   Col,
   Row, Text, Item, Input, Content, Form
  } from 'native-base';
import {StatusBar, Image, StyleSheet, Dimensions, ScrollView, ImageBackground, TextInput, View, TouchableOpacity} from 'react-native';
import axios from 'axios';

class HomeKedai extends Component{
    constructor(props){
        super(props);
        this.state={
            tableNumber: 0,
            data: [],
            timer: 30
        }
    }
    componentDidMount(){
        this.interval = setInterval(
          () => this.setState((prevState)=> ({ timer: prevState.timer - 1 })),
          1000
        );
      }
      componentDidUpdate(){
        if(this.state.timer === 0){ 
          clearInterval(this.interval);
          this.props.navigation.navigate('HomeKedai');
        }
      }
      
      componentWillUnmount(){
       clearInterval(this.interval);
      }
    render(){
        return(
            <View style={styles.container}>
              <StatusBar backgroundColor='#7f0627' barStyle="light-content" />
             
                <Text style={styles.textregister}>PLEASE BRING THE PHONE TO THE CASHRIER TO PROCEED WITH THE PAYMENT</Text>
                <Text style={styles.texttitle}>#{this.props.navigation.getParam('tableNumber')}</Text>
                <Text style={styles.texttitle}>THANK YOU</Text>
                <Text style={styles.texttitle}>TIME SPENT:{this.state.timer}</Text>
          
          
              </View>
        )
    }
}
export default HomeKedai;
const styles = {
    container : {
        padding : 20,
        flex : 1,
        
        justifyContent : 'center',
        alignItems : 'stretch',
        backgroundColor : '#7f0627'
    },
    input : {
        paddingLeft : 20,
        borderRadius : 50,
        height : 50,
        fontSize : 25,
        backgroundColor : 'white',
        borderColor : '#7f0627',
        borderWidth : 1,
        marginBottom : 20,
        color : 'black'
    },
    buttoncontainer : {
        height : 50,
        borderRadius : 50,
        backgroundColor : 'white',
        paddingVertical : 10,
        justifyContent : 'center'
    },
    buttontext : {
        textAlign : 'center',
        color : '#7f0627',
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
        fontSize : 36,
        marginBottom : 20
    }
}