import "react-native-gesture-handler";
import React from "react";
import { StyleSheet } from "react-native";

import Navigation from "./Navigation/Navigation";
import * as firebase from 'firebase'; 

const firebaseConfig = {
  apiKey: "AIzaSyB_I4Ny-yren0JULqwYLycifiVJ140BJqg",
  authDomain: "locus-app-project.firebaseapp.com",
  databaseURL: "https://locus-app-project.firebaseio.com",
  projectId: "locus-app-project",
  storageBucket: "locus-app-project.appspot.com",
  messagingSenderId: "321269827273",
  appId: "1:321269827273:web:bb390a51462b9dfe7eaf18",
  measurementId: "G-R7BW325KFZ"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export default function App() { 
  console.disableYellowBox = true;
  return <Navigation />;
}

const styles = StyleSheet.create({});
