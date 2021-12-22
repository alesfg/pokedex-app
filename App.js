import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Dimensions, Image, FlatList,VirtualizedList } from 'react-native';

import Home from './components/Home'
import PokemonList from './components/PokemonList';
import PokemonDetails from './components/PokemonDetails';
// import pokeball from './assets/pokeball.png'

import Constants from 'expo-constants';
const statusBarHeight = Constants.statusBarHeight

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PokemonDetails2 from './components/PokemonDetails';


const Stack = createNativeStackNavigator();







export default function App() {
   

  const[allPokemons, setAllPokemons] = useState([])
  const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon?limit=41')

  // const[allPokemonsDetails, setAllPokemonsDetails] = useState([])
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
      <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen component={Home} name='Home' />
        <Stack.Screen component={PokemonDetails} name='PokemonDetails' />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }         

const {height, width} = Dimensions.get('window');