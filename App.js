import React, {useState, useEffect} from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';

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
        <Text style={styles.title}>Pokedex Alex</Text>
      <ScrollView>
          <View style={styles.list}>
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
          <TouchableOpacity onPress={() => getAllPokemons()}>
            <View style={styles.loadMore}>
              <Text style={{textAlign:'center', textAlignVertical:'top',fontSize:15, paddingBottom:10}}>Ver más</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
    </SafeAreaView>
  );
}

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#445554',
    paddingTop:30,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    width:'100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent:'space-evenly'
  },
  title: {
    color:'#ffffff',
    padding:10
  },
  loadMore: {
    height:height/15,
    backgroundColor:'green'
  }
  
});
