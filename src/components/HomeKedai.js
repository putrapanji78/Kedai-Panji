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
            data: []
        }
        // var email = adilahnurhasanah;
        // var password = 8989;
    }
    render(){
        return(
            <View style={styles.container}>
              <StatusBar backgroundColor='#7f0627' barStyle="light-content" />
             
                <Text style={styles.texttitle}>Masukan Nomor Meja</Text>
                <TextInput keyboardType={"number-pad"} placeholder="Nomor Meja" style={styles.input} onChangeText={(tableNumber) => this.setState({tableNumber: tableNumber})} value={this.state.tableNumber}/>
                
                <TouchableOpacity style={styles.buttoncontainer} onPress={()=> {
               if(this.state.tableNumber === 0){
                   alert('Enter Your Number');
               }else{
               
                axios.post(`http://10.0.2.2:3000/api/v1/transaction`,{
                    'tableNumber': this.state.tableNumber
                } )
                .then(res =>{
                  const data = res.data;
                  this.setState({data});
                  if(this.state.data.Transactions.tableNumber!=null){
                    this.props.navigation.navigate('ListMenu', {tableNumber: this.state.data.Transactions.tableNumber});
                  }
                 
                  console.log(data);
                })
               }
            }
               }>
           <Text style={styles.buttontext} >Submit</Text>
           </TouchableOpacity>
          
          
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
        fontSize : 35,
        marginBottom : 20
    }
}