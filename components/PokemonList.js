import * as React from 'react'

import { StyleSheet, View, Text, Image, Dimensions, TouchableOpacity, Animated, Easing } from 'react-native';

import * as Speech from 'expo-speech';


export default function PokemonList({ item, color, image, description }) {
 
  const { id, name } = item

  const speak = () => {
    Speech.speak(description,{
      rate:1.1,
      language:'es-ES',
      pitch:1,
      // voice:"es-us-x-esc-network"   latino
      // voice:"es-es-x-eee-local"
      // voice:"es-es-x-eef-local"  //masculino
      // voice:"es-es-x-eec-local" //femenino
      // voice: "es-es-x-eea-local" //femenino robo
      // voice:"es-es-x-eed-local" //masculino robo
      // voice:"es-ES-language" //fem
      voice:"es-es-x-eed-network" //masculino agradable menos robo ,ESTE!
      // voice:"es-es-x-eec-local"
    });
  };

  let translateValue = new Animated.Value(0)
  const cardTranslate = translateValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.1, 1.2]
  });


    return (
      <TouchableOpacity
      activeOpacity={0.9}
      onPress={speak}

   
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
          <Image source={{uri:image}} style={styles.image} resizeMode='cover'/>
          <View style={[styles.nameContainer, {backgroundColor:`${color}`},{backgroundColor:(`${color}`=='white'||`${color}`=='yellow') ?'orange':`${color}`}]}>
            <Text style={styles.name}> {name} </Text>
          </View>
        </Animated.View>
      </TouchableOpacity>     
    )
}

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
    },  
    image: {
      // backgroundColor:'lightgreen',
      flex:3.5,
    },
    digits: {
      fontSize:12,
      height:'20%',
      padding: 6,
      textAlign:'right',
      textAlignVertical:'bottom',
    },
    name: {
      textTransform: 'capitalize',
      fontSize: 16,
      color:'white',
      textShadowColor: '#000000',
      textShadowOffset: {width: -1, height: 1},
      textShadowRadius: 10,
      textAlign:'center',
      
    },
    nameContainer: {
      flex:1,
      borderBottomLeftRadius:10,
      borderBottomRightRadius:10,
      marginBottom:-1
    },
  });

 
