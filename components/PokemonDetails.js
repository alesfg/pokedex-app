import React, {useState,useEffect} from 'react'
import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native'

import { backgroundColors } from '../assets/colors'
import pokeball_bg from '../assets/pokeball_bg.png'
import { translateType } from '../assets/translate'

import * as Speech from 'expo-speech';







const PokemonDetails = ({ route }) => {

  const { item, type } = route.params
  console.log("DEtalles!")
  const { id, name } = item
  const imageUri=`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
  const urlDetails = `https://pokeapi.co/api/v2/pokemon-species/${id}`
  const types = item.types.map(e => e.type.name)

  const [genus, setGenus] = useState(null)
  const [flavor, setFlavor] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  
  const getPokemonDetails = async () => {
    const res = await fetch( urlDetails )
    const data = await res.json()
    setGenus(data.genera.find(data => data.language.name==='es').genus)
    setFlavor(data.flavor_text_entries.find(data => data.language.name==='es').flavor_text)
    setIsLoading(false)
  }

  useEffect(async() => {
  await getPokemonDetails()
  speak()
  setIsLoading(false)

}, [])

  const speak = () => {
    Speech.speak(name+",número"+id+"."+genus+"."+flavor,{
      rate:1,
      language:'es-ES',
      pitch:1,
      voice:"es-es-x-eed-network", //masculino agradable menos robo ,ESTE!
      // voice:"es-us-x-esc-network"   // fem latino
      // voice:"es-es-x-eee-local" //fem
      // voice:"es-es-x-eef-local"  //masculino
      // voice:"es-es-x-eec-local" //femenino guay
      // voice: "es-es-x-eea-local" //femenino robo
      // voice:"es-es-x-eed-local" //masculino robo
      // voice:"es-ES-language" //fem
      // voice:"es-es-x-eec-local" //fem robo
    });
  };

  


    return (
        <View style={[styles.screen],{backgroundColor:backgroundColors[type]}}>
          <View style={{opacity:0.15}}>
            <ImageBackground source={pokeball_bg} style={{
              width:200,height:160,alignSelf:'flex-end',
              // backgroundColor:'green'           
              }}
              resizeMode='contain'
              />
          </View>
          <View style={styles.infoCard}>
            <View >
              <Image source={{uri:imageUri}} style={styles.image} resizeMode='contain'/>
            </View>
            <View style={{flexDirection:'row'}}>
              <View>
                {types[0] && <Text style={[styles.type,{backgroundColor:backgroundColors[types[0]]}]}> {translateType(types[0])} </Text>}
              </View>
              <View>
                {types[1] && <Text style={[styles.type,{backgroundColor:backgroundColors[types[1]]}]}> {translateType(types[1])} </Text>}
              </View>
            </View>
            {isLoading ?? <Text>Cargando...</Text>}
            <Text style={{color:backgroundColors[type],fontWeight:'bold',fontSize:20,padding:20}}>{genus}</Text>
            <Text style={{fontStyle:'italic',fontSize:14}} selectable={true} selectionColor={'gray'}> { flavor } </Text>
          </View>
        </View>
    )
}

export default PokemonDetails

const styles = StyleSheet.create({
  screen: {
    // height:height,
    // justifyContent:'center',
    alignSelf:'center',
    // flex:1
  },
  infoCard: {
    margin:10,
    backgroundColor:'#FFFFFF',
    borderRadius:10,
    alignItems:'center',
    padding:20,
    // flex:1
    // height:400
  },
  image: {
    // backgroundColor:'lightgreen',
    width:200,
    height:200,
    marginTop:-170
    
  },
  imageContainer: {
    justifyContent:'center',
    alignSelf:'center'
  },
  type: {
    borderRadius:10,
    padding:5,
    marginHorizontal:5,
    textTransform:'capitalize'
  }
})


/* 
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
    }} */