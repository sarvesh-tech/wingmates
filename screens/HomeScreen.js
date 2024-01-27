import { ScrollView, StyleSheet, Text, View, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import profile from '../assets/profile.png'

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <SafeAreaView>
          <View style={styles.menuWrapper}>
            <Text style={styles.title}>Your Flights</Text>
            <Image source={profile} style={styles.profileImage}/>
          </View>
        </SafeAreaView>
      </ScrollView>

    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
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
    fontSize: 33,
    fontWeight: 'bold',
    color: 'black',
  }
})
