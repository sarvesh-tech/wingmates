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


const UserScrollView = ({ users }) => {
    return (
        <View>
        <ScrollView contentContainerStyle={styles.scrollView}>
        <SafeAreaView>
            {users.map((user, index) => (
            <View key={index} style={styles.userCard}>
                <Text style={styles.name}>{user.name}</Text>
                <Text style={styles.email}>{user.email}</Text>
            </View>
            ))}
            </SafeAreaView>
            </ScrollView>
        </View>
    );
};

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
    const [flightList, setFlightList] = useState([])
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
                setFlightList(flights)
            })
            .catch(error => {
                console.log(error)
            })
        
        console.log("inside here")
        if (flightList.length > 0) {
            setCurrentFlight(flightList[0])
        }
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
    }, [])

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
