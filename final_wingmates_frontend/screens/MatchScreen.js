import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ImageBackground, KeyboardAvoidingView, Picker, StyleSheet, Text, TextInput, TouchableWithoutFeedback, TouchableOpacity, View, Keyboard, Alert, ScrollView} from 'react-native';
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import {firebase} from '../firebase'
import { useState, useEffect } from 'react';
import { set } from 'mongoose';
import FlightAPI from '../services/FlightAPI';
import UserAPI from '../services/UserAPI';
import { SafeAreaView } from 'react-native-safe-area-context';




const UserCard = ({user}) => {
    return (
        <View style={styles.container}>
            <View style={styles.item}>
                <Text>{user.name}</Text>
            </View>
        </View>
    );
}

const UserCardList = ({users}) => {
    return (
        <View style={styles.container}>
            {users.map((item) => (
                <UserCard key={item._id} user={item}></UserCard>
            ))}
        </View>
    );
}

const MatchScreen = () => {
    const [flightList, setFlights] = useState([])
    const [userList, setUserList] = useState([])
    const [currentFlight, setCurrentFlight] = useState(null)

    const navigation = useNavigation()

    const dummyUsers = [
        user1 = {
            name: "John Doe",
            percent: 50
        },
        user2 = {
            name: "Jane Doe",
            percent: 50
        }
    ]
    useEffect(() => {
        FlightAPI.getUserFlights(firebase.auth().currentUser.uid)
            .then(flights => {
                console.log(flights)
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
            })
            .catch(error => {
                console.log(error)
            })
        
        if (flightList) {
            setCurrentFlight(flightList[0])
        }
        
        console.log(currentFlight)
        if (currentFlight != null) {
            UserAPI.getUsersWithFlight(currentFlight.flightNumber)
            .then(users => {
                console.log(users)
                setUserList(users)

            })
            .catch(error => {
                console.log(error)
            })
        }
    }, [currentFlight])

    return (
        // if users haven't loaded yet, display loading screen

        <KeyboardAwareScrollView
            contentContainerStyle={styles.container}
            resetScrollToCoords={{ x: 0, y: 0 }}
            scrollEnabled={false}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                
                <View style={styles.inputContainer}>
                    <View style={styles.textContainer}>
                        {/* <Text style={styles.description}>Match</Text> */}
                        <UserScrollView users={userList}></UserScrollView>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>
    );



}

export default MatchScreen;

const styles = StyleSheet.create({
    scrollView: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
      },
      userCard: {
        backgroundColor: '#e6e6e6',
        padding: 20,
        marginVertical: 10,
        borderRadius: 10,
        width: '80%',
      },
      name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
      },
      email: {
        fontSize: 16,
        color: '#333',
      },
});
