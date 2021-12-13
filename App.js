import React, {useState, useEffect} from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';

import axios from 'axios'


import PokemonList from './components/PokemonList';
import Pagination from './components/Pagination';


export default function App() {

  // const [pokemon, setPokemon] = useState([]);

  const url= "https://pokeapi.co/api/v2/pokemon/";
  const [currentPageUrl, setCurrentPageUrl] = useState(url);
  const [nextPageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();
  const [loading, setLoading] = useState(true);

  const [pokemonUrl, setPokemonUrl] = useState([])
  

  useEffect(() => {
    setLoading(true)
    let cancel
    axios.get(currentPageUrl, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      setLoading(false)
      setNextPageUrl(res.data.next)
      setPrevPageUrl(res.data.previous)
      

      setPokemonUrl(res.data.results.map(p=>p.url))
    })
    return () => cancel()
  }, [currentPageUrl])



  function gotoNextPage() {
    setCurrentPageUrl(nextPageUrl)
  }
  function gotoPrevPage() {
    setCurrentPageUrl(prevPageUrl)
  }

  if(loading) return (
    <SafeAreaView styles={styles.loading}>
      <Text style={styles.loading}> Cargando Pokédex🚗🛸 </Text>
    </SafeAreaView>
  ) 
  return (
    <SafeAreaView style={styles.container}>
        <PokemonList pokemonUrl={pokemonUrl} currentPageUrl={currentPageUrl} />

        <Pagination 
          gotoNextPage={nextPageUrl ? gotoNextPage : null}
          gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
          />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#444444',
    paddingTop:30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loading: {
    backgroundColor: '#444333',
    paddingTop:30,
    flex:1
  },
  
});
