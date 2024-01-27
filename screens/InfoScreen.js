
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ImageBackground, KeyboardAvoidingView, Picker, StyleSheet, Text, TextInput, TouchableWithoutFeedback, TouchableOpacity, View, Keyboard } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const image = require('../assets/bg_wingmates.png');

const InfoScreen = () => {
  const navigation = useNavigation();

  const handleRegisterPress = () => {
    navigation.navigate('Home');
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
              <Text style={styles.loginText}>Almost there...</Text>

              <View style={styles.textContainer}>
                <Text style={styles.subText}>Personalize your flight experience</Text>
              </View>

              <TextInput
                placeholder="Language"
                // value={email}
                // onChangeText={text => setEmail(text)}
                style={styles.input}
              />
              <TextInput
                placeholder="Nationality"
                // value={email}
                // onChangeText={text => setEmail(text)}
                style={styles.input}
              />

              <View style={styles.smallInputsContainer}>
                <TextInput
                  placeholder="Age"
                  // value={email}
                  // onChangeText={text => setEmail(text)}
                  style={styles.smallInput}
                />
                <TextInput
                  placeholder="Gender"
                  // value={email}
                  // onChangeText={text => setEmail(text)}
                  style={styles.smallInput}
                  
                />
              </View>
              
                <TextInput
                  placeholder="Add a short description about yourself"
                  // value={password}
                  // onChangeText={text => setPassword(text)}
                  style={styles.descriptionInput}
                  multiline={true}
                />
              

            </View>

            <TouchableOpacity 
              style={styles.buttonContainer}
              onPress={handleRegisterPress}
            >
              <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>

           
          </ImageBackground>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
};

export default InfoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '-15%',
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
    marginTop: 50,
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
  smallInputsContainer: {
    flexDirection: 'row', // Arrange children horizontally
    justifyContent: 'space-between', // Distribute space evenly between children
    marginBottom: 10,
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
    paddingTop: 1,
  },
  sideText: {
    color: 'grey',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 3,
    paddingTop: 15,
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
  smallInput: {
    backgroundColor: 'white',
    paddingHorizontal: 13,
    paddingVertical: 19,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    width: '48%',
    marginTop: 24,
  },
  descriptionInput: {
    backgroundColor: 'white',
    paddingHorizontal: 13,
    paddingVertical: 19, // Adjust the paddingVertical for more space at the top
    paddingTop: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    marginTop: 19,
    height: 100, // Adjust the height to make the TextInput bigger
  },
  
});

