import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, ImageBackground, Dimensions } from 'react-native'

import { useQuery, gql } from '@apollo/client';
import { QueryResult } from './query-result';
import { backgroundColors } from '../assets/colors'
import pokeball_bg from '../assets/pokeball_bg.png'
import { translateType } from '../assets/translate'

import * as Speech from 'expo-speech';


export const GET_DETALLES = gql`
query getDetalles($_eq: Int) {
  pokemon_v2_pokemonspecies(where: {id: {_eq: $_eq}}) {
    pokemon_v2_pokemonspeciesflavortexts(where: {language_id: {_eq: 7}}, limit: 1) {
      flavor_text
    }
    pokemon_v2_pokemonhabitat {
      name
    }
    pokemon_v2_pokemons {
      weight
    }
    pokemon_v2_pokemonshape {
      name
    }
    pokemon_v2_pokemonspeciesnames(where: {language_id: {_eq: 7}}) {
      genus
    }
  }
}
`


const PokemonDetails = ({ route }) => {

  const { item, type } = route.params
  const { id, name } = item

  const { loading, error, data } = useQuery(GET_DETALLES, {
    variables: { "_eq": id },
  });
  
  // const flavor = data.pokemon_v2_pokemonspecies[0].pokemon_v2_pokemonspeciesflavortexts[0].flavor_text;
  // const genus =  data.pokemon_v2_pokemonspecies[0].pokemon_v2_pokemonspeciesnames[0].genus;
/*   const shape = data.pokemon_v2_pokemonspecies[0].pokemon_v2_pokemonshape.name;
  const weight = data.pokemon_v2_pokemonspecies[0].pokemon_v2_pokemons[0].weight;
  const habitat = data.pokemon_v2_pokemonspecies[0].pokemon_v2_pokemonhabitat.name; */
  

  console.log(data)
  // error ?? console.log(error)

  const imageUri = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
  // const urlDetails = `https://pokeapi.co/api/v2/pokemon-species/${id}`
  const types = item.pokemon_v2_pokemontypes.map(e => e.pokemon_v2_type.name)


  const speak = () => {
    Speech.speak(name + "." + genus + ".", {
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
        {loading ? <Text>Cargando...</Text> :
        <Text style={{ color: backgroundColors[type], fontWeight: 'bold', fontSize: 20, padding: 20 }}>
           {data.pokemon_v2_pokemonspecies[0].pokemon_v2_pokemonspeciesnames[0].genus}
           </Text>
        }
        {loading ? <Text>POKEMON</Text> :
          <Text style={{ fontStyle: 'italic', fontSize: 14 }} selectable={true} selectionColor={'gray'}>
            {data.pokemon_v2_pokemonspecies[0].pokemon_v2_pokemonspeciesflavortexts[0].flavor_text}
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
