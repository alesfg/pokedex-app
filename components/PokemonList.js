import React, { useState } from 'react'

import { StyleSheet, View, Text, Image } from 'react-native';


export default function PokemonList({ pokemon,pokemonIndex }) {
    
    const [url, setUrl] = useState(`https://pokeapi.co/api/v2/pokemon`)
    // let pokemonInde=pokemonIndex.map();
    // const imageUrl = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemonIndex}.png`
    console.log("index2:"+pokemonIndex)
    return (
      <View>
        {pokemon.map(p => (
          <View key={p}>
            <Text>{p}</Text>                          
          </View>      
        ))}  
        </View>
        
    )
}

const styles = StyleSheet.create({
    card: {
      marginVertical: 12,
      borderRadius: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    imageContainer: {
      marginTop: -10,
      marginLeft: -10,
    },
    imageBackground: {
      width: 100,
      height: 100,
      paddingRight: 10,
    },
    image: {
      width: 100,
      height: 100,
    },
  });
