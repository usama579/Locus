import React, {useState,useEffect} from 'react';
import {
  ActivityIndicator,
  StatusBar,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  FlatList
} from 'react-native';
import {getUserId} from '../apis/LocalDB';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function Splash ({navigation}) {
    const [isUser, setUser] = useState()
    useEffect(()=>{
      tryToLogin()
   },[])
   const tryToLogin = async () => {
    console.log('called');
    getUserId(user);
  };
  const user = value => {
    if (value !== null && value !== '') {
        setTimeout(() => {
          console.log('value',value)
          navigation.navigate('HomeScreen')
          }, 2000);
    }
    else{
       navigation.navigate('Welcome')
  
    }
  }
    return (
      <SafeAreaView style={[styles.container, {backgroundColor:'#F7F7F7'} ]}
       >
         <Image source = {require('../assets/LocusBG.jpeg')} style={{width:wp('100%')}} resizeMode={'contain'}/>
         </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 25,
    color: 'black',
    fontWeight: 'bold',
  },
});
