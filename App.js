import React, {useState, useEffect} from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Dimensions, Image, FlatList } from 'react-native';

import PokemonList from './components/PokemonList';
import pokeball from './assets/pokedex.png'


export default function App() {

  const[allPokemons, setAllPokemons] = useState([])
  // const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon?limit=21')
  const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon?limit=121')

  const[allPokemonsDetails, setAllPokemonsDetails] = useState([])
  // const [loadMoreDetails, setLoadMoreDetails] = useState('https://pokeapi.co/api/v2/pokemon-species/?limit=21')
  const [loadMoreDetails, setLoadMoreDetails] = useState('https://pokeapi.co/api/v2/pokemon-species/?limit=121')

 const getAllPokemons = async () => {
   const res = await fetch(loadMore)
   const data = await res.json()

   const resDetails = await fetch(loadMoreDetails)
   const dataDetails = await resDetails.json()
   setLoadMoreDetails(dataDetails.next)
   function createPokemonDetails(results)  {
    results.forEach( async pokemon => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.name}`)
      const data =  await res.json()
      setAllPokemonsDetails( currentList => [...currentList, data].sort((a, b) => a.id - b.id))
    })
  }
  createPokemonDetails(dataDetails.results)


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

/* const renderPokemon = ({ pokemonStats,index }) => (
  <PokemonList
  key={index}
  id={pokemonStats.id}
  image={pokemonStats.sprites.front_default}
  name={pokemonStats.name}
  type={pokemonStats.types[0].type.name}
  types={pokemonStats.types}
  color={allPokemonsDetails[index].color.name}
  />
); */

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainter}>
        <Text style={styles.title}>Pokedex Alex</Text>
        <Image
        source={pokeball}
        style={styles.icon}
        />
      </View>
        
          <View style={styles.list}>

          <FlatList
            style={{backgroundColor:"lightblue"}}
            data={allPokemons}
            keyExtractor={ (item) => item.id  }
            renderItem={({item, index}) =>
              <SafeAreaView>
                <PokemonList 
                    item = { item }
                    image={item.sprites.front_default}
                    color={allPokemonsDetails[index].color.name}
                    description={allPokemonsDetails[index].flavor_text_entries.find(e => e.language.name=="es").flavor_text}
                />
              </SafeAreaView>
            }
            ListHeaderComponent={ () => <Text style={{fontWeight:'bold',fontSize:18,margin:10}}>Toca en un pokemon para que la Pokédex te diga su descripción!</Text> }
          />
       
          </View>
          <TouchableOpacity onPress={() => getAllPokemons()}>
            <View style={styles.loadMore}>
              <Text style={{textAlign:'center', textAlignVertical:'top',fontSize:15, paddingBottom:10}}>Ver más</Text>
            </View>
          </TouchableOpacity>
    </SafeAreaView>
  );
}

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F7F7F7',
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
  icon:{
    width:50,
    height:50,
  },
  title: {
    color:'#ffffff',
    padding:10,
    textAlignVertical:'center'
  },
  titleContainter: {
    backgroundColor:'black',
    width:width,
    flexDirection:'row',
    justifyContent:'space-evenly'
  },
  loadMore: {
    height:height/12,
    backgroundColor:'green'
  }
  
});


