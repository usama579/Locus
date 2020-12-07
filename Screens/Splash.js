import React, {useState,useEffect} from 'react';
import {
  ActivityIndicator,
  StatusBar,
  View,
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';
import {getUserId} from '../apis/LocalDB';

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
       navigation.navigate('LoginScreen')
  
    }
  }
    return (
      <SafeAreaView style={[styles.container, {backgroundColor: 'grey'}]} />
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
