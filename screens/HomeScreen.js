import { ScrollView, StyleSheet, Text, View, Image, RefreshControl } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState, useEffect } from 'react';
import profile from '../assets/profile.png'

const HomeScreen = () => {

  const [refreshing, setRefreshing] = useState(false);

  const pullToRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }

  return (
    <View style={styles.container}>
      <ScrollView
      refreshControl={
        <RefreshControl 
        refreshing={refreshing}
        onRefresh={() => pullToRefresh()}
        />
        }
        >


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
