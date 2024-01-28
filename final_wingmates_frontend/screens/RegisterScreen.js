import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ImageBackground, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, TouchableOpacity, View, Keyboard } from 'react-native';
import React from 'react'
import {useState, useEffect} from'react'
import {firebase} from '../firebase';
import { useNavigation } from '@react-navigation/native';
import UserAPI from '../services/UserAPI';
import { MultipleSelectList, SelectList } from 'react-native-dropdown-select-list';

const image = require('../assets/bg_wingmates.png');
// conatenate language strings into one string
const RegisterScreen = () => {
    const navigation = useNavigation()
    const [currentPage, setCurrentPage] = useState(true)
    const [emailField, setEmailField] = useState("")
    const [passwordField, setPasswordField] = useState("")
    const [nameField, setNameField] = useState("")
    const [languageField, setLanguageField] = useState([])
    const [nationalityField, setNationalityField] = useState([])
    const [ageField, setAgeField] = useState("")
    const [genderField, setGenderField] = useState("")
    const [descriptionField, setDescriptionField] = useState("")


    const allLanguages = [
        { key: '1', value: 'Arabic' },
        { key: '2', value: 'Bulgarian' },
        { key: '3', value: 'Catalan' },
        { key: '4', value: 'Chinese' },
        { key: '5', value: 'Croatian' },
        { key: '6', value: 'Czech' },
        { key: '7', value: 'Danish' },
        { key: '8', value: 'Dutch' },
        { key: '9', value: 'English' },
        { key: '10', value: 'Finnish' },
        { key: '11', value: 'French' },
        { key: '12', value: 'German' },
        { key: '13', value: 'Greek' },
        { key: '14', value: 'Hebrew' },
        { key: '15', value: 'Hindi' },
        { key: '16', value: 'Hungarian' },
        { key: '17', value: 'Indonesian' },
        { key: '18', value: 'Italian' },
        { key: '19', value: 'Japanese' },
        { key: '20', value: 'Kazakh' },
        { key: '21', value: 'Korean' },
        { key: '22', value: 'Malay' },
        { key: '23', value: 'Norwegian' },
        { key: '24', value: 'Polish' },
        { key: '25', value: 'Portuguese' },
        { key: '26', value: 'Romanian' },
        { key: '27', value: 'Russian' },
        { key: '28', value: 'Slovak' },
        { key: '29', value: 'Spanish' },
        { key: '30', value: 'Swedish' },
        { key: '31', value: 'Thai' },
        { key: '32', value: 'Turkish' },
        { key: '33', value: 'Ukrainian' },
        { key: '34', value: 'Vietnamese' },
    ];

    const nationality = [
        { key: '1', value: 'Afghanistan' },
        { key: '2', value: 'Albania' },
        { key: '3', value: 'Algeria' },
        { key: '4', value: 'Andorra' },
        { key: '5', value: 'Angola' },
        { key: '6', value: 'Argentina' },
        { key: '7', value: 'Armenia' },
        { key: '8', value: 'Australia' },
        { key: '9', value: 'Austria' },
        { key: '10', value: 'Azerbaijan' },
        { key: '11', value: 'Bahamas' },
        { key: '12', value: 'Bahrain' },
        { key: '13', value: 'Bangladesh' },
        { key: '14', value: 'Barbados' },
        { key: '15', value: 'Belarus' },
        { key: '16', value: 'Belgium' },
        { key: '17', value: 'Belize' },
        { key: '18', value: 'Benin' },
        { key: '19', value: 'Bhutan' },
        { key: '20', value: 'Bolivia' },
        { key: '21', value: 'Bosnia and Herzegovina' },
        { key: '22', value: 'Botswana' },
        { key: '23', value: 'Brazil' },
        { key: '24', value: 'Brunei' },
        { key: '25', value: 'Bulgaria' },
        { key: '26', value: 'Burkina Faso' },
        { key: '27', value: 'Burundi' },
        { key: '28', value: 'Cambodia' },
        { key: '29', value: 'Cameroon' },
        { key: '30', value: 'Canada' },
        { key: '31', value: 'Chad' },
        { key: '32', value: 'Chile' },
        { key: '33', value: 'China' },
        { key: '34', value: 'Colombia' },
        { key: '35', value: 'Comoros' },
        { key: '36', value: 'Republic of the Congo' },
        { key: '37', value: 'Democratic Republic of the Congo' },
        { key: '38', value: 'Croatia' },
        { key: '39', value: 'Cuba' },
        { key: '40', value: 'Cyprus' },
        { key: '41', value: 'Denmark' },
        { key: '42', value: 'Djibouti' },
        { key: '43', value: 'Dominica' },
        { key: '44', value: 'East Timor' },
        { key: '45', value: 'Ecuador' },
        { key: '46', value: 'Egypt' },
        { key: '47', value: 'Eritrea' },
        { key: '48', value: 'Estonia' },
        { key: '49', value: 'Ethiopia' },
        { key: '50', value: 'Fiji' },
        { key: '51', value: 'Finland' },
        { key: '52', value: 'France' },
        { key: '53', value: 'Gabon' },
        { key: '54', value: 'Gambia' },
        { key: '55', value: 'Georgia' },
        { key: '56', value: 'Germany' },
        { key: '57', value: 'Ghana' },
        { key: '58', value: 'Greece' },
        { key: '59', value: 'Grenada' },
        { key: '60', value: 'Guatemala' },
        { key: '61', value: 'Guinea' },
        { key: '62', value: 'Guinea-Bissau' },
        { key: '63', value: 'Guyana' },
        { key: '64', value: 'Haiti' },
        { key: '65', value: 'Honduras' },
        { key: '66', value: 'Hungary' },
        { key: '67', value: 'Iceland' },
        { key: '68', value: 'India' },
        { key: '69', value: 'Indonesia' },
        { key: '70', value: 'Iran' },
        { key: '71', value: 'Iraq' },
        { key: '72', value: 'Ireland' },
        { key: '73', value: 'Israel' },
        { key: '74', value: 'Italy' },
        { key: '75', value: 'Jamaica' },
        { key: '76', value: 'Japan' },
        { key: '77', value: 'Jordan' },
        { key: '78', value: 'Kazakhstan' },
        { key: '79', value: 'Kenya' },
        { key: '80', value: 'Kiribati' },
        { key: '81', value: 'North Korea' },
        { key: '82', value: 'South Korea' },
        { key: '83', value: 'Kosovo' },
        { key: '84', value: 'Kuwait' },
        { key: '85', value: 'Kyrgyzstan' },
        { key: '86', value: 'Laos' },
        { key: '87', value: 'Latvia' },
        { key: '88', value: 'Lebanon' },
        { key: '89', value: 'Lesotho' },
        { key: '90', value: 'Liberia' },
        { key: '91', value: 'Libya' },
        { key: '92', value: 'Liechtenstein' },
        { key: '93', value: 'Lithuania' },
        { key: '94', value: 'Luxembourg' },
        { key: '95', value: 'North Macedonia' },
        { key: '96', value: 'Madagascar' },
        { key: '97', value: 'Malawi' },
        { key: '98', value: 'Malaysia' },
        { key: '99', value: 'Maldives' },
        { key: '100', value: 'Mali' },
        { key: '101', value: 'Malta' },
        { key: '102', value: 'Mauritania' },
        { key: '103', value: 'Mauritius' },
        { key: '104', value: 'Mexico' },
        { key: '105', value: 'Micronesia' },
        { key: '106', value: 'Moldova' },
        { key: '107', value: 'Monaco' },
        { key: '108', value: 'Mongolia' },
        { key: '109', value: 'Montenegro' },
        { key: '110', value: 'Morocco' },
        { key: '111', value: 'Mozambique' },
        { key: '112', value: 'Myanmar' },
        { key: '113', value: 'Namibia' },
        { key: '114', value: 'Nauru' },
        { key: '115', value: 'Nepal' },
        { key: '116', value: 'Netherlands' },
        { key: '117', value: 'New Zealand' },
        { key: '118', value: 'Nicaragua' },
        { key: '119', value: 'Niger' },
        { key: '120', value: 'Nigeria' },
        { key: '121', value: 'Norway' },
        { key: '122', value: 'Oman' },
        { key: '123', value: 'Pakistan' },
        { key: '124', value: 'Palau' },
        { key: '125', value: 'Panama' },
        { key: '126', value: 'Paraguay' },
        { key: '127', value: 'Peru' },
        { key: '128', value: 'Philippines' },
        { key: '129', value: 'Poland' },
        { key: '130', value: 'Portugal' },
        { key: '131', value: 'Qatar' },
        { key: '132', value: 'Romania' },
        { key: '133', value: 'Russia' },
        { key: '134', value: 'Rwanda' },
        { key: '135', value: 'Samoa' },
        { key: '136', value: 'Saudi Arabia' },
        { key: '137', value: 'Senegal' },
        { key: '138', value: 'Serbia' },
        { key: '139', value: 'Seychelles' },
        { key: '140', value: 'Sierra Leone' },
        { key: '141', value: 'Singapore' },
        { key: '142', value: 'Slovakia' },
        { key: '143', value: 'Slovenia' },
        { key: '144', value: 'Somalia' },
        { key: '145', value: 'South Africa' },
        { key: '146', value: 'Sudan' },
        { key: '147', value: 'Spain' },
        { key: '148', value: 'Sri Lanka' },
        { key: '149', value: 'Suriname' },
        { key: '150', value: 'Eswatini' },
        { key: '151', value: 'Sweden' },
        { key: '152', value: 'Switzerland' },
        { key: '153', value: 'Syria' },
        { key: '154', value: 'Taiwan' },
        { key: '155', value: 'Tajikistan' },
        { key: '156', value: 'Tanzania' },
        { key: '157', value: 'Thailand' },
        { key: '158', value: 'Togo' },
        { key: '159', value: 'Tonga' },
        { key: '160', value: 'Tunisia' },
        { key: '161', value: 'Turkey' },
        { key: '162', value: 'Turkmenistan' },
        { key: '163', value: 'Tuvalu' },
        { key: '164', value: 'Uganda' },
        { key: '165', value: 'Ukraine' },
        { key: '166', value: 'United Kingdom' },
        { key: '167', value: 'United States' },
        { key: '168', value: 'Uruguay' },
        { key: '169', value: 'Uzbekistan' },
        { key: '170', value: 'Vanuatu' },
        { key: '171', value: 'Venezuela' },
        { key: '172', value: 'Vietnam' },
        { key: '173', value: 'Yemen' },
        { key: '174', value: 'Zambia' },
        { key: '175', value: 'Zimbabwe' }
        ]


    const handleSignIn = () => {
        navigation.replace("Home")
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
                //concatenate language strings into one string
                const languageString = languageField.join(',')
                console.log(languageString)
                const newPerson = {
                    uid: userCredentials.user.uid,
                    email: emailField,
                    name: nameField,
                    language: languageString,
                    nationality: nationalityField,
                    gender: genderField.toLowerCase(),
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
                        
                        {/* <TextInput
                            placeholder="Age"
                            value={ageField}
                            onChangeText={text => {setAgeField(text)
                            //console.log(ageField)
                            }}
                            style={styles.input}
                            //secureTextEntry
                        /> */}

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
                        <View style={styles.backTextContainer}>
                            <Text style={styles.backText}>←Back</Text>
                        </View>
                        </TouchableOpacity> 
                        <Text style={styles.loginText}>Almost There...</Text>
                        
                        <View style={styles.textContainer}>
                            <Text style={styles.subText}>Personalize your flight experience</Text>
                        </View>

                        <View style={{ position: 'relative', zIndex: 2 }}>
                            <MultipleSelectList 
                                placeholder = "Language"
                                setSelected={(val) => {setLanguageField(val)
                                                        console.log(languageField)}} 
                                data={allLanguages} 
                                save="value"
                                onSelect={() => console.log(languageField)} 
                                label="Languages"
                                dropdownStyles={styles.dropDown}
                                boxStyles={styles.boxDropDown}  
                            />
                        </View>
                        <View style={{ position: 'relative', zIndex: 1, marginTop:25 }}>     
                            <SelectList
                                placeholder='Nationality'
                                setSelected={(val) => {setNationalityField(val)
                                                        console.log(nationalityField)}}
                                data={nationality}
                                save="value"
                                label="nationality"
                                dropdownStyles={styles.dropDown}
                                boxStyles={styles.boxDropDown} 
                            />
                        </View>
                                
                        <View style={styles.smallInputsContainer}>
                            <TextInput
                            placeholder="Age"
                            placeholderTextColor={'black'}

                            value={ageField}
                            onChangeText={text => setAgeField(text)}
                            style={styles.smallInput}
                            />

                            <TextInput
                            placeholder="Gender"
                            placeholderTextColor={'black'}

                            value={genderField}
                            onChangeText={text => setGenderField(text)}
                            style={styles.smallInput}
                            />
                        </View>
                            
                        
                            <TextInput
                                
                                placeholder="Add a short description about yourself"
                                placeholderTextColor={'black'}
                                value={descriptionField}
                                onChangeText={text => setDescriptionField(text)}
                                style={styles.descriptionInput}
                                multiline={true}
                            
                            />

                            

                        </View>
                        <View>
                    
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
      marginBottom: '5%',
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
      marginBottom: 10,
      marginTop: 0,
      paddingTop: 30,
    },
    textContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    smallInputsContainer: {
        flexDirection: 'row', // Arrange children horizontally
        justifyContent: 'space-between', // Distribute space evenly between children
        marginBottom: 10,
      },
      smallInput: {
        backgroundColor: 'white',
        paddingHorizontal: 13,
        paddingVertical: 19,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#000',
        borderColor: '#000',
        width: '48%',
        marginTop: 24,
        zIndex: 0,
      },
    buttonContainer: {
        width: '100%',
        backgroundColor: 'black',
        marginTop: 50,
        marginBottom: 18,
        borderRadius: 10,
        marginTop: 25,
        paddingHorizontal: 123,
        zIndex: 0,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        paddingVertical: 19,
    },
    subText: {
      color: 'grey',
      fontSize: 16,
      paddingTop: 0,
      marginBottom: 30,
    },
    sideText: {
      color: 'grey',
      fontSize: 16,
      fontWeight: 'bold',
      marginLeft: 3,
      marginBottom: 30,
    },
    backTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
      },
    backText: {
        color: 'grey',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 3,
        paddingTop: 15,
        marginTop: 30,
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
    dropDown: {
        backgroundColor: 'white',
        paddingHorizontal: 13,
        paddingVertical: 19,
        borderRadius: 10,
        borderWidth: 1,
        position: "absolute",
        borderColor: '#000',
        marginTop: 55,
        width: '100%',
        zIndex: 1,
        
      },
    
      boxDropDown: {
        marginTop: 0,
        marginBottom: 3,
        borderColor: '#000',
        color: '#D9D9D9',
      },

      dropDownInput:{
        borderRadius: 10,
        borderColor: '#D9D9D9',
        marginTop: 24,
        marginLeft: 14,
        width: '66.5%',
        height: 57,
      },
      descriptionInput: {
        backgroundColor: 'white',
        paddingHorizontal: 13,
        paddingVertical: 19, // Adjust the paddingVertical for more space at the top
        paddingTop: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#000',
        marginTop: 19,
        height: 170, // Adjust the height to make the TextInput bigger
        zIndex: 0,
      },
    
      logo: {
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: 40,
      },
      
    
  });
  