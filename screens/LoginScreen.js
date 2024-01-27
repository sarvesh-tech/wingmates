//npm start -- --tunnel
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ImageBackground, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, TouchableOpacity, View, Keyboard } from 'react-native';
import React from 'react';

const image = require('../assets/bg_wingmates.png');

const LoginScreen = () => {
  const navigation = useNavigation();

  const handleRegisterPress = () => {
    navigation.navigate('Info');
  };
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled={false}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ImageBackground source={image} style={styles.backgroundImage}>
            <View style={styles.inputContainer}>
              <Text style={styles.loginText}>Sign Up</Text>

              <View style={styles.textContainer}>
                <Text style={styles.subText}>Already have an account?</Text>
                <Text style={styles.sideText}>Sign In</Text>
              </View>

              <TextInput
                placeholder="Email"
                // value={email}
                // onChangeText={text => setEmail(text)}
                style={styles.input}
              />
              <TextInput
                placeholder="Name"
                // value={email}
                // onChangeText={text => setEmail(text)}
                style={styles.input}
              />
              <TextInput
                placeholder="Password"
                // value={password}
                // onChangeText={text => setPassword(text)}
                style={styles.input}
                secureTextEntry
              />
            </View>

            <TouchableOpacity 
              style={styles.buttonContainer}
              onPress={handleRegisterPress}
            >
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>

            <View style={styles.bottomContainer}>
              <Text style={styles.subText}>By clicking Register, you agree to our</Text>
              <Text style={styles.bottomText}>Terms, Data Policy.</Text> 
            </View>
          </ImageBackground>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
};

export default LoginScreen;

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

