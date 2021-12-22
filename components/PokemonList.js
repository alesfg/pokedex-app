import * as React from 'react'

import { StyleSheet, View, Text, Image, Dimensions, TouchableOpacity, Animated, Easing } from 'react-native';

import * as Speech from 'expo-speech';

/* import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator() */



export default function PokemonList({ item, color, description, navigation }) {
 
  const { id, name } = item



  const speak = () => {
    Speech.speak(description,{
      voice:"es-es-x-eed-network", //masculino agradable menos robo ,ESTE!
      rate:1,
      language:'es-ES',
      pitch:1
      // voice:"es-us-x-esc-network"   latino
      // voice:"es-es-x-eee-local"
      // voice:"es-es-x-eef-local"  //masculino
      // voice:"es-es-x-eec-local" //femenino
      // voice: "es-es-x-eea-local" //femenino robo
      // voice:"es-es-x-eed-local" //masculino robo
      // voice:"es-ES-language" //fem
      // voice:"es-es-x-eec-local"
    });
  };

  let translateValue = new Animated.Value(0)
  const cardTranslate = translateValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.1, 1.2]
  });

  const imageUri=`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`

    return (
      <TouchableOpacity
      activeOpacity={0.9}
      // onPress={speak}
      onPress={() => navigation.navigate("PokemonDetails")}

   
      onPressIn={() => {
        
        translateValue.setValue(0);
        Animated.timing(translateValue, {
          toValue: -50,
          duration: 50,
          easing: Easing.linear,
          useNativeDriver: true
        }).start();
      }}

        onPressOut={() => {
          Animated.timing(translateValue, {
            toValue: 0,
            duration: 700,
            easing: Easing.bounce,
            delay: 6500,
            useNativeDriver: true
          }).start()
        }}

      >
        <Animated.View style={[styles.card,{borderColor:`${color}`},{borderColor:(`${color}`=='white'||`${color}`=='yellow') ?'orange':`${color}`}, {transform:[{translateY: cardTranslate}]}]} >
          <Text style={[styles.digits,{color:`${color}`},{color:(`${color}`=='white'||`${color}`=='yellow') ?'orange':`${color}`}]}>
            #
            {id.toString().length==1 ? '00' : ''}
            {id.toString().length==2 ? '0' : ''}
            {id}
          </Text>
          <Image source={{uri:imageUri}} style={styles.image} resizeMode='contain'/>
          <View style={[styles.nameContainer, {backgroundColor:`${color}`},{backgroundColor:(`${color}`=='white'||`${color}`=='yellow') ?'orange':`${color}`}]}>
            <Text style={styles.name}> {name} </Text>
          </View>
        </Animated.View>
      </TouchableOpacity>     
    )
}
// }

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
    card: {
      marginVertical: 10,
      borderRadius: 15,
      width: width/3.5,
      height: width/3,
      justifyContent: 'center',
      backgroundColor: 'white',
      borderWidth:1.5,
      elevation:10,
      margin:3,
    },  
    image: {
      // backgroundColor:'lightgreen',
      flex:3,
    },
    digits: {
      fontSize:12,
      flex:0.6,
      paddingRight: 10,
      paddingTop: 1,
      textAlign:'right',
      textAlignVertical:'bottom',
    },
    name: {
      textTransform: 'capitalize',
      fontSize: 16,
      color:'white',
      textAlign:'center',
      
    },
    nameContainer: {
      flex:1,
      borderBottomLeftRadius:10,
      borderBottomRightRadius:10,
      marginBottom:-1
    },
  });

 
