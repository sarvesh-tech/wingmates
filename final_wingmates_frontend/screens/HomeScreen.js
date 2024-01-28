
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ImageBackground, Image, KeyboardAvoidingView, Picker, StyleSheet, Text, TextInput, TouchableWithoutFeedback, TouchableOpacity, View, Keyboard, Alert, ScrollView, Dimensions, Switch, ActivityIndicator} from 'react-native';
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import {firebase} from '../firebase'
import { useState, useEffect } from 'react';
import FlightAPI from '../services/FlightAPI';
import UserAPI from '../services/UserAPI';
import Swiper from 'react-native-swiper';
import { set } from 'mongoose';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView from 'react-native-maps'
import profile from '../assets/profile.png'




const image = require('../assets/bg_wingmates.png');
const aa_image = require('../assets/aa-logo.png');

const windowWidth = Dimensions.get('window').width;

const LoadingSpinner = () => {
  return (
    <View style={styles.spinnerContainer}>
      <ActivityIndicator size="large" color="red" />
    </View>
  );
};

const MatchCircle = ({ percentage }) => {
  // Define color based on match percentage
  let color;
  if (percentage >= 80) {
    color = '#5faf3a';
  } else if (percentage >= 50) {
    color = '#f7c952';
  } else {
    color = '#e55353';
    
  }

  return (
    <View style={[styles.circle, { backgroundColor: color }]}>
      <Text style={styles.percenttt}>{percentage}</Text>
    </View>
  );
};


const UserScrollView = ({ users, handler}) => {
  return (
      <View>
      <ScrollView contentContainerStyle={styles.scrollView}>
      <SafeAreaView>
          {users.map((user, index) => (
          <View key={index} style={styles.userCard}>
              <TouchableOpacity onPress={handler}>
              <Text style={styles.name}>{user.name}</Text>
              </TouchableOpacity>
              <MatchCircle style={styles.percenttt} percentage={user.percent} />
          </View>
          ))}
        </SafeAreaView>
        </ScrollView>
      </View>
  );
};




function FlightInfo({ flight }) {
  return (
    <View style={styles.containerCard}>

      <View style={styles.aa_container}>
        <Image source={aa_image} style={styles.aa_image} />
        
        <View style={styles.small_container}>
          <View style={styles.item}>
            <Text style={styles.american_airlines}>{flight.airline}</Text>
          </View>
          <View style={styles.smaller_container}>
            <View style={styles.item}>
              <Text style={styles.flight_number}>{flight.flightNumber}</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.flight_number}>••••        {flight.airplane}</Text>
            </View>
          </View>

          <View style={styles.big_div}>
            <View style={styles.left_div}>
              <View style={styles.item}>
                <Text style={styles.airportoftravel}>{flight.departureAirport}</Text>
              </View>
              <View style={styles.item}>
                <Text style={styles.dateoftravel}>{flight.departureDate}</Text>
              </View>
              <View style={styles.item}>
                <Text style={styles.timeoftravel}>{flight.departureTime}</Text>
              </View>
            </View>

            <View style={styles.right_div}>
              <View style={styles.item}>
                <Text style={styles.airportoftravel}>{flight.arrivalAirport}</Text>
              </View>
              <View style={styles.item}>
                <Text style={styles.dateoftravel}>{flight.arrivalDate}</Text>
              </View>
              <View style={styles.item}>
                <Text style={styles.timeoftravel}>{flight.arrivalTime}</Text>
              </View>
            </View>


          </View>
        </View>


      </View>
    </View>
  );
}



const Slideshow = ({flightList}) => {
  
  return (
    <Swiper style={styles.wrapper} loop={false}>
      {flightList.map((item) => (
        <View key={item._id} style={styles.slide}>
          <FlightInfo flight={item}></FlightInfo>
        </View>
      ))}
    </Swiper>
  );
};


const HomeScreen = () => {
  const navigation = useNavigation()
  const [flights, setFlights] = useState([])
  const [currentFlight, setCurrentFlight] = useState(null)
  const [isMatchingScreen, setIsMatchingScreen] = useState(false)
  const [matchList, setMatchList] = useState([])
  const [userList, setUserList] = useState([])

  useEffect(() => {
    FlightAPI.getUserFlights(firebase.auth().currentUser.uid)
      .then(flights => {
        setFlights(flights.sort((a, b) => {
          function convertTimeTo24Hour(time) {
            const [hours, minutes, seconds] = time.split(':');
            return `${hours}:${minutes}:${seconds}`;
          }
          const dateA = new Date(a.departureDate);
          const dateB = new Date(b.departureDate);
      
          const timeA = convertTimeTo24Hour(a.departureTime);
          const timeB = convertTimeTo24Hour(b.departureTime);
      
          const datetimeA = new Date(`${a.departureDate} ${timeA}`);
          const datetimeB = new Date(`${b.departureDate} ${timeB}`);
      
          return datetimeA - datetimeB || dateA - dateB;
        }))
        if (flights.length > 0) {
          console.log("set current flight")
          setCurrentFlight(flights[0])
        }
      }).catch(error => {
        console.log("failed in initial get user flights", error)
      })
    
  }
  , [])

  const handleChat = () => {
    navigation.navigate("Chat")
  }

  const handleSignOut = () => {
    firebase.auth()
      .signOut()
      .then(() => {
        navigation.replace("Login")
      })
      .catch(error => alert(error.message))
  }

  const handleAddFlight = () => {
    Alert.prompt(
      'Enter Flight Number',
      'Please enter the flight number:',
      (flightNumber) => {
        // flightNumber will contain the user-inputted value
        if (flightNumber) {
          // Check if a value is entered
          console.log('Flight Number:', flightNumber);
          // You can perform further actions with the flight number here
          FlightAPI.getFlight(flightNumber).then(flightArr => {
            const flight = flightArr[0]
            if (flights.some(f => f._id === flight._id)) {
              // Flight already exists in user's list
              console.log('Flight already exists in user\'s list');
              alert('Flight already exists in user\'s list');
              return;
            }
            console.log(firebase.auth().currentUser.uid)

            UserAPI.getUser(firebase.auth().currentUser.uid).then(users => {
              const user = users[0]
              console.log(user)
              console.log("flights", user.flights)
              user.flights = user.flights.concat(flight._id)
              console.log("flights", user.flights)
              UserAPI.updateUser(firebase.auth().currentUser.uid, user).then(updatedUser => {
                console.log(updatedUser)
                setFlights(flights.concat(flight).sort((a, b) => {
                    function convertTimeTo24Hour(time) {
                      const [hours, minutes, seconds] = time.split(':');
                      return `${hours}:${minutes}:${seconds}`;
                    }
                    const dateA = new Date(a.departureDate);
                    const dateB = new Date(b.departureDate);
                
                    const timeA = convertTimeTo24Hour(a.departureTime);
                    const timeB = convertTimeTo24Hour(b.departureTime);
                
                    const datetimeA = new Date(`${a.departureDate} ${timeA}`);
                    const datetimeB = new Date(`${b.departureDate} ${timeB}`);
                
                    return datetimeA - datetimeB || dateA - dateB;
                
                }))
                
              }).then(() => {
                setCurrentFlight(flights[0])
                setMatchList([])
              })
            })
          }).catch(error => {
            console.log("failed to get flight", error)
            alert("failed to get flight")
          })
          console.log("addedFlight")
          
          console.log("set Current flight in add flight")

        } else {
          // User canceled or entered an empty string
          console.log('Flight number input canceled or empty');
        }
      },
      'plain-text', // Specify input type as plain text
      '',
      'default' // Specify keyboard type as numeric for flight number
    );
  
  }

  const handleMatching = () => {
    console.log("matching")
    console.log("current flight", currentFlight)
    UserAPI.getUsersWithFlight(currentFlight.flightNumber)
    .then(users => {
      console.log(users);

      // Create an array of two users with the current user and users from the flight
      const curUser = users.find(user => user.uid === firebase.auth().currentUser.uid);

      // Remove the current user from the users array
      const otherUsers = users.filter(user => user.uid !== firebase.auth().currentUser.uid);
      console.log("all people who match", otherUsers);

      // Use Promise.all to wait for all getMatch promises to resolve
      return Promise.all(
        otherUsers.map(person => {
          return UserAPI.getMatch({ persons: [curUser, person] })
            .then(percent => {
              console.log("match", percent);
              person.percent = percent;
              return person;
            });
        })
      );
    })
    .then(updatedUsers => {
      // After all getMatch promises have resolved, update the state
      setMatchList(updatedUsers);
    })
    .catch(error => {
      console.error("Error fetching matches:", error);
      // Handle error if needed
    });

  }

  const handleSwitch = () => {
    const value = isMatchingScreen
    setIsMatchingScreen(!value)
    if (currentFlight) {
      console.log("matching")
      handleMatching()
    }
  }

  const customMapStyle = [
    {
      featureType: 'all',
      elementType: 'geometry',
      stylers: [
        {
          color: '#000000', // Set the background color of the map
        },
      ],
    }
  ]


  return (
          <>
          
              {!isMatchingScreen ? 
                
                  <KeyboardAwareScrollView
                      contentContainerStyle={styles.container}
                      resetScrollToCoords={{ x: 0, y: 0 }}
                      scrollEnabled={false}
                    >
                    
                      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                          <ImageBackground source={image} style={styles.backgroundImage}>
                            <SafeAreaView>
                              <View style={styles.menuWrapper}>
                                <Text style={styles.title}>Your Flights</Text>
                                <Image source={profile} style={styles.profileImage}/>
                              </View>
                            </SafeAreaView>
                      
                              <View style={styles.container}>
                                
                                <MapView style={styles.map} customMapStyle={customMapStyle}/>
                                
                                <View style={styles.switchstyle}>
                                  <Slideshow style={styles.slideshowy}flightList={flights} />
                                </View>
                                <TouchableOpacity
                                  onPress={handleAddFlight}
                                  style={styles.button}
                                >
                                  <Text style={styles.buttonText}>Add Flight</Text>
                                </TouchableOpacity>
                              </View>
                          </ImageBackground>
                        </TouchableWithoutFeedback>
                      
                    </KeyboardAwareScrollView>
                  
                :
                <>
                  
                    {matchList && matchList.length > 0 ? 
                      
                      <UserScrollView  users={matchList} handler={handleChat}></UserScrollView>

                      :
                      
                      <View style={styles.container}>
                        <LoadingSpinner />
                        <Text style={styles.title}>Loading Matches...</Text>
                      </View>
                    }
                    
                    
                    <View style={styles.container}>
                    </View>
                </>
              }
            
            <View style={styles.switchContainer}>
              <Text style={{fontSize: 26, fontWeight: 'bold', marginLeft: 20, marginTop: -14}}>GateGreet</Text>
              <Switch style={styles.switchesstyle}
                trackColor={{ false: "green", true: "grey" }}
                thumbColor={isMatchingScreen ? "#000" : "#000"}
                ios_backgroundColor="darkgrey"
                onValueChange={() => handleSwitch()}
                value={isMatchingScreen}
              />
            </View>
            
          </>
              

  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    width: '80%', // Adjust the width as needed
    height: '80%', // Adjust the height as needed
    justifyContent: 'l', // Center content vertically
    alignItems: 'center',  
    marginBottom: -50,
    paddingVertical: 0,
    paddingHorizontal: 2,
    marginTop: -95,
    zIndex: 1,
  },
  big_div: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 0,
    marginLeft: 4,
  },
  left_div: {
    flexDirection: 'column',
    marginLeft: 0,
  },
  right_div: {
    flexDirection: 'column',
    marginRight: 0,
    textAlign: 'right',
    alignContent: 'right',
    alignItems: 'right',
    justifyContent: 'right',
  },

  airportoftravel: {
    fontSize: 23,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 15,
    marginTop: 0,
    textAlign: 'left',
  },
  dateoftravel: {
    fontSize: 13,
    color: 'grey',
    marginLeft: 0,
    marginTop: 0,
  },
  timeoftravel: {
    fontSize: 13,
    color: 'grey',
    marginLeft: 10,
    marginTop: -10,
  },
  
  aa_container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 70,
    backgroundColor: 'lightred',
  },
  smaller_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    marginLeft: 6.7,
  },
  small_container:{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginLeft: -13,
    marginTop: -56,
    padding: 20,
  },
  american_airlines: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: -100,
    marginLeft: 29,
  },
  flight_number: {  
    fontSize: 14,
    color: 'grey',
    padding: 'none',
  },
  aa_image: {
    width: 60,
    height: 60,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'lightgrey',
    marginBottom: 170,
  },

  map: {
    width: '80%',
    height: '30%',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'grey',  
    marginTop: 0,
    opacity: 0.55,
  },
  menuWrapper: {
    marginTop: 40,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileImage: {
    width: 47,
    height: 47,
  },
  title: {
    fontSize: 83,
    fontWeight: 'bold',
    color: 'black',
  },
   button: {
    backgroundColor: '#000',
    width: '75%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 0,
    marginBottom: 60,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },

  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
  },
  item: {
    marginBottom: 10,
  },
  wrapper: {
    height: 300, // Set the height of the Swiper
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'top',
    position: "relative", // Here is the trick
    alignItems: 'center',
    maxHeight: 700,
  },
  userCard: {
    width: windowWidth * 0.8,
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 20,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'lightgrey',
  },
  name: {
    fontSize: 38,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  percent: {
    fontSize: 16,
    color: '#333',
  },
  circle: {
    width: 70,
    height: 70,
    borderRadius: 60,
    borderWidth: 5,
    borderColor: 'black',
  },
  percenttt: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginTop: 12,
  },
  switchstyle:{
    flex: 1,
    marginTop: 30,
  },
  switchesstyle:{
    marginTop: 20,
    marginBottom: 30,
    marginLeft: 0,
    marginRight: 50,
    width: '5%',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginLeft: 50,
    marginRight: 30,
  },
  buttonBack: {
    backgroundColor: '#000',
    width: '75%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 300,
    marginBottom: 60,
  },
  buttonTextBack: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
