import { ImageBackground, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, TouchableOpacity, View, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import React from 'react'
import {useState, useEffect} from'react'
import {firebase} from '../firebase';
import { useNavigation } from '@react-navigation/native';

const image = require('../assets/bg_wingmates.png');

//const image = {uri: 'https://legacy.reactjs.org/logo-og.png'};

const LoginScreen = () => {
  //const [nameField, setNameField] = useState("")
  const [emailField, setEmailField] = useState("")
  const [passwordField, setPasswordField] = useState("")

  const navigation = useNavigation()

  //figure out how to stop the user from going to the home screen on the register page
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        navigation.navigate("Home")
      }
    })

    return unsubscribe
  }, [])

  const handleLogin = () => {
    console.log("in handle login", emailField, passwordField)
    firebase.auth().signInWithEmailAndPassword(emailField, passwordField)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log(user.email)

      })
      .catch(error => {alert("invalid credentials")
                        console.log(error.message)})
  }

  const handleSignUp = () => {
    navigation.navigate("Register")
  }

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled={false}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ImageBackground source={image} style={styles.backgroundImage}>

            <View style={styles.inputContainer}>
              <Text style={styles.loginText}>Sign In</Text>
              
              <View style={styles.textContainer}>
                <Text style={styles.subText}>Don't have an account yet?</Text>
                <TouchableOpacity 
                  onPress={() => {handleSignUp()}}
                > 
                  <Text style={styles.sideText}>Sign Up</Text>
                </TouchableOpacity>
                
              </View>

              <TextInput
                placeholder="Email"
                value={emailField}
                onChangeText={text => {setEmailField(text)
                                        console.log(emailField)
                                      }}
                style={styles.input}
              />
              {/* <TextInput
                placeholder="Name"
                value={nameField}
                onChangeText={text => {setNameField(text)
                  console.log(nameField)
                }}
                style={styles.input}
              /> */}
              <TextInput
                placeholder="Password"
                value={passwordField}
                onChangeText={text => {setPasswordField(text)
                  console.log(passwordField)
                }}
                style={styles.input}
                secureTextEntry
              />
            </View>
            <View>
                <TouchableOpacity
                  style={styles.buttonContainer}
                  onPress={() => {handleLogin()
                                  console.log("pressed login")}}

                >
                  <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity> 
            </View>
          </ImageBackground>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  )
}


export default LoginScreen


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
    marginTop: 25,
    
    
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 136,
    width: '100%',
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
