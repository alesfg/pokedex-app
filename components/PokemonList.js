import React from 'react'

import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';


export default function PokemonList({ pokemon,pokemonIndex }) {
    
    const url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/`
    let urlPoke = 'https://pokeapi.co/api/v2/pokemon/';

    // pokemon solo tiene 20 nombres cada render, pero p(pokemonIndex) sigue sumando, entonces cuando quiero acceder al nombre
    // necesito el index porque las imagenes son por ej 124.png pero ahora tb necesito otro iterador Bien para acceder al resto de datos de Pokeapi
    return (
      <ScrollView>
        {pokemonIndex.map(p => (
          <View key={p} style={styles.card}>
            {/* {console.log("este p:"+p)} */}
            {/* {console.log("este poke:"+pokemon[p-1])} */}
            <Text style={styles.digits}>
                # {p.length == 1 ? '00' : ''}
                  {p.length == 2 ? '0' : ''}
                {p}
            </Text>
            <Text style={styles.text}> {pokemon[p-1]} </Text>
            
            <Image 
              source= {{ uri: `${url}${p}.png` }}
              style= {styles.image}
              />
              <Image 
              source= {{ uri: `${url}back/${p}.png` }}
              style= {styles.image}
              />
              <Image 
              source= {{ uri: `${url}other/official-artwork/${p}.png` }}
              style= {styles.image}
              resizeMode='contain'
              /> 
              <Image 
              source= {{ uri: `${url}other/dream-world/${p}.svg` }}
              style= {styles.image}
              resizeMode='contain'
              />
              <Image 
              source= {{ uri: `${url}other/home/${p}.png` }}
              style= {styles.image}
              />
              
          </View>      
        ))}  
        </ScrollView>
        
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
    digits: {
      fontSize:10,
      color: 'grey',
      backgroundColor: 'white',
      height:'min-content'
    },
    text: {
      textTransform: 'capitalize',
      fontSize: 16
    }
  });
