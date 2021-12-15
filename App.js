import React, {useState, useEffect} from 'react';
import { Button, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import PokemonList from './components/PokemonList';


export default function App() {

  const[allPokemons, setAllPokemons] = useState([])
  const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon?limit=21')

 const getAllPokemons = async () => {
   const res = await fetch(loadMore)
   const data = await res.json()

   setLoadMore(data.next)

   function createPokemonObject(results)  {
     results.forEach( async pokemon => {
       const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
       const data =  await res.json()
       setAllPokemons( currentList => [...currentList, data].sort((a, b) => a.id - b.id))
     })
   }
   createPokemonObject(data.results)
 }

useEffect(() => {
 getAllPokemons()
}, [])
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Pokedex Alex</Text>
        <View style={styles.container2}>
        <View style={styles.child}>
          {allPokemons.map( (pokemonStats, index) => 
              <PokemonList
                key={index}
                id={pokemonStats.id}
                image={pokemonStats.sprites.front_default}
                name={pokemonStats.name}
                type={pokemonStats.types[0].type.name}
                types={pokemonStats.types}
              />)}
          </View>
        </View>
        <Button
          className="load-more"
          onPress={() => getAllPokemons()}
          title="Ver más" />
        </ScrollView>
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  container: {
    backgroundColor: '#444444',
    paddingTop:30,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  container2: {
    backgroundColor: '#445554',
    paddingTop:30,
    flexDirection: 'row', 
    // flexWrap: 'wrap',
    // alignItems: 'center',
    // justifyContent: 'space-evenly',
  },
  child: {
    margin: '1%',
    flex: 0.9,
    flexDirection: 'row', 
    flexWrap: 'wrap',
    justifyContent:'space-evenly'
  },
  title: {
    backgroundColor: '#222333',
    color:'#ffffff'
  }
  
});
