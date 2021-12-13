import React, { useEffect, useState } from 'react'

import axios from 'axios';

import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';


export default function PokemonList({ pokemonUrl, currentPageUrl }) {
    
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/`
    const [pokemonId, setPokemonId] = useState([])
    // pokemon solo tiene 20 nombres cada render, pero p(pokemonIndex) sigue sumando, entonces cuando quiero acceder al nombre
    // necesito el index porque las imagenes son por ej 124.png pero ahora tb necesito otro iterador Bien para acceder al resto de datos de Pokeapi
    //https://pokeapi.co/api/v2/pokemon/1 ==https://pokeapi.co/api/v2/pokemon/bulbasaur!!!!!!!!!!
    //creo qye hay q hacer otro axios para el id y para otros datos

    useEffect(() => {
      pokemonUrl.map(u => {
        console.log(u)
        axios.get(u).then(res => {
          setPokemonId(res.data.id)
        })
      })

    }, [currentPageUrl])
   

    console.log(pokemonId)
    
    return (
      <ScrollView>
        {pokemonUrl.map(p => (
          <View key={p}>
            <Text style={styles.digits}>
              009
                
            </Text>
            <Text style={styles.text}> E </Text>
          <View  style={styles.card}>
            <Text>hola</Text>
                        
          </View>
          </View>
        ))}  
        </ScrollView>
        
    )
}

const styles = StyleSheet.create({
    card: {
      marginVertical: 10,
      borderRadius: 10,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      backgroundColor: '#FA8072'
    },
    imageContainer: {
      marginTop: -10,
      marginLeft: -10,
    },
    image: {
      width: 100,
      height: 100,
      backgroundColor: 'green',
      borderRadius:20
    },
    digits: {
      fontSize:10,
      color: 'white',
      backgroundColor: 'black',
      height:18,
      width:40,
      borderRadius: 6,
      padding: 2,
      textAlign:'center'
    },
    text: {
      textTransform: 'capitalize',
      fontSize: 16,
      backgroundColor:'#FAEE33'
    }
  });
