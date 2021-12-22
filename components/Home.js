import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Dimensions, Image, FlatList,VirtualizedList } from 'react-native';


import PokemonList from './PokemonList';
import pokeball from '../assets/pokeball.png'

import Constants from 'expo-constants';
const statusBarHeight = Constants.statusBarHeight

import { NavigationContainer } from '@react-navigation/native';






export default function App({navigation}) {
   

  const[allPokemons, setAllPokemons] = useState([])
  const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon?limit=41')

  const[allPokemonsDetails, setAllPokemonsDetails] = useState([])
  const [loadMoreDetails, setLoadMoreDetails] = useState('https://pokeapi.co/api/v2/pokemon-species/?limit=41')

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

 }

//  getAllPokemons()
 useEffect(() => {
 getAllPokemons()
}, [])

const getItemCount = (data) => 50;
const getItem = (data, index) => ({
  id: Math.random().toString(12).substring(0),
  title: `Item ${index+1}`
});

    return (
      
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Pokedex Alex</Text>
          <Image
          source={pokeball}
          style={styles.icon}
          />
        </View>
          
        <View style={styles.list}>

          <FlatList
            data={allPokemons}
            keyExtractor={ (item) => item.id  }
            // getItemCount={getItemCount}
            // getItem={getItem}
            renderItem={({item, index}) =>
              <View>
                <PokemonList 
                    item = { item }
                    navigation={ navigation }
                    // color={allPokemonsDetails[index].color.name}
                    // description={allPokemonsDetails[index].flavor_text_entries.find(e => e.language.name=="es").flavor_text}
                />
              </View>
            }
            ListHeaderComponent={ () => <Text style={{fontWeight:'bold',fontSize:18,margin:10}}>Toca en un pokemon para que la Pokédex te diga su descripción!</Text> }
            numColumns={ 3 }
          />
        
        </View>
            <TouchableOpacity onPress={() => getAllPokemons()}>
              <View style={styles.loadMore}>
                <Text style={{textAlign:'center', textAlignVertical:'top',fontSize:15, paddingBottom:10}}>Ver más</Text>
              </View>
            </TouchableOpacity>
      </View>
    );
  }         

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F7F7F7',
    height:height,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    backgroundColor:'black',
    width:width,
    marginTop:statusBarHeight,
    flexDirection:'row',
    justifyContent:'space-evenly',
  },
  list: {
    width:'100%',
    margin:3,
    flex:1,
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
  loadMore: {
    // height:height/12,
    marginBottom:0,
    backgroundColor:'green'
  }
  
});


