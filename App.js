import React, { Component } from 'react';
import { Text, View, StatusBar, Image, TouchableOpacity, Switch, TextInput, ScrollView, StyleSheet, Button, FlatList, Alert, ToastAndroid, BackHandler, PermissionsAndroid, ActivityIndicator, Dimensions, Linking, RefreshControl, ImageBackground } from 'react-native';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

export default class App extends Component {
constructor(props){
  super(props);
  this.state= {
    refresh: false,
    header:'Home',
    value: true,
    username: '',
    data: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
    dataPembayaran: [
      {
        namaBarang: 'mouse',
        harga: 65000
      },
      {
        namaBarang: 'keyboard',
        harga: 85000
      },
      {
        namaBarang: 'kipas',
        harga: 165000
      },
      {
        namaBarang: 'batre',
        harga: 75000
      },
      {
        namaBarang: 'kabel usb',
        harga: 25000
      },
      {
        namaBarang: 'charger',
        harga: 105000
      },
    ]
  };
}

  backAction = () =>{
    Alert.alert('Perhatian', 'apakah anda akan menutup aplikasi?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel'
      },
      {
        text: 'Yes',
        onPress: () => BackHandler.exitApp()
      }
    ])
    return true;
  }
// untuk memanggil fungsi backAction
  componentDidMount(){
    this.backhandler = BackHandler.addEventListener('hardwareBackPress', this.backAction)
  }
// dipanggil ketika menclose aplikasi
  componentWillUnmount() {
    this.backhandler.remove();
  }
  // fungsi untuk PermissionsAndroid
  requestCameraPermission = async() => {
    // untuk memanggil premission
    try{
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title:'Ijinkan Akses',
          message:'Ijinkan aplikasi mengakses kamera',
          buttonNeutral:'Nanti',
          buttonNegative:'Cancel',
          buttonPositive:'Oke'
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('premission diberikan');
      } else {
        console.log('premission tidak diberikan');
        
      }
    }
    // jika ada error 
    catch (err){
      console.log(err)
    }
  }
  
  
  render() {
    return (
      <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#001064"/>
      {/* Header */}
      <View style={styles.header}>
        <Text style={{
          color: '#ffffff',
          fontWeight: 'bold',
          fontSize:18,
        }}>
        {this.state.header}
        </Text>
      </View>
      <ActivityIndicator animating={true} size="small" color="#000000"/>

      {/* <TouchableOpacity 
      style={styles.imgContainer}

     
      // onPress={() => this.requestCameraPermission()}
      onPress={() => Linking.openURL('https://google.com/')}

      > */}

{/* load gambar secara offline */}
      {/* <Image
        source={require('./src/images/img1.jpg')}
        style={{
          width:300,
          height:300
        }}
      /> */}

      {/* load gambar secara online */}
      {/* <Image
        source={{uri:'https://images.unsplash.com/photo-1623449658812-2c60b4e47227?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80'}}
        style={styles.img}
        resizeMode="stretch"
      /> */}
      
      {/* </TouchableOpacity> */}

      <TouchableOpacity
      style={{
        flex:1,
      
      }}
       onPress={() => Alert.alert('Penting', 'anda mengkilk gambar', [
        {
          text: 'Cancel',
          onPress: () => console.log('cancel ditekan'),
          style: 'cancel'
        },
        {
          text: 'Ok',
          onPress: () => console.log('Ok ditekan')
        }
      ])}
      >

      <ImageBackground  
      source={{uri:'https://images.unsplash.com/photo-1623449658812-2c60b4e47227?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80'}}
      style={{
        flex:1,
        resizeMode:'cover',
        justifyContent:'center',
        alignItems:'center'
      }}
      >
       <Text style={{
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize:18,
        
      }}>Hello World</Text> 
      </ImageBackground>
      </TouchableOpacity>

      
      <FlatList
      style={{
        flex:1
      }}
      data={this.state.dataPembayaran}
      refreshControl={
        <RefreshControl
        refreshing={this.state.refresh}
        onRefresh={() => {
          console.log('refreshing')
          this.setState({refresh: false})
        }}
        />
      }
      renderItem={({item, index}) => (
      <TouchableOpacity 
      style={styles.FlatListItem}
      onPress= {()=> 
      ToastAndroid.show(
        item.namaBarang+' di klik',
        ToastAndroid.SHORT
      )}>
        <Text style={{
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize:18,
        
      }}>{item.namaBarang}</Text>
        <Text style={{
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize:12,
      }}>Rp.{item.harga},-</Text>
      </TouchableOpacity>
      )}
      keyExtractor={(item) => item.namaBarang}
      />


      {/* <View style={styles.switch}>

      <Switch
      value={this.state.value}
      onValueChange={()=> this.setState({value: !this.state.value})}
      />
      </View>

      <View style={{marginHorizontal:20}}>
      <Button 
        title='Press Me' 
        color='#000000'
        onPress={() => console.log('Button')}
      />
      </View>

      <TextInput
      value={this.state.username}
      style={{
        borderBottomWidth:1,
        borderTopWidth:1,
        borderWidth:1,
        marginHorizontal:20,
        marginVertical:20,
        paddingHorizontal:10,
        borderRadius: 3,
        marginTop:10
      }}
      onChangeText={(value)=> this.setState({username: value})}
      />

      <TouchableOpacity
      style={styles.button}
      >
        <Text style={{
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize:12,
      }}>Click Me!</Text>
      </TouchableOpacity>
      <TouchableOpacity
      style={styles.button}
      >
        <Text style={{
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize:12,
      }}>Click Me!</Text>
      </TouchableOpacity>
      <TouchableOpacity
      style={styles.button}
      >
        <Text style={{
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize:12,
      }}>Click Me!</Text>
      </TouchableOpacity> */}

      </View>
    )
  }
}

const styles= StyleSheet.create({
  button:{
    backgroundColor: '#283593',
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:20,
    marginHorizontal:20,
    borderRadius: 50
  },
  img:{
    // width:300,
    // height:300,
    width:width,
    height:height/5,
    marginTop:20
  },
  switch:{
    justifyContent:'center',
    alignItems:'center',
    marginTop:20
  },
  imgContainer:{
    justifyContent:'center',
    alignItems:'center',
    marginTop:20
  },
  header:{
    backgroundColor:'#283593', 
    paddingVertical:20,
    justifyContent: 'center',
    alignItems:'center',
    elevation:15,
  },
  container:{
    flex:1
  },
  FlatListItem:{
    
      // marginBottom:10,
      marginTop:10,
      backgroundColor:'#283593',
      marginHorizontal:20,
      borderRadius:5,
      paddingHorizontal:20,
      paddingVertical:10
    
  }
})
