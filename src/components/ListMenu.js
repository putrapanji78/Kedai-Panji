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
import {getMenus, removeMenus, clearMenus} from '../_actions/menus'
import {getOrders, clearOrders} from '../_actions/orders'
import {getMenusDb} from '../_actions/menusdb';
import {getBill, clearBill} from '../_actions/viewBill';


import Modal from 'react-native-modal';
import { from } from 'rxjs';




class ListMenu extends Component{
    constructor(props){
        super(props);
       
        this.state={
            a: 0,
            nama: 0,
            kategori: 0,
            menus:[],
            timer: 0,
            isModalVisible: false,
            viewBill: 0,
            subTotal: 0,
            discount: 0,
            serviceCharge: 0,
            tax: 0,
            total: 0,
            confirm: 0,
            status: 0,
            idtransaksi: this.props.navigation.getParam('idTransaction'),
            tableNumber : this.props.navigation.getParam('tableNumber'),
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
   
    componentDidMount(){
        setInterval(
          () => this.setState({ timer: this.state.timer +1  }),
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
              {text: 'OK', onPress: () => 
              this.props.menus.map((item)=>{
            axios.post('http://10.0.2.2:3000/api/v1/order',{
                'qty': item.qty,
                'price': item.price,
                'status': item.status,
                'menu_Id': item.id,
                'transactions_Id': item.idtransaksi,
            })
            .then(res => {
                this.props.dispatch(clearMenus())
                const idOrder= res.data.Order.id;
                this.state.subTotal = this.state.subTotal+(item.qty*item.price)
                this.state.confirm=1;
                setTimeout(() => {
                    // write your functions    
                    axios.patch(`http://10.0.2.2:3000/api/v1/order/${idOrder}`,{
                        "status": 1
                    })
                    this.state.status=1;
                 },10000);

              })
           
        })
            },
            ],
            {cancelable: false},
          );
    }
    callBill=()=>{
        
        axios.patch(`http://10.0.2.2:3000/api/v1//transaction/${this.state.idtransaksi}`,{
            "tableNumber": this.state.tableNumber,
            "finishedTime": this.state.timer,
            "subtotal": this.state.subTotal,
            "discount": this.state.discount,
            "serviceCharge": this.state.serviceCharge,
            "tax": this.state.tax,
            "total": this.state.total
        }).then(res=>{
            // if(res.data.Pesan==="Sukses"){
                
            // }
            
            
        })
        
       
    }
   
      componentWillUnmount(){
       clearInterval(this.interval);
      }
      getCategories=(menusdb)=>{
          this.setState({kategori: menusdb})
      }
      
      getOrders=()=>{
          this.state.isModalVisible ? 
        null : 
         setInterval(() => {
        
            axios.get(`http://10.0.2.2:3000/api/v1/orderByTransaction/${this.state.idtransaksi}`)
            .then(res => {
           
            const orders = res.data;
            this.props.dispatch(getOrders(orders)) 
            
            //  console.log(orders);
            // var bill= this.props.dispatch(getBill(orders));
            // console.log(bill);
            
            
        })
        
         },2000)
      }
      
    render(){
        const {navigation} = this.props;
        const tableNumber = navigation.getParam('tableNumber', 0)
        
        this.state.discount = this.state.subTotal*0.1
        this.state.serviceCharge = this.state.subTotal*0.05
        this.state.tax = this.state.subTotal*0.05
        this.state.total= (this.state.subTotal-this.state.discount)+ this.state
        .tax+this.state.serviceCharge
        
        // this.props.menus.length==0?null:console.log(this.props.menus[0].idtransaksi)
        return(
            
            <View style={styles.container}>
              <StatusBar backgroundColor='#7f0627' barStyle="light-content" />
              {this.props.categories.isLoading === false ? null : <Text>Loading...</Text>}
              <View style={{backgroundColor:'#7f0627'}}>
              <View style={{flexDirection: 'row'}}>
              
              <Text style={{fontWeight:'bold', color: 'white'}}>Table Number {tableNumber}</Text>
              <Text style={{fontWeight:'bold', marginLeft: 210, color:'white'}}>Time: {this.state.timer}</Text>
              </View>
              <View style={styles.navigation}>
              
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <TouchableOpacity onPress={()=> this.getCategories(0)}>
                            <Text style={styles.navitem}>Semua Masakan</Text>
                        </TouchableOpacity>
                      {this.props.menusdb.data.map(menusdb =>{
                          
                          
                          return(
                              
                           
                            <TouchableOpacity onPress={()=> this.getCategories(menusdb.id)}>
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
                  
                // console.log(categories);
                if(this.state.kategori===0){
                    return(
                
                        <TouchableOpacity 
                        onPress={()=> {
                            this.props.dispatch(getMenus({...categories,idtransaksi: this.state.idtransaksi})),
                            this.setState({a:1}), this.props.dispatch(getBill({...categories}))
                            }} style={{width: '100%', margin: 10, flexDirection: 'row'}}>
                        <Image  style={{width: '50%', height: 100}} source={this.state.photo[categories.id-1].Image}/>
                        
                        <View style={{margin: 20}}>
                        <Text style={{fontWeight:'bold'}}>{categories.name}</Text>
                        <Text style={{fontWeight:'bold'}}>{categories.price}</Text>
                        </View>
                        </TouchableOpacity>
                    );
                }
                if(this.state.kategori===categories.categories_id){
                    return(
                
                        <TouchableOpacity 
                        onPress={()=> {
                            this.props.dispatch(getMenus({...categories,idtransaksi: this.state.idtransaksi})),
                            this.setState({a:1}), this.props.dispatch(getBill({...categories, idtransaksi: this.state.idtransaksi}))
                            }} style={{width: '100%', margin: 10, flexDirection: 'row'}}>
                        <Image  style={{width: '50%', height: 100}} source={this.state.photo[categories.id-1].Image}/>
                        
                        <View style={{margin: 20}}>
                        <Text style={{fontWeight:'bold'}}>{categories.name}</Text>
                        <Text style={{fontWeight:'bold'}}>{categories.price}</Text>
                        </View>
                        </TouchableOpacity>
                    );
                }
                  
                  
            
            
        })}
        </ScrollView>
</View>        
            <View style={{backgroundColor: '#7f0627', marginTop: 20}}>
            <View style={{height: 100, marginTop: 30}}>
            <ScrollView horizontal style={{backgroundColor: 'white'}} showsHorizontalScrollIndicator={false}>
                    {this.props.menus.map((item)=>{
                       
                        
                        
                      
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
          <Button onPress={()=> {this.toggleModal(), this.setState({viewBill: false})}} style={{backgroundColor: '#7f0627'}}><Text style={{textAlign:'right'}}>X</Text></Button>
            <Text style={{textAlign: 'center', fontWeight:'bold'}}>17 August 2019, 20.09</Text>
            {/* {console.log(this.props.categories)} */}
            <ScrollView style={{height: 300}}>
         
            {this.props.bill.length===0? null : this.props.orders.map((item)=>{
               
             
               
                
                
                
                
                
                
                
                
                
                if(item.transactions_Id===this.state.idtransaksi){

                    return(
                    
                        <View style={{marginTop: 20, flexDirection: 'row'}}>
                        <Col style={{marginLeft: 20}}>
                        
                        <Text style={{color: item.status==0 ? 'red' : 'green', fontWeight: 'bold'}}>{item.status==0 ? 'Waiting' : 'Sent'}</Text>
                        </Col>
                        <Col style={{marginRight: 20}}>
                        <Text>{this.props.categories.data[item.menu_Id-1].name}</Text>
                        </Col>
                        <Col>
                        <Text>{item.price}</Text>
                        </Col>
                        </View>
                    );  
                }
                
            })}
            </ScrollView>
           
            <View style={{flexDirection: 'row', backgroundColor:'#eff7ef'}}>
            <Col style={{marginLeft: 20}}>
            </Col>
            <Col>
            {this.props.bill.map((item)=>{
                console.log(item);
                
                
            })}
            <Text>Sub Total</Text>
            <Text>Discount</Text>
            <Text>Service Charge(5%)</Text>
            <Text>Tax</Text>
            <Text style={{fontWeight: 'bold'}}>Total</Text>
            </Col>
            <Col>
            <Text>{this.state.subTotal}</Text>
            <Text>{this.props.bill.payload}</Text>
            <Text>{this.state.discount}</Text>
            <Text>{this.state.serviceCharge}</Text>
            <Text></Text>
            <Text>{this.state.tax}</Text>
            <Text style={{fontWeight: 'bold'}}>{this.state.total}</Text>
            </Col>
            </View>
            
            <TouchableOpacity disabled={this.state.status===0? true: false} style={styles.buttonmodal} onPress={()=> {this.callBill(),this.toggleModal(), this.props.dispatch(clearBill()) ,this.props.navigation.navigate('Invoice',{tableNumber: this.state.tableNumber})}}><Text style={{color:'white', textAlign: 'center', fontWeight:'bold'}}>CALL BILL</Text></TouchableOpacity>
          </View>
         
        </Modal>
      </View>
              
                <View style={{flexDirection: 'row', marginBottom: 20}}>
                    <Col><TouchableOpacity disabled={(this.props.menus.length==0? true : false)} style={styles.buttoncontainer} onPress={()=> {this.confirm()}}><Text style={styles.buttontext}>CONFIRM</Text></TouchableOpacity></Col>
                    <Col><TouchableOpacity onPress={()=> this.props.dispatch(clearBill())}  disabled={(this.props.menus.length==0? true : false)}style={styles.buttoncontainer}><Text style={styles.buttontext}>CALL</Text></TouchableOpacity></Col>
                    <Col><TouchableOpacity disabled={(this.state.confirm===0? true: false)} style={styles.buttoncontainer} onPress={()=>{this.toggleModal(),this.getOrders()}}><Text style={styles.buttontext}>VIEW BILL</Text></TouchableOpacity></Col>
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
      menusdb : state.menusdb,
      orders : state.orders,
      bill : state.bill
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