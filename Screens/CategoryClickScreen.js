import React, { useState,useEffect } from "react";
import {
  StyleSheet,
  TextInput,
  Image,
  View,
  FlatList,
  Platform,
  StatusBar,
  TouchableWithoutFeedback,
  SafeAreaView,
  Text,
  Modal,
  TouchableOpacity,
} from "react-native";
import Header from "../Components/Header";
import { Icon,Picker } from "native-base";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { useFonts } from "@use-expo/font";
import { AppLoading } from "expo";
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { ScrollView } from "react-native-gesture-handler";
import HomeCard from "../Components/HomeCard";
import {getUserId} from '../apis/LocalDB'
import SegmentedControlTab from "react-native-segmented-control-tab";

export default function CategoryClickScreen({ navigation, route, onPress2 }) {
  const { title } = route.params;
  const [pass, setPass] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [detailActivity, setDetailActivity] = useState([]);
  const [customDetailActivity, setCustomDetailActivity] = useState([]);
  const [searchDetailActivity,setSearchDetailActivity] = useState([])
  const [userId, setUserId] = useState()
  const [selected,setSelected] = useState("None")
  const [bookmarkedItems, setBookmarkedItems] = useState([])
  const [loaded] = useFonts({
    MoskMedium500: require("../assets/fonts/MoskMedium500.ttf"),
    MoskBold700: require("../assets/fonts/MoskBold700.ttf"),
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [filter,setFilter]=useState(false)
  const [creditCard,setCreditCard] = useState(false)
  const [parking,setParking] = useState(false)
  const [wiFi,setWiFi] = useState(false)
  const [outDoorSeat,setOutDoorSeat] = useState(false)
  const [takeOut,setTakeOut] = useState(false)
  const [delivery,setDelivery] = useState(false)
  
  fetchDetailActivity = async ()=>{
    let allDetail=[];
    firebase.database().ref('Activities/'+title+'/Venues').on('value', (snapshot)=> {
            snapshot.forEach((childSnapshot)=> {
            let item = childSnapshot.val();
            allDetail.push(item);
        });
        setDetailActivity(allDetail)
      })
    
    }
    fetchBookmarks = async ()=>{
      console.log('call')
     let allBookmarks=[];
     let fetch = firebase.database().ref('user/'+userId).child('/bookmarks/');
     fetch.on('value', (snapshot)=> {
             snapshot.forEach((childSnapshot)=> {
             let item = childSnapshot.val();
             let key = Object.keys(item)
             // console.log('itemsss',key)
             allBookmarks.push(item);
         });
         setBookmarkedItems(allBookmarks)
         console.log(bookmarkedItems.length)
       })
      } 

  useEffect(()=>{
       fetchDetailActivity()
       getUserId(user);
    },[])

    const user = value => {
      if (value !== null && value !== '') {
            console.log('value',value)
            setUserId(value)
            fetchBookmarks()
      }
    }

  if (!loaded) {
    return <AppLoading />;
  }

  function distance(lat1, lon1, lat2, lon2) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
      return 0;
    }
    else {
      var radlat1 = Math.PI * lat1/180;
      var radlat2 = Math.PI * lat2/180;
      var theta = lon1-lon2;
      var radtheta = Math.PI * theta/180;
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180/Math.PI;
      dist = dist * 60 * 1.1515;
      dist = dist * 1.609344 
      return dist;
    }
  }

  onValueChange=(value)=> {
    setSelected(value)
  }

  checkPressed = () => {
    setFilter(true)
    let lat=24.753006
    let lng=46.674387
    let array=[...detailActivity]
      if(selected == 'Asc'){
        array.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
      }
      else if(selected == 'Dsc'){
        array.sort((a,b) => (a.name > b.name) ? -1 : ((b.name > a.name) ? 1 : 0));
      }
      else if(selected == 'Nearest'){
        array.sort((a,b) => {
        let d1=distance(lat,lng,a.geometry.location.lat,a.geometry.location.lng);
        let d2=distance(lat,lng,b.geometry.location.lat,b.geometry.location.lng);
        if(d1 < d2) 
        return  -1;
        else if(d2 <d1)
        return 1;
        else 
        return 0;
        })
      }
      else if(selected == 'Furthest'){
        array.sort((a,b) => {
        let d1=distance(lat,lng,a.geometry.location.lat,a.geometry.location.lng);
        let d2=distance(lat,lng,b.geometry.location.lat,b.geometry.location.lng);
        if(d1 < d2) 
        return  1;
        else if(d2 <d1)
        return -1;
        else 
        return 0;
        })
      }
      if(selectedIndex !== 0){
        array = array.filter(function (item) {
          return (item.price_level && item.price_level <= selectedIndex)
        })
      }
      
      if(creditCard || parking || wiFi || outDoorSeat || takeOut || delivery){
        array = array.filter(function (item) {
        let list=[];
        list=Object.values(item.features)
        return (
        (creditCard ? list.includes("Credit Cards"):true) &&
        (parking ? list.includes("Parking"):true) &&
        (wiFi ? list.includes("Wi-Fi"):true) &&
        (outDoorSeat ? list.includes("Outdoor Seating"):true) &&
        (takeOut ? list.includes("Take-out"):true) &&
        (delivery ? list.includes("Delivery"):true)  
        )    
        })
      }

      console.log("array filter by credit cards :",array)
      setCustomDetailActivity(array)

    setModalVisible(!modalVisible);
  }

  const handleSingleIndexSelect = (index) => {
    setSelectedIndex(index);
  };

  onChangeText= (text) => {
    setPass(text)
    let array=[]
    {filter ? array=[...customDetailActivity] : array=[...detailActivity]}
      array = array.filter(function (item) {
      return item.name.includes(text)
      })
      console.log("array filter by credit cards :",array)
      setSearchDetailActivity(array)
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <View style={styles.searchContainer}>
        <View style={styles.searchSubContainer}>
          <Image source={require("../assets/icons/searchIcon.png")} />

          <TextInput
            keyboardType="numbers-and-punctuation"
            style={styles.inputpass}
            placeholder="Search"
            placeholderTextColor="#707070"
            onChangeText={onChangeText}
            defaultValue={pass}
          />

          <TouchableWithoutFeedback
            onPress={() => {
              setModalVisible(true);
            }}
          >
            <Image
              style={{
                alignSelf: "center",
              }}
              source={require("../assets/icons/modal.png")}
            />
          </TouchableWithoutFeedback>
        </View>
      </View>

      <ScrollView style={{ zIndex: -5 }}  showsVerticalScrollIndicator={false}>
        <View>
          <View style={styles.titleContainer}>
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate("GeneralCategoryScreen")}
            >
              <Image source={require("../assets/icons/backArrow.png")} />
            </TouchableWithoutFeedback>

            <Text style={styles.Recomend}>{title}</Text>
          </View>
          {((pass !== "" && searchDetailActivity.length <= 0) || detailActivity.length <= 0 || ((customDetailActivity <= 0) && filter)) ?
          <View style={{alignSelf:'center'}}>
          <Text style={{fontSize:20}}>No data found</Text>
          </View>
          :
          <FlatList
          data={pass !== "" ? searchDetailActivity : (filter ? customDetailActivity:detailActivity)}
          renderItem={({item,index}) =>{
            // item search in (bookmarkitem)
            const response= bookmarkedItems.some((selectedItem)=> selectedItem.name === item.name);
            // const {image,name}=item
            console.log("componentDidMount on detail catagory",response) 
          return (
            // <View style={styles.cardFirstRow}>
              <HomeCard
                image={item.image}
                title={item.name}
                heart={response == true ? 'red' : null}
                item={item}
                index={index}
                onPress2={() =>
                  navigation.navigate("ActivityInformationScreen",{
                    object: item,
                    response:response
                  }) 
               }
              />
            // </View>
           )
          }
          }
          extraData={pass !== "" ? searchDetailActivity : (filter ? customDetailActivity:detailActivity)}
          numColumns={2}
          keyExtractor={(item, index) => index}
          />
          }
        </View>
      </ScrollView>
      {/*Filter Modal */}

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modalTopContainer}>
              <TouchableWithoutFeedback
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Image source={require("../assets/icons/cross.png")} />
              </TouchableWithoutFeedback>
              <Text style={styles.filters}>Filters</Text>

              <TouchableWithoutFeedback
                onPress={checkPressed}
              >
                <Image source={require("../assets/icons/check.png")} />
              </TouchableWithoutFeedback>
            </View>

            <View style={styles.separator} />

            <Text style={styles.sortBy}>Sort by</Text>

            <View style={styles.passwordContainer}>
            <View style={styles.passwordSubContainer}>
             
            <Picker mode="dropdown"  
              iosIcon={<Icon name="arrow-down" />}
              style={{ width: undefined,color:"#fff" }}
              selectedValue={selected}
              onValueChange={onValueChange}
            >
              <Picker.Item label="None" value="None" />
              <Picker.Item label="Asc" value="Asc" />
              <Picker.Item label="Dsc" value="Dsc" />
              <Picker.Item label="Nearest" value="Nearest" />
              <Picker.Item label="Furthest" value="Furthest" />
            </Picker>

            </View>
          </View>

            <Text style={styles.price}>Price</Text>
            <View style={styles.priceContainer}>
        <SegmentedControlTab
          values={["None","$", "$$", "$$$", "$$$$"]}
          selectedIndex={selectedIndex}
          tabStyle={styles.tabStyle}
          activeTabStyle={styles.activeTabStyle}
          activeTabTextStyle={{ color: "#7D34E3" }}
          onTabPress={handleSingleIndexSelect}
          tabTextStyle={{ color: "#fff" }}
          firstTabStyle={{
            borderTopLeftRadius: 20,
            borderBottomLeftRadius: 20,
          }}
          lastTabStyle={{
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
          }}
          tabsContainerStyle={{ height: hp("6%"), width: wp("90%") }}
        />
      </View>
      
             <View style={{marginTop:hp('1%')}}>

            <Text style={styles.feature}>Features</Text>

            <View style={{ flexDirection: "row" }}>
            <TouchableOpacity onPress={()=>{setCreditCard(!creditCard)}}
            style={[ styles.featureContainer,{ width: wp("50%"),height: hp("4%"),backgroundColor: creditCard ? "#fff":"#7D34E3" }]}>
            <Text style={{ color:creditCard ? "#7D34E3":"#fff" }}>Accept Credit Cards</Text>
            </TouchableOpacity>
      
            <TouchableOpacity onPress={()=>{setParking(!parking)}}
            style={[ styles.featureContainer,{ backgroundColor: parking ? "#fff":"#7D34E3" }]}>
            <Text style={{ color:parking ? "#7D34E3":"#fff" }}>Parking</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{setWiFi(!wiFi)}}
            style={[ styles.featureContainer,{ backgroundColor: wiFi ? "#fff":"#7D34E3" }]}>
            <Text style={{ color:wiFi ? "#7D34E3":"#fff" }}>Wi-Fi</Text>
            </TouchableOpacity>
            </View>

            <View style={{ flexDirection: "row" }}>
            <TouchableOpacity onPress={()=>{setOutDoorSeat(!outDoorSeat)}}
             style={[ styles.featureContainer,{ width: wp("45%"), backgroundColor: outDoorSeat ? "#fff":"#7D34E3" }]}>
             <Text style={{ color:outDoorSeat ? "#7D34E3":"#fff" }}>Outdoors seatings</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{setTakeOut(!takeOut)}}
             style={[ styles.featureContainer,{ backgroundColor: takeOut ? "#fff":"#7D34E3" }]}>
             <Text style={{ color:takeOut ? "#7D34E3":"#fff" }}>Take-out</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{setDelivery(!delivery)}}
             style={[ styles.featureContainer,{ backgroundColor: delivery ? "#fff":"#7D34E3" }]}>
             <Text style={{ color:delivery ? "#7D34E3":"#fff" }}>Delivery</Text>
            </TouchableOpacity>
            </View>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },

  searchContainer: {
    width: wp("90%"),
    height: hp("7%"),
    backgroundColor: "#fff",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset:{
      width:0,
      height: 1},
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
    borderRadius: 30,
    alignSelf: "center",
    justifyContent: "space-between",
    padding: wp("5%"),
    marginTop: hp("5%"),
    flexDirection: "row",
    alignItems: "center",
  },
  searchSubContainer: {
    flexDirection: "row",
  },
  searchSubContainer: {
    flexDirection: "row",
  },

  inputpass: {
    width: wp("70%"),
    height: hp("2.5%"),
    paddingHorizontal: wp("3%"),
    fontSize: 16,
    fontFamily: "MoskMedium500",
  },

  Recomend: {
    fontFamily: "MoskBold700",
    color: "#8338EB",
    fontSize: 16,
    marginLeft: wp("3%"),
  },

  titleContainer: {
    flexDirection: "row",
    marginHorizontal: wp("5%"),
    marginTop: hp("4%"),
    bottom: hp("1.3%"),
  },

  cardFirstRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: wp("1.7%"),
    // backgroundColor:'grey',
    alignSelf:'center'
  },

  othersLike: {
    fontFamily: "MoskBold700",
    color: "#8338EB",
    fontSize: 16,
    marginVertical: wp("0%"),
    marginHorizontal: wp("7%"),
  },

  modalView: {
    width: "100%",
    height: "80%",
    marginTop: "60%",
    backgroundColor: "#7D34E3",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,

    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "orange",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    bottom: hp("3%"),
  },
  textStyle: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },

  bottomText: {
    marginTop: hp("0.8%"),
    color: "#D6D6D8",
    fontSize: wp("3.5%"),
  },
  text1View: {
    width: wp("50%"),
    marginLeft: wp("4%"),
  },
  pdf: {
    color: "#D6D6D8",
  },

  modalTopContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: wp("100%"),
    marginTop: hp("4%"),
  },

  filters: {
    fontSize: 25,
    color: "#fff",
    fontFamily: "MoskBold700",
    fontWeight: "bold",
  },

  separator: {
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
    width: wp("85%"),
    marginTop: hp("3%"),
  },

  sortBy: {
    fontSize: 20,
    fontFamily: "MoskMedium500",
    fontWeight: "500",
    color: "#fff",
    alignSelf: "flex-start",
    marginHorizontal: wp("9%"),
    marginVertical: hp("2%"),
  },

  nearestContainer: {
    width: wp("90%"),
    height: hp("6%"),
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 30,
    alignSelf: "center",
    justifyContent: "center",
    padding: wp("5%"),
  },
  nearestSubContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  nearestText: {
    fontSize: 14,
    fontFamily: "MoskMedium500",
    color: "#fff",
  },

  price: {
    fontSize: 20,
    fontFamily: "MoskMedium500",
    fontWeight: "500",
    color: "#fff",
    alignSelf: "flex-start",
    marginHorizontal: wp("9%"),
    marginVertical: hp("2.5%"),
  },

  feature: {
    fontSize: 20,
    fontFamily: "MoskMedium500",
    fontWeight: "500",
    color: "#fff",
    alignSelf: "flex-start",
    marginHorizontal: wp("2%"),
    marginVertical: hp(".5%"),
  },

  passwordContainer: {
    width: wp("90%"),
    height: hp("7%"),
    borderWidth: 0.5,
    borderColor: "#fff",
    borderRadius: 30,
    alignSelf: "center",
    justifyContent: "center",
    padding: wp("5%"),
    marginTop: hp("1.3%"),
  },
  passwordSubContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  priceContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: wp("4%"),
    marginTop: hp("-1.5%"),
  },
  tabStyle: {
    borderColor: "#fff",
    backgroundColor: "#7D34E3",
  },
  activeTabStyle: {
    backgroundColor: "#fff",
  },
  featureContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#fff",
    width: wp("22%"),
    height: hp("4%"),
    borderRadius: 20,
    marginRight: wp("2%"),
    marginTop: hp("1%"),
  }
});
