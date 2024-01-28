
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ImageBackground, KeyboardAvoidingView, Picker, StyleSheet, Text, TextInput, TouchableWithoutFeedback, TouchableOpacity, View, Keyboard, Alert} from 'react-native';
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import {firebase} from '../firebase'
import { useState, useEffect } from 'react';
import FlightAPI from '../services/FlightAPI';
import UserAPI from '../services/UserAPI';
import Swiper from 'react-native-swiper';
import { set } from 'mongoose';

const image = require('../assets/bg_wingmates.png');

function FlightInfo({ flight }) {
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Text>Airline: {flight.airline}</Text>
      </View>
      <View style={styles.item}>
        <Text>Flight Number: {flight.flightNumber}</Text>
      </View>
      <View style={styles.item}>
        <Text>Departure Airport: {flight.departureAirport}</Text>
      </View>
      <View style={styles.item}>
        <Text>Departure Date: {flight.departureDate}</Text>
      </View>
      <View style={styles.item}>
        <Text>Departure Time: {flight.departureTime}</Text>
      </View>
      <View style={styles.item}>
        <Text>Arrival Airport: {flight.arrivalAirport}</Text>
      </View>
      <View style={styles.item}>
        <Text>Arrival Date: {flight.arrivalDate}</Text>
      </View>
      <View style={styles.item}>
        <Text>Arrival Time: {flight.arrivalTime}</Text>
      </View>
      <View style={styles.item}>
        <Text>Airplane: {flight.airplane}</Text>
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
      }).catch(error => {
        console.log("failed in initial get user flights", error)
      })
    if (flights.length > 0) {
      setCurrentFlight(flights[0])
    }
  }
  , [])

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
              })
            })
          }).catch(error => {
            console.log("failed to get flight", error)
            alert("failed to get flight")
          })

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
    navigation.navigate("Match")
  }


  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled={false}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ImageBackground source={image} style={styles.backgroundImage}>
              <View style={styles.container}>
                <Text>Email: {firebase.auth().currentUser?.email}</Text>
                <TouchableOpacity
                  onPress={handleSignOut}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>Sign out</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleMatching}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>Match</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleAddFlight}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>Add Flight</Text>
                </TouchableOpacity>
                
                <Slideshow flightList={flights}></Slideshow>
              </View>
          </ImageBackground>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
   button: {
    backgroundColor: '#0782F9',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
  },
  item: {
    marginBottom: 5,
  },
})