import React, { Component } from 'react';
import { Container,
   Header,
   Grid,
   Col,
   Row, Text, Item, Input, Content, Form, List, Toast, Badge, Card, Button
  } from 'native-base';
import {StatusBar, Image, StyleSheet, Dimensions, ScrollView, ImageBackground, TextInput, View, TouchableOpacity, Alert} from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import { getCategories, getCategoriesPending } from '../_actions/categories'
import {getMenus, removeMenus} from '../_actions/menus'
import {getMenusDb} from '../_actions/menusdb';
import { taggedTemplateExpression } from '@babel/types';
import { log } from 'util';
import Modal from 'react-native-modal';
import { from } from 'rxjs';


class ListMenu extends Component{
    constructor(props){
        super(props);
        this.state={
            a: 0,
            nama: 0,
            categories: [],
            menus:[],
            timer: 0,
            isModalVisible: false,
            photo: [
                {
                    id: 1,
                    Image : require('../../images/OporAyam.jpg')
                },
                {
                    id: 2,
                    Image : require('../../images/IkanBandeng.jpg')
                },
                {
                    id: 3,
                    Image : require('../../images/CapCai.jpg')
                },
                {
                    id: 4,
                    Image : require('../../images/IkanSarden.jpg')
                },
                {
                    id: 5,
                    Image : require('../../images/Kangkung.jpg')
                },
                {
                    id: 6,
                    Image : require('../../images/Sate.jpg')
                },
                {
                    id: 7,
                    Image : require('../../images/Sate.jpg')
                }
            ],
            orders:[],
            qty:0
        }
       
    }
    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
      };
    confirm(){
        Alert.alert(
            'Confirm Order',
            'Are you sure to order this?',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false},
          );
    }
    componentDidMount(){
        this.interval = setInterval(
          () => this.setState((prevState)=> ({ timer: prevState.timer + 1 })),
          1000
        );
        this.props.dispatch(getCategoriesPending());
        axios.get('http://10.0.2.2:3000/api/v1/menus')
        .then(res => {
          const categories = res.data;
          this.props.dispatch(getCategories(categories))
        //   console.log(categories)
        })
        axios.get('http://10.0.2.2:3000/api/v1/categories')
        .then(res => {
          const menus = res.data;
          this.props.dispatch(getMenusDb(menus))
        //   console.log(categories)
        })
      }
      
      componentDidUpdate(){
        // if(this.state.timer === 0){ 
        //   clearInterval(this.interval);
        // //   alert('Timeout')
        // }
      }
      
      componentWillUnmount(){
       clearInterval(this.interval);
      }
    render(){
        const {navigation} = this.props;
        const tableNumber = navigation.getParam('tableNumber', 0)
        console.log(this.props.menus)
        return(
            
            <View style={styles.container}>
              <StatusBar backgroundColor='#7f0627' barStyle="light-content" />
              {this.props.categories.isLoading === false ? null : <Text>Loading...</Text>}
              <View style={{backgroundColor:'#7f0627'}}>
              <View style={{flexDirection: 'row'}}>
              
              <Text style={{fontWeight:'bold', color: 'white'}}>Table Number: {tableNumber}</Text>
              <Text style={{fontWeight:'bold', marginLeft: 210, color:'white'}}>Time: {this.state.timer}</Text>
              </View>
              <View style={styles.navigation}>
              
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                      {this.props.menusdb.data.map(menusdb =>{
                          return(
                            <TouchableOpacity onPress={()=> this.setState()}>
                            <Text style={styles.navitem}>{menusdb.name}</Text>
                        </TouchableOpacity>
                          );
                      })}
                  </ScrollView>
                  </View>
                  </View>
                  <View style={{marginTop: 23, height: 300, width: '100%'}}>
                      <ScrollView>
              {this.props.categories.data.map(categories=>{
                  
            return(
                
                <TouchableOpacity 
                onPress={()=> {
                    this.props.dispatch(getMenus(categories)),
                    this.setState({a:1})
                    }} style={{width: '100%', margin: 10, flexDirection: 'row'}}>
                <Image  style={{width: '50%', height: 100}} source={this.state.photo[categories.id-1].Image}/>
                
                <View style={{margin: 20}}>
                <Text style={{fontWeight:'bold'}}>{categories.name}</Text>
                <Text style={{fontWeight:'bold'}}>{categories.price}</Text>
                </View>
                </TouchableOpacity>
            );
            
        })}
        </ScrollView>
</View>
            <View style={{backgroundColor: '#7f0627', marginTop: 20}}>
            <View style={{height: 100, marginTop: 30}}>
            <ScrollView horizontal style={{backgroundColor: 'white'}} showsHorizontalScrollIndicator={false}>
                    {this.props.menus.map((item)=>{
                        // console.log(item)
                        // console.log(this.state.orders[this.state.index-1])
                        // console.log(this.state.orders[index])
                        return(
                            <TouchableOpacity 
                            onPress={()=>{
                                (this.props.dispatch(removeMenus(item.id)),
                                this.setState({
                                    a : 1
                                }))
                            }}
                            style={{marginLeft: 2, marginTop: 7}} >
                               
                               
                                <ImageBackground style={{width: 90, height: 90}} source={this.state.photo[item.id-1].Image}>
                                <Badge style={{backgroundColor:'#7f0627'}}>
            
         
                                <Text style={{color: 'white', fontWeight: 'bold'}}>{item.qty}</Text> 
                                </Badge>
                                </ImageBackground>
                                <View style={{backgroundColor: '#7f0627', margin: 5, borderRadius: 10}}>
                                
                                </View>
                                
                            </TouchableOpacity>
                        );
                        
                    })}
                 </ScrollView>  
                   
</View>
<View style={{ flex: 1}}>
        
        <Modal isVisible={this.state.isModalVisible}>
          <View style={{ height: 500, width: 350, backgroundColor: 'white', marginLeft: 20}}>
          <Button onPress={this.toggleModal} style={{backgroundColor: '#7f0627'}}><Text style={{textAlign:'right'}}>X</Text></Button>
            <Text style={{textAlign: 'center', fontWeight:'bold'}}>17 August 2019, 20.09</Text>
            <View style={{marginTop: 20, flexDirection: 'row'}}>
            <Col style={{marginLeft: 20}}>
            <Text style={{color: 'red', fontWeight: 'bold'}}>Waiting</Text>
            </Col>
            <Col style={{marginRight: 20}}>
            <Text>Nasi Padang</Text>
            </Col>
            <Col>
            <Text>30000</Text>
            </Col>
            </View>
            <View style={{marginTop: 20, flexDirection: 'row'}}>
            <Col style={{marginLeft: 20}}>
            <Text style={{color: 'green', fontWeight: 'bold'}}>Send</Text>
            </Col>
            <Col style={{marginRight: 20}}>
            <Text>Nasi Padang</Text>
            </Col>
            <Col>
            <Text>30000</Text>
            </Col>
            </View>
            <View style={{marginTop: 90, flexDirection: 'row', backgroundColor:'#eff7ef'}}>
            <Col style={{marginLeft: 20}}>
            </Col>
            <Col>
            <Text>Sub Total</Text>
            <Text>Discount</Text>
            <Text>Service Charge(5%)</Text>
            <Text>Tax</Text>
            <Text style={{fontWeight: 'bold'}}>Total</Text>
            </Col>
            <Col>
            <Text>60000</Text>
            <Text>0</Text>
            <Text>5000</Text>
            <Text></Text>
            <Text>5000</Text>
            <Text style={{fontWeight: 'bold'}}>50000</Text>
            </Col>
            </View>
            <TouchableOpacity style={styles.buttonmodal}><Text style={{color:'white', textAlign: 'center', fontWeight:'bold'}}>CALL BILL</Text></TouchableOpacity>
          </View>
        </Modal>
      </View>
              
                <View style={{flexDirection: 'row', marginBottom: 20}}>
                    <Col><TouchableOpacity disabled={(this.props.menus.length==0? true : false)} style={styles.buttoncontainer} onPress={()=> this.confirm()}><Text style={styles.buttontext}>CONFIRM</Text></TouchableOpacity></Col>
                    <Col><TouchableOpacity style={styles.buttoncontainer}><Text style={styles.buttontext}>CALL</Text></TouchableOpacity></Col>
                    <Col><TouchableOpacity style={styles.buttoncontainer} onPress={this.toggleModal}><Text style={styles.buttontext}>VIEW BILL</Text></TouchableOpacity></Col>
                </View>
                </View>
              </View>
             
        )
    }
}
const mapStateToProps = (state) => {
    return {
      categories: state.categories,
      menus : state.menus,
      menusdb : state.menusdb
    }
  }
  export default connect(mapStateToProps)(ListMenu);
const styles = {
    container : {
        flex : 1,
        alignItems : 'stretch',
        backgroundColor : 'white'
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
        height : 80,
        width: 80,
        borderRadius : 80,
        backgroundColor : 'white',
        justifyContent : 'center',
        borderColor: 'red',
        marginTop: 13,
        marginLeft: 25
    },
    buttontext : {
        textAlign : 'center',
        fontWeight: 'bold',
        color : '#7f0627',
        fontSize : 16
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
        fontSize : 20,
        marginBottom : 20
    },
    navigation:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems : 'center'
    },
    navitem:{
        width: 100,
        borderColor:'#7f0627',
        margin: 10,
        backgroundColor : 'white',
        color: '#7f0627',
        pading: 4,
        textAlign: 'center',
        borderRadius: 20

    },
    buttonmodal : {
        height : 50,
        width: '100%',
        backgroundColor : '#7f0627',
        justifyContent : 'center',
        borderColor: 'red',
        marginTop: 80
    }
}