import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Image, View, FlatList, TextInput } from 'react-native';

import { useQuery, gql } from '@apollo/client';
import usePokemonSearch from './usePokemonSearch';
import pokegif from '../assets/image11.gif'


import PokemonList from './PokemonList';

export const POKEMON = gql`
  query samplePokeAPIquery ($offset: Int) {
  pokemon_v2_pokemon(limit: 15,offset: $offset){
    name
    id
    pokemon_v2_pokemontypes {
      pokemon_v2_type {
        name
      }
    }
  }
}
`


export default function App({ navigation }) {
  
  const [offst, setOffset] = useState(0)
  const { loading, error, data } = useQuery(POKEMON, {variables: { "offset": offst }});
  const [text, onChangeText] = useState('pi')
  const [pokemons, setPokemons] = useState([]);
  const loadMore = () => {
    setOffset(offst+15)
  }

  useEffect( () => {
    if(data && Object.keys(data)?.length>0){
      setPokemons([...pokemons,...data.pokemon_v2_pokemon])
    }
     
  }, [data])

  console.log("Home")
  
  const renderData = ({ item, index }) => {
    return (
      <PokemonList 
      item = { item }
      navigation={ navigation }
      />
    )
  }

  return (

    <View style={styles.container}>
      {/* <TextInput
        value={text}
        onChangeText={onChangeText}
        placeholder='Busca un Pokémon'
        maxLength={12}
        /> */}
      {loading && pokemons?.length===0 ? 
        <View>
          <Image
          source={pokegif}
          style={{
            height: 179,
            width: 320,
            marginTop:100
          }}
          />
        </View>
        :
        <FlatList
          data={pokemons}
          keyExtractor={(pokemon) => pokemon.id}
          ListHeaderComponent={() => <Text style={{ fontWeight: 'bold', fontSize: 28, margin: 20,paddingTop:30 }}>Bear 🐻 Pokedex</Text>}
          numColumns={3}
          contentContainerStyle={{ alignItems: 'center' }}
          onEndReachedThreshold={0.1}
          onEndReached={()=>{
            loadMore()
          }}
          renderItem={renderData}
        />
      }
    {(loading ) ?? <Text>Cargando</Text>}

     
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F7F7F7',
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  }

});

