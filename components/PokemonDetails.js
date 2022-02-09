import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, ImageBackground, Dimensions } from 'react-native'

import { useQuery, gql } from '@apollo/client';
import { QueryResult } from './query-result';
import { backgroundColors } from '../assets/colors'
import pokeball_bg from '../assets/pokeball_bg.png'
import { translateType } from '../assets/translate'

import * as Speech from 'expo-speech';

export const DETALLES = gql`
query PokeDetails($_eq: Int) {
  pokemon_v2_pokemonspecies(where: {id: {_eq: $_eq}}) {
    pokemon_v2_pokemonspeciesflavortexts(limit: 1, where: {language_id: {_eq: 7}}) {
      flavor_text
    }
  }
}
`


const PokemonDetails = ({ route }) => {

  const { item, type } = route.params;
  const { id, name } = item;
  console.log(id)
  const { loading, error, data, variables } = useQuery(DETALLES, {
    variables:  { "_eq":id } ,
  });
  console.log(variables);
  console.log(data);
  const imageUri = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
  const types = item.pokemon_v2_pokemontypes.map(e => e.pokemon_v2_type.name)

  /*  useEffect(async() => {
   await getPokemonDetails()
   speak()
 
 }, []) */

  const speak = () => {
    Speech.speak(name + "." + genus + "." + flavor, {
      rate: 1.1,
      language: 'es-ES',
      pitch: 1,
      voice: "es-es-x-eed-network", //masculino agradable menos robo ,ESTE!
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
    <View style={[styles.screen], { backgroundColor: backgroundColors[type] }}>
      <View style={{ opacity: 0.15.toExponential, paddingTop: 20 }}>
        <ImageBackground source={pokeball_bg} style={{
          width: 200, height: 160, alignSelf: 'flex-end'
        }}
          resizeMode='contain'
        />
      </View>
      <View style={styles.infoCard}>
        <View >
          <Image source={{ uri: imageUri }} style={styles.image} resizeMode='contain' />
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View>
            {types[0] && <Text style={[styles.type, { backgroundColor: backgroundColors[types[0]] }]}> {translateType(types[0])} </Text>}
          </View>
          <View>
            {types[1] && <Text style={[styles.type, { backgroundColor: backgroundColors[types[1]] }]}> {translateType(types[1])} </Text>}
          </View>
        </View>
        <Text style={{ color: backgroundColors[type], fontWeight: 'bold', fontSize: 20, padding: 20 }}>El genus</Text>
        {loading ? <Text>Descripción</Text> :
          <Text style={{ fontStyle: 'italic', fontSize: 14 }} selectable={true} selectionColor={'gray'}>
            {/* { data.pokemon_v2_pokemonspecies[0].pokemon_v2_pokemonspeciesflavortexts[0].flavor_text } :D   */}
            shit
          </Text>
        }
      </View>
    </View>
  )
}

export default PokemonDetails
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  screen: {
    height: height,
    // justifyContent:'center',
    alignSelf: 'center',
    flex: 1
  },
  infoCard: {
    margin: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    alignItems: 'center',
    padding: 20,
    // flex:1
    // height:400
  },
  image: {
    // backgroundColor:'lightgreen',
    width: 200,
    height: 200,
    marginTop: -170

  },
  imageContainer: {
    justifyContent: 'center',
    alignSelf: 'center'
  },
  type: {
    borderRadius: 10,
    padding: 5,
    marginHorizontal: 5,
    textTransform: 'capitalize'
  }
})
