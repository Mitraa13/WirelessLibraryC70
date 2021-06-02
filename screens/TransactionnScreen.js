import * as React from 'react';
import {Text, View, TouchableOpacity, Button, Image, StyleSheet, TextInput} from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';

export default class TransactionScreen extends React.Component{
    constructor(){
        super();
        this.state={
            hasCameraPermissions:null,
            scanned:false,
            scannedData:'',
            buttonState:'normal',
            scannedBookId:'',
            scannedStudentId:'',
        }
        
    }

    getCameraPermission = async (id) => {
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermissions:status==='granted',
            scanned:false,
            buttonState:id,
        })
    }

    handledBarCodeScanned = async({type,data})=>{
        const {buttonState} = this.state
        if(buttonState==="BookId"){
            this.setState({
                scanned:true,
                scannedBookId:data,
                buttonState:'normal',
            })
        }
        else        
        if(buttonState==="StudentId"){
            this.setState({
                scanned:true,
                scannedStudentId:data,
                buttonState:'normal',
            })
        }
        
    }

    render(){
        const hasCameraPermissions = this.state.hasCameraPermissions
        const scanned = this.state.scanned
        const buttonState = this.state.buttonState
        if(buttonState!=='normal' && hasCameraPermissions){
            return(
                <BarCodeScanner
                onBarCodeScanned={
                    scanned?
                    undefined
                    : this.handledBarCodeScanned
                } 
                style={StyleSheet.absoluteFillObject}
                />
            );
        }
        else if(buttonState==='normal'){
           
        return(
            <View style={styles.container}>

                <Image 
                style={{width:100, height:150, alignSelf:"center"}}
                source={require('../assets/booklogo.jpg')}
                />

               <View style={styles.inputView}>
                   <TextInput 
                   style={styles.inputBox}
                   placeholder="Book ID"
                   value={this.state.scannedBookId}
                   />
                   <TouchableOpacity
                   style={styles.scanButton}
                   onPress={()=>{
                       this.getCameraPermission("BookId")
                   }}>
                       <Text style={styles.buttonText}>Scan</Text>
                   </TouchableOpacity>
               </View>

               
               <View style={styles.inputView}>
                   <TextInput 
                   style={styles.inputBox}
                   placeholder="Student ID"
                   value={this.state.scannedStudentId}
                   />
                   <TouchableOpacity
                   style={styles.scanButton}
                   onPress={()=>{
                       this.getCameraPermission("StudentId")
                   }}>
                       <Text style={styles.buttonText}>Scan</Text>
                   </TouchableOpacity>
               </View>

            </View>
        );
        }
    }
    
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    displayText:{
      fontSize: 15,
      textDecorationLine: 'underline'
    },
    scanButton:{
      backgroundColor: '#2196F3',
      padding: 10,
      margin: 10
    },
    buttonText:{
      fontSize: 15,
      textAlign: 'center',
      marginTop: 10
    },
    inputView:{
      flexDirection: 'row',
      margin: 20
    },
    inputBox:{
      width: 200,
      height: 40,
      borderWidth: 1.5,
      borderRightWidth: 0,
      fontSize: 20
    },
    scanButton:{
      backgroundColor: '#66BB6A',
      width: 50,
      borderWidth: 1.5,
      borderLeftWidth: 0
    }
  });