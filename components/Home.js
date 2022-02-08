import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';

import { useQuery, gql } from '@apollo/client';


import PokemonList from './PokemonList';

export const POKEMON = gql`
  query samplePokeAPIquery {
  pokemon_v2_pokemon(limit: 151) {
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
  console.log("App")
  const { loading, error, data } = useQuery(POKEMON);
  // console.log(data)

  return (

    <View style={styles.container}>
      {loading ? <Text>Cargando</Text>
        :
        <FlatList
          data={data.pokemon_v2_pokemon}
          keyExtractor={(pokemon) => pokemon.id}
          ListHeaderComponent={() => <Text style={{ fontWeight: 'bold', fontSize: 18, margin: 30 }}>Toca en un pokemon de la Pokédex y mira su información!</Text>}
          numColumns={3}
          contentContainerStyle={{ alignItems: 'center' }}
          renderItem={({ item, index }) =>
            <View>
              {/* <Text>{item.name}</Text> */}
              <PokemonList 
              item = { item }
              navigation={ navigation }
              />
            </View>
          }
        />
      }
      {/* <QueryResult error={error} loading={loading} data={data}>
          {data?.tracksForHome?.map((track, index) => (
              <TrackCard key={track.id} track={track} />
          ))}
      </QueryResult> */}
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

