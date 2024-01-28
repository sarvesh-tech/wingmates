import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ImageBackground, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, TouchableOpacity, View, Keyboard } from 'react-native';
import React from 'react'
import {useState, useEffect} from'react'
import {firebase} from '../firebase';
import { useNavigation } from '@react-navigation/native';
import UserAPI from '../services/UserAPI';

const image = require('../assets/bg_wingmates.png');

const RegisterScreen = () => {
    const navigation = useNavigation()
    const [currentPage, setCurrentPage] = useState(true)
    const [emailField, setEmailField] = useState("")
    const [passwordField, setPasswordField] = useState("")
    const [nameField, setNameField] = useState("")
    const [languageField, setLanguageField] = useState("")
    const [nationalityField, setNationalityField] = useState("")
    const [ageField, setAgeField] = useState("")
    const [genderField, setGenderField] = useState("")
    const [descriptionField, setDescriptionField] = useState("")


    const handleSignIn = () => {
        navigation.replace("Login")
    }

    const handleContinue = () => {
        setCurrentPage(!currentPage)
    }

    const handleRegister = () => {
        //create an authentication email and password for user
        console.log("registering user")
        firebase.auth().createUserWithEmailAndPassword(emailField, passwordField)
            .then(userCredentials => {
                console.log(userCredentials.user.uid)
                //create a user in mongodb
                const newPerson = {
                    uid: userCredentials.user.uid,
                    email: emailField,
                    name: nameField,
                    language: languageField,
                    nationality: nationalityField,
                    gender: genderField,
                    age: ageField,
                    description: descriptionField,
                    flights: []
                }
                UserAPI.createUser(newPerson)
                .then(returnedPerson => {
                    console.log(returnedPerson)
                })
                .catch(error => {
                    console.log(error)
                    alert(error.message)
                })
            })
            .catch(error => {
                console.log(error)
                alert(error.message)
            })
        
        //create a user in mongodb
        
        //wait until user is added
        //then redirect to login page
        navigation.replace("Login")
        //function to create the vector for matching
    }


    return (
        <KeyboardAwareScrollView
            contentContainerStyle={styles.container}
            resetScrollToCoords={{ x: 0, y: 0 }}
            scrollEnabled={false}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ImageBackground source={image} style={styles.backgroundImage}>
                {currentPage ? 
                        <>
                        <View style={styles.inputContainer}>
                        <Text style={styles.loginText}>Sign Up</Text>
                        
                        <View style={styles.textContainer}>
                            <Text style={styles.subText}>Already have an account?</Text>
                            <TouchableOpacity 
                                onPress={()=>{handleSignIn()}}
                            > 
                                <Text style={styles.sideText}>Sign In</Text>
                            </TouchableOpacity>
                            
                        </View>

                        <TextInput
                            placeholder="Email"
                            value={emailField}
                            onChangeText={text => {setEmailField(text)
                                                    //console.log(emailField)
                                                }}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="Name"
                            value={nameField}
                            onChangeText={text => {setNameField(text)
                            //console.log(nameField)
                            }}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="Password"
                            value={passwordField}
                            onChangeText={text => {setPasswordField(text)
                            //console.log(passwordField)
                            }}
                            style={styles.input}
                            secureTextEntry
                        />
                        <TextInput
                            placeholder="Age"
                            value={ageField}
                            onChangeText={text => {setAgeField(text)
                            //console.log(ageField)
                            }}
                            style={styles.input}
                            //secureTextEntry
                        />
                        </View>
                        <View>
                            <TouchableOpacity
                            style={styles.buttonContainer}
                            onPress={() => {handleContinue()
                                            console.log("pressed continue")}}

                            >
                            <Text style={styles.buttonText}>Continue</Text>
                            </TouchableOpacity> 
                        </View>
                    </>
                    : 
                        <>
                        <View style={styles.inputContainer}>
                        <TouchableOpacity
                            onPress={() => {handleContinue()
                                            console.log("pressed continue")}}

                        >
                            <Text style={styles.sideText}>←Back</Text>
                        </TouchableOpacity> 
                        <Text style={styles.loginText}>Almost There...</Text>
                        
                        <View style={styles.textContainer}>
                            <Text style={styles.subText}>Personalize your flight experience</Text>
                        </View>

                            <TextInput
                                placeholder="Language"
                                value={languageField}
                                onChangeText={text => {setLanguageField(text)
                                                        //console.log(languageField)
                                                    }}
                                style={styles.input}
                            />
                            <TextInput
                                placeholder="Nationality"
                                value={nationalityField}
                                onChangeText={text => {setNationalityField(text)
                                //console.log(nationalityField)
                                }}
                                style={styles.input}
                            />
                            
                            
                            <TextInput
                                
                                placeholder="Gender"
                                value={genderField}
                                onChangeText={text => {setGenderField(text)
                                //console.log(ageField)
                                }}
                                style={styles.input}
                                //secureTextEntry
                            />
                            <TextInput
                                height={100}
                                placeholder="add a short description about yourself"
                                value={descriptionField}
                                onChangeText={text => {setDescriptionField(text)
                                //console.log(ageField)
                                }}
                                style={styles.input}
                                //secureTextEntry
                            />

                        </View>
                        <View>
                            {/* <TouchableOpacity
                                style={styles.buttonContainer}
                                onPress={() => {handleContinue()
                                                console.log("pressed continue")}}

                            >
                                <Text style={styles.buttonText}>Go Back</Text>
                            </TouchableOpacity>  */}
                            <TouchableOpacity
                                style={styles.buttonContainer}
                                onPress={() => {handleRegister()}}
                            >
                                <Text style={styles.buttonText}>Register</Text>
                            </TouchableOpacity> 
                        </View>
                        </>
                }
                
                
                </ImageBackground>
            </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    backgroundImage: {
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
    },
    loginText: {
      color: 'black',
      fontSize: 40,
      fontWeight: 'bold',
    },
    textContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    buttonContainer: {
      width: '79.5%',
      backgroundColor: 'black',
      marginTop: 50,
      marginBottom: 18,
      borderRadius: 10,
      marginTop: 15,
      
      
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      textAlign: 'center',
      paddingHorizontal: 90,
      paddingVertical: 19,
    },
    subText: {
      color: 'grey',
      fontSize: 16,
      paddingTop: 15,
    },
    sideText: {
      color: 'grey',
      fontSize: 16,
      fontWeight: 'bold',
      marginLeft: 3,
      paddingTop: 15,
    },
    bottomText: {
      color: 'grey',
      fontSize: 16,
      fontWeight: 'bold',
      paddingTop: 2,
      textAlign: 'center', 
      justifyContent: 'center',
      alignItems: 'center',
    },
    inputContainer: {
      width: '80%',
    },
    input: {
      backgroundColor: 'white',
      paddingHorizontal: 13,
      paddingVertical: 19,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#D9D9D9',
      marginTop: 24,
    },
    
  });
  
